# DESIGN.md

The design spec for samuelburke.dev. Every value here is a decision, so follow it instead of your defaults. If a change needs something from **Never do**, it needs Samuel's sign-off first.

Source of truth for the reasoning: [design plan](https://claude.ai/artifact/K45kvWuuoVpdqi99eGK124).

## Direction

**An engineer's notebook, typeset with care.** Monochrome paper and ink, oversized type, an asymmetric editorial layout, and one precise moment of motion where the B cuts out of the logo tile. It should look decided, not generated.

1. **Content leads.** Projects and words carry the page; decoration earns its place or goes.
2. **One voice.** One palette, one radius, one motion curve, everywhere.
3. **Proof over polish.** Real screenshots, real numbers, real links.

## Typography

| Role | Face | Weights | Used for |
| --- | --- | --- | --- |
| Display | Schibsted Grotesk | 700, 800 | Name, project titles, big headings |
| Body | IBM Plex Sans | 400, 500, 600 | Paragraphs, nav, buttons |
| Mono | IBM Plex Mono | 400, 500 | Dates, keyboard hints, the command palette |

All three load through `next/font/google` (`src/app/layout.tsx`) and are exposed as `font-display`, `font-sans`, `font-mono`.

- Display: `clamp(3rem, 7vw, 5.25rem)`, line height 0.95, tracking -0.03em, weight 800.
- Body: 17px, line height 1.65. Never wider than 62–65ch.
- Section headings are small, sentence case, `muted-foreground`, Plex Sans 600. No numbers, no eyebrows.
- Real typography: curly quotes, en dashes in ranges (2024–2026), `tabular-nums` on dates and metrics.

## Color

Burke Night with a touch of blue (chosen by Samuel, Oct 22). The navy family comes from burke.systems so the portfolio reads as kin to the studio, but the layout, type and rules are this site's own. Dark is the default; light is a remembered toggle.

| Token | Dark | Light | Used for |
| --- | --- | --- | --- |
| `background` | #0F172A | #F4F6FA | Page |
| `surface` | #1A2440 | #E8ECF4 | Palette, hover fills, code |
| `foreground` | #EEF1F7 | #0F172A | Text |
| `muted-foreground` | #A7B1C6 | #475569 | Dates, meta, captions |
| `border` | #2A3658 | #C7D0E0 | Hairlines, screenshot frames |
| `accent` | #8FA6F5 | #2B50E8 | Links, the active nav item, focus ring, selection |
| `logo-tile` / `logo-letter` | #2B50E8 / #FFFFFF | same | The logo mark only |
| `destructive` | #F0857C | #B4261E | Form errors only |

All text pairs pass WCAG AA. Tokens live in `src/app/globals.css`; never hard-code a hex in a component.

- Links are `accent` with a 1px underline offset 3px; the underline thickens on hover.
- Screenshots get a 1px `border` and the 6px radius. Each has a dark and a light capture that swaps with the theme.
- Selection uses `accent`.
- Blue is a touch, never a fill: the logo tile is the only blue shape on the page.

## Space, grid, radius

- 4px base. Use Tailwind's default steps.
- Desktop (≥1024px): 12 columns, max width 1200px, 48px gutter. Left column (5) is sticky and holds the intro; right column (7) scrolls.
- Below 1024px everything stacks: intro, about, work, experience, contact.
- Sections are separated by space (96px), not boxes or rules.
- One radius: `rounded-ui` (6px). Only the logo tile has its own shape.
- No elevation. Separate with a border or `surface`.

## Components

| Component | File | Notes |
| --- | --- | --- |
| `LogoMark` | `components/logo-mark.tsx` | The signature moment (see Motion) |
| `SectionNav` | `components/section-nav.tsx` | Active section gets a 28px rule before the label |
| `CommandMenu` | `components/command-menu.tsx` | ⌘K / Ctrl+K / `/`. Navigate and Actions groups |
| `ThemeToggle` | `components/theme-toggle.tsx` | Text button, mono |
| `CopyEmail` | `components/copy-email.tsx` | Copies, shows “Copied”, announces via `aria-live` |
| `Shot` | `app/page.tsx` | Theme-aware screenshot pair |
| shadcn `Dialog`, `Command` | `components/ui/` | Re-themed: no shadow, 1px border, backdrop dim |

Prefer prose to cards. A project is told as a title, a summary, a meta line, a screenshot and a few paragraphs with bold lead-ins, not a grid of stat boxes. Icons (Lucide, 16px) only where a word won't fit.

## Motion

| Token | Value | Used for |
| --- | --- | --- |
| `--ease` | cubic-bezier(0.2, 0, 0, 1) | Everything |
| fast | 120ms | Hover, underline, focus |
| base | 200ms | Palette open, nav marker |
| slow | 700ms | The logo moment only |

**The signature moment.** On the first visit of a session the B cuts out of the logo tile over 700ms (`logo-cut` keyframes, clip-path). It replays on hover, never blocks content, and is skipped under `prefers-reduced-motion`.

Not allowed: fade-up or slide-in on scroll, parallax, smooth-scroll libraries, loaders, custom cursors, anything that loops on the home page.

## Never do

1. No Inter, Roboto, Geist or system-ui as a visible face.
2. No purple, indigo or violet. No gradients, glows, blurs or glassmorphism.
3. No accent beyond `accent` and the logo tile. No blue buttons, bands, cards or backgrounds.
4. No radius other than 6px on UI, and no pill shapes.
5. No shadows.
6. No centered hero with a single CTA, and no row of three icon cards.
7. No badge or pill above a heading, no wide-tracked uppercase eyebrows, no numbered section labels (“01 / work”).
8. No colored left-border cards and no per-technology colored tags.
9. No pulsing “live”, “new” or “available for work” dots.
10. No stock photos, AI-generated images, abstract 3D shapes or laptop illustrations.
11. No fade-up-on-scroll, parallax, custom cursor, loader or intro screen.
12. No filler copy: “passionate”, “seamless”, “crafting digital experiences”, “cutting-edge”, “leveraging”. Write what was built and what changed.
13. No skills cloud or progress bars for languages.
14. No chatbot popup. Any Q&A lives inside the command palette, opened by choice.
15. No contact form, newsletter modal or cookie banner.
16. No new dependency for something CSS can do.

## Quality gates

| Gate | Bar |
| --- | --- |
| Lint and types | `npm run lint` and `npx tsc --noEmit` clean |
| Build | `npm run build` produces `out/` with no errors |
| Lighthouse (mobile) | 95+ in all four categories |
| Accessibility | WCAG 2.2 AA, zero axe violations, full keyboard path |
| Weight | Home page under 150KB of JS |
| Design spec | Nothing from Never do; self-review against this file |
