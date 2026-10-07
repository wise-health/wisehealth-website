#!/usr/bin/env bash
# RED-proof for the secret guard. Builds a throwaway repo with this repo's
# hook + gitleaks config and proves every control independently:
# each "must block" case must be refused, each "must pass" case accepted.
# Secrets are generated at runtime (inert random strings), never stored.
#
#   scripts/test-secret-guard.sh        # exit 0 = every case behaved
set -uo pipefail

src="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
fail=0
rnd() { LC_ALL=C tr -dc 'A-Za-z0-9' </dev/urandom | head -c "$1"; }
b64url() { printf '%s' "$1" | base64 | tr -d '=\n' | tr '/+' '_-'; }

new_repo() {
  rm -rf "$tmp/r"; mkdir -p "$tmp/r/scripts/hooks"; cd "$tmp/r" || exit 2
  git init -q -b master .
  git config user.email guard-test@example.invalid; git config user.name guard-test
  git config commit.gpgsign false
  cp "$src/.gitleaks.toml" "$src/.gitleaksignore" .
  cp "$src/scripts/check-forbidden-files.sh" scripts/
  cp "$src/scripts/hooks/pre-commit" scripts/hooks/
  git config core.hooksPath scripts/hooks
  git add -A && git commit -qm init >/dev/null 2>&1 || { echo "setup commit failed"; exit 2; }
}

expect() { # expect <block|pass> <name> <rc>
  local want="$1" name="$2" rc="$3" ok=0
  [ "$want" = block ] && [ "$rc" -ne 0 ] && ok=1
  [ "$want" = pass ]  && [ "$rc" -eq 0 ] && ok=1
  if [ $ok = 1 ]; then echo "PASS  $want  $name"; else echo "FAIL  $want  $name (rc=$rc)"; fail=1; fi
}

try_commit() { git add -A >/dev/null 2>&1; git commit -qm "$1" >/dev/null 2>&1; local rc=$?; git reset -q --hard HEAD 2>/dev/null; git clean -qfd 2>/dev/null; return $rc; }

new_repo
# 1. the incident shape: 128-char secret next to a credential key, in an ALLOWED filename
printf '# MyDr\n\nclient_id: %s\nclient_secret: %s\n' "$(rnd 40)" "$(rnd 128)" > notes.md
try_commit "md secret"; expect block "128-char client_secret in notes.md (allowed name)" $?

# 2. harmless content, FORBIDDEN filename — the filename control alone
echo "hello" > CREDENTIALS.md
try_commit "forbidden name"; expect block "CREDENTIALS.md with harmless content" $?

echo "X=1" > .env.production
try_commit "env file"; expect block ".env.production" $?

# 3. same secret, JSON shape
printf '{ "client_secret": "%s" }\n' "$(rnd 64)" > config.json
try_commit "json secret"; expect block "JSON \"client_secret\" literal" $?

# 4. a NEW JWT (the widget-token exception is fingerprint-scoped, not path/rule)
hdr=$(b64url '{"alg":"HS256","typ":"JWT"}'); pl=$(b64url "{\"sub\":\"$(rnd 12)\",\"iat\":1700000000}")
printf 'const t = "%s.%s.%s";\n' "$hdr" "$pl" "$(rnd 43)" > widget.ts
try_commit "new jwt"; expect block "new JWT in a new file" $?

# 5. must PASS: env-var reference, ordinary code, .env.example
printf 'const apiKey = process.env.MYDR_API_KEY;\nconst clientId = process.env.MYDR_CLIENT_ID;\n' > api.ts
echo "MYDR_API_KEY=" > .env.example
echo 'export const isSecretKey = (k: string) => k.length > 0;' > secret-utils.ts
git add -A; git commit -qm "env refs" >/dev/null 2>&1; expect pass "process.env refs + .env.example + secret-utils.ts (code, not data)" $?

echo '{"a":1}' > secrets.json
try_commit "secrets json"; expect block "secrets.json" $?

# 6. hook refuses when gitleaks is missing (fail closed)
echo "x" > plain.txt; git add plain.txt
PATH="/usr/bin:/bin" bash -c 'command -v gitleaks >/dev/null' && echo "SKIP  gitleaks in /usr/bin, cannot simulate missing" || {
  PATH="/usr/bin:/bin" git commit -qm "no gitleaks" >/dev/null 2>&1; rc=$?; git reset -q --hard HEAD; git clean -qfd
  expect block "hook with gitleaks missing from PATH" $rc; }

# 7. add-then-delete with --no-verify: CI's full-history scan still finds it
printf 'client_secret: %s\n' "$(rnd 96)" > leak.md
git add leak.md; git commit -qm leak --no-verify >/dev/null 2>&1
git rm -q leak.md; git commit -qm "remove leak" --no-verify >/dev/null 2>&1
gitleaks git --no-banner --redact --config .gitleaks.toml --gitleaks-ignore-path .gitleaksignore --log-opts="--all" . >/dev/null 2>&1
expect block "history scan: secret added then deleted (bypassed hook)" $?

# 8. forbidden name added then deleted is still caught by the history check
new_repo
echo hi > client-secret.txt; git add -A; git commit -qm add --no-verify >/dev/null 2>&1
git rm -q client-secret.txt; git commit -qm rm --no-verify >/dev/null 2>&1
scripts/check-forbidden-files.sh --history >/dev/null 2>&1
expect block "history filename check: client-secret.txt added then deleted" $?

[ $fail = 0 ] && echo "secret-guard: all cases behaved" || echo "secret-guard: FAILURES above"
exit $fail
