import type { Metadata } from "next";
import { LogoMark } from "@/components/logo-mark";
import { Shot } from "@/components/shot";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `ShiftView case study · ${site.name}`,
  description:
    "How Samuel Burke built ShiftView: a multi-tenant scheduling and time-clock app with a deterministic auto-scheduler and two layers of access control.",
};

// This page lives at /work/shiftview/, two folders below the site root.
const base = "../../";

const toc = [
  { id: "what", label: "What it does" },
  { id: "built", label: "How it’s built" },
  { id: "security", label: "Auth and security" },
  { id: "cicd", label: "CI/CD and testing" },
  { id: "decisions", label: "Key decisions" },
  { id: "change", label: "What I’d change" },
];

const features = [
  {
    title: "Scheduling",
    items: [
      "Week and month views, shift templates and copy-week",
      "A Draft mode to plan the next week privately, then publish it in one step",
      "Auto-schedule: drafts the week from coverage targets, availability, time off and hour limits, and explains any gap",
      "Availability and time-off conflicts checked on every edit",
    ],
  },
  {
    title: "Changes during the day",
    items: [
      "Call-outs in one tap, with managers notified instantly",
      "Shift swaps in two steps: the coworker accepts, then a manager approves",
      "Open shifts that eligible staff can claim",
      "Time-off requests and punch corrections with approval",
    ],
  },
  {
    title: "Time clock and coverage",
    items: [
      "Clock in and out, with an optional geofence checked on the server",
      "A live timeline of target, scheduled and clocked-in headcount",
      "Late clock-in and low-coverage alerts",
      "Time cards, payroll-ready CSV exports and labor-cost reports",
    ],
  },
  {
    title: "Team and platform",
    items: [
      "Direct messages, encrypted at rest, and announcements",
      "Web push notifications with per-person preferences",
      "One account across several stores",
      "Installable on phones, tablets and desktops, with no app store",
    ],
  },
];

const ci = [
  { job: "static-checks", what: "ESLint and a strict TypeScript typecheck" },
  { job: "unit", what: "Vitest and Testing Library: route handlers against mocked Supabase clients, components, the scheduling engine" },
  { job: "unit-timezones", what: "The same suite again at UTC+14 and in a half-hour, daylight-saving zone, because date bugs hide at midnight" },
  { job: "security", what: "19 SQL suites on a fresh Postgres 17 for row-level security, cross-store isolation, function privileges and punch integrity, plus the security unit tests" },
  { job: "e2e", what: "Playwright on a production build, across phone, tablet, tablet landscape, desktop and a far-timezone phone" },
];

const stack = [
  { layer: "Front end", tech: "Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4" },
  { layer: "Data and auth", tech: "Supabase: Postgres with row-level security, email sign-in codes, anonymous demo sessions" },
  { layer: "Live updates", tech: "Supabase Realtime for schedules and messages; Web Push (VAPID) for notifications" },
  { layer: "Scheduling engine", tech: "Pure TypeScript in lib/scheduler: greedy construction, then simulated annealing" },
  { layer: "Email and bots", tech: "Resend for alert email; Cloudflare Turnstile on sign-up, the demo and the contact form" },
  { layer: "Testing and CI", tech: "Vitest, Testing Library, Playwright, SQL suites; GitHub Actions CI; Vercel previews, production and cron" },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`${id}-h`} id={id} className="scroll-mt-8 pt-20 first:pt-0">
      <h2 id={`${id}-h`} className="mb-5 font-display text-[1.75rem] font-bold leading-[1.15] tracking-[-0.01em]">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Decision({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4">
      <h3 className="mb-2 text-[17px] font-semibold">{title}</h3>
      <div className="space-y-3 text-muted-foreground">{children}</div>
    </div>
  );
}

