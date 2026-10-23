"use client";

import { useEffect, useState } from "react";
import { B_PATH } from "@/components/logo-paths";
import { cn } from "@/lib/utils";

// The signature moment: the B, with its S cutout, draws in from left to right. Once per session, on first load only.
export function LogoMark({ className }: { className?: string }) {
  const [run, setRun] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("sb-cut")) return;
      sessionStorage.setItem("sb-cut", "1");
    } catch {}
    const frame = requestAnimationFrame(() => setRun(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg viewBox="150.3 112 216.4 288" role="img" aria-label="Samuel Burke" className={cn("block", className)}>
      <path
        d={B_PATH}
        fillRule="evenodd"
        className={cn("fill-foreground", run && "animate-[logo-cut_700ms_var(--ease)_both]")}
      />
    </svg>
  );
}
