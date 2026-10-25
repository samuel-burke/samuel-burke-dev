# Testing

## Layers

| Layer | Tool | Location | What it covers | Command |
| --- | --- | --- | --- | --- |
| Unit | Vitest (node) | `tests/unit` | Pure logic: the hidden-command matcher, site facts, `cn` | `npm run test:unit` |
| Integration | Vitest + Testing Library (jsdom) | `tests/integration` | Real client components with their real libraries (cmdk, Radix Dialog, next-themes): keyboard shortcuts, filtering, actions, clipboard fallbacks, scroll tracking | `npm run test:integration` |
| E2E | Playwright (Chromium, 1440px and 375px) | `tests/e2e` | The built static export served like Cloudflare Pages: journeys, 404, redirects, theme persistence, links, images, build output | `npm run test:e2e` |
| Accessibility | axe via `@axe-core/playwright` | `tests/e2e/accessibility.spec.ts` | Automated WCAG 2.0–2.2 A/AA rules on both pages, dark and light, both viewports | part of `test:e2e` |
| Coverage | V8 via Vitest | `coverage/` | Thresholds: 85% lines, 80% branches, 85% functions and statements over `src/lib` and `src/components` | `npm run test:coverage` |

**Not applicable:** API, database, contract and authorization tests. The site has no server, data store or accounts ([architecture.md](architecture.md)). If that changes, those layers become required.

**What automation can't cover:** screen reader behavior, visual taste against DESIGN.md, and real-device feel. Those stay manual: look at 375px and 1440px in dark and light before every UI PR.

## Acceptance criteria → verification

| # | Criterion | Verified by |
| --- | --- | --- |
| 1 | Both pages render with no console errors or failed requests | `smoke.spec.ts`: "home renders every section…", "case study renders…" |
| 2 | Visitors can reach every section and the case study, and get back | `smoke.spec.ts`: section links, case-study link, back link; `section-nav.test.tsx` |
| 3 | ⌘K / Ctrl+K / `/` open the command menu, it filters by keyword, and its actions work | `command-menu.test.tsx` (all actions, reduced motion, `/` inside a field), `smoke.spec.ts` "⌘K finds the case study" |
| 4 | Hidden commands stay hidden until five characters are typed | `egg-for.test.ts`, `command-menu.test.tsx` |
| 5 | Copy email copies, and falls back to selecting the address when the clipboard is missing or refused | `copy-email.test.tsx` (3 paths), `smoke.spec.ts` "copy email…" in a real browser |
| 6 | Dark is the default; the toggle switches and is remembered across reloads | `theme-toggle.test.tsx`, `smoke.spec.ts` "the theme toggle…" |
| 7 | The logo carve plays once per session and not with reduced motion | `logo-and-shot.test.tsx`, `smoke.spec.ts` "the logo carve…", "reduced motion…" |
| 8 | No automatically detectable WCAG 2.2 AA violations, either theme, phone and desktop | `accessibility.spec.ts` (8 runs) |
| 9 | Unknown URLs return a real 404; `/work/shiftview` redirects to the trailing-slash URL | `smoke.spec.ts` |
| 10 | Every link uses https (or mailto), `target=_blank` links use `noopener`, same-site links and images resolve | `links-and-output.spec.ts`, `command-menu.test.tsx` "opens outside links…" |
| 11 | The build ships no source maps, `.env` files or secret-looking strings | `links-and-output.spec.ts` "the build ships no…" |
| 12 | Site facts point at the right profiles (LinkedIn is `samuel-burke-nc`) | `site.test.ts` |
| 13 | A change can't reach `main` without passing checks | GitHub rulesets (owner setting, see [ci-cd.md](ci-cd.md)) + `branch-flow.yml` |

## Running against a deployed site

`E2E_BASE_URL=https://dev.samuel-burke-dev.pages.dev npm run test:e2e` runs the same suite against staging (the build-output check is skipped). In GitHub, run the **Deployed smoke test** workflow and give it the URL.

## Rules

- A bug fix comes with a test that fails without the fix.
- Never use `.only` (CI rejects it) or `.skip` to get green, or lower a threshold without Samuel's approval.
- Test behavior a visitor can observe, not implementation details.
