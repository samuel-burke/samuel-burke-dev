// Serves the static export in out/ the way Cloudflare Pages does, so E2E tests run against the real build:
// /dir/ serves dir/index.html, /dir redirects to /dir/, and unknown paths get 404.html with a 404 status.
// Usage: node scripts/serve-out.mjs [port]
import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("out");
const port = Number(process.argv[2] ?? process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

function file(path) {
  try {
    return statSync(path);
  } catch {
    return undefined;
  }
}

function send(res, status, path) {
  res.writeHead(status, { "content-type": types[extname(path)] ?? "application/octet-stream" });
  createReadStream(path).pipe(res);
}

createServer((req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return send(res, 400, join(root, "404.html"));
  }
  const target = normalize(join(root, decoded));
  // Never serve anything outside out/ (e.g. /../package.json).
  if (target !== root && !target.startsWith(root + "/")) return send(res, 404, join(root, "404.html"));

  const stat = file(target);
  if (stat?.isFile()) return send(res, 200, target);
  if (stat?.isDirectory()) {
    if (!pathname.endsWith("/")) {
      res.writeHead(308, { location: pathname + "/" });
      return res.end();
    }
    if (file(join(target, "index.html"))) return send(res, 200, join(target, "index.html"));
  }
  send(res, 404, join(root, "404.html"));
}).listen(port, "127.0.0.1", () => console.log(`Serving out/ at http://127.0.0.1:${port}`));
