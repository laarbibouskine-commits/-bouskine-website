// Génère les pages secondaires, le blog (FR / EN / AR) et le sitemap à partir de index.html.
//   _pages/*.html  → a-propos.html, confidentialite.html, conditions.html
//   _blog/*.html   → blog/…, en/blog/…, ar/blog/… (+ pages d'index du blog)
// Usage : node build-pages.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const SITE = "https://www.bouskine.com";
const LANGS = ["fr", "en", "ar"];
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

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const write = (file, html) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`✓ ${file}`);
};

function buildHead({ lang = "fr", fixed = false, title, desc, path, type = "website", extra = "" }) {
  const locale = { fr: "fr_FR", en: "en_US", ar: "ar_MA" }[lang];
  const url = `${SITE}${path}`;
  return head
    .replace(/<html[^>]*>/, fixed ? `<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}" data-fixed-lang="${lang}">` : "$&")
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(desc)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(desc)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:locale" content=")[^"]*/, `$1${locale}`)
    .replace(/(<meta property="og:type" content=")[^"]*/, `$1${type}`)
    .replace("</head>", `${extra}</head>`);
}

const page = (headHtml, body) =>
  absolutize(`${headHtml}\n\n${header}\n\n<main>\n${body}</main>\n\n${footer}\n\n<script src="script.js"></script>\n</body>\n</html>\n`);

const sitemap = [];

// ---------- Pages secondaires ----------
for (const file of readdirSync("_pages").filter((f) => f.endsWith(".html"))) {
  const src = readFileSync(`_pages/${file}`, "utf8");
  const title = src.match(/<!--TITLE:(.*?)-->/)[1];
  const desc = src.match(/<!--DESC:(.*?)-->/)[1];
  const body = src.replace(/<!--(TITLE|DESC):.*?-->\s*/g, "");
  const slug = file.replace(/\.html$/, "");
  write(`${slug}.html`, page(buildHead({ title, desc, path: `/${slug}` }), body));
  sitemap.push({ path: `/${slug}`, priority: slug === "a-propos" ? "0.7" : "0.2", freq: slug === "a-propos" ? "monthly" : "yearly" });
}

// ---------- Blog ----------
const UI = {
  fr: {
    home: "Accueil", blog: "Blog",
    indexTitle: "Blog — Automatisation n8n & IA | Bouskine Digital Solutions",
    indexDesc: "Guides pratiques sur l'automatisation avec n8n et l'IA : workflows réels, outils utilisés et points d'attention, expliqués étape par étape.",
    h1: "Guides & tutoriels", sub: "Comment je construis mes automatisations n8n et IA, étape par étape : problèmes réels, workflows, outils et points d'attention.",
    read: "Lire l'article →", min: "min de lecture", by: "Par Laarbi Bouskine",
    ctaH: "Vous voulez un workflow comme celui-ci ?", ctaP: "Expliquez-moi votre processus actuel : je vous indique ce qui peut être automatisé.",
    cta1: "Parler de mon projet", cta2: "Écrire sur WhatsApp", related: "À lire aussi", date: "fr-FR",
  },
  en: {
    home: "Home", blog: "Blog",
    indexTitle: "Blog — n8n & AI Automation | Bouskine Digital Solutions",
    indexDesc: "Practical guides on automation with n8n and AI: real workflows, the tools used and what to watch out for, explained step by step.",
    h1: "Guides & tutorials", sub: "How I build my n8n and AI automations, step by step: real problems, workflows, tools and things to watch out for.",
    read: "Read the article →", min: "min read", by: "By Laarbi Bouskine",
    ctaH: "Want a workflow like this one?", ctaP: "Tell me about your current process and I'll show you what can be automated.",
    cta1: "Discuss my project", cta2: "Message on WhatsApp", related: "Read next", date: "en-US",
  },
  ar: {
    home: "الرئيسية", blog: "المدونة",
    indexTitle: "المدونة — أتمتة n8n والذكاء الاصطناعي | Bouskine Digital Solutions",
    indexDesc: "أدلة عملية حول الأتمتة باستخدام n8n والذكاء الاصطناعي: سير عمل حقيقي، الأدوات المستخدمة ونقاط الانتباه، خطوة بخطوة.",
    h1: "أدلة ودروس عملية", sub: "كيف أبني أتمتة n8n والذكاء الاصطناعي، خطوة بخطوة: مشاكل حقيقية، سير عمل، أدوات ونقاط يجب الانتباه إليها.",
    read: "اقرأ المقال ←", min: "دقائق قراءة", by: "بقلم العربي بوسكين",
    ctaH: "هل تريد سير عمل مثل هذا؟", ctaP: "صِف لي عمليتك الحالية، وسأوضح لك ما يمكن أتمتته.",
    cta1: "لنتحدث عن مشروعي", cta2: "راسلني على واتساب", related: "اقرأ أيضًا", date: "ar-MA",
  },
};
const blogBase = (l) => (l === "fr" ? "/blog" : `/${l}/blog`);

const posts = readdirSync("_blog").filter((f) => f.endsWith(".html")).map((f) => {
  const src = readFileSync(`_blog/${f}`, "utf8");
  const meta = (k) => src.match(new RegExp(`<!--${k}:(.*?)-->`))[1];
  const body = src.replace(/<!--[A-Z]+:.*?-->\s*/g, "");
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const lang = meta("LANG");
  const slug = meta("SLUG");
  return { id: meta("ID"), lang, slug, title: meta("TITLE"), desc: meta("DESC"), tag: meta("TAG"), date: meta("DATE"),
    body, minutes: Math.max(1, Math.round(words / 200)), path: `${blogBase(lang)}/${slug}` };
}).sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));

