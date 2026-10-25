import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// WCAG 2.2 AA rules axe can check automatically, on each page, in both themes, at both viewports (see projects).
for (const path of ["/", "/work/shiftview/"]) {
  for (const theme of ["dark", "light"]) {
    test(`${path} has no axe violations in ${theme} mode`, async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
      // Skip the first-load carve so contrast is measured on the finished logo.
      await page.addInitScript(() => sessionStorage.setItem("sb-cut", "1"));
      await page.goto(path);
      await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(summary).toEqual([]);
    });
  }
}
