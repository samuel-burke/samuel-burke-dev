"use client";

import { useEffect, useState } from "react";
import { B_PATH } from "@/components/logo-paths";
import { cn } from "@/lib/utils";

// The signature moment: the B, with its S cutout, draws in from left to right. Once per session on first load, and on the hidden "engrave" command.
export function LogoMark({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("sb-cut")) return;
      sessionStorage.setItem("sb-cut", "1");
    } catch {}
    const frame = requestAnimationFrame(() => setRun(1));
    return () => cancelAnimationFrame(frame);
  }, []);

  // The "engrave" Easter egg in the command menu replays it.
  useEffect(() => {
    const replay = () => setRun((n) => n + 1);
    window.addEventListener("sb:engrave", replay);
    return () => window.removeEventListener("sb:engrave", replay);
  }, []);

  return (
    <svg viewBox="150.3 112 216.4 288" role="img" aria-label="Samuel Burke" className={cn("block", className)}>
      <path
        key={run}
        d={B_PATH}
        fillRule="evenodd"
        className={cn("fill-foreground", run > 0 && "animate-[logo-cut_700ms_var(--ease)_both]")}
      />
    </svg>
  );
}
