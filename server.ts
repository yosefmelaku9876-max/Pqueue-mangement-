import { serve } from "bun";
import { join } from "node:path";

const server = serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // 1. Default to index.html for root
    if (path === "/") path = "/index.html";

    // 2. Try to serve the exact path
    let filePath = join(process.cwd(), path);
    let file = Bun.file(filePath);

    // 3. If doesn't exist, try adding .html (e.g., /contact -> /contact.html)
    if (!(await file.exists())) {
      const htmlPath = filePath + ".html";
      const htmlFile = Bun.file(htmlPath);
      if (await htmlFile.exists()) {
        file = htmlFile;
      }
    }

    if (await file.exists()) {
      return new Response(file);
    }

    // Return 404 if not found
    return new Response("404 Not Found", { status: 404 });
  },
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
