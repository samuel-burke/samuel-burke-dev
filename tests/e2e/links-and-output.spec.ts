import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const pages = ["/", "/work/shiftview/", "/work/study-squad/"];

for (const path of pages) {
  test(`${path}: every link is safe and every same-site link resolves`, async ({ page, request, baseURL }) => {
    const origin = new URL(baseURL!).origin;
    await page.goto(path);
    const links = await page.locator("a[href]").evaluateAll((as) =>
      as.map((a) => ({ href: (a as HTMLAnchorElement).href, target: a.getAttribute("target"), rel: a.getAttribute("rel") })),
    );
    expect(links.length).toBeGreaterThan(5);

    for (const { href, target, rel } of links) {
      const url = new URL(href);
      expect(["http:", "https:", "mailto:"], href).toContain(url.protocol);
      if (url.origin !== origin) expect(url.protocol, `${href} should use https`).not.toBe("http:");
      if (target === "_blank") expect(rel ?? "", `${href} opens a tab without noopener`).toContain("noopener");
    }

    const local = [...new Set(links.map((l) => l.href.split("#")[0]).filter((h) => h.startsWith(origin)))];
    for (const href of local) expect((await request.get(href)).status(), href).toBe(200);
  });

  test(`${path}: every image loads`, async ({ page }) => {
    await page.goto(path);
    const srcs = await page.locator("img").evaluateAll((imgs) => imgs.map((i) => (i as HTMLImageElement).src));
    for (const src of new Set(srcs)) expect((await page.request.get(src)).status(), src).toBe(200);
  });
}

test("the build ships no source maps, env files or secret-looking strings", async ({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "filesystem check, run once");
  test.skip(!!process.env.E2E_BASE_URL, "checks the local build only");
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else files.push(full);
    }
  };
  walk("out");

  expect(files.filter((f) => f.endsWith(".map") || /(^|\/)\.env/.test(f))).toEqual([]);
  const secret = /(sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{30,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
  const leaks = files
    .filter((f) => /\.(html|js|txt|json|css)$/.test(f))
    .filter((f) => secret.test(readFileSync(f, "utf8")));
  expect(leaks).toEqual([]);
});
