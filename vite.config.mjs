import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createReadStream, stat } from "node:fs";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repository = dirname(fileURLToPath(import.meta.url));

// The retained GitHub Pages assets live outside Vite's site/ source directory.
function repositoryAssets() {
  return {
    name: "repository-assets",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (!["GET", "HEAD"].includes(request.method)) return next();
        let pathname;
        try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
        catch { response.writeHead(400); response.end(); return; }
        if (!/^\/(assets|papers)\//.test(pathname)) return next();
        const target = resolve(repository, `.${pathname}`);
        if (!["assets", "papers"].some(folder => target.startsWith(resolve(repository, folder) + sep))) {
          response.writeHead(403); response.end(); return;
        }
        stat(target, (error, info) => {
          if (error || !info.isFile()) return next();
          const types = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".pdf": "application/pdf" };
          response.setHeader("Content-Type", types[extname(target).toLowerCase()] || "application/octet-stream");
          if (request.method === "HEAD") response.end();
          else createReadStream(target).on("error", () => response.destroy()).pipe(response);
        });
      });
    },
  };
}

export default defineConfig({
  base: "/",
  root: "site",
  publicDir: false,
  build: { emptyOutDir: true, outDir: "../dist" },
  optimizeDeps: { include: ["react", "react-dom/client"] },
  plugins: [react(), repositoryAssets()],
});
