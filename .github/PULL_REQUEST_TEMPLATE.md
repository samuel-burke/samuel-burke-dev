## Purpose
<!-- Why does this change exist? Link an issue if there is one. -->

## Summary of changes
<!-- What a visitor will see, and the key implementation changes. Keep the scope clear. -->

## Type
- [ ] Task PR (`feature/*`, `bugfix/*`, `chore/*`, `docs/*`, `test/*`, `refactor/*`) → `dev`
- [ ] Release PR: `dev` → `main` (**merging deploys to production**)
- [ ] Owner-approved emergency hotfix: `hotfix/*` → `main` (label `emergency-hotfix`)

## Verification (run against the final changes; see AGENTS.md Section 12)

**Implementation verification status (choose one):**
- [ ] VERIFIED: all applicable required checks and acceptance criteria passed
- [ ] PARTIALLY VERIFIED: some passed, others NOT RUN or inconclusive (not complete)
- [ ] UNVERIFIED: no runtime verification of the changed behavior (not complete)
- [ ] BLOCKED: a required check or acceptance criterion failed (not complete)

### Acceptance criteria and observed evidence
| Criterion | Verification performed | Result (PASS / FAIL / NOT RUN / N/A) and evidence |
| --- | --- | --- |
| | | |

### Checks actually executed
| Check | Command / CI run | Result | Evidence or limitation |
| --- | --- | --- | --- |
| Lint and typecheck | `npm run lint`, `npm run typecheck` | | |
| Unit and integration tests + coverage | `npm run test:coverage` | | |
| Build | `npm run build` | | |
| E2E and axe (1440px, 375px) | `npm run test:e2e` | | |
| Dependency audit | `npm audit --audit-level=high` | | |
| GitHub Actions CI (commit SHA) | | | |
| Cloudflare preview deployment | | | |
| Browser check at 375px and 1440px, dark and light | | | |

- **Were the checks rerun after the last code change?**
- **Bug reproduction / regression test (bug fixes):**
- **NOT RUN checks and next action:**

## Risk
- Security / privacy:
- Accessibility:
- Performance:
- Screenshots (UI changes):

## Documentation
- [ ] README, `docs/` and AGENTS.md updated if commands, branches or deploys changed
- [ ] CHANGELOG.md `Unreleased` updated for visible changes
- [ ] DESIGN.md followed; anything on its Never do list has Samuel's sign-off
- [ ] No secrets, personal data or unrelated changes

## Release details (required for `dev` → `main`; delete for task PRs)
- **Version / tag:**
- **Changelog (moved from Unreleased):**
- **Included PRs:**
- **Staging evidence** (dev preview URL, deployed smoke test run):
- **Required checks on the final commit:**
- **Production deploy:** merging deploys `main` to Cloudflare Pages production automatically.
- **Post-deploy check:** run "Deployed smoke test" against https://samuel-burke-dev.pages.dev
- **Rollback:** Cloudflare Pages → Deployments → previous production deployment → Rollback, then revert the PR into `dev`
- **Known issues:**

## Approvals
- [ ] Diff self-reviewed
- [ ] All required checks green on the final commit
- [ ] Samuel approved before merge
