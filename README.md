# samuelburke.dev

<!-- CI badges go here once ci.yml has run on each branch (dev after the first merge into dev, main after the first release):
[![CI · dev](https://github.com/samuel-burke/samuel-burke-dev/actions/workflows/ci.yml/badge.svg?branch=dev)](https://github.com/samuel-burke/samuel-burke-dev/actions/workflows/ci.yml?query=branch%3Adev)
[![CI · main](https://github.com/samuel-burke/samuel-burke-dev/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/samuel-burke/samuel-burke-dev/actions/workflows/ci.yml?query=branch%3Amain)
-->

Samuel Burke's portfolio: who I am, what I've built (ShiftView), and how to reach me. Next.js 16, Tailwind v4 and shadcn/ui, statically exported to Cloudflare Pages.

Live: https://samuelburke.dev

The site is built with coding agents against a written spec. Start with:

- [`DESIGN.md`](DESIGN.md): tokens, type, layout, motion and the Never do list
- [`AGENTS.md`](AGENTS.md): site rules, quality gates and the engineering policy for anyone (or any agent) working here
- [`CONTRIBUTING.md`](CONTRIBUTING.md): branches, PRs and commands

## Develop

Requires Node 22 (see `.node-version`). No environment variables or secrets are needed; `.env.example` lists the optional flags.

```bash
npm ci
npm run dev              # http://localhost:3000
```

## Check

```bash
npm run lint
npm run typecheck        # next typegen + tsc
npm run test:coverage    # Vitest unit + integration tests, with coverage thresholds
npm run build            # static export to out/
npm run test:e2e         # Playwright + axe against out/ (run `npx playwright install chromium` once)
```

The same checks run in GitHub Actions on every PR into `dev` and `main`. What each layer covers, and which test proves which requirement, is in [`docs/testing.md`](docs/testing.md).

## Branches and deploys

Task branches open PRs into `dev`; releases are PRs from `dev` into `main`. Cloudflare Pages builds every branch: `main` is production, and `dev`'s preview is staging. **Merging into `main` deploys to production.** Details, required checks and rollback: [`docs/ci-cd.md`](docs/ci-cd.md).

Cloudflare Pages settings: framework preset Next.js (Static HTML Export), build command `npm run build`, output directory `out`.

## Docs

- [Architecture](docs/architecture.md) and [decisions](docs/adr/)
- [CI/CD and releases](docs/ci-cd.md)
- [Testing](docs/testing.md)
- [Data inventory](docs/data-inventory.md)
- [Changelog](CHANGELOG.md)

## License

No license has been granted. The code is public to read, but that doesn't give permission to reuse it.
