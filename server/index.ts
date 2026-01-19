import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createServer() {
  const app = express();
  
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: path.resolve(__dirname, "..", "client"),
  });

  app.use(vite.middlewares);

  // Use a regex or a simple string for the route to avoid path-to-regexp issues with '*'
  app.get(/^(?!\/api).+/, async (req, res) => {
    const url = req.originalUrl;
    try {
      const templatePath = path.resolve(__dirname, "..", "client", "index.html");
      let template = fs.readFileSync(templatePath, 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
        res.status(500).end(e.message);
      } else {
        res.status(500).end("Internal Server Error");
      }
    }
  });

  app.listen(5000, '0.0.0.0', () => {
    console.log('Server running at http://0.0.0.0:5000');
  });
}

createServer().catch(err => {
  console.error(err);
  process.exit(1);
});
