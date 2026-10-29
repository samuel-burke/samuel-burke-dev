# Architecture

samuelburke.dev is a static site. There is no server, database, API or login; every page is HTML, CSS, JS and images produced at build time and served by Cloudflare Pages.

## System context

- **Who uses it:** recruiters and hiring managers, usually for under two minutes, on phones and laptops.
- **Critical journeys:** read the intro and About; open the ShiftView work and its case study; find experience; contact Samuel (copy email, GitHub, LinkedIn).
- **External services:** Cloudflare Pages (build and hosting), GitHub (source, CI). Fonts are self-hosted by `next/font` at build time, so visitors' browsers make no requests to Google.

## Components

| Component | Where | Role | Trust and data | Failure behavior |
| --- | --- | --- | --- | --- |
| Pages | `src/app/page.tsx`, `src/app/work/shiftview/page.tsx`, `src/app/work/study-squad/page.tsx` | Server components, prerendered to HTML at build | Static content only | Build fails, nothing deploys |
| Layout | `src/app/layout.tsx` | Fonts, metadata, theme provider, the head script that marks the logo carve as seen | Writes `sb-cut` to sessionStorage | Script is wrapped in try/catch; without storage the carve just replays |
| Client components | `src/components/*` | Command menu (⌘K), copy email, theme toggle, section nav, logo | Theme in localStorage (`theme`) | Copy email falls back to selecting the text; links work without JS |
| UI primitives | `src/components/ui/*` | shadcn Dialog and Command (Radix, cmdk) re-themed to DESIGN.md tokens | n/a | n/a |
| Site facts | `src/lib/site.ts` | Name, role, email, links | Public information | n/a |
| Static assets | `public/` | Icons, screenshots, `llms.txt` | Public | Missing files fail the E2E image check |

## Data flow and trust boundaries

Everything is public and read-only. The browser downloads files and runs a little JavaScript; nothing is sent back to Samuel. The only state is in the visitor's own browser (theme, and whether the logo carve has played this session). See [data-inventory.md](data-inventory.md).

The trust boundary that matters is the supply chain: dependencies and the build. It's covered by the lockfile, `npm audit` in CI, Dependabot, and a CI check that the build ships no source maps, env files or secret-looking strings.

## Build and deploy

`next build` with `output: "export"` writes `out/`. Cloudflare Pages builds each pushed branch with the same command: `main` becomes production, other branches become previews. See [ci-cd.md](ci-cd.md) and [ADR 0001](adr/0001-static-export-on-cloudflare-pages.md).

## Risks and decisions

- [ADR 0001: Static export on Cloudflare Pages](adr/0001-static-export-on-cloudflare-pages.md)
- [ADR 0002: Branch flow, CI and tests](adr/0002-branch-flow-ci-and-tests.md)
- Open: no security headers are set (see ci-cd.md, follow-ups). No uptime monitoring.
