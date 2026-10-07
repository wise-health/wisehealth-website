# Security — secrets in this repository

This repository is **public**. Anything committed here is public forever, even
after it is deleted (forks, caches, PR refs). Treat a committed secret as leaked.

## Rules

- **No credentials in git, ever.** API keys, OAuth `client_id`/`client_secret`,
  passwords, tokens go in a password manager or in Netlify → Site settings →
  Environment variables.
- **The MyDr widget `data-token` is the one exception.** It is public by design
  (the booking widget cannot work without shipping it in page HTML) and is
  allow-listed by exact fingerprint in `.gitleaksignore`.
- **Never `git commit --no-verify`.**

## Guards (what runs, and what it covers)

| Layer | Where | Checks |
|---|---|---|
| `scripts/hooks/pre-commit` | your machine, every commit (installed by `npm install`) | forbidden file names + gitleaks on staged changes; refuses to commit if gitleaks is missing |
| `ci` → `secrets` job | GitHub Actions, every push to master and every PR | forbidden file names over every path ever added on any ref + gitleaks over every commit (add-then-delete secrets included) |
| `ci-ok` | required status check on `master` | fails unless the secrets AND build/test jobs both succeeded (skipped/cancelled = fail) |
| GitHub secret scanning + push protection | GitHub | provider-pattern secrets (AWS, Stripe, GitHub, …) blocked at push time |
| branch protection on `master` | GitHub | `ci-ok` required; no force-push; no deletion |

On pull requests CI loads `.gitleaks.toml`, `.gitleaksignore` and
`scripts/check-forbidden-files.sh` **from master**, so a PR cannot weaken the
scan that judges it. Changing an exception therefore needs an owner merge.

### Coverage boundary — what these guards do NOT promise

- **CI runs after a push.** A secret pushed to a feature branch with
  `--no-verify` is public the moment it is pushed, even though CI goes red and
  the PR cannot merge. The pre-commit hook is the only control *before*
  disclosure.
- **Generic secrets** (a random string with no known prefix) are only caught
  when they sit next to a credential-like key name (`client_secret: …`) or live
  in a file with a forbidden name. GitHub push protection does not know MyDr's
  format.
- A PR that edits `.github/workflows/ci.yml` runs its own edited workflow.
  Review workflow changes as security changes.

## If a secret is committed

1. **Revoke/rotate it first** at the provider. Rewriting history does not un-leak it.
2. Remove it from history (`git filter-repo --sensitive-data-removal --invert-paths --path <file>`),
   force-push every affected ref, and ask GitHub Support to purge cached views and PR refs.
3. If the credential could reach patient data, start the GDPR (RODO art. 33/34)
   breach assessment immediately — the 72 h clock runs from awareness.
