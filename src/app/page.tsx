import { CommandMenu } from "@/components/command-menu";
import { CopyEmail } from "@/components/copy-email";
import { LogoMark } from "@/components/logo-mark";
import { SectionNav } from "@/components/section-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

// Theme-aware screenshot: shows the dark capture in dark mode and the light one in light mode.
function Shot({ name, alt, width, height }: { name: string; alt: string; width: number; height: number }) {
  return (
    <>
      <img
        src={`work/shiftview/${name}-dark.webp`}
        alt={alt}
        width={width}
        height={height}
        className="hidden h-auto w-full rounded-ui border border-border dark:block"
      />
      <img
        src={`work/shiftview/${name}-light.webp`}
        alt={alt}
        width={width}
        height={height}
        className="block h-auto w-full rounded-ui border border-border dark:hidden"
      />
    </>
  );
}

const experience: { when: string; title: React.ReactNode; body: string }[] = [
  {
    when: "2026 – now",
    title: (
      <>
        Founder · <a href="https://burke.systems">Burke Systems</a>
      </>
    ),
    body: "Custom web apps, automation and consulting for small teams in Raleigh-Durham. Designed, built and shipped ShiftView.",
  },
  {
    when: "Internship",
    title: "QA engineering intern · ZenGRC",
    body: "Wrote end-to-end tests for the QA team on ZenGRC, a governance, risk and compliance platform.",
  },
  {
    when: "Education",
    title: "B.S. Computer Science · NC State University",
    body: "North Carolina State University, Raleigh.",
  },
];

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-6 text-[15px] font-semibold text-muted-foreground">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 px-5 lg:grid-cols-12 lg:gap-16 lg:px-12">
      <header className="flex flex-col pb-8 pt-14 lg:sticky lg:top-0 lg:col-span-5 lg:h-screen lg:pb-12 lg:pt-[72px]">
        <LogoMark className="mb-8 size-12" />
        <h1 className="mb-4 font-display text-[clamp(3rem,7vw,5.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-balance">
          {site.name}
        </h1>
        <p className="mb-2 text-xl">{site.role}</p>
        <p className="max-w-[36ch] text-muted-foreground">
          I build the scheduling, tracking and internal tools that small teams run their day on.
        </p>
        <SectionNav />
        <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
          <a href={site.github}>GitHub</a>
          <a href={site.linkedin}>LinkedIn</a>
        </p>
        <div className="mt-6 flex flex-wrap gap-2 lg:mt-auto">
          <CommandMenu />
          <ThemeToggle />
        </div>
      </header>

      <main className="min-w-0 pb-12 lg:col-span-7">
        <section aria-labelledby="about-h" id="about" className="scroll-mt-8 pt-16 lg:pt-[72px]">
          <SectionHeading id="about-h">About</SectionHeading>
          <div className="max-w-[62ch] space-y-4">
            <p>
              I’m a full-stack engineer and the founder of{" "}
              <a href="https://burke.systems">Burke Systems</a>, a small software studio in Raleigh-Durham that builds
              custom tools for small and mid-size businesses.
            </p>
            <p>
              I like owning a product from the problem to production: the schema, the security model, and the screen a
              shift lead uses on a busy morning. My flagship is ShiftView, a scheduling and time-clock app I designed and
              built on my own.
            </p>
            <p>I care about software that is boring to run: typed end to end, tested on every change, fast on a cheap phone.</p>
          </div>
        </section>

        <section aria-labelledby="work-h" id="work" className="scroll-mt-8 pt-24">
          <SectionHeading id="work-h">Selected work</SectionHeading>

          <article>
            <h3 className="mb-3 font-display text-[clamp(2.25rem,5vw,3.25rem)] font-extrabold leading-none tracking-[-0.03em]">
              ShiftView
            </h3>
            <p className="mb-3 max-w-[58ch] text-lg">
              Scheduling and a time clock for retail and fulfillment teams. Managers see who’s on the floor right now;
              staff swap shifts, call out and clock in from their phones. I built it alone, from the data model to the
              installable app.
            </p>
            <p className="mb-8 text-[15px] text-muted-foreground">
              Public beta · Next.js 16, React 19, Supabase, TypeScript ·{" "}
              <a href="https://shiftview.app" className="text-foreground">
                Live ↗
              </a>{" "}
              ·{" "}
              <a href="https://github.com/samuel-burke/shiftview" className="text-foreground">
                Code ↗
              </a>
            </p>

            <figure className="mb-10">
              <Shot
                name="auto-schedule"
                alt="ShiftView week view after auto-scheduling 46 shifts, showing 100% coverage, 266 of 266 budgeted hours and zero overtime."
                width={1600}
                height={1001}
              />
              <figcaption className="mt-3 text-[15px] text-muted-foreground">
                Auto-schedule drafts a whole week against coverage targets and the labor budget. Nothing goes live until
                a manager publishes.
              </figcaption>
            </figure>

            <div className="max-w-[62ch] space-y-5">
              <p>
                <strong className="font-semibold">Scheduling that explains itself.</strong> The auto-scheduler is a
                deterministic optimizer, not a chatbot. It builds draft weeks from coverage targets, availability, time
                off and hour limits, and reports coverage, overtime and labor cost before anyone publishes.
              </p>
              <p>
                <strong className="font-semibold">Coverage in real time.</strong> A live timeline compares target,
                scheduled and clocked-in headcount, and it updates through Supabase Realtime as people punch in. Late
                clock-ins raise an alert for the manager.
              </p>
              <p>
                <strong className="font-semibold">Security in two layers.</strong> API route handlers are the only write
                path: they check auth, validate input and write an audit log. Row-level security on every table backs
                them up, every row is scoped to its organization, and messages are encrypted with AES-256-GCM.
              </p>
              <p>
                <strong className="font-semibold">Tested on every change.</strong> More than 1,600 automated tests across
                1,020 commits: Vitest and Testing Library for units, Playwright end to end, and SQL tests for database
                behavior. CI runs lint, typecheck, unit, security and end-to-end checks on every push.
              </p>
            </div>

            <figure className="mt-10">
              <div className="grid max-w-[520px] grid-cols-2 gap-4">
                <Shot name="phone-clock" alt="ShiftView time clock on a phone, clocked in with a running timer." width={602} height={1262} />
                <Shot name="phone-team" alt="ShiftView team view on a phone, listing who is here now." width={600} height={1262} />
              </div>
              <figcaption className="mt-3 text-[15px] text-muted-foreground">
                Staff use it as an installable web app on phones, tablets and desktops. No app store needed.
              </figcaption>
            </figure>

            <p className="mt-8">
              <a href="https://github.com/samuel-burke/shiftview#readme">Read the code and the architecture notes →</a>
            </p>
          </article>

          <article className="mt-20 max-w-[62ch]">
            <h3 className="mb-2 text-lg font-semibold">
              <a href={site.repo}>samuelburke.dev</a>
            </h3>
            <p className="text-muted-foreground">
              This site. Built with coding agents against a written design spec, then statically exported to Cloudflare
              Pages. The source, the spec and the agent setup are all public.
            </p>
          </article>

          <p className="mt-10 text-[15px] text-muted-foreground">More projects are on the way.</p>
        </section>

        <section aria-labelledby="exp-h" id="experience" className="scroll-mt-8 pt-24">
          <SectionHeading id="exp-h">Experience</SectionHeading>
          {/* TODO(samuel): add years for the ZenGRC internship and NC State. */}
          <div className="space-y-10">
            {experience.map((item) => (
              <div key={item.when} className="grid gap-1 sm:grid-cols-[128px_1fr] sm:gap-4">
                <span className="font-mono text-[13px] leading-[1.9] text-muted-foreground tabular-nums">{item.when}</span>
                <div className="max-w-[56ch]">
                  <h3 className="mb-1.5 text-[17px] font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="contact-h" id="contact" className="scroll-mt-8 pt-24">
          <SectionHeading id="contact-h">Contact</SectionHeading>
          <p className="mb-3 font-display text-[clamp(2rem,4.5vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Say hello
          </p>
          <p className="mb-5 max-w-[48ch] text-muted-foreground">
            Open to full-stack and product engineering roles. Email is the fastest way to reach me.
          </p>
          <CopyEmail />
        </section>

        <footer className="mt-24 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-border pt-5 text-sm text-muted-foreground">
          <span>Built with Next.js, Tailwind and shadcn/ui</span>
          <a href={site.repo}>Source on GitHub</a>
        </footer>
      </main>
    </div>
  );
}
