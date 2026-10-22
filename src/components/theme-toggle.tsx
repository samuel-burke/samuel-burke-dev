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
      className="text-[15px] text-muted-foreground transition-colors duration-[120ms] hover:text-foreground"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