const byId = {};
posts.forEach((p) => ((byId[p.id] ||= {})[p.lang] = p));

const hreflang = (paths) =>
  LANGS.filter((l) => paths[l]).map((l) => `  <link rel="alternate" hreflang="${l}" href="${SITE}${paths[l]}">\n`).join("") +
  `  <link rel="alternate" hreflang="x-default" href="${SITE}${paths.fr}">\n`;

const fmtDate = (d, l) => new Date(d + "T12:00:00Z").toLocaleDateString(UI[l].date, { year: "numeric", month: "long", day: "numeric" });

const card = (p) => `        <a class="post-card" href="${p.path}">
          <span class="tag">${p.tag}</span>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <span class="meta">${fmtDate(p.date, p.lang)} · ${p.minutes} ${UI[p.lang].min}</span>
          <span class="more-link">${UI[p.lang].read}</span>
        </a>`;

const ld = (obj) => `  <script type="application/ld+json">${JSON.stringify(obj)}</script>\n`;
const author = { "@type": "Person", name: "Laarbi Bouskine", url: `${SITE}/a-propos` };
const publisher = { "@type": "Organization", name: "Bouskine Digital Solutions", url: `${SITE}/`, logo: { "@type": "ImageObject", url: `${SITE}/assets/logo-full.jpg` } };

for (const p of posts) {
  const t = UI[p.lang];
  const alt = Object.fromEntries(LANGS.filter((l) => byId[p.id][l]).map((l) => [l, byId[p.id][l].path]));
  const extra = hreflang(alt) + ld({
    "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.desc, inLanguage: p.lang,
    datePublished: p.date, dateModified: p.date, author, publisher, image: `${SITE}/assets/og-image.png`,
    mainEntityOfPage: `${SITE}${p.path}`,
  });
  const related = posts.filter((o) => o.lang === p.lang && o.id !== p.id);
  const body = `<article>
<section class="page-hero">
  <div class="container">
    <p class="breadcrumb"><a href="/">${t.home}</a> / <a href="${blogBase(p.lang)}">${t.blog}</a></p>
    <span class="tag">${p.tag}</span>
    <h1>${p.title}</h1>
    <div class="post-meta"><span>${t.by}</span><span>${fmtDate(p.date, p.lang)}</span><span>${p.minutes} ${t.min}</span></div>
  </div>
</section>
<div class="container prose">
${p.body}
  <aside class="post-cta">
    <h2>${t.ctaH}</h2>
    <p>${t.ctaP}</p>
    <div class="cta-row"><a class="btn" href="/#contact">${t.cta1}</a><a class="btn btn-ghost wa-link" href="https://wa.me/212687184542" target="_blank" rel="noopener">${t.cta2}</a></div>
  </aside>
  <section class="related">
    <h2>${t.related}</h2>
    <div class="post-cards">
${related.map(card).join("\n")}
    </div>
  </section>
</div>
</article>
`;
  write(`${p.path.slice(1)}.html`, page(buildHead({ lang: p.lang, fixed: true, title: `${p.title} | Bouskine`, desc: p.desc, path: p.path, type: "article", extra }), body));
  sitemap.push({ path: p.path, priority: "0.8", freq: "monthly", alt, lastmod: p.date });
}

const indexAlt = Object.fromEntries(LANGS.map((l) => [l, blogBase(l)]));
for (const l of LANGS) {
  const t = UI[l];
  const list = posts.filter((p) => p.lang === l);
  const extra = hreflang(indexAlt) + ld({
    "@context": "https://schema.org", "@type": "Blog", name: t.indexTitle, description: t.indexDesc, inLanguage: l, url: `${SITE}${blogBase(l)}`, publisher,
    blogPost: list.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE}${p.path}`, datePublished: p.date })),
  });
  const body = `<section class="page-hero">
  <div class="container">
    <p class="breadcrumb"><a href="/">${t.home}</a> / ${t.blog}</p>
    <h1>${t.h1}</h1>
    <p>${t.sub}</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="post-cards">
${list.map(card).join("\n")}
    </div>
  </div>
</section>
`;
  write(`${blogBase(l).slice(1)}/index.html`, page(buildHead({ lang: l, fixed: true, title: t.indexTitle, desc: t.indexDesc, path: blogBase(l), extra }), body));
  sitemap.push({ path: blogBase(l), priority: "0.8", freq: "weekly", alt: indexAlt });
}

// ---------- Sitemap ----------
const today = new Date().toISOString().slice(0, 10);
const entries = [{ path: "/", priority: "1.0", freq: "weekly" }, ...sitemap].map((e) => {
  const links = e.alt ? LANGS.filter((l) => e.alt[l]).map((l) => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${e.alt[l]}"/>`).join("") : "";
  return `  <url>\n    <loc>${SITE}${e.path}</loc>\n    <lastmod>${e.lastmod || today}</lastmod>\n    <changefreq>${e.freq}</changefreq>\n    <priority>${e.priority}</priority>${links}\n  </url>`;
});
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`);
