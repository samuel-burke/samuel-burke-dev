import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const alias = { "@": fileURLToPath(new URL("./src", import.meta.url)) };

export default defineConfig({
  plugins: [react()],
  resolve: { alias },
  test: {
    // Unit: pure logic in node. Integration: real components with their real dependencies (cmdk, Radix, next-themes)
    // rendered in jsdom. E2E lives in tests/e2e and runs under Playwright against the static export.
    projects: [
      { extends: true, test: { name: "unit", environment: "node", include: ["tests/unit/**/*.test.ts"] } },
      {
        extends: true,
        test: {
          name: "integration",
          environment: "jsdom",
          include: ["tests/integration/**/*.test.tsx"],
          setupFiles: ["tests/integration/setup.ts"],
        },
      },
    ],
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/components/**"],
      // Server-rendered pages, generated metadata and path data are covered by the E2E suite instead.
      exclude: ["src/components/logo-paths.ts"],
      reporter: ["text", "html", "json-summary"],
      thresholds: { lines: 85, branches: 80, functions: 85, statements: 85 },
    },
  },
});
