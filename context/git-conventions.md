# Git Conventions & Management Guide

> This document defines production-level Git conventions for branch naming, merging strategies, commit standards, and overall repository management. Follow these rules consistently across all work in this project.

---

## 1. Branch Naming

### Structure

```
<type>/<ticket-id>-<short-description>
```

All branch names must be:

- Lowercase
- Hyphen-separated (no underscores, no spaces)
- Concise but descriptive (2–5 words after the ticket ID)

### Branch Types

| Type        | Purpose                                    | Example                                    |
| ----------- | ------------------------------------------ | ------------------------------------------ |
| `feat/`     | New feature development                    | `feat/AUTH-42-oauth-google-login`          |
| `fix/`      | Bug fixes                                  | `fix/CART-88-discount-rounding-error`      |
| `hotfix/`   | Urgent production patches                  | `hotfix/PAY-101-stripe-webhook-timeout`    |
| `chore/`    | Maintenance, dependency updates, tooling   | `chore/upgrade-eslint-v9`                  |
| `refactor/` | Code restructuring without behavior change | `refactor/USER-55-extract-auth-middleware` |
| `docs/`     | Documentation only                         | `docs/api-rate-limit-guide`                |
| `test/`     | Adding or fixing tests                     | `test/CART-90-checkout-unit-tests`         |
| `release/`  | Release preparation branches               | `release/v2.4.0`                           |

### Rules

- Always branch off from the correct base (see §3).
- Never commit directly to `main`, `master`, or `develop`.
- Delete branches promptly after merging.
- If no ticket ID exists, omit it: `fix/navbar-overlap-mobile`.

---

## 2. Core Branches

| Branch      | Purpose                                   | Direct Commits   |
| ----------- | ----------------------------------------- | ---------------- |
| `main`      | Production-ready code. Always deployable. | ❌ Never         |
| `develop`   | Integration branch. Staging-ready code.   | ❌ Never         |
| `release/*` | Release candidates, final QA              | ❌ Only hotfixes |

---

## 3. Branching Strategy (GitFlow-based)

```
main
 └── develop
      ├── feat/...       → merge back into develop
      ├── fix/...        → merge back into develop
      └── refactor/...   → merge back into develop

develop
 └── release/vX.Y.Z     → merge into main AND develop

main
 └── hotfix/...          → merge into main AND develop
```

### Rules

- Feature/fix branches always cut from `develop`.
- `release/*` branches cut from `develop` when ready to ship.
- `hotfix/*` branches always cut from `main` — never from `develop`.
- After merging a `hotfix/*`, merge it into **both** `main` and `develop`.
- After merging a `release/*`, tag `main` with the version (see §7).

---

## 4. Commit Messages

Follow the **Conventional Commits** specification strictly.

### Format

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

### Types

| Type       | When to use                                      |
| ---------- | ------------------------------------------------ |
| `feat`     | Introduces a new feature                         |
| `fix`      | Patches a bug                                    |
| `docs`     | Documentation changes only                       |
| `style`    | Formatting, missing semicolons — no logic change |
| `refactor` | Code change that is not a fix or feature         |
| `test`     | Adding or correcting tests                       |
| `chore`    | Build process, dependency updates, tooling       |
| `perf`     | Performance improvement                          |
| `ci`       | CI/CD configuration changes                      |
| `revert`   | Reverts a previous commit                        |

### Rules

- Subject line: max **72 characters**, imperative mood, no period at end.
- Body: explain **what** and **why**, not how. Wrap at 72 characters.
- Footer: reference issues/tickets (`Closes #42`, `Refs AUTH-88`).
- One logical change per commit — avoid "catch-all" commits.

### Examples

```
feat(auth): add Google OAuth2 login flow

Implements server-side OAuth2 code exchange with Google. Stores
refresh tokens encrypted at rest using AES-256. Adds session
persistence across browser restarts.

Closes #42
```

```
fix(cart): correct discount rounding for multi-item orders

Floating-point accumulation caused 1-cent errors on orders with
3+ discounted items. Switched to integer-cent arithmetic throughout
the discount calculation pipeline.

Fixes CART-88
```

```
chore: upgrade ESLint to v9 and migrate flat config
```

---

## 5. Pull Requests (PRs)

### Naming

Mirror the branch name but in sentence case:

```
[TICKET-ID] Short description of the change
```

Example: `[AUTH-42] Add Google OAuth2 login flow`

### PR Requirements Before Review

- [ ] All CI checks pass (lint, type-check, tests, build).
- [ ] Self-reviewed — read your own diff before requesting review.
- [ ] PR description filled out: **What**, **Why**, **How to test**.
- [ ] No unresolved TODOs or debug artifacts (`console.log`, commented-out code).
- [ ] Migrations (if any) are included and reversible.
- [ ] No secrets or credentials committed.

### PR Description Template

```markdown
## What

Brief description of the change.

## Why

Context and motivation. Link to ticket/issue.

## How to Test

1. Step-by-step reproduction or test instructions.

## Screenshots / recordings (if UI change)

## Checklist

- [ ] Tests added/updated
- [ ] Docs updated (if applicable)
- [ ] No breaking changes (or breaking changes documented)
```

