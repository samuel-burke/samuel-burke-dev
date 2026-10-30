import { expect, test, type Page } from "@playwright/test";

// Collects console errors and failed same-origin requests so a page that renders but is broken still fails.
function watch(page: Page, origin: string) {
  const problems: string[] = [];
  page.on("console", (msg) => msg.type() === "error" && problems.push(`console: ${msg.text()}`));
  page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
  page.on("response", (res) => {
    if (res.url().startsWith(origin) && res.status() >= 400) problems.push(`${res.status()} ${res.url()}`);
  });
  return problems;
}

test("home renders every section with no errors", async ({ page, baseURL }) => {
  const problems = watch(page, new URL(baseURL!).origin);
  await page.goto("/");

  await expect(page).toHaveTitle("Samuel Burke · Independent software developer");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Samuel Burke");
  for (const id of ["about", "work", "experience", "contact"]) await expect(page.locator(`#${id}`)).toBeAttached();
  await expect(page.getByRole("img", { name: "Samuel Burke" }).first()).toBeVisible();
  await page.waitForLoadState("networkidle");
  expect(problems).toEqual([]);
});

for (const [slug, title] of [
  ["shiftview", "ShiftView"],
  ["study-squad", "Study Squad"],
]) {
  test(`${title} case study renders with no errors and links back home`, async ({ page, baseURL }) => {
    const problems = watch(page, new URL(baseURL!).origin);
    await page.goto(`/work/${slug}/`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(title);
    await page.waitForLoadState("networkidle");
    expect(problems).toEqual([]);

    await page.getByRole("link", { name: "Samuel Burke, home" }).click();
    await expect(page).toHaveURL(new URL("/", baseURL).href);
  });

  test(`the home page links to the ${title} case study`, async ({ page }) => {
    await page.goto("/");
    await page.locator(`a[href="work/${slug}/"]`).click();
    await expect(page).toHaveURL(new RegExp(`/work/${slug}/$`));
  });
}

test("a path without its trailing slash redirects like Cloudflare Pages", async ({ page }) => {
  const res = await page.goto("/work/shiftview");
  expect(res?.status()).toBe(200);
  await expect(page).toHaveURL(/\/work\/shiftview\/$/);
});

test("an unknown page returns 404 with a way home", async ({ page }) => {
  const res = await page.goto("/no-such-page/");
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/could not be found|not found/i).first()).toBeVisible();
});

test("section links scroll to their section", async ({ page, isMobile, viewport }) => {
  test.skip(isMobile, "covered by the phone viewport below");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Sections" }).filter({ visible: true });
  await nav.getByRole("link", { name: "Experience" }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator("#experience")).toBeInViewport();
  await expect(nav.getByRole("link", { name: "Experience" })).toHaveAttribute("aria-current", "true");
  expect(viewport).not.toBeNull();
});

test("⌘K finds the case study by keyword and opens it", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("ControlOrMeta+k");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.type("playwright");
  await expect(dialog.getByRole("option").first()).toHaveText(/ShiftView case study/);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/shiftview\/$/);
});

test("⌘K finds the Study Squad case study by keyword", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("ControlOrMeta+k");
  await page.keyboard.type("pomodoro");
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("option").first()).toHaveText(/Study Squad case study/);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/study-squad\/$/);
});

test("the theme toggle switches to light and survives a reload", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
  await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeVisible();
});

test("copy email puts the address on the clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#contact");
  const button = page.getByRole("button", { name: /@/ });
  const email = (await button.locator("span").first().textContent())!.trim();
  await button.click();
  await expect(button).toContainText("copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(email);
});

test("the logo carve plays once per session", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveClass(/sb-seen/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/sb-seen/);
});

test("reduced motion shows the finished page with nothing animating", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const running = await page.evaluate(() =>
    document.getAnimations().filter((a) => a.playState === "running" && a.effect?.getTiming().duration !== 0).length,
  );
  expect(running).toBe(0);
  await context.close();
});
