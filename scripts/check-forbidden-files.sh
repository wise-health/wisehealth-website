#!/usr/bin/env bash
# Refuse files whose NAME says they hold secrets, independent of their content.
# gitleaks checks content; this checks names — two controls, proven separately.
# 'secret' in a name blocks only data/doc files (secrets.json, client-secret.txt),
# not code (test-secret-guard.sh, secretUtils.ts).
#
#   scripts/check-forbidden-files.sh --staged        # pre-commit hook
#   scripts/check-forbidden-files.sh --history       # CI: every path ever added, all refs
#   scripts/check-forbidden-files.sh --paths a b c   # ad-hoc / tests
set -euo pipefail

PATTERN='(^|/)(credentials[^/]*|secrets?|[^/]*secret[^/]*\.(json|ya?ml|txt|env|ini|cfg|conf|toml|md|csv|xml|properties)|\.env(\.[^/]*)?|[^/]*\.(pem|key|p12|pfx|jks|keystore)|id_(rsa|dsa|ecdsa|ed25519)[^/]*|\.npmrc|\.netrc)$'
ALLOW='(^|/)\.env\.example$'

mode="${1:---staged}"
case "$mode" in
  --staged)  files="$(git diff --cached --name-only --diff-filter=ACMR)" ;;
  --history) files="$(git log --all --format= --name-only --diff-filter=ACR | sort -u)" ;;
  --paths)   shift; files="$(printf '%s\n' "$@")" ;;
  *) echo "usage: $0 --staged | --history | --paths <file>..." >&2; exit 2 ;;
esac

bad="$(printf '%s\n' "$files" | grep -iE "$PATTERN" | grep -viE "$ALLOW" || true)"
if [ -n "$bad" ]; then
  echo "BLOCKED: file name(s) look like secrets and must never be committed:" >&2
  printf '%s\n' "$bad" | sed 's/^/  /' >&2
  echo "Keep credentials in a password manager or the Netlify UI env vars. See SECURITY.md." >&2
  exit 1
fi
n="$(printf '%s\n' "$files" | grep -c . || true)"
echo "forbidden-files: ok ($n path(s) checked, mode $mode)"