function ArchitectureDiagram() {
  const box = "fill-surface stroke-border";
  const label = "fill-foreground font-mono text-[13px]";
  const note = "fill-muted-foreground font-mono text-[11px]";
  const line = "stroke-muted-foreground";
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-ui border border-border p-4">
        <svg viewBox="0 0 670 330" className="min-w-[580px]" role="img" aria-labelledby="arch-title arch-desc">
          <title id="arch-title">ShiftView architecture</title>
          <desc id="arch-desc">
            The browser sends every write through Next.js route handlers, which check auth, validate input and write an
            audit log before reaching Postgres, where row-level security checks the same rules again. Supabase Realtime
            pushes changes back to the browser. Route handlers also send web push notifications and email.
          </desc>
          <defs>
            <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0 0L8 4L0 8z" className="fill-muted-foreground" />
            </marker>
          </defs>

          <rect x="10" y="20" width="200" height="70" rx="6" className={box} />
          <text x="24" y="48" className={label}>Browser</text>
          <text x="24" y="68" className={note}>React 19 · installable PWA</text>

          <rect x="260" y="20" width="200" height="70" rx="6" className={box} />
          <text x="274" y="48" className={label}>Route handlers</text>
          <text x="274" y="68" className={note}>auth · validate · audit log</text>

          <rect x="510" y="20" width="150" height="70" rx="6" className={box} />
          <text x="524" y="48" className={label}>Postgres</text>
          <text x="524" y="68" className={note}>RLS on every table</text>

          <rect x="260" y="140" width="200" height="56" rx="6" className={box} />
          <text x="274" y="166" className={label}>Auto-schedule engine</text>
          <text x="274" y="184" className={note}>pure TypeScript, no I/O</text>

          <rect x="510" y="140" width="150" height="56" rx="6" className={box} />
          <text x="524" y="166" className={label}>Realtime</text>
          <text x="524" y="184" className={note}>schedules, messages</text>

          <rect x="260" y="254" width="200" height="56" rx="6" className={box} />
          <text x="274" y="280" className={label}>Web Push · Resend</text>
          <text x="274" y="298" className={note}>notifications, email</text>

          <line x1="210" y1="55" x2="256" y2="55" className={line} markerEnd="url(#arrow)" />
          <text x="214" y="47" className={note}>writes</text>
          <line x1="460" y1="55" x2="506" y2="55" className={line} markerEnd="url(#arrow)" />
          <line x1="360" y1="90" x2="360" y2="136" className={line} markerEnd="url(#arrow)" />
          <line x1="585" y1="90" x2="585" y2="136" className={line} markerEnd="url(#arrow)" />
          <path d="M585 196 V226 H150 V94" fill="none" className={line} markerEnd="url(#arrow)" />
          <text x="160" y="218" className={note}>live updates</text>
          <path d="M260 282 H60 V94" fill="none" className={line} markerEnd="url(#arrow)" />
          <text x="70" y="274" className={note}>push</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-[15px] text-muted-foreground">
        Every write goes through a route handler. Row-level security in Postgres enforces the same rules a second time.
      </figcaption>
    </figure>
  );
}

