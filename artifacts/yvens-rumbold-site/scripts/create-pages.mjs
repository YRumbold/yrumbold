import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const basePath = process.env.BASE_PATH;

if (!basePath || !basePath.startsWith("/") || !basePath.endsWith("/")) {
  throw new Error("BASE_PATH must be an absolute path ending with a slash.");
}

const outputDir = path.resolve(import.meta.dirname, "../dist/public");
const indexPath = path.join(outputDir, "index.html");
const indexHtml = await readFile(indexPath, "utf8");

if (!indexHtml.includes("</head>")) {
  throw new Error("The Vite build did not produce a valid index.html.");
}

const routeHtml = indexHtml.replace(
  "</head>",
  `<script>
    if (window.location.pathname.endsWith("/") && window.location.pathname !== ${JSON.stringify(basePath)}) {
      window.history.replaceState(null, "", window.location.pathname.slice(0, -1) + window.location.search + window.location.hash);
    }
  </script>
  </head>`,
);

for (const route of ["research", "cv", "contact", "teaching"]) {
  const routeDir = path.join(outputDir, route);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), routeHtml);
}

await writeFile(path.join(outputDir, "404.html"), indexHtml);
await writeFile(path.join(outputDir, ".nojekyll"), "");
