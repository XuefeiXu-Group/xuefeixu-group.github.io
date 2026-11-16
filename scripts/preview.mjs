import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repository = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const root = existsSync(resolve(repository, "dist/index.html")) ? resolve(repository, "dist") : repository;
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".gif": "image/gif", ".ico": "image/x-icon", ".pdf": "application/pdf" };
let port = Number(process.env.PORT || 4173);
let attempts = 0;

const server = createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405); response.end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname); }
  catch { response.writeHead(400); response.end("Bad request"); return; }
  if (/(?:^|\/)\./.test(pathname)) { response.writeHead(404); response.end("Not found"); return; }
  const assetRequest = /^\/(assets|papers)\//.test(pathname);
  const pageRequest = /^\/(?:$|index\.html$|(?:members|research|publications|teaching|software|links|contact)(?:\/[^.]*)?$)/.test(pathname);
  let target;
  if (assetRequest) {
    target = resolve(root, `.${pathname}`);
    const allowed = [resolve(root, "assets") + sep, resolve(root, "papers") + sep];
    if (!allowed.some(directory => target.startsWith(directory))) { response.writeHead(403); response.end(); return; }
  } else if (pageRequest || !extname(pathname)) target = resolve(root, "index.html");
  else { response.writeHead(404); response.end("Not found"); return; }
  if (!existsSync(target) || !statSync(target).isFile()) { response.writeHead(404); response.end("Not found"); return; }
  response.writeHead(200, { "Content-Type": mime[extname(target).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  if (request.method === "HEAD") response.end();
  else createReadStream(target).on("error", () => response.destroy()).pipe(response);
});

server.on("error", error => {
  if (error.code === "EADDRINUSE" && attempts++ < 10) { port++; server.listen(port, "127.0.0.1"); }
  else { console.error(error.message); process.exitCode = 1; }
});
server.listen(port, "127.0.0.1", () => {
  const url = `http://127.0.0.1:${port}/`;
  console.log(`\n  Xuefei Xu's Group — local preview\n\n  ${url}\n\n  Keep this window open. Press Ctrl+C to stop.\n`);
});
