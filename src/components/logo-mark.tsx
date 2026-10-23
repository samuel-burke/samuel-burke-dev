"use client";

import { useEffect, useState } from "react";
import { B_OUTER, B_PATH, S_CUT } from "@/components/logo-paths";
import { cn } from "@/lib/utils";

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The signature moment: the solid B draws in, then the S engraves into it. Once per session, on first load only.
// At rest the S is a real even-odd cut; while playing it is painted in the background color on top.
export function LogoMark({ className }: { className?: string }) {
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(false);

  function play() {
    if (reducedMotion()) return;
    setRun((n) => n + 1);
    setPlaying(true);
  }

  useEffect(() => {
    try {
      if (sessionStorage.getItem("sb-cut")) return;
      sessionStorage.setItem("sb-cut", "1");
    } catch {}
    const frame = requestAnimationFrame(play);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      viewBox="150.3 112 216.4 288"
      role="img"
      aria-label="Samuel Burke"
      className={cn("block overflow-visible", className)}
    >
      {playing ? (
        <g key={run}>
          <path d={B_OUTER} className="fill-foreground animate-[logo-cut_600ms_var(--ease)_both]" />
          <path
            d={S_CUT}
            className="fill-background animate-[logo-fill_300ms_var(--ease)_1050ms_both]"
            onAnimationEnd={() => setPlaying(false)}
          />
          <path
            d={S_CUT}
            pathLength={1}
            className="fill-none stroke-background opacity-0 [stroke-dasharray:1] [stroke-dashoffset:1] [stroke-width:6] animate-[logo-trace_650ms_var(--ease)_450ms_both]"
          />
        </g>
      ) : (
        <path d={B_PATH} fillRule="evenodd" className="fill-foreground" />
      )}
    </svg>
  );
}
