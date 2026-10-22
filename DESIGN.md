# DESIGN.md

The design spec for samuelburke.dev. Every value here is a decision, so follow it instead of your defaults. If a change breaks a rule in **Never do**, Samuel has to sign off on it first.

**The look comes from burke.systems.** The portfolio and the studio should read as one brand. If this file and the burke.systems brand guide disagree on a visual detail, the brand guide wins. The brand guide is `.agents/skills/burke-brand/SKILL.md` in `samuel-burke/burke-systems-website`.

**The structure comes from portfolio research** ([what strong portfolios share](https://claude.ai/artifact/7q7om29C3RcV1aCr37F4Wn)). It follows five rules:

- Say who and what in the first screen.
- Feature one flagship project with real depth and real numbers.
- Show proof (screenshots, metrics, code links) rather than adjectives.
- Keep experience short.
- Make contact a single, easy action.

## Principles

1. **Proof over polish.** Use real screenshots, real numbers and real links.
2. **Plain voice.** Write in the first person and be direct and practical. Say what was built and what changed.
3. **Blue is rare.** Most of the page is Night, White and Paper, so blue stands out where it appears.

## Color

| Token | Hex | Use |
| --- | --- | --- |
| `burke-blue` / `primary` | #2B50E8 | Buttons, links, eyebrows, the contact band. Hover #1C3BB8 |
| `night` | #0F172A | Text on light; header, hero, footer and dark cards |
| `night-raised` / `night-line` | #1A2440 / #2A3658 | Cards on Night and their borders |
| `slate` (`muted-foreground`) | #475569 | Body copy on light |
| `paper` | #F4F6FA | Alternate section background, chips, stat tiles |
| `mist` | #DCE3F7 | Hover fills, selection |
| `cloud` | #C7D0E0 | Secondary text on Night |
| `periwinkle` | #8FA6F5 | Eyebrows and accents on Night |

- The site has a single light theme with Night bands and no theme toggle.
- Sections alternate as follows: Night hero, Paper work, White experience, Paper about, blue contact, Night footer.
- All tokens live in `src/app/globals.css`. Never hard-code a hex in a component.

## Type

- Headings use **Montserrat** 700/800 (`font-heading`).
  - h1: 36 / 48 / 60px, line height 1.05, weight 800.
  - h2: 30 / 36 / 40px, line height 1.1, weight 800.
- Body and UI use **Inter** (`font-sans`).
  - Body text is 16–17px with a line height of about 1.7.
  - Lead text is 18–19px.
- Eyebrows are 13px, semibold, uppercase, with `tracking-[0.18em]`. They are blue on light backgrounds and periwinkle on Night.
- Use real typography: curly quotes, en dashes in ranges, and `tabular-nums` on numbers.

## Layout and shape

- The content column is at most 1200px wide, with 16px gutters (24px from `sm`).
- Section padding is 80px (96px from `md`).
- Radii:
  - 8px (`rounded-ui`) for buttons.
  - 14px for cards.
  - 10px for rows and tiles inside cards.
  - 16px (`rounded-2xl`) for the hero card.
- Cards on Paper are White and have no border or shadow. Cards on Night use `night-raised` with a `night-line` border.
- Lists of points use a 3px blue top rule (the burke.systems "process" pattern).

## Page structure

1. **Header (sticky, Night).**
   - Lockup: the mark, "SAMUEL BURKE", and "FULL-STACK ENGINEER" underneath.
   - Nav links, a ⌘K button, and a blue "Get in touch" button.
2. **Hero (Night).**
   - Eyebrow, h1, a one-paragraph pitch, the primary and outline buttons, and social links.
   - On the right, a ShiftView proof card. It echoes the burke.systems "busywork" card and uses real numbers.
3. **Work (Paper).** The ShiftView flagship:
   - A large screenshot.
   - A summary with stack chips and Visit / Code links.
   - Four stat tiles.
   - Four "how it's built" points.
   - Phone screenshots on a Night card.
   - This site as a smaller card.
4. **Experience (White).** Three columns with blue top rules: Burke Systems, the ZenGRC internship and NC State.
5. **About (Paper).** Two short paragraphs, including one human detail.
6. **Contact (blue band).** One headline, a copy-email button, LinkedIn and GitHub.
7. **Footer (Night).** The mark, a copyright line, nav links and the source link.

## Components

| Component | File |
| --- | --- |
| `Mark` (the Burke B; never redraw it) | `components/mark.tsx`, `components/mark-path.ts` |
| `buttonClass` (primary, outline-dark, white) | `components/button.ts` |
| `CommandMenu` (⌘K, Ctrl+K or `/`) | `components/command-menu.tsx` |
| `CopyEmail` | `components/copy-email.tsx` |
| shadcn `Dialog` and `Command` | `components/ui/` |

Icons come from Lucide at 16px. Use them only for arrows and checks.

## Motion

- Hover changes color only.
- The command palette opens over 200ms.
- Smooth scrolling is turned off under `prefers-reduced-motion`.

## Never do

1. No purple, indigo or violet. No gradients, glows or glassmorphism.
2. No blue as a large fill, except for the contact band.
3. No fonts besides Montserrat and Inter.
4. No fade-up-on-scroll, parallax, custom cursor, loader or intro screen.
5. No stock photos, AI-generated images or abstract 3D shapes.
6. No filler copy: “passionate”, “seamless”, “crafting digital experiences”, “cutting-edge”, “leveraging”.
7. No skills cloud or progress bars for languages.
8. No per-technology colored tags. Chips are Paper with Night text.
9. No chatbot popup. Any Q&A goes inside the command palette.
10. No contact form, newsletter modal or cookie banner.
11. No new dependency for something CSS can do.

## Quality gates

| Gate | Bar |
| --- | --- |
| Lint and types | `npm run lint` and `npx tsc --noEmit` are clean |
| Build | `npm run build` writes `out/` with no errors |
| Lighthouse (mobile) | 95 or higher in all four categories |
| Accessibility | WCAG 2.2 AA, zero axe violations, a full keyboard path |
| Layout | No horizontal scroll at 375px; checked at 375px and 1440px |