export default function ShiftViewCaseStudy() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-12">
      <header className="flex items-center justify-between gap-4 py-6">
        <div className="flex items-center gap-5">
          <a href={base} aria-label="Samuel Burke, home" className="no-underline">
            <LogoMark className="size-8" />
          </a>
          <a href={`${base}#work`} className="text-[15px]">
            ← All work
          </a>
        </div>
        <ThemeToggle />
      </header>

      <div className="pt-10 lg:pt-16">
        <h1 className="mb-4 font-display text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          ShiftView
        </h1>
        <p className="mb-5 max-w-[60ch] text-xl text-balance">
          Scheduling, a time clock and live coverage for retail and fulfillment teams. I designed and built it alone, from
          the data model to the installable app.
        </p>
        <p className="font-mono text-[13px] text-muted-foreground">
          Solo · Product, design and engineering · Public beta · Next.js 16, TypeScript, Supabase ·{" "}
          <a href="https://shiftview.app">Live ↗</a> · <a href="https://github.com/samuel-burke/shiftview">Code ↗</a>
        </p>
      </div>

      <figure className="mt-10">
        <Shot
          base={base}
          name="hero"
          alt="ShiftView home page: an employee clocks in ten minutes late and the store manager’s dashboard shows the Late Clock-In alert."
          width={1600}
          height={1108}
        />
      </figure>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 lg:gap-16">
        <nav aria-label="On this page" className="mb-12 lg:col-span-3 lg:mb-0">
          <ul className="grid gap-2 text-[15px] lg:sticky lg:top-8">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-muted-foreground no-underline hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="min-w-0 max-w-[65ch] lg:col-span-9">
          <Section id="what" title="What it does">
            <p>
              Before I wrote software full time, I ran a high-volume fulfillment team. The schedule was never the hard
              part. The day was: someone calls out, a truck comes early, two people swap a shift in a group text, and by
              mid-morning nobody is sure who is on the floor. ShiftView handles that whole loop in one app, for managers
              and for the people on the floor.
            </p>
            <div className="grid gap-x-8 gap-y-6 pt-4 sm:grid-cols-2">
              {features.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-2 text-[17px] font-semibold">{group.title}</h3>
                  <ul className="list-disc space-y-1.5 pl-5 text-[15px] text-muted-foreground marker:text-border">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="pt-4">
              Anyone can try it without signing up. The demo button signs you in to a seeded store as a manager, with
              full read and write access, and a nightly job resets it.
            </p>
            <figure className="pt-4">
              <Shot
                base={base}
                name="auto-schedule"
                alt="ShiftView week view after auto-scheduling 46 shifts, showing full coverage, hours against the budget and zero overtime."
                width={1600}
                height={1001}
              />
              <figcaption className="mt-3 text-[15px] text-muted-foreground">
                Draft mode after an auto-schedule run: the summary card, the week grid and each gap it could or couldn’t
                fill.
              </figcaption>
            </figure>
          </Section>

          <Section id="built" title="How it’s built">
            <p>
              A Next.js app on Supabase, with 65 API route handlers as the only way to change data. The scheduling engine
              is a separate pure function with no database or network access, so it can be tested and benchmarked on its
              own.
            </p>
            <ArchitectureDiagram />
            <dl className="divide-y divide-border border-y border-border">
              {stack.map((row) => (
                <div key={row.layer} className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt className="font-mono text-[13px] leading-[1.9] text-muted-foreground">{row.layer}</dt>
                  <dd className="text-[15px]">{row.tech}</dd>
                </div>
              ))}
            </dl>
            <figure className="pt-6">
              <Shot
                base={base}
                name="devices"
                alt="ShiftView on a laptop, a tablet and a phone, showing the same store’s schedule."
                width={1600}
                height={835}
              />
              <figcaption className="mt-3 text-[15px] text-muted-foreground">
                One codebase, installed as a web app on every device a store has.
              </figcaption>
            </figure>
          </Section>

          <Section id="security" title="Auth and security">
            <p>
              Security is layered so that no single check is the only thing standing between a user and another
              store’s data.
            </p>
            <ul className="list-disc space-y-3 pl-5 marker:text-border">
              <li>
                <strong className="font-semibold">Passwordless sign-in.</strong> People sign in with one-time email
                codes, so there are no passwords to store or leak. Invites link an account to an employee record on
                first sign-in.
              </li>
              <li>
                <strong className="font-semibold">Sessions verified locally.</strong> Pages check the session JWT with{" "}
                <code className="font-mono text-[15px]">getClaims()</code> , which can verify it locally with
                asymmetric signing keys instead of a round trip to the auth server. A Next.js proxy refreshes sessions for pages, while API routes
                authenticate themselves and answer 401 or 403 instead of redirecting.
              </li>
              <li>
                <strong className="font-semibold">One write path, checked twice.</strong> Route handlers are the only
                way to change data. Each checks the session and role, validates input and writes an audit log entry.
                Row-level security in Postgres enforces the same tenant and role rules again, so a request that skips
                the API can’t do more than the API allows.
              </li>
              <li>
                <strong className="font-semibold">Tenant isolation in the schema.</strong> The organization comes from
                the caller’s own memberships on the server, never from the request. Composite foreign keys make a
                cross-store reference a constraint violation.
              </li>
              <li>
                <strong className="font-semibold">Least privilege in the database.</strong> Privileged functions check
                the caller themselves or can only run with the service role. Column grants hide pay rates from the
                API, and managers read them through one checked function.
              </li>
              <li>
                <strong className="font-semibold">Tamper-resistant time clock.</strong> Punches are stamped with the
                database clock, and the geofence is enforced on the server and in the database, not only in the
                browser.
              </li>
              <li>
                <strong className="font-semibold">Data and abuse protection.</strong> Messages are encrypted at rest
                with AES-256-GCM. Cloudflare Turnstile guards sign-up, the demo and the contact form, and responses
                carry standard security headers.
              </li>
            </ul>
          </Section>

          <Section id="cicd" title="CI/CD and testing">
            <p>
              Every push to <code className="font-mono text-[15px]">main</code> or{" "}
              <code className="font-mono text-[15px]">dev</code> and every pull request runs five GitHub Actions jobs
              in parallel:
            </p>
            <dl className="divide-y divide-border border-y border-border">
              {ci.map((row) => (
                <div key={row.job} className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt className="font-mono text-[13px] leading-[1.9] text-muted-foreground">{row.job}</dt>
                  <dd className="text-[15px]">{row.what}</dd>
                </div>
              ))}
            </dl>
            <p>
              The Playwright specs cover the parts most likely to break quietly: auto-scheduling, the week planner,
              the demo, color contrast, layout shift, and a store and phone on opposite sides of the date line. A failed
              run uploads the Playwright report so the failure can be replayed.
            </p>
            <p>
              Vercel deploys every branch to a preview URL and <code className="font-mono text-[15px]">main</code> to
              production. A production build fails if any required secret is missing or malformed, so a bad config keeps
              the last good version live. Two cron jobs send shift reminders and reset the demo store each night.
            </p>
          </Section>

          <Section id="decisions" title="Key decisions">
            <div className="space-y-8">
              <Decision title="An optimizer, not a chatbot, for auto-scheduling">
                <p>
                  A language model can’t guarantee hard rules. It might schedule someone on approved time off, and it
                  can’t prove a gap was unavoidable. Rostering is a constraint problem, so I wrote a constraint optimizer.
                  It builds the week greedily, neediest 15-minute slot first, then improves it with simulated annealing
                  against a weighted penalty score.
                </p>
                <p>
                  Hard rules like availability, rest between shifts and the overtime line are never broken. The random
                  choices come from a seeded generator stored on each run, so the same input always gives the same
                  schedule. Every gap it can’t fill comes with the reason and a one-tap fix. The engine has a narrow
                  interface, so an exact solver could replace it later without touching the API or the UI.
                </p>
              </Decision>

              <Decision title="Multi-tenant without downtime">
                <p>
                  ShiftView started as a single-store app. I compared a shared schema, a schema per tenant and a database
                  per tenant. I chose a shared schema with an <code className="font-mono text-[15px]">org_id</code> on
                  every row: it works with Supabase’s auth and realtime out of the box, and row-level security still gives
                  isolation the database enforces.
                </p>
                <p>
                  Composite foreign keys make a cross-organization reference a constraint violation, so even a buggy
                  admin write can’t point a shift in one store at an employee in another. The migration ran as expand,
                  backfill, enforce, contract, so the old code kept working until the new code was live.
                </p>
              </Decision>

              <Decision title="Row-level security that stays fast">
                <p>
                  The first policies called a membership function once per row. I rewrote them to compare each row with
                  the caller’s organizations, looked up once per query. On 50,000 shifts that was 12–35× faster.
                </p>
              </Decision>

              <Decision title="Times as minutes, and “off” derived, not stored">
                <p>
                  A shift is stored as minutes since midnight (480 is 8:00 AM) and belongs to the day it starts, so an
                  overnight shift just runs past 1440. Dates are plain strings in the store’s timezone, so a phone’s
                  timezone never decides what “today” is.
                </p>
                <p>
                  Nobody has an “off” row. A person is off when they have no shift that day, which leaves one source of
                  truth to keep in sync instead of two.
                </p>
              </Decision>
            </div>
          </Section>

          <Section id="change" title="What I’d change">
            <p>
              <strong className="font-semibold">Track migrations from day one.</strong> I apply migrations in the SQL
              editor, so Supabase keeps no history and two files share a version number. A checked-in baseline and a
              schema fingerprint check keep production honest, but a migration tool from the start would have been
              simpler.
            </p>
            <p>
              <strong className="font-semibold">Faster first visits on slow phones.</strong> A performance pass cut the
              JavaScript and the waterfalls, but a cold load on a throttled phone is still slower than I want. The next
              steps are splitting the shared stylesheet and trimming the JavaScript every page loads.
            </p>
            <p>
              <strong className="font-semibold">An exact solver, if stores need it.</strong> The heuristic fills every week I’ve
              benchmarked, but it can’t prove a schedule is optimal. CP-SAT behind the same
              interface would.
            </p>
          </Section>

          <div className="mt-20 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 text-[15px]">
            <a href="https://shiftview.app">Try the live demo ↗</a>
            <a href="https://github.com/samuel-burke/shiftview">Read the code ↗</a>
            <a href={`${base}#contact`}>Get in touch</a>
          </div>
        </article>
      </div>
    </div>
  );
}
