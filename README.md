# samuelburke.dev

Samuel Burke's portfolio. Next.js 16, Tailwind v4 and shadcn/ui, statically exported to Cloudflare Pages.

The site is built with coding agents against a written spec. Start with:

- [`DESIGN.md`](DESIGN.md): tokens, type, layout, motion and the Never do list
- [`AGENTS.md`](AGENTS.md): rules and quality gates for any agent working here

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export to out/
```

## Deploy

Cloudflare Pages, connected to this repo:

- Framework preset: Next.js (Static HTML Export)
- Build command: `npm run build`
- Build output directory: `out`
