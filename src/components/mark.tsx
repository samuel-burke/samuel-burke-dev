import { MARK_PATH, MARK_VIEWBOX } from "@/components/mark-path";

// The Burke mark: a geometric B whose counters are joined by a channel that traces an S.
// Leave `label` empty when the mark sits next to the written name.
export function Mark({ className, label }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      fill="currentColor"
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      <path fillRule="evenodd" d={MARK_PATH} />
    </svg>
  );
}
