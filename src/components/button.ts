import { cn } from "@/lib/utils";

// Button styles shared with burke.systems: a blue primary and an outline for Night backgrounds.
const base =
  "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-ui px-6 text-base font-semibold no-underline transition-colors";

export function buttonClass(variant: "primary" | "outline-dark" | "white" = "primary", className?: string) {
  return cn(
    base,
    variant === "primary" && "bg-burke-blue text-white hover:bg-burke-blue-hover",
    variant === "outline-dark" && "border-[1.5px] border-slate-600 text-white hover:bg-white/5",
    variant === "white" && "bg-white text-night hover:bg-mist",
    className,
  );
}
