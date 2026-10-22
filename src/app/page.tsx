import { ArrowUpRight, Check } from "lucide-react";
import { buttonClass } from "@/components/button";
import { CommandMenu } from "@/components/command-menu";
import { CopyEmail } from "@/components/copy-email";
import { Mark } from "@/components/mark";
import { site } from "@/lib/site";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
];

// Real numbers from ShiftView's auto-scheduler run in the screenshot below.
const heroRows = [
  { label: "46 shifts auto-scheduled", value: "Done" },
  { label: "Coverage target met", value: "100%" },
  { label: "Hours vs. labor budget", value: "266 / 266" },
  { label: "Automated tests passing", value: "1,600+" },
];

const stats = [
  { value: "1,600+", label: "automated tests" },
  { value: "1,020", label: "commits, solo" },
  { value: "2", label: "layers of access control" },
  { value: "7", label: "platforms, one codebase" },
];

const chapters = [
  {
    title: "Scheduling that explains itself",
    body: "The auto-scheduler is a deterministic optimizer, not a chatbot. It drafts a week from coverage targets, availability, time off and hour limits, then reports coverage, overtime and labor cost before anyone publishes.",
  },
  {
    title: "Coverage in real time",
    body: "A live timeline compares target, scheduled and clocked-in headcount, updated through Supabase Realtime as people punch in. Late clock-ins raise an alert for the manager.",
  },
  {
    title: "Security in two layers",
    body: "API route handlers are the only write path: they check auth, validate input and write an audit log. Row-level security on every table backs them up, and messages are encrypted with AES-256-GCM.",
  },
  {
    title: "Tested on every change",
    body: "Vitest and Testing Library for units, Playwright end to end, and SQL tests for database behavior. CI runs lint, typecheck, unit, security and end-to-end checks on every push.",
  },
];

const stack = ["Next.js 16", "React 19", "TypeScript", "Supabase", "Postgres", "Playwright"];

