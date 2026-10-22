"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function SectionNav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    // The active section is the last one whose top has passed 40% of the viewport.
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) current = sections.at(-1)!.id;
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav aria-label="Sections" className="mt-12 hidden gap-1.5 lg:grid">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-current={active === s.id ? "true" : undefined}
          className={cn(
            "group flex items-center text-[15px] no-underline transition-colors duration-[120ms]",
            active === s.id ? "text-accent" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <span
            className={cn(
              "inline-block h-px bg-current transition-all duration-200",
              active === s.id ? "mr-3 w-7" : "mr-0 w-0",
            )}
          />
          {s.label}
        </a>
      ))}
    </nav>
  );
}
