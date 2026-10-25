"use client";

import { useEffect, useState } from "react";
import { B_PATH } from "@/components/logo-paths";
import { cn } from "@/lib/utils";

// The signature moment: the B, with its S cutout, draws in from left to right. Once per session on first load (CSS in
// globals.css, gated by the head script in layout.tsx), and again on the hidden "engrave" command.
export function LogoMark({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  // Once the first draw-in has finished, mark it seen so a client-side navigation doesn't play it again.
  useEffect(() => {
    const timer = setTimeout(() => document.documentElement.classList.add("sb-seen"), 1100);
    return () => clearTimeout(timer);
  }, []);

  // The "engrave" Easter egg in the command menu replays it.
  useEffect(() => {
    const replay = () => setRun((n) => n + 1);
    window.addEventListener("sb:engrave", replay);
    return () => window.removeEventListener("sb:engrave", replay);
  }, []);

  return (
    <svg viewBox="150.3 112 216.4 288" role="img" aria-label="Samuel Burke" className={cn("block", className)}>
      <path key={run} d={B_PATH} fillRule="evenodd" className={cn("logo-draw fill-foreground", run > 0 && "logo-replay")} />
    </svg>
  );
}
