"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { site } from "@/lib/site";

function go(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

function Hint({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-xs text-muted-foreground">{children}</span>;
}

// Easter eggs: hidden commands that only appear once the query spells most of one out.
const EGGS = ["clock in", "sudo hire samuel", "engrave"] as const;
type Egg = (typeof EGGS)[number];

function eggFor(query: string): Egg | undefined {
  const q = query.trim().toLowerCase().replace(/\s+/g, " ");
  return EGGS.find((egg) => q.length >= Math.min(5, egg.length) && egg.startsWith(q));
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { resolvedTheme, setTheme } = useTheme();
  const egg = eggFor(query);

  function say(text: string) {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3200);
  }

  function hatch(found: Egg) {
    if (found === "clock in") {
      const now = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      say(`Clocked in at ${now}. You’re 2 minutes late.`);
    } else if (found === "sudo hire samuel") {
      say("Permission granted. Opening your email…");
      setTimeout(() => (window.location.href = `mailto:${site.email}?subject=Let%E2%80%99s%20talk`), 900);
    } else {
      window.dispatchEvent(new Event("sb:engrave"));
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function run(action: () => void) {
    setOpen(false);
    setQuery("");
    action();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Search"
        title="Search (⌘K)"
        className="flex h-9 w-9 items-center justify-center gap-2 rounded-ui border border-border bg-surface text-[14.5px] text-muted-foreground transition-colors duration-[120ms] hover:border-foreground hover:text-foreground sm:w-[200px] sm:justify-start sm:pl-[11px] sm:pr-1.5"
      >
        <Search aria-hidden className="size-4 shrink-0" />
        <span className="hidden flex-1 text-left sm:inline">Search</span>
        <kbd className="hidden rounded-[4px] border border-border px-[5px] font-mono text-[11.5px] sm:inline">⌘K</kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">Command menu</DialogTitle>
          <DialogDescription className="sr-only">Jump to a section or run an action.</DialogDescription>
          <Command>
            <CommandInput placeholder="Type a command or search" value={query} onValueChange={setQuery} />
            <CommandList>
              <CommandEmpty>No matches. Try “work” or “email”.</CommandEmpty>
              {egg && (
                <CommandGroup heading="You found something">
                  <CommandItem value={egg} onSelect={() => run(() => hatch(egg))}>
                    {egg} <Hint>secret</Hint>
                  </CommandItem>
                </CommandGroup>
              )}
              <CommandGroup heading="Navigate">
                <CommandItem onSelect={() => run(() => go("about"))}>
                  About <Hint>section</Hint>
                </CommandItem>
                <CommandItem onSelect={() => run(() => go("work"))}>
                  Work: ShiftView <Hint>section</Hint>
                </CommandItem>
                <CommandItem onSelect={() => run(() => go("experience"))}>
                  Experience <Hint>section</Hint>
                </CommandItem>
                <CommandItem onSelect={() => run(() => go("contact"))}>
                  Contact <Hint>section</Hint>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => run(() => navigator.clipboard?.writeText(site.email))}>
                  Copy email <Hint>action</Hint>
                </CommandItem>
                <CommandItem onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}>
                  Toggle theme <Hint>action</Hint>
                </CommandItem>
                <CommandItem onSelect={() => run(() => window.open("https://shiftview.app", "_blank"))}>
                  Open ShiftView <Hint>link</Hint>
                </CommandItem>
                <CommandItem onSelect={() => run(() => window.open(site.repo, "_blank"))}>
                  View this site’s source <Hint>link</Hint>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
      <p role="status" aria-live="polite" className="sr-only">
        {toast}
      </p>
      {toast && (
        <div
          aria-hidden
          className="fixed bottom-6 left-1/2 z-50 w-max max-w-[calc(100vw-32px)] animate-[palette-in_200ms_var(--ease)_both] rounded-ui border border-border bg-surface px-4 py-3 font-mono text-[13px] text-foreground"
        >
          {toast}
        </div>
      )}
    </>
  );
}
