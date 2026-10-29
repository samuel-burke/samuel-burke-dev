# Changelog

Notable changes to samuelburke.dev. Entries describe what actually shipped; dates are real release dates. Releases are `dev` → `main` merges, which Cloudflare Pages deploys to production.

## [Unreleased]

### Added
- Study Squad, a group study timer for Root communities, under Recent work, with a case study at `/work/study-squad/` (architecture, security, CI/CD and testing, key decisions) and a ⌘K entry.

## [0.1.0] - 2026-10-25

First tracked release. The site itself has been live since 2026-10-23; this release adds the engineering workflow around it.

### Added
- Unit and integration tests (Vitest, Testing Library) for the command menu, copy-email button, theme toggle, section nav, logo and screenshots, with coverage thresholds (85% lines, 80% branches).
- End-to-end tests (Playwright) against the built static site at 1440px and 375px: page smoke, navigation, ⌘K, theme persistence, copy email, the 404 page, the once-per-session logo carve, reduced motion, link and image checks, and automated WCAG 2.2 AA checks with axe in dark and light mode.
- GitHub Actions CI (lint, typecheck, tests with coverage, build and E2E, dependency audit), a branch-flow check, a manual deployed-site smoke test, and Dependabot updates targeting `dev`.
- `main` / `dev` / task-branch workflow (task branches named by type and purpose, such as `feature/*` or `chore/*`), PR and issue templates, CONTRIBUTING.md, architecture, CI/CD, testing and data-inventory docs, and ADRs.

### Fixed
- The search button's accessible name now matches its visible label (WCAG 2.5.3).
- The architecture diagram on the ShiftView case study can be scrolled with the keyboard on narrow screens.
- Links opened from the command menu no longer get a handle back to the site's tab (`noopener`).
- `npm run typecheck` works on a fresh clone (generates Next's route types before running `tsc`).
