"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

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
    action();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group flex items-baseline gap-2 text-[15px] text-muted-foreground transition-colors duration-[120ms] hover:text-foreground"
      >
        Search
        <kbd className="hidden font-mono text-xs sm:inline">⌘K</kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">Command menu</DialogTitle>
          <DialogDescription className="sr-only">Jump to a section or run an action.</DialogDescription>
          <Command>
            <CommandInput placeholder="Type a command or search" />
            <CommandList>
              <CommandEmpty>No matches. Try “work” or “email”.</CommandEmpty>
              <CommandGroup heading="Navigate">
                <CommandItem onSelect={() => run(() => go("about"))}>About <Hint>section</Hint></CommandItem>
                <CommandItem onSelect={() => run(() => go("work"))}>Work: ShiftView <Hint>section</Hint></CommandItem>
                <CommandItem onSelect={() => run(() => go("experience"))}>Experience <Hint>section</Hint></CommandItem>
                <CommandItem onSelect={() => run(() => go("contact"))}>Contact <Hint>section</Hint></CommandItem>
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
    </>
  );
}
