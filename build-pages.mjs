// Génère les pages secondaires (a-propos, confidentialite, conditions) à partir de _pages/*.html
// en réutilisant le <head>, le header et le footer de index.html.
// Usage : node build-pages.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const index = readFileSync("index.html", "utf8");
const pick = (re) => {
  const m = index.match(re);
  if (!m) throw new Error(`Bloc introuvable dans index.html : ${re}`);
  return m[0];
};

const head = pick(/<!doctype html>[\s\S]*?<body>/i);
const header = pick(/<header class="nav"[\s\S]*?<\/header>/);
const footer = pick(/<footer class="footer">[\s\S]*?<\/footer>\s*<a class="wa-float[^"]*"[\s\S]*?<\/a>/);

const absolutize = (html) =>
  html
    .replace(/(href|src)="(?!https?:|mailto:|\/|#)([^"]+)"/g, '$1="/$2"')
    .replace(/href="#(\w[\w-]*)"/g, 'href="/#$1"');

for (const file of readdirSync("_pages").filter((f) => f.endsWith(".html"))) {
  const src = readFileSync(`_pages/${file}`, "utf8");
  const title = src.match(/<!--TITLE:(.*?)-->/)[1];
  const desc = src.match(/<!--DESC:(.*?)-->/)[1];
  const body = src.replace(/<!--(TITLE|DESC):.*?-->\s*/g, "");
  const slug = file.replace(/\.html$/, "");

  const pageHead = head
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${desc}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${desc}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1https://www.bouskine.com/${slug}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1https://www.bouskine.com/${slug}`);

  const out = absolutize(
    `${pageHead}\n\n${header}\n\n<main>\n${body}</main>\n\n${footer}\n\n<script src="script.js"></script>\n</body>\n</html>\n`
  );
  writeFileSync(`${slug}.html`, out);
  console.log(`✓ ${slug}.html`);
}
