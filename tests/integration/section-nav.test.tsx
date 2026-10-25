import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SectionNav } from "@/components/section-nav";

const ids = ["about", "work", "experience", "contact"];

// jsdom has no layout, so each section reports a top that the test controls.
function layout(tops: Record<string, number>, { atBottom = false } = {}) {
  for (const id of ids) {
    vi.spyOn(document.getElementById(id)!, "getBoundingClientRect").mockReturnValue({ top: tops[id] } as DOMRect);
  }
  Object.defineProperty(window, "innerHeight", { value: 1000, configurable: true });
  Object.defineProperty(document.body, "scrollHeight", { value: atBottom ? 1000 : 5000, configurable: true });
  act(() => window.dispatchEvent(new Event("scroll")));
}

const current = () => screen.getAllByRole("link").filter((a) => a.getAttribute("aria-current") === "true");

function renderWithSections(variant?: "column" | "bar") {
  return render(
    <>
      <SectionNav variant={variant} />
      {ids.map((id) => (
        <section key={id} id={id} />
      ))}
    </>,
  );
}

describe("SectionNav", () => {
  afterEach(() => Object.defineProperty(window, "scrollY", { value: 0, configurable: true }));

  it("links every section by its hash", () => {
    renderWithSections();
    expect(screen.getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(ids.map((id) => `#${id}`));
  });

  it.each(["column", "bar"] as const)("%s: marks the last section past 40%% of the screen", (variant) => {
    renderWithSections(variant);
    layout({ about: -900, work: -100, experience: 399, contact: 800 });
    expect(current().map((a) => a.textContent)).toEqual(["Experience"]);

    layout({ about: 0, work: 401, experience: 900, contact: 1500 });
    expect(current().map((a) => a.textContent)).toEqual(["About"]);
  });

  it("marks Contact at the bottom of the page even when it is too short to reach the line", () => {
    renderWithSections();
    layout({ about: -3000, work: -2000, experience: -500, contact: 700 }, { atBottom: true });
    expect(current().map((a) => a.textContent)).toEqual(["Contact"]);
  });

  it("stops listening after unmount", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    renderWithSections().unmount();
    expect(remove.mock.calls.map(([type]) => type)).toEqual(expect.arrayContaining(["scroll", "resize"]));
  });
});
