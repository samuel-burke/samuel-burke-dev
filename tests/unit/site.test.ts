import { describe, expect, it } from "vitest";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

describe("site facts", () => {
  it("uses https for every outbound link", () => {
    for (const key of ["url", "github", "linkedin", "calendar", "repo"] as const) {
      expect(new URL(site[key]).protocol, key).toBe("https:");
    }
  });

  it("points at the right profiles", () => {
    // The LinkedIn handle is samuel-burke-nc; samuel-burke is someone else.
    expect(site.linkedin).toBe("https://www.linkedin.com/in/samuel-burke-nc");
    expect(site.github).toBe("https://github.com/samuel-burke");
    expect(site.repo.startsWith(`${site.github}/`)).toBe(true);
  });

  it("has a plain email address", () => {
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/);
  });
});

describe("cn", () => {
  it("joins classes and drops falsy values", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });

  it("lets the later Tailwind class win a conflict", () => {
    expect(cn("px-2 text-sm", "px-4")).toBe("text-sm px-4");
  });
});
