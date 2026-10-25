# ADR 0002: Branch flow, CI and tests

- Date: 2026-10-25
- Status: Accepted (Samuel asked for this workflow on 2026-10-25)
- Owners: Samuel Burke

## Context

Until now, work merged straight into `main`, which deploys to production, and the only checks were running lint and build by hand. Samuel wants a workflow that a reviewer would trust: protected branches, real CI and real tests.

## Decision

- **Branches:** task branches → `dev` (staging) → `main` (production) through PRs. Claude Code sessions use `claude/*` branch names, which count as task branches.
- **CI:** one GitHub Actions workflow (`ci.yml`) with four jobs, which are the required checks: *Lint and typecheck*, *Unit and integration tests*, *Build and E2E*, *Dependency audit*. Plus *Validate branch flow* (`branch-flow.yml`).
- **Tests:** Vitest for unit tests (pure logic, node) and integration tests (real components with cmdk, Radix and next-themes in jsdom); Playwright for E2E against the built static export, served the way Cloudflare Pages serves it, with axe for automated WCAG 2.2 AA checks.
- **Coverage:** 85% lines, 80% branches, 85% functions and statements over `src/lib` and `src/components`, enforced in CI. Pages are server components and are covered by E2E instead.
- **No formatter yet:** ESLint is the style gate. Prettier would reformat existing files; that's left as Samuel's call.

## Alternatives considered

- Jest instead of Vitest: slower, and Next's docs list both; Vitest needs less config for ESM and TypeScript.
- E2E against `next start`: doesn't work for a static export and wouldn't match Cloudflare's behavior (trailing-slash redirects, 404.html).
- Several browsers in CI: more minutes for little gain on a static site; Chromium at two viewports covers the layouts.

## Consequences

- Every change gets a Cloudflare preview and a full CI run before it can reach `main`.
- With only one maintainer, a required approval would block Samuel's own PRs; the rulesets should require PRs and checks but no approving review (see ci-cd.md).
