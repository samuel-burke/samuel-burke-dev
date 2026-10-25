import { defineConfig, devices } from "@playwright/test";

const port = 4173;
// Set E2E_BASE_URL to run the suite against a deployed site (staging or production) instead of the local out/.
const deployed = process.env.E2E_BASE_URL;

// By default E2E runs against the production static export (npm run build first), served like Cloudflare Pages.
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: deployed ?? `http://127.0.0.1:${port}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "phone", use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 812 }, hasTouch: true } },
  ],
  webServer: deployed
    ? undefined
    : {
        command: `node scripts/serve-out.mjs ${port}`,
        url: `http://127.0.0.1:${port}/`,
        reuseExistingServer: !process.env.CI,
      },
});
