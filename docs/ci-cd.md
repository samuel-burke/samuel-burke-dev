# CI/CD and releases

## Decisions

- **App:** samuelburke.dev, a Next.js 16 static export (`out/`). No server runtime, no secrets.
- **CI:** GitHub Actions (`.github/workflows/ci.yml`, `branch-flow.yml`, `smoke.yml`).
- **Hosting and deploys:** Cloudflare Pages Git integration, project `samuel-burke-dev`. Build command `npm run build`, output `out`, Node from `.node-version` (22). This is the **single deploy controller**. No workflow deploys, and none should be added while the Git integration is on. Why: [ADR 0001](adr/0001-static-export-on-cloudflare-pages.md).

## Branches and environments

| Source | Checks | Target | Secrets | Gate to the next step |
| --- | --- | --- | --- | --- |
| Task PR into `dev` | All CI jobs + branch flow | Cloudflare preview for the branch (`<branch>.samuel-burke-dev.pages.dev`) | None needed | Samuel merges after review |
| `dev` | CI on push | **Staging:** https://dev.samuel-burke-dev.pages.dev (Cloudflare preview alias) | None | Release PR `dev` → `main` |
| Release PR `dev` → `main` | All CI jobs + branch flow + deployed smoke test against staging | (none until merged) | None | **Samuel approves the merge. Merging deploys.** |
| `main` | CI on push (record only) | **Production:** https://samuel-burke-dev.pages.dev (custom domain samuelburke.dev not yet added) | None | Post-deploy smoke test |
| `hotfix/*` → `main` | Same, with `emergency-hotfix` label | Production on merge | None | Samuel's explicit approval; then PR back into `dev` |

**Merging into `main` deploys to production automatically.** Cloudflare doesn't wait for GitHub checks, so the real gate is the `main` ruleset requiring the CI checks to pass on the PR before it can merge.

Staging is a preview deployment, so it shares nothing with production except the code: the site has no data or secrets to isolate.

## Required status checks

These job names are what the rulesets must require, on both `dev` and `main`:

- `Lint and typecheck`
- `Unit and integration tests`
- `Build and E2E`
- `Dependency audit`
- `Validate branch flow`

Renaming a job means updating the rulesets and the README badges in the same PR.

## Release steps

1. On a task branch into `dev`: move `CHANGELOG.md` entries from `Unreleased` to a version (`## [x.y.z] - YYYY-MM-DD`, using the real date) and merge.
2. Check staging: open https://dev.samuel-burke-dev.pages.dev, and run **Actions → Deployed smoke test** with that URL.
3. Open a PR from `dev` into `main` with the release section of the template filled in.
4. Samuel merges once every check is green. Cloudflare deploys production.
5. Confirm in Cloudflare Pages → Deployments that production shows the merge commit, then run **Deployed smoke test** against https://samuel-burke-dev.pages.dev.
6. Tag the merge commit `vX.Y.Z`.

## Rollback

1. Cloudflare Pages → Deployments → pick the last good production deployment → **Rollback**. This is instant and needs no build.
2. Revert the bad change with a PR into `dev`, and release it normally so `main` matches what's live.

## Monitoring

None yet. The site has no runtime to fail, so the main risks are a bad deploy (covered by the post-deploy smoke test) and the host going down. Free uptime monitoring of the production URL would close the second gap.

## Settings Samuel configures (not in the repo)

GitHub (Settings → Rules → Rulesets), one ruleset each for `main` and `dev`:
- Require a pull request before merging, with **0 required approvals** (a solo owner can't approve their own PR; 1 would block every merge).
- Require the status checks above to pass, and require branches to be up to date.
- Block force pushes and deletion. No bypass list.
- On `main` only: allow merges only from `dev` (enforced by `Validate branch flow`).

GitHub security (Settings → Code security): turn on Dependabot alerts, secret scanning and push protection, and private vulnerability reporting (needed before a SECURITY.md can point people to it).

Cloudflare Pages (project → Settings → Builds & deployments): confirm the production branch is `main` and preview deployments are on for all branches, so `dev` gets its staging URL.

## Verification record

Updated in the PR that introduced this file; see that PR for the current state. Nothing in this document is active until it has been observed working.
