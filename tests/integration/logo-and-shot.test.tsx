import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LogoMark } from "@/components/logo-mark";
import { Shot } from "@/components/shot";

describe("LogoMark", () => {
  it("is one labelled image with the carve layers hidden from assistive tech", () => {
    const { container } = render(<LogoMark />);
    expect(screen.getByRole("img", { name: "Samuel Burke" })).toBeTruthy();
    expect(container.querySelector("g")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("marks the carve as seen after it finishes, so client navigation doesn't replay it", () => {
    vi.useFakeTimers();
    render(<LogoMark />);
    expect(document.documentElement.classList.contains("sb-seen")).toBe(false);
    act(() => vi.advanceTimersByTime(1400));
    expect(document.documentElement.classList.contains("sb-seen")).toBe(true);
  });

  it("replays the carve on the engrave event", () => {
    const { container } = render(<LogoMark />);
    expect(container.querySelector(".logo-replay")).toBeNull();
    act(() => window.dispatchEvent(new Event("sb:engrave")));
    expect(container.querySelector(".logo-replay")).not.toBeNull();
  });
});

describe("Shot", () => {
  it("renders lazy dark and light captures from a relative base", () => {
    render(<Shot name="week" alt="Week view" width={1600} height={1000} base="../../" />);
    const [dark, light] = screen.getAllByRole("img", { name: "Week view" }) as HTMLImageElement[];
    expect(dark.getAttribute("src")).toBe("../../img/shiftview/week-dark.webp");
    expect(light.getAttribute("src")).toBe("../../img/shiftview/week-light.webp");
    for (const img of [dark, light]) {
      expect(img.getAttribute("loading")).toBe("lazy");
      expect(img.className).toContain("border");
    }
  });

  it("renders one framed capture from another project's folder when the app has a single look", () => {
    render(<Shot name="room" alt="Room" width={1280} height={900} project="study-squad" themed={false} base="../../" />);
    const imgs = screen.getAllByRole("img", { name: "Room" }) as HTMLImageElement[];
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute("src")).toBe("../../img/study-squad/room.webp");
    expect(imgs[0].getAttribute("loading")).toBe("lazy");
    expect(imgs[0].className).toContain("border");
    expect(imgs[0].className).not.toContain("dark:");
  });

  it("drops the frame for bare phone captures", () => {
    render(<Shot name="phone" alt="Phone" width={400} height={800} bare />);
    for (const img of screen.getAllByRole("img")) expect(img.className).not.toContain("border");
  });
});
