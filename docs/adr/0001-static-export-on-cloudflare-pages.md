# ADR 0001: Static export on Cloudflare Pages

- Date: 2026-10-23 (recorded 2026-10-25)
- Status: Accepted
- Owners: Samuel Burke

## Context

The site is a portfolio with no accounts, forms or server data. It needs to be fast everywhere, cheap or free to run, and simple to keep secure. Samuel connected the repo to Cloudflare Pages and the site has been live at https://samuel-burke-dev.pages.dev since 2026-10-23.

## Alternatives considered

- A server-rendered Next.js deployment (Vercel, Cloudflare Workers): supports server features the site doesn't use, and adds a runtime to secure and monitor.
- GitHub Pages: also static, but no per-branch previews.

## Decision

Build with `output: "export"` and deploy with Cloudflare Pages' Git integration. That integration is the only deploy mechanism: `main` is production, every other branch gets a preview. GitHub Actions runs checks only and never deploys.

## Consequences

- No server attack surface; no secrets are needed to build or deploy.
- Server features (server actions, request-reading route handlers, cookies, `next/image` optimization) aren't available. Adding one needs Samuel's approval and a new ADR.
- Cloudflare deploys `main` as soon as it changes, without waiting for GitHub checks. The gate is therefore branch protection on `main` (required checks before merge), not the deploy itself. See [ADR 0002](0002-branch-flow-ci-and-tests.md).
