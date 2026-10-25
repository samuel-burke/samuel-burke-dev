# Contributing

This is Samuel Burke's personal portfolio, maintained by Samuel with coding agents. It isn't open to outside feature contributions, but bug reports through the issue templates are welcome. Everyone working here, human or agent, follows [AGENTS.md](AGENTS.md) and, for anything visual, [DESIGN.md](DESIGN.md).

## Branches and pull requests

| Branch | Role | Deploys to |
| --- | --- | --- |
| `main` | Production. Only release PRs from `dev` (or an owner-approved `hotfix/*`) | https://samuel-burke-dev.pages.dev, automatically on merge |
| `dev` | Integration and staging. Receives task PRs | https://dev.samuel-burke-dev.pages.dev (Cloudflare preview) |
| `feature/*`, `bugfix/*`, `chore/*`, `docs/*`, `test/*`, `refactor/*` | Short-lived task branches from `dev` | A Cloudflare preview per branch |

1. Branch from the latest `dev`. Never commit to `dev` or `main` directly.
2. Open a PR into `dev` using the PR template. Fill in the verification table with checks you actually ran.
3. CI must be green. Samuel reviews and merges; nobody else merges or deploys.
4. To release, open a `dev` → `main` PR with the release section filled in and the changelog moved from `Unreleased` to a version. **Merging it deploys to production.**
5. Hotfixes go from `main` to `main` only with Samuel's approval and the `emergency-hotfix` label, then get a PR back into `dev`.

## Commands

Requires Node 22 (`.node-version`) and npm.

```bash
npm ci                     # install from the lockfile
npm run dev                # http://localhost:3000
npm run lint
npm run typecheck          # next typegen + tsc
npm run test:unit          # Vitest, node
npm run test:integration   # Vitest + Testing Library, jsdom
npm run test:coverage      # both, with coverage thresholds
npm run build              # static export to out/
npx playwright install chromium   # once
npm run test:e2e           # Playwright + axe against out/ (build first)
```

`npm run serve:out` serves `out/` on http://127.0.0.1:4173 the way Cloudflare Pages does, for looking at the production build by hand.

## Conventions

- Commits: short imperative subject lines, matching the existing history.
- Style: ESLint (`eslint-config-next`). TypeScript strict mode.
- Tests: put pure logic tests in `tests/unit`, component tests in `tests/integration`, and journeys in `tests/e2e`. A bug fix comes with a test that fails without the fix. See [docs/testing.md](docs/testing.md).
- Never weaken a test, lower a coverage threshold or skip a check to get a green build.
