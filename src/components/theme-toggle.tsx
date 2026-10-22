"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // False during prerender, true once hydrated, so the label never mismatches.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const dark = !mounted || resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-pressed={!dark}
      className="rounded-ui border border-border px-3 py-2 font-mono text-[12.5px] text-muted-foreground transition-colors duration-[120ms] hover:border-foreground hover:text-foreground"
    >
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}
