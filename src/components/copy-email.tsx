"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";

export function CopyEmail() {
  const [status, setStatus] = useState("copy");
  const ref = useRef<HTMLSpanElement>(null);

  function flash(text: string) {
    setStatus(text);
    setTimeout(() => setStatus("copy"), 1500);
  }

  function selectText() {
    if (!ref.current) return;
    const range = document.createRange();
    range.selectNodeContents(ref.current);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  function copy() {
    if (!navigator.clipboard) {
      selectText();
      flash("selected");
      return;
    }
    navigator.clipboard.writeText(site.email).then(
      () => flash("copied"),
      () => {
        selectText();
        flash("selected");
      },
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-3 rounded-ui border border-border px-4 py-3.5 font-mono text-[15px] transition-colors duration-[120ms] hover:border-foreground"
    >
      <span ref={ref}>{site.email}</span>
      <span className="min-w-[7ch] text-left text-[12.5px] text-muted-foreground" aria-live="polite">
        {status}
      </span>
    </button>
  );
}
