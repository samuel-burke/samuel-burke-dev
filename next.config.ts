import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves the static files in out/.
  output: "export",
  images: { unoptimized: true },
  // /work/shiftview/ is exported as work/shiftview/index.html, so relative asset paths resolve the same everywhere.
  trailingSlash: true,
  // PREVIEW_RELATIVE=1 builds with relative asset paths so out/ can be opened from any folder.
  assetPrefix: process.env.PREVIEW_RELATIVE ? "." : undefined,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