### Review Rules

- Minimum **1 approval** required to merge (2 for `release/*` and `hotfix/*`).
- The author merges — not the reviewer — after approval.
- Resolve all comments before merging; do not dismiss unresolved threads.
- Reviews should be completed within **1 business day**.

---

## 6. Merging Strategy

### Feature/Fix → Develop

Use **Squash and Merge** by default.

- Squashes all WIP commits into a single, clean commit on `develop`.
- The squash commit must follow Conventional Commits format.
- Preserves a linear, readable history on `develop`.

```bash
# Via CLI (if not using GitHub/GitLab UI)
git checkout develop
git merge --squash feat/AUTH-42-oauth-google-login
git commit -m "feat(auth): add Google OAuth2 login flow (#42)"
```

### Release → Main

Use **Merge Commit** (no squash, no rebase).

- Preserves the full release history.
- Creates an explicit merge commit as a clear audit point.
- Tag immediately after merging (see §7).

```bash
git checkout main
git merge --no-ff release/v2.4.0
git tag -a v2.4.0 -m "Release v2.4.0"
git push origin main --tags
```

### Hotfix → Main and Develop

Use **Merge Commit** into both branches.

```bash
# Merge into main
git checkout main
git merge --no-ff hotfix/PAY-101-stripe-webhook-timeout
git tag -a v2.3.1 -m "Hotfix v2.3.1"

# Merge into develop
git checkout develop
git merge --no-ff hotfix/PAY-101-stripe-webhook-timeout

git push origin main develop --tags
```

### Rebase Policy

- **Allowed**: Rebase your own feature branch onto `develop` before opening a PR to eliminate unnecessary merge commits.
- **Forbidden**: Never rebase branches that others are working on. Never rebase `develop`, `main`, or `release/*`.

```bash
# Acceptable: Keep your feature branch current
git checkout feat/AUTH-42-oauth-google-login
git fetch origin
git rebase origin/develop
```

---

## 7. Versioning & Tagging

Follow **Semantic Versioning** (`MAJOR.MINOR.PATCH`):

| Segment | When to bump                             |
| ------- | ---------------------------------------- |
| `MAJOR` | Breaking changes                         |
| `MINOR` | New backward-compatible features         |
| `PATCH` | Backward-compatible bug fixes / hotfixes |

### Tagging Rules

- Tags are created **only on `main`**, immediately after a release or hotfix merge.
- Always use annotated tags (not lightweight).
- Tag format: `vMAJOR.MINOR.PATCH`

```bash
git tag -a v2.4.0 -m "Release v2.4.0"
git push origin --tags
```

---

## 8. Keeping Branches in Sync

### Update your feature branch regularly

```bash
git fetch origin
git rebase origin/develop   # preferred over merge for feature branches
```

### Resolve conflicts locally — never in the PR

If conflicts exist, resolve them in your branch before the PR is reviewed. Conflict resolution commits in a PR diff are noise.

---

## 9. Repository Hygiene

### Branch Cleanup

- Delete remote branches immediately after merging via the PR UI (enable "auto-delete head branches" in repo settings).
- Delete local stale branches regularly:

```bash
git fetch --prune                         # Remove tracking refs to deleted remotes
git branch -d feat/AUTH-42-oauth-google-login  # Delete local branch
```

### Forbidden Practices

- ❌ Force-pushing to `main`, `develop`, or `release/*` — ever.
- ❌ `git push --force` on shared branches. Use `--force-with-lease` on your own branches only if needed after a rebase.
- ❌ Committing secrets, credentials, `.env` files, or large binaries.
- ❌ Committing build artifacts or generated files that belong in `.gitignore`.
- ❌ Long-lived feature branches (> 2 weeks without merging is a red flag).

### `.gitignore` Baseline

Always include at minimum:

```
.env
.env.*
node_modules/
dist/
build/
*.log
.DS_Store
coverage/
*.local
```

---

## 10. CI/CD Integration

- All pushes and PRs must trigger CI automatically.
- PRs **cannot be merged** if CI fails — no exceptions.
- `main` branch must be **protected**:
  - Require PR before merging.
  - Require status checks to pass.
  - Require at least 1 (preferably 2) approvals.
  - Dismiss stale reviews on new pushes.
  - Restrict force-push.

---

## 11. Quick Reference Cheatsheet

```bash
# Start a new feature
git checkout develop && git pull origin develop
git checkout -b feat/TICKET-123-short-description

# Keep your branch current
git fetch origin && git rebase origin/develop

# Clean up after merge
git checkout develop && git pull origin develop
git branch -d feat/TICKET-123-short-description
git remote prune origin

# Emergency hotfix
git checkout main && git pull origin main
git checkout -b hotfix/TICKET-999-critical-bug
# ... fix, commit, PR ...
# After merge: tag main, merge into develop too

# Tag a release
git checkout main && git pull origin main
git tag -a v2.4.0 -m "Release v2.4.0"
git push origin --tags
```

---

_This document is authoritative. When in doubt, follow it over ad-hoc decisions. Update it when the team agrees on a convention change._
