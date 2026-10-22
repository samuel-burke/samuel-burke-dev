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
      className="inline-flex h-12 items-center gap-3 rounded-ui bg-white px-6 text-base font-semibold text-night transition-colors hover:bg-mist"
    >
      <span ref={ref}>{site.email}</span>
      <span className="min-w-[7ch] text-left text-sm font-medium text-burke-blue" aria-live="polite">
        {status}
      </span>
    </button>
  );
}
