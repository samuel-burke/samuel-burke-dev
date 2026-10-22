<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# samuelburke.dev

Samuel Burke's portfolio. Next.js 16 App Router, statically exported (`output: "export"`) to Cloudflare Pages. Tailwind v4, shadcn/ui primitives themed with the Burke Systems brand tokens in `src/app/globals.css`.

## Before any UI work

Read `DESIGN.md` first. It is the spec: tokens, type, layout, motion and a **Never do** list. Follow it over your defaults. Anything on the Never do list needs Samuel's sign-off.

## Rules

- Static export only: no server actions, route handlers that read the request, cookies, or `next/image` optimization. If a feature needs a server, stop and ask.
- Use the theme tokens (`bg-night`, `bg-paper`, `text-burke-blue`, `text-muted-foreground`, `rounded-ui`...). Never hard-code colors.
- Site facts (name, links, email) live in `src/lib/site.ts`.
- Asset paths in `public/` are referenced relatively (`work/...`), so the export also works from a subfolder.
- Copy is first person, plain, specific. No filler words (see DESIGN.md).

## Quality gates (run before you say you're done)

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Then look at the result in a browser at 375px and 1440px.
