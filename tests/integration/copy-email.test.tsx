import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CopyEmail } from "@/components/copy-email";
import { site } from "@/lib/site";

function setClipboard(value: Partial<Clipboard> | undefined) {
  Object.defineProperty(navigator, "clipboard", { value, configurable: true });
}

describe("CopyEmail", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => setClipboard(undefined));

  it("copies the address and says so, then resets", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<CopyEmail />);

    await act(async () => fireEvent.click(screen.getByRole("button", { name: new RegExp(site.email) })));

    expect(writeText).toHaveBeenCalledWith(site.email);
    expect(screen.getByText("copied")).toBeTruthy();
    act(() => vi.advanceTimersByTime(1500));
    expect(screen.getByText("copy")).toBeTruthy();
  });

  it("selects the address when the clipboard write is refused", async () => {
    setClipboard({ writeText: vi.fn().mockRejectedValue(new Error("denied")) });
    render(<CopyEmail />);

    await act(async () => fireEvent.click(screen.getByRole("button")));

    expect(screen.getByText("selected")).toBeTruthy();
    expect(window.getSelection()?.toString()).toBe(site.email);
  });

  it("selects the address when there is no clipboard API (http or old browsers)", () => {
    setClipboard(undefined);
    render(<CopyEmail />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("selected")).toBeTruthy();
    expect(window.getSelection()?.toString()).toBe(site.email);
  });
});
