"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { site } from "@/lib/site";

function go(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

function Hint({ children }: { children: React.ReactNode }) {
  return <span className="text-xs text-muted-foreground">{children}</span>;
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);

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
        aria-label="Open command menu"
        className="hidden h-11 items-center gap-2 rounded-ui border border-night-line px-3 text-sm text-cloud transition-colors hover:border-cloud hover:text-white sm:inline-flex"
      >
        <kbd className="font-sans text-[13px] font-semibold">⌘K</kbd>
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
                <CommandItem onSelect={() => run(() => go("work"))}>Work: ShiftView <Hint>section</Hint></CommandItem>
                <CommandItem onSelect={() => run(() => go("experience"))}>Experience <Hint>section</Hint></CommandItem>
                <CommandItem onSelect={() => run(() => go("about"))}>About <Hint>section</Hint></CommandItem>
                <CommandItem onSelect={() => run(() => go("contact"))}>Contact <Hint>section</Hint></CommandItem>
              </CommandGroup>
              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => run(() => navigator.clipboard?.writeText(site.email))}>
                  Copy email <Hint>action</Hint>
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
