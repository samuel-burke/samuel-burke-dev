# Personal data inventory (internal)

Engineering notes on what data the site touches, from reading the code on 2026-10-25. This is not a privacy notice.

| Data | Source | Purpose | Storage | Vendors | Retention | Verified by |
| --- | --- | --- | --- | --- | --- | --- |
| Theme choice (`theme`) | Visitor clicks the toggle | Remember dark or light | Visitor's localStorage | None | Until the visitor clears it | `src/components/theme-provider.tsx` (next-themes), theme E2E test |
| Logo carve seen (`sb-cut`) | Set on first load | Play the carve once per session | Visitor's sessionStorage | None | Until the tab closes | `src/app/layout.tsx` head script, logo E2E test |
| Request logs (IP, user agent, URL) | Every request | Hosting | Cloudflare | Cloudflare | Cloudflare's policy | **Not verified.** Not visible from the repo |
| Analytics | n/a | n/a | n/a | n/a | n/a | No analytics code in the repo. **Not verified** whether Cloudflare Web Analytics is turned on for the Pages project |

The site has no forms, cookies, accounts or third-party scripts, and fonts are self-hosted at build time.

## What this means for a privacy notice

From the code alone, the site collects nothing itself, so a privacy notice isn't clearly required. Before deciding, Samuel should confirm whether Cloudflare Web Analytics is on. If it is, or if a form, analytics or the planned "Ask about Samuel" AI feature is added, this inventory and the decision need revisiting before release.
