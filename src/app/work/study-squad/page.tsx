import type { Metadata } from "next";
import { LogoMark } from "@/components/logo-mark";
import { Shot } from "@/components/shot";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Study Squad case study · ${site.name}`,
  description:
    "How Samuel Burke built Study Squad: a group study timer for Root communities with a server-owned timer that can't drift and one engine shared by the server and a browser demo.",
};

// This page lives at /work/study-squad/, two folders below the site root.
const base = "../../";
const code = "https://github.com/samuel-burke/study-squad-root-app";

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
    title: "Focusing together",
    items: [
      "A shared room timer, 25/5 or 50/10, in rounds of four with a long break",
      "Solo timers from 5 to 180 minutes that still show on the board",
      "A live board of who’s focusing, on what, and how long is left",
      "Private goals that show only as “Focusing”",
    ],
  },
  {
    title: "The break moment",
    items: [
      "Every screen flips to break at the same moment",
      "XP earned, the streak, and damage dealt to the weekly boss",
      "“Did you finish your goal?” with a one-tap answer",
      "“Keep going?” at the end of a cycle to roll straight into the next",
    ],
  },
  {
    title: "Game layer",
    items: [
      "XP and levels with a daily cap, and a combo for finishing rounds together",
      "A weekly community boss whose strength fits its name",
      "Weekly quests, a weekly leaderboard members can hide from, and badges",
      "Streaks with one free freeze a week and no public “you lost it” posts",
    ],
  },
  {
    title: "Community",
    items: [
      "Daily recap, busy-room and milestone posts to a channel",
      "Admin settings through Root’s own settings screen",
      "Member profiles that never show goals or focus history",
      "Delete my data, in the app, with no request to anyone",
    ],
  },
];

const stack = [
  { layer: "Client", tech: "React 18, TypeScript (strict), Vite; DM Sans and Space Grotesk bundled, no third-party requests" },
  { layer: "Contract", tech: "Protobuf service compiled by the Root SDK, with a mapping layer that is round-trip tested" },
  { layer: "Domain", tech: "core: pure TypeScript timer math, XP, streaks, boss, quests, badges and the StudyRoomEngine" },
  { layer: "Server", tech: "Root app server on Node 22: request handlers, broadcasts, channel posts, a scheduled recap job" },
  { layer: "Data", tech: "SQLite through knex with bound parameters and migrations; an in-memory store for the demo" },
  { layer: "Testing and CI", tech: "Vitest, Testing Library, Playwright; GitHub Actions, CodeQL, dependency review, Dependabot" },
];

const ci = [
  { job: "verify", what: "Protobuf code generation, Prettier, ESLint, a strict typecheck across every workspace, Vitest with coverage, and a full build" },
  { job: "e2e", what: "Playwright against the demo build on a desktop and a phone profile, failing on any console error" },
  { job: "codeql", what: "GitHub’s static analysis for security issues, also run weekly" },
  { job: "dependency-review", what: "Pull requests only: blocks one that adds a dependency with a known high-severity advisory" },
  { job: "package", what: "Pushes to main only, after verify and e2e pass: builds the Root package and keeps it as an artifact" },
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
      {/* Focusable so keyboard users can scroll the diagram sideways on narrow screens. */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Architecture diagram"
        className="overflow-x-auto rounded-ui border border-border p-4"
      >
        <svg viewBox="0 0 670 330" className="min-w-[580px]" role="img" aria-labelledby="arch-title arch-desc">
          <title id="arch-title">Study Squad architecture</title>
          <desc id="arch-desc">
            The client calls the Root app server over a Protobuf contract. Request handlers check identity and rate
            limits, then call the StudyRoomEngine, a pure TypeScript core that reads and writes SQLite. A scheduled recap
            job also calls the engine. After each change commits, the engine broadcasts room state back to every client
            and posts to a Root channel.
          </desc>
          <defs>
            <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0 0L8 4L0 8z" className="fill-muted-foreground" />
            </marker>
          </defs>

          <rect x="10" y="20" width="200" height="70" rx="6" className={box} />
          <text x="24" y="48" className={label}>Client</text>
          <text x="24" y="68" className={note}>React · inside Root</text>

          <rect x="260" y="20" width="200" height="70" rx="6" className={box} />
          <text x="274" y="48" className={label}>Request handlers</text>
          <text x="274" y="68" className={note}>identity · rate limits</text>

          <rect x="510" y="20" width="150" height="70" rx="6" className={box} />
          <text x="524" y="48" className={label}>SQLite</text>
          <text x="524" y="68" className={note}>knex · migrations</text>

          <rect x="260" y="140" width="200" height="56" rx="6" className={box} />
          <text x="274" y="166" className={label}>StudyRoomEngine</text>
          <text x="274" y="184" className={note}>pure TypeScript, no I/O</text>

          <rect x="510" y="140" width="150" height="56" rx="6" className={box} />
          <text x="524" y="166" className={label}>Recap job</text>
          <text x="524" y="184" className={note}>Root scheduled job</text>

          <rect x="260" y="254" width="200" height="56" rx="6" className={box} />
          <text x="274" y="280" className={label}>Broadcasts · posts</text>
          <text x="274" y="298" className={note}>room state, channel</text>

          <line x1="210" y1="55" x2="256" y2="55" className={line} markerEnd="url(#arrow)" />
          <text x="214" y="47" className={note}>rpc</text>
          <line x1="360" y1="90" x2="360" y2="136" className={line} markerEnd="url(#arrow)" />
          <path d="M460 152 H485 V60 H506" fill="none" className={line} markerEnd="url(#arrow)" />
          <line x1="510" y1="184" x2="464" y2="184" className={line} markerEnd="url(#arrow)" />
          <line x1="360" y1="196" x2="360" y2="250" className={line} markerEnd="url(#arrow)" />
          <path d="M260 282 H110 V94" fill="none" className={line} markerEnd="url(#arrow)" />
          <text x="120" y="274" className={note}>push</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-[15px] text-muted-foreground">
        The engine sits behind interfaces. In the browser demo, the same engine runs on an in-memory store with
        simulated members.
      </figcaption>
    </figure>
  );
}

export default function StudySquadCaseStudy() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-12">
      <header className="flex items-center justify-between gap-4 border-b border-border py-5">
        <div className="flex items-center gap-5">
          <a href={base} aria-label="Samuel Burke, home" className="no-underline">
            <LogoMark className="h-8 w-auto" />
          </a>
          <a href={`${base}#work`} className="text-[15px]">
            ← All work
          </a>
        </div>
        <ThemeToggle />
      </header>

      <div className="pt-10 lg:pt-16">
        <h1 className="mb-4 font-display text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          Study Squad
        </h1>
        <p className="mb-5 max-w-[60ch] text-xl text-balance">
          A group study timer for Root communities, like a quiet library where you can see everyone else working. I
          designed and built it alone, from the timer engine to the UI.
        </p>
        <p className="font-mono text-[13px] text-muted-foreground">
          Solo · Product, design and engineering · In development · TypeScript, React, Root SDK, SQLite ·{" "}
          <a href={code}>Code ↗</a>
        </p>
      </div>

      <figure className="mt-10">
        <Shot
          base={base}
          project="study-squad"
          themed={false}
          name="room-desktop"
          alt="Study Squad focus room: a shared 25-minute timer, eight members’ cards with their goals and streaks, the weekly boss and a 1.5x combo."
          width={1280}
          height={900}
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
              Study Squad is a pomodoro timer you share with your community. Join the room’s timer, put a goal on the
              board, and when the round ends every screen celebrates and flips to break together. A light game layer
              rewards showing up with other people, without making anyone feel bad for a day off.
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
              Anyone can try it without a Root account. The demo mode runs the real engine in the browser with a few
              simulated members, and URL settings shorten a round to seconds so the break moment shows up quickly.
            </p>
          </Section>

          <Section id="built" title="How it’s built">
            <p>
              Five npm workspaces, laid out on Root’s official app template. All the rules live in{" "}
              <code className="font-mono text-[15px]">core</code>, which has no I/O, so they can be tested without Root.
              A Protobuf contract sits between the client and the server, and one mapping layer converts it to the
              engine’s types and back.
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
              <div className="grid max-w-[520px] grid-cols-2 gap-4">
                <Shot
                  base={base}
                  project="study-squad"
                  themed={false}
                  name="room-mobile"
                  alt="Study Squad on a phone: the room timer at 14:30 and the list of who’s focusing now."
                  width={390}
                  height={844}
                />
                <Shot
                  base={base}
                  project="study-squad"
                  themed={false}
                  name="start-session-mobile"
                  alt="The start session sheet on a phone: a goal, a private goals switch, and a choice of room or solo timer."
                  width={390}
                  height={844}
                />
              </div>
              <figcaption className="mt-3 text-[15px] text-muted-foreground">
                The same client on a phone. Playwright checks both layouts on every change.
              </figcaption>
            </figure>
          </Section>

          <Section id="security" title="Auth and security">
            <p>
              Root handles sign-in, so the work here is making sure nobody can act as someone else, see what they
              shouldn’t, or abuse the room.
            </p>
            <ul className="list-disc space-y-3 pl-5 marker:text-border">
              <li>
                <strong className="font-semibold">Identity from the connection only.</strong> The server takes the user
                id from the authenticated Root connection. No request carries a user id, so there’s none to forge.
              </li>
              <li>
                <strong className="font-semibold">Ownership on every goal.</strong> Each goal operation checks the
                owner, and “missing” and “not yours” return the same error, so ids can’t be probed.
              </li>
              <li>
                <strong className="font-semibold">Private data stays private.</strong> Room state is built with private
                goal text already removed. Personal data such as XP and goals is sent only to the member’s own devices.
              </li>
              <li>
                <strong className="font-semibold">Untrusted input.</strong> Goal text is length-limited and stripped of
                control, zero-width and bidi-override characters. Ids, numbers and settings are type- and range-checked
                on the server, and all SQL uses bound parameters.
              </li>
              <li>
                <strong className="font-semibold">Abuse and leaks.</strong> Every request is rate-limited per user, and
                busy-room posts have a cool-down. Names are stripped of mention and markdown characters before they’re
                posted. Unexpected errors return a generic message, and logs hold ids and counts, never goal text.
              </li>
              <li>
                <strong className="font-semibold">Least privilege.</strong> The app asks Root only for permission to
                view and post in a channel. Admin settings use Root’s own settings screen, so there’s no admin UI of
                mine to secure.
              </li>
            </ul>
          </Section>

          <Section id="cicd" title="CI/CD and testing">
            <p>
              Every push to <code className="font-mono text-[15px]">main</code> or{" "}
              <code className="font-mono text-[15px]">dev</code> and every pull request runs these GitHub Actions jobs:
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
              The tests follow the layers. <code className="font-mono text-[15px]">core</code> has a unit test for every
              rule and engine scenarios on a fake clock: late joiners, downtime recovery and rollback after a failure.
              The contract is round-tripped through real Protobuf bytes. One storage contract suite runs against both the
              in-memory store and SQLite, so the demo can’t quietly drift from the real database. An integration test
              fans broadcasts out to several clients through the wire format and checks they all see the same timer
              and the same break.
            </p>
          </Section>

          <Section id="decisions" title="Key decisions">
            <div className="space-y-8">
              <Decision title="The server owns the timer, and stores almost nothing">
                <p>
                  The room timer is one row: when the cycle started and which preset it uses. A cycle is laid out the
                  same way every time, so the phase at any instant is a pure function of those two values. Clients
                  measure their clock offset from request round trips, keeping the fastest sample, and compute the
                  countdown themselves.
                </p>
                <p>
                  A dropped push can’t make two screens disagree, a phone set to the wrong time still shows the right
                  countdown, and after a restart the server settles every phase that ended while it was down. An admin’s
                  preset change waits for the next cycle, so nobody’s round changes length underneath them.
                </p>
              </Decision>

              <Decision title="One engine behind ports">
                <p>
                  Every use case lives in one engine that depends only on interfaces: store, clock, scheduler,
                  notifier, announcer and logger. The server plugs in SQLite and Root’s APIs; the demo plugs in memory
                  and local events. That’s why the rules are tested without Root and the demo behaves like the real app.
                </p>
                <p>
                  Each operation runs through a serial queue in one transaction. It settles whatever came due, does its
                  work, and sends notifications only after the commit, so a failure leaves no partial state and tells
                  nobody anything that didn’t happen.
                </p>
              </Decision>

              <Decision title="A check-in that never interrupts focus">
                <p>
                  The first version asked “Still there?” at a random point in a round. It interrupted the people who were
                  studying, and couldn’t reach anyone with their screen off, so it mostly punished the wrong people. I
                  replaced it with “Keep going?” during the cycle’s final long break: tap to roll into the next cycle,
                  or be released when it ends with everything you earned. A forgotten timer stops after one cycle, and
                  the daily XP cap bounds what it can earn.
                </p>
              </Decision>

              <Decision title="Rewards that can’t be farmed">
                <p>
                  Focus XP pays for time, not task count, and goal XP pays once per goal, so unchecking and rechecking
                  earns nothing. The combo counts people who finish the round, not people who joined in its last
                  seconds. The leaderboard ranks focus minutes, and the podium badges only count once three members
                  are ranked that week.
                </p>
              </Decision>
            </div>
          </Section>

          <Section id="change" title="What I’d change">
            <p>
              <strong className="font-semibold">Run it in a live community.</strong> The server compiles against the
              real Root SDK and the demo runs the real engine, but the app hasn’t yet run in a live Root community. That
              needs a developer token and is the next step.
            </p>
            <p>
              <strong className="font-semibold">More than one room.</strong> One Root server process serves one
              community, so there’s one room per install. Study groups inside a big community will want their own.
            </p>
            <p>
              <strong className="font-semibold">Fewer SDK workarounds.</strong> Numeric settings are drop-downs because
              the SDK’s dev host maps number settings wrongly, and a dependency override patches an advisory in the
              SDK’s SQLite driver. Both should go once Root updates the SDK.
            </p>
          </Section>

          <div className="mt-20 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 text-[15px]">
            <a href={code}>Read the code ↗</a>
            <a href={`${base}#contact`}>Get in touch →</a>
          </div>
        </article>
      </div>
    </div>
  );
}
