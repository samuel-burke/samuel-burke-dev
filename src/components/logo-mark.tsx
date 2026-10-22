"use client";

import { useEffect, useState } from "react";
import { B_PATH, TILE_PATH } from "@/components/logo-paths";
import { cn } from "@/lib/utils";

// The signature moment: the B cuts out of the tile once per session, and again on hover.
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

  return (
    <svg
      viewBox="0 0 512 512"
      role="img"
      aria-label="Samuel Burke"
      className={cn("block", className)}
      onMouseEnter={() => setRun((n) => n + 1)}
    >
      <path d={TILE_PATH} className="fill-logo-tile" />
      <path
        key={run}
        d={B_PATH}
        fillRule="evenodd"
        className={cn("fill-logo-letter", run > 0 && "animate-[logo-cut_700ms_var(--ease)_both]")}
      />
    </svg>
  );
}
