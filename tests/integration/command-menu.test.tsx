import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CommandMenu } from "@/components/command-menu";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";

function setup() {
  const user = userEvent.setup();
  const utils = render(
    <ThemeProvider>
      <CommandMenu />
      <section id="about" />
      <input aria-label="Other field" />
    </ThemeProvider>,
  );
  return { user, ...utils };
}

async function openPalette(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: "Search" }));
  return screen.findByRole("dialog");
}

const options = () => screen.queryAllByRole("option").map((o) => o.textContent);

describe("CommandMenu", () => {
  it("opens with ⌘K, Ctrl+K and /, and ⌘K closes it again", async () => {
    const { user } = setup();
    expect(screen.queryByRole("dialog")).toBeNull();

    await user.keyboard("{Meta>}k{/Meta}");
    expect(await screen.findByRole("dialog")).toBeTruthy();
    await user.keyboard("{Meta>}k{/Meta}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    await user.keyboard("{Control>}K{/Control}");
    expect(await screen.findByRole("dialog")).toBeTruthy();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    await user.keyboard("/");
    expect(await screen.findByRole("dialog")).toBeTruthy();
  });

  it("does not hijack / while someone types in a field", async () => {
    const { user } = setup();
    const field = screen.getByLabelText("Other field");
    await user.type(field, "a/b");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect((field as HTMLInputElement).value).toBe("a/b");
  });

  it("filters by label and by keyword", async () => {
    const { user } = setup();
    await openPalette(user);

    // cmdk ranks fuzzy matches, so the keyword hit has to come first rather than alone.
    await user.keyboard("resume");
    expect(options()[0]).toBe("Experience section");
    await user.clear(screen.getByRole("combobox"));
    await user.keyboard("scheduling");
    expect(options()[0]).toBe("Work: ShiftView section");

    await user.clear(screen.getByRole("combobox"));
    await user.keyboard("zzzz");
    expect(options()).toEqual([]);
    expect(screen.getByText(/No matches/)).toBeTruthy();
  });

  it("keeps hidden commands out of the list until most of one is typed", async () => {
    const { user } = setup();
    await openPalette(user);
    expect(screen.queryByText("You found something")).toBeNull();

    await user.keyboard("cloc");
    expect(screen.queryByText("You found something")).toBeNull();
    await user.keyboard("k");
    expect(screen.getByText("You found something")).toBeTruthy();
  });

  it("clock in: closes the palette and announces a toast", async () => {
    const { user } = setup();
    await openPalette(user);
    await user.keyboard("clock in{Enter}");

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(screen.getByRole("status").textContent).toMatch(/^Clocked in at .+\. You’re 2 minutes late\.$/);
  });

  it("engrave: asks the logo to replay", async () => {
    const { user } = setup();
    const replay = vi.fn();
    window.addEventListener("sb:engrave", replay);
    await openPalette(user);
    await user.keyboard("engrave{Enter}");
    window.removeEventListener("sb:engrave", replay);
    expect(replay).toHaveBeenCalledOnce();
  });

  it("navigates to a section and closes", async () => {
    const { user } = setup();
    const scroll = vi.spyOn(document.getElementById("about")!, "scrollIntoView");
    await openPalette(user);
    await user.click(screen.getByRole("option", { name: /About/ }));

    expect(scroll).toHaveBeenCalledWith({ behavior: "smooth" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("jumps without smooth scrolling when reduced motion is on", async () => {
    const real = window.matchMedia;
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({ ...real(query), matches: query.includes("reduce") }));
    const { user } = setup();
    const scroll = vi.spyOn(document.getElementById("about")!, "scrollIntoView");
    await openPalette(user);
    await user.click(screen.getByRole("option", { name: /About/ }));
    expect(scroll).toHaveBeenCalledWith({ behavior: "auto" });
  });

  it("toggles the theme on the html element", async () => {
    const { user } = setup();
    await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(true));
    await openPalette(user);
    await user.click(screen.getByRole("option", { name: /Toggle theme/ }));
    await waitFor(() => expect(document.documentElement.classList.contains("light")).toBe(true));
  });

  it("copies the email address", async () => {
    const { user } = setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    await openPalette(user);
    await user.click(screen.getByRole("option", { name: /Copy email/ }));
    expect(writeText).toHaveBeenCalledWith(site.email);
  });

  it("opens outside links in a new tab without giving them access to this one", async () => {
    const { user } = setup();
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    const dialog = await openPalette(user);
    for (const name of ["Open ShiftView", "GitHub", "LinkedIn", "View this site’s source"]) {
      if (!screen.queryByRole("dialog")) await openPalette(user);
      await user.click(within(screen.getByRole("dialog") ?? dialog).getByRole("option", { name: new RegExp(name) }));
    }
    expect(open.mock.calls).toEqual([
      ["https://shiftview.app", "_blank", "noopener,noreferrer"],
      [site.github, "_blank", "noopener,noreferrer"],
      [site.linkedin, "_blank", "noopener,noreferrer"],
      [site.repo, "_blank", "noopener,noreferrer"],
    ]);
  });
});

describe("CommandMenu: sudo hire samuel", () => {
  it("announces, then opens a mail draft to the site email", async () => {
    const user = userEvent.setup();
    const assign = vi.fn();
    vi.spyOn(window, "location", "get").mockReturnValue({
      ...window.location,
      set href(value: string) {
        assign(value);
      },
    } as unknown as Location);
    render(
      <ThemeProvider>
        <CommandMenu />
      </ThemeProvider>,
    );
    await openPalette(user);
    await user.keyboard("sudo hire samuel{Enter}");

    expect(screen.getByRole("status").textContent).toBe("Permission granted. Opening your email…");
    await waitFor(() => expect(assign).toHaveBeenCalledWith(`mailto:${site.email}?subject=Let%E2%80%99s%20talk`));
  });
});
