"use client";

import { useEffect, useState } from "react";
import { B_HOLES, B_PATH, S_CUT, S_SPINE } from "@/components/logo-paths";
import { cn } from "@/lib/utils";

// The signature moment: the B starts with only its two holes cut, then the S's curve carves from the top hole down to
// the bottom one. Once per session on first load (CSS in globals.css, gated by the head script in layout.tsx), and
// again on the hidden "engrave" command. At rest only the real even-odd B_PATH shows.
export function LogoMark({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  // Once the first carve has finished, mark it seen so a client-side navigation doesn't play it again.
  useEffect(() => {
    const timer = setTimeout(() => document.documentElement.classList.add("sb-seen"), 1400);
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
      <path d={B_PATH} fillRule="evenodd" className="fill-foreground" />
      <g key={run} className={cn(run > 0 && "logo-replay")} aria-hidden="true">
        <clipPath id="logo-s-cut">
          <path d={S_CUT} />
        </clipPath>
        <path d={B_HOLES} fillRule="evenodd" className="logo-holes fill-foreground" />
        <path
          d={S_SPINE}
          pathLength={1}
          clipPath="url(#logo-s-cut)"
          className="logo-carve fill-none stroke-background [stroke-linecap:round] [stroke-width:40]"
        />
      </g>
    </svg>
  );
}
