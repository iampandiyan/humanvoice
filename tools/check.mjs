// Checks the built site. Run after `node tools/build.mjs`:   node tools/check.mjs
// Exits with code 1 if anything is broken (missing file, duplicate title, bad JSON-LD, placeholder text...).
import fs from "node:fs";
import path from "node:path";
import { SITE, PRODUCTS } from "./products.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const errors = [];
const warns = [];
const err = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warns.push(`${f}: ${m}`);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "content", "tools", "node_modules"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    // Search-engine ownership files (e.g. google1a2b3c.html) are one bare line, not pages: never check or list them.
    else if (e.name.endsWith(".html") && !/^google[0-9a-f]+\.html$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const titles = new Map();
const canonicals = new Set();
const sitemap = fs.existsSync(path.join(ROOT, "sitemap.xml")) ? fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8") : "";
if (!sitemap) err("sitemap.xml", "missing (run node tools/build.mjs)");

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const html = fs.readFileSync(file, "utf8");
  const is404 = rel === "404.html";

  // Titles, description, canonical
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (!title) err(rel, "no <title>");
  else {
    if (titles.has(title)) err(rel, `duplicate title with ${titles.get(title)}: "${title}"`);
    titles.set(title, rel);
    if (title.length > 70) warn(rel, `title is ${title.length} chars (aim for 60 or fewer)`);
  }
  if (!is404) {
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    if (!desc) err(rel, "no meta description");
    else if (desc.length > 165) warn(rel, `description is ${desc.length} chars`);
    const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    if (!canonical) err(rel, "no canonical link");
    else {
      if (canonicals.has(canonical)) err(rel, `duplicate canonical ${canonical}`);
      canonicals.add(canonical);
      if (!canonical.startsWith(SITE.url)) err(rel, `canonical not on ${SITE.url}: ${canonical}`);
      if (!sitemap.includes(`<loc>${canonical}</loc>`)) err(rel, `canonical not in sitemap.xml: ${canonical}`);
    }
    if (!/<html lang="/.test(html)) err(rel, "missing lang attribute");
    if (!/name="viewport"/.test(html) && rel !== "shared-ai-budget-tracker/tutorial.html") err(rel, "missing viewport meta");
  }

  // Headings
  const h1 = (html.match(/<h1[ >]/g) || []).length;
  if (!is404 && h1 !== 1) err(rel, `${h1} <h1> elements (expected exactly 1)`);

  // JSON-LD must parse
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { err(rel, "invalid JSON-LD: " + e.message); }
  }

  // Images need alt text and size
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]+"/.test(m[0])) err(rel, `image without alt text: ${m[0].slice(0, 80)}`);
    if (!/\bwidth="\d+"/.test(m[0]) || !/\bheight="\d+"/.test(m[0])) warn(rel, `image without width/height: ${m[0].slice(0, 80)}`);
  }

  // Relative links / assets must exist
  for (const m of html.matchAll(/\b(?:href|src)="([^"#?][^"]*)"/g)) {
    const ref = m[1];
    if (/^(https?:|\/\/|mailto:|tel:|data:|javascript:)/.test(ref)) continue;
    let target = path.resolve(path.dirname(file), ref.split("#")[0].split("?")[0]);
    if (ref.endsWith("/") || ref === "./" || ref === "../") target = path.join(target, "index.html");
    if (!fs.existsSync(target)) err(rel, `broken link/asset: ${ref}`);
  }

  // Placeholders must not ship
  if (/TODO|REPLACE_|lorem ipsum|YOUR_/i.test(html)) err(rel, "placeholder text found (TODO / REPLACE_ / YOUR_)");
}

// Every product has its pages, and the policy text is inside the privacy page unchanged
for (const p of PRODUCTS) {
  const need = ["index.html", "support.html", ...(p.about ? ["about.html"] : []), ...(p.hasPrivacy ? ["privacy.html"] : []), ...(p.hasDelete ? ["delete-account.html"] : []), ...(p.hasTutorial ? ["tutorial.html"] : [])];
  for (const n of need) if (!fs.existsSync(path.join(ROOT, p.slug, n))) err(p.slug, `missing ${n}`);
  if (p.hasPrivacy) {
    const frag = fs.readFileSync(path.join(ROOT, "content", p.slug, "privacy.body.html"), "utf8").trim();
    const page = fs.readFileSync(path.join(ROOT, p.slug, "privacy.html"), "utf8");
    if (!page.includes(frag)) err(`${p.slug}/privacy.html`, "policy text differs from content/" + p.slug + "/privacy.body.html");
  }
  if (!fs.existsSync(path.join(ROOT, "assets/og", p.slug + ".png"))) err(p.slug, "no share image (run node tools/og.mjs)");
}
for (const f of ["robots.txt", "llms.txt", "site.webmanifest", "favicon.svg", "apple-touch-icon.png", "404.html", ".nojekyll"]) {
  if (!fs.existsSync(path.join(ROOT, f))) err(f, "missing");
}
if (fs.existsSync(path.join(ROOT, "CNAME"))) warn("CNAME", "present: make sure humanvoice.in DNS points to GitHub Pages first");

console.log(`Checked ${files.length} HTML pages.`);
for (const w of warns) console.log("WARN  " + w);
for (const e of errors) console.log("ERROR " + e);
console.log(errors.length ? `\n${errors.length} error(s)` : "\nAll checks passed.");
process.exit(errors.length ? 1 : 0);