const experience = [
  {
    kind: "2026 – NOW",
    title: "Founder",
    org: "Burke Systems",
    href: "https://burke.systems",
    body: "Custom web apps, automation and consulting for small teams in Raleigh-Durham. Designed, built and shipped ShiftView.",
  },
  {
    // TODO(samuel): add the internship dates.
    kind: "INTERNSHIP",
    title: "QA engineering intern",
    org: "ZenGRC",
    body: "Wrote end-to-end tests for the QA team on ZenGRC, a governance, risk and compliance platform.",
  },
  {
    // TODO(samuel): add the graduation year.
    kind: "EDUCATION",
    title: "B.S. Computer Science",
    org: "NC State University",
    body: "North Carolina State University, Raleigh.",
  },
];

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-[13px] font-semibold tracking-[0.18em] ${dark ? "text-periwinkle" : "text-burke-blue"}`}>
      {children}
    </p>
  );
}

function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div className="flex max-w-[640px] flex-col gap-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-3xl leading-[1.1] font-extrabold text-balance sm:text-4xl lg:text-[40px]">
        {title}
      </h2>
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="inline-flex w-fit items-center gap-1 text-[15px] font-semibold text-burke-blue hover:text-burke-blue-hover hover:underline"
    >
      {children}
      <ArrowUpRight className="size-4" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="#top" aria-label="Samuel Burke, back to top" className="inline-flex items-center gap-3 rounded-ui text-white">
          <Mark className="h-8 w-auto" />
          <span className="flex flex-col gap-[3px] font-heading leading-none">
            <span className="text-lg font-extrabold tracking-[0.04em]">SAMUEL BURKE</span>
            <span className="text-[8px] font-semibold tracking-[0.36em] text-cloud">FULL-STACK ENGINEER</span>
          </span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-7 text-[15px] font-medium">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hidden text-cloud transition-colors hover:text-white md:inline">
              {link.label}
            </a>
          ))}
          <CommandMenu />
          <a href="#contact" className={buttonClass("primary", "h-11 px-5 text-[15px]")}>
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="bg-night" aria-labelledby="hero-title">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-4 pt-14 pb-20 sm:px-6 md:pt-22 md:pb-28">
        <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-6">
          <Eyebrow dark>FULL-STACK ENGINEER · RALEIGH-DURHAM, NC</Eyebrow>
          <h1 id="hero-title" className="text-4xl leading-[1.05] font-extrabold text-balance text-white sm:text-5xl lg:text-6xl">
            I build the software small teams run their day on.
          </h1>
          <p className="max-w-[560px] text-lg leading-relaxed text-cloud sm:text-[19px]">
            I’m Samuel Burke. I take products from the problem to production: the schema, the security model, and the
            screen a shift lead uses on a busy morning. My flagship is ShiftView, a scheduling app I built on my own.
          </p>
          <div className="flex flex-wrap gap-3.5 pt-2">
            <a href="#work" className={buttonClass("primary")}>
              See my work
            </a>
            <a href="#contact" className={buttonClass("outline-dark")}>
              Get in touch
            </a>
          </div>
          <p className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-cloud">
            <a href={site.github} className="hover:text-white hover:underline">GitHub</a>
            <a href={site.linkedin} className="hover:text-white hover:underline">LinkedIn</a>
            <a href="https://burke.systems" className="hover:text-white hover:underline">Burke Systems</a>
          </p>
        </div>

        <figure
          className="flex min-w-0 flex-[1_1_380px] flex-col gap-3.5 rounded-2xl border border-night-line bg-night-raised p-6"
          aria-label="ShiftView this week: 46 shifts auto-scheduled, 100% coverage, 266 of 266 budgeted hours, 1,600+ tests passing"
        >
          <div className="flex gap-[7px]" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-slate-600" />
            <span className="size-2.5 rounded-full bg-slate-600" />
            <span className="size-2.5 rounded-full bg-slate-600" />
          </div>
          <figcaption className="text-[13px] font-semibold text-periwinkle" aria-hidden="true">
            SHIFTVIEW · THIS WEEK
          </figcaption>
          <ul className="flex flex-col gap-3.5" aria-hidden="true">
            {heroRows.map((row) => (
              <li
                key={row.label}
                className="flex h-12 items-center justify-between gap-4 rounded-[10px] bg-night px-4 text-[15px] text-white"
              >
                <span className="truncate">{row.label}</span>
                <span className="flex shrink-0 items-center gap-1.5 font-semibold text-periwinkle">
                  <Check className="size-4" strokeWidth={3} />
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="bg-paper" aria-labelledby="work-title">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-11 px-4 py-20 sm:px-6 md:py-24">
        <SectionHeading id="work-title" eyebrow="SELECTED WORK" title="ShiftView, built end to end." />

        <article className="overflow-hidden rounded-[14px] bg-white">
          <img
            src="work/shiftview/auto-schedule-light.webp"
            alt="ShiftView week view after auto-scheduling 46 shifts, showing 100% coverage, 266 of 266 budgeted hours and zero overtime."
            width={1600}
            height={1001}
            className="h-auto w-full border-b border-border"
          />
          <div className="grid gap-10 p-7 md:p-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col gap-3">
              <p className="text-[13px] font-semibold tracking-[0.18em] text-burke-blue">WEB APP · PUBLIC BETA</p>
              <h3 className="text-[28px] leading-tight font-bold">ShiftView</h3>
              <p className="text-[17px] leading-[1.7] text-muted-foreground">
                Scheduling and a time clock for retail and fulfillment teams. Managers see who’s on the floor right now;
                staff swap shifts, call out and clock in from their phones. I built it alone, from the data model to the
                installable app.
              </p>
              <ul className="flex flex-wrap gap-2 pt-1" aria-label="Stack">
                {stack.map((tech) => (
                  <li key={tech} className="rounded-md bg-paper px-2.5 py-1 text-[13px] font-medium text-night">
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-3">
                <ExternalLink href="https://shiftview.app">Visit shiftview.app</ExternalLink>
                <ExternalLink href="https://github.com/samuel-burke/shiftview#readme">Read the code</ExternalLink>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-4 self-start">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1 rounded-[10px] bg-paper p-5">
                  <dt className="order-2 text-[15px] text-muted-foreground">{stat.label}</dt>
                  <dd className="order-1 font-heading text-3xl font-extrabold text-night tabular-nums">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>

        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ol className="grid gap-x-7 gap-y-9 sm:grid-cols-2">
            {chapters.map((chapter) => (
              <li key={chapter.title} className="flex flex-col gap-2.5 border-t-[3px] border-burke-blue pt-5">
                <h3 className="text-xl font-bold">{chapter.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{chapter.body}</p>
              </li>
            ))}
          </ol>
          <figure className="flex flex-col gap-4 rounded-[14px] bg-night p-6">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="work/shiftview/phone-clock-dark.webp"
                alt="ShiftView time clock on a phone, clocked in with a running timer."
                width={602}
                height={1262}
                className="h-auto w-full rounded-[10px]"
              />
              <img
                src="work/shiftview/phone-team-dark.webp"
                alt="ShiftView team view on a phone, listing who is here now."
                width={600}
                height={1262}
                className="h-auto w-full rounded-[10px]"
              />
            </div>
            <figcaption className="text-[15px] leading-relaxed text-cloud">
              Staff use it as an installable web app on phones, tablets and desktops. No app store needed.
            </figcaption>
          </figure>
        </div>

        <article className="flex flex-col gap-2.5 rounded-[14px] bg-white p-7 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
          <div className="flex max-w-[640px] flex-col gap-2.5">
            <p className="text-[13px] font-semibold tracking-[0.18em] text-burke-blue">THIS SITE</p>
            <h3 className="text-[22px] font-bold">samuelburke.dev</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Built with coding agents against a written design spec, then statically exported to Cloudflare Pages. The
              source, the spec and the agent setup are all public.
            </p>
          </div>
          <ExternalLink href={site.repo}>View the source</ExternalLink>
        </article>

        <p className="text-[15px] text-muted-foreground">More projects are on the way.</p>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-white" aria-labelledby="experience-title">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-11 px-4 py-20 sm:px-6 md:py-24">
        <SectionHeading id="experience-title" eyebrow="EXPERIENCE" title="Where I’ve built and learned." />
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-7">
          {experience.map((item) => (
            <li key={item.kind} className="flex flex-col gap-2.5 border-t-[3px] border-burke-blue pt-5">
              <span className="font-heading text-[13px] font-bold tracking-[0.12em] text-burke-blue tabular-nums">
                {item.kind}
              </span>
              <h3 className="text-xl font-bold">
                {item.title} ·{" "}
                {item.href ? (
                  <a href={item.href} className="hover:text-burke-blue hover:underline">
                    {item.org}
                  </a>
                ) : (
                  item.org
                )}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-paper" aria-labelledby="about-title">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:py-24">
        <div className="flex max-w-[760px] flex-col gap-[18px]">
          <Eyebrow>ABOUT</Eyebrow>
          <h2 id="about-title" className="text-3xl leading-[1.1] font-extrabold text-balance sm:text-4xl lg:text-[40px]">
            Built by someone who has done the work.
          </h2>
          <p className="text-[17px] leading-[1.7] text-muted-foreground">
            I’m a developer in the Raleigh-Durham area with a computer science degree from NC State. Before writing
            software full time, I ran a high-volume fulfillment team and sold to contractors, so I know what it’s like
            when the tools don’t fit the job.
          </p>
          <p className="text-[17px] leading-[1.7] text-muted-foreground">
            That’s why I care about software that is boring to run: typed end to end, tested on every change, and fast
            on a cheap phone. It’s also why I started{" "}
            <a href="https://burke.systems" className="font-semibold text-burke-blue hover:text-burke-blue-hover hover:underline">
              Burke Systems
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-burke-blue" aria-labelledby="contact-title">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-20 sm:px-6 md:py-22">
        <div className="flex max-w-[640px] flex-col gap-3">
          <h2 id="contact-title" className="text-3xl leading-[1.1] font-extrabold text-balance text-white sm:text-4xl lg:text-[40px]">
            Let’s build something useful.
          </h2>
          <p className="text-lg leading-relaxed text-[#E6EBFD]">
            I’m open to full-stack and product engineering roles. Email is the fastest way to reach me.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <CopyEmail />
          <a href={site.linkedin} className="text-[15px] font-semibold text-white hover:underline">LinkedIn</a>
          <a href={site.github} className="text-[15px] font-semibold text-white hover:underline">GitHub</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-night">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 px-4 py-10 text-sm text-slate-400 sm:px-6">
        <div className="flex items-center gap-3">
          <Mark className="h-6.5 w-auto text-white" label="Samuel Burke" />
          <p>© 2026 Samuel Burke · Raleigh-Durham, NC</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-6">
          {[...navLinks, { href: "#contact", label: "Contact" }].map((link) => (
            <a key={link.href} href={link.href} className="text-cloud hover:text-white">
              {link.label}
            </a>
          ))}
          <a href={site.repo} className="text-cloud hover:text-white">
            Source
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
