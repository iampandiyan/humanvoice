// Generates the whole static site from tools/products.mjs and content/*.
//   node tools/build.mjs        (Node 18+; no dependencies)
// Output goes next to this folder (index.html, <product>/*.html, sitemap.xml, robots.txt, llms.txt, ...).
// Pages use relative links, so the site works both at https://<user>.github.io/humanvoice/ and at https://humanvoice.in/.
import fs from "node:fs";
import path from "node:path";
import { SITE, PRODUCTS } from "./products.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const TODAY = new Date().toISOString().slice(0, 10);
const pages = []; // for the sitemap: { loc, priority }

/* ---------- small helpers ---------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const write = (rel, content) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const up = (depth) => (depth === 0 ? "" : "../".repeat(depth));
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
const clip = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…");
const firstSentence = (s) => (s.match(/^.*?[.!?](\s|$)/) || [s])[0].trim();

function imageSize(rel) {
  const file = path.join(ROOT, rel);
  if (rel.endsWith(".svg")) return { w: 512, h: 512 };
  const b = fs.readFileSync(file);
  if (rel.endsWith(".png")) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xc3) return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
    i += 2 + b.readUInt16BE(i + 2);
  }
  throw new Error("cannot read size of " + rel);
}

function productImages(p) {
  const dir = `assets/img/${p.slug}`;
  const files = exists(dir) ? fs.readdirSync(path.join(ROOT, dir)) : [];
  const iconFile = ["icon.png", "icon.svg"].find((f) => files.includes(f));
  const icon = iconFile ? { src: `${dir}/${iconFile}`, ...imageSize(`${dir}/${iconFile}`) } : null;
  const shots = files
    .filter((f) => /^screenshot-\d+\.(jpg|png)$/.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))
    .map((f) => ({ src: `${dir}/${f}`, ...imageSize(`${dir}/${f}`) }));
  const og = exists(`assets/og/${p.slug}.png`) ? `assets/og/${p.slug}.png` : icon && icon.src;
  return { icon, shots, og };
}
for (const p of PRODUCTS) p.img = productImages(p);

const img = (info, alt, { eager = false, cls = "" } = {}, depth = 0) =>
  `<img${cls ? ` class="${cls}"` : ""} src="${up(depth)}${info.src}" width="${info.w}" height="${info.h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

const storeButtons = (p, depth) => {
  const out = [];
  if (p.stores.apple) out.push(`<a class="btn" href="${p.stores.apple}" rel="noopener">Download on the App Store</a>`);
  else if (!p.androidOnly) out.push(`<span class="btn btn--soon" aria-disabled="true">App Store: coming soon</span>`);
  if (p.stores.play) out.push(`<a class="btn" href="${p.stores.play}" rel="noopener">Get it on Google Play</a>`);
  else out.push(`<span class="btn btn--soon" aria-disabled="true">Google Play: coming soon</span>`);
  return `<div class="btn-row">${out.join("")}</div>`;
};
// "More details" opens the app's About page (or its product page while it has no About page yet).
const linkButtons = (p, depth, { details = true } = {}) => {
  const b = up(depth) + p.slug + "/";
  const more = details
    ? `<a class="btn btn--ghost btn--more" href="${b}${p.about ? "about.html" : ""}" aria-label="More details about ${esc(p.name)}">More details &rarr;</a>`
    : "";
  return `<div class="btn-row btn-row--links${details ? " btn-row--three" : ""}">${more}<a class="btn btn--ghost" href="${b}support.html">Support</a><a class="btn btn--ghost" href="${b}privacy.html">Privacy policy</a></div>`;
};

const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: url })),
});
const faqLd = (faq) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});
const publisherLd = { "@type": "Organization", name: SITE.name, url: SITE.url };

/* ---------- page shell ---------- */
function shell({ depth, title, description, canonicalPath, ogImage, ogAlt, ogType = "website", body, jsonLd = [], langs = "" }) {
  const u = up(depth);
  const canonical = `${SITE.url}/${canonicalPath}`;
  const image = ogImage ? `${SITE.url}/${ogImage}` : `${SITE.url}/assets/og/home.png`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f3f8fd">
<meta name="author" content="${esc(SITE.owner)}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta property="og:image:alt" content="${esc(ogAlt || title)}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<link rel="icon" href="${u}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${u}apple-touch-icon.png">
<link rel="manifest" href="${u}site.webmanifest">
<link rel="stylesheet" href="${u}assets/style.css">
${jsonLd.map(ld).join("\n")}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap">
<a class="brand" href="${u || "./"}">${SITE.name}</a>
<nav class="nav" aria-label="Main"><a href="${u}#apps">Apps</a><a href="${u}#contact">Contact</a></nav>
</div></header>
<main id="main"${langs ? ` data-langs="${langs}"` : ""}>
${body}
</main>
<footer class="site-footer"><div class="wrap">
<div><strong>${SITE.name}</strong> &middot; ${esc(SITE.tagline)}<br>&copy; ${SITE.year} ${esc(SITE.owner)}</div>
<nav aria-label="Privacy policies"><span>Privacy:</span>${PRODUCTS.map((p) => `<a href="${u}${p.slug}/privacy.html">${esc(p.name)}</a>`).join("")}</nav>
</div></footer>
${langs ? `<script src="${u}assets/translate.js" defer></script>` : ""}
</body>
</html>
`;
}

function crumbs(depth, trail) {
  // trail: [[label, relHref|null], ...] after "Home"
  const u = up(depth);
  const parts = [`<a href="${u || "./"}">Home</a>`, ...trail.map(([l, h]) => (h ? `<a href="${h}">${esc(l)}</a>` : `<span aria-current="page">${esc(l)}</span>`))];
  return `<nav class="crumbs wrap" aria-label="Breadcrumb">${parts.join(" &rsaquo; ")}</nav>`;
}
const savePage = (rel, html, priority = "0.6") => {
  write(rel, html);
  const loc = rel === "index.html" ? SITE.url + "/" : `${SITE.url}/${rel.replace(/index\.html$/, "")}`;
  pages.push({ loc, priority });
};

/* ---------- home ---------- */
function layer(p) {
  const { icon, shots } = p.img;
  const two = shots.length >= 3 ? [shots[1], shots[2]] : shots.slice(0, 2);
  const media = two.length
    ? `<div class="shots">${two.map((s, i) => `<div class="phone">${img(s, `${p.name} app screenshot ${i + 1}`)}</div>`).join("")}</div>`
    : `<div class="placeholder-art">${icon ? img(icon, `${p.name} app icon`) : ""}</div>`;
  const badge = p.status === "soon" ? '<span class="badge">Coming soon</span>' : "";
  return `<section class="layer" id="${p.slug}" aria-labelledby="h-${p.slug}">
<div class="wrap">
<div class="layer__body">
<div class="layer__id">${icon ? img(icon, `${p.name} app icon`, { cls: "layer__icon", eager: false }) : ""}
<div><h2 id="h-${p.slug}"><a href="${p.slug}/">${esc(p.name)}</a>${badge}</h2><p class="layer__tag">${esc(p.tagline)}</p></div></div>
<p>${esc(p.blurb)}</p>
<ul class="points">${p.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
${storeButtons(p, 0)}
${linkButtons(p, 0)}
</div>
<div class="layer__media">${media}</div>
</div>
</section>`;
}

function buildHome() {
  const body = `<section class="hero wrap">
<p class="eyebrow">${SITE.name}</p>
<h1>Simple, privacy-friendly apps</h1>
<p>${esc(SITE.tagline)} Built by ${esc(SITE.owner)}.</p>
<p><a class="btn" href="#apps">See the apps</a></p>
</section>
<div id="apps">
${PRODUCTS.map(layer).join("\n")}
</div>
<section class="wrap page" id="contact" aria-labelledby="h-contact">
<div class="card stack">
<h2 id="h-contact">Contact</h2>
<p>Questions, feedback or a support request about any of these apps? Email <a href="mailto:${SITE.email}">${SITE.email}</a>. We typically reply within ${SITE.replyTime}.</p>
<p>Each app has its own <strong>Support</strong> and <strong>Privacy policy</strong> page, linked in its section above.</p>
</div>
</section>`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url, email: SITE.email, logo: `${SITE.url}/assets/og/home.png`, founder: { "@type": "Person", name: SITE.owner }, description: SITE.tagline },
    { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, publisher: publisherLd, inLanguage: "en" },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Apps by Humanvoice",
      itemListElement: PRODUCTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}/${p.slug}/`, name: p.name })),
    },
  ];
  savePage(
    "index.html",
    shell({
      depth: 0,
      title: "Humanvoice: Simple, privacy-friendly mobile apps",
      description: "Simple, privacy-friendly mobile apps: family location sharing, a kids video player, a family budget tracker, a meeting tracker and apartment gate tracking.",
      canonicalPath: "",
      ogImage: "assets/og/home.png",
      ogAlt: "Humanvoice: simple, privacy-friendly mobile apps",
      body,
      jsonLd,
    }),
    "1.0"
  );
}

/* ---------- product pages ---------- */
const faqHtml = (faq) => `<div class="faq">${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("")}</div>`;

function buildProduct(p) {
  const { icon, shots } = p.img;
  const url = `${SITE.url}/${p.slug}/`;
  const also = p.altNames.length ? `<p class="lead">Also known as: ${p.altNames.map(esc).join(", ")}.</p>` : "";
  // The top of the page shows screenshots 2 and 3; the gallery below shows the others so nothing appears twice.
  const more = shots.map((s, i) => ({ s, i })).filter(({ i }) => i === 0 || i >= 3);
  const gallery = more.length
    ? `<section class="wrap page" aria-labelledby="h-shots"><h2 id="h-shots">More screenshots</h2><div class="gallery">${more.map(({ s, i }) => `<div class="phone">${img(s, `${p.name} screenshot ${i + 1}`, {}, 1)}</div>`).join("")}</div></section>`
    : "";
  const tutorial = [
    p.about ? `<a class="btn btn--ghost" href="about.html">Read the full About page</a>` : "",
    p.hasTutorial ? `<a class="btn btn--ghost" href="tutorial.html">Read the tutorial</a>` : "",
  ].filter(Boolean).join(" ");
  const tutorialHtml = tutorial ? `<p class="btn-inline">${tutorial}</p>` : "";
  const body = `${crumbs(1, [[p.name, null]])}
<section class="wrap product-hero">
<div>
<div class="layer__id">${icon ? img(icon, `${p.name} app icon`, { cls: "layer__icon", eager: true }, 1) : ""}
<div><h1>${esc(p.name)}${p.status === "soon" ? '<span class="badge">Coming soon</span>' : ""}</h1><p class="layer__tag">${esc(p.tagline)}</p></div></div>
<p class="lead">${esc(p.definition)}</p>
${also}
<ul class="points">${p.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
${storeButtons(p, 1)}
${linkButtons(p, 1, { details: Boolean(p.about) })}
</div>
<div>${shots.length ? `<div class="shots">${shots.slice(1, 3).map((s, i) => `<div class="phone">${img(s, `${p.name} in use, screenshot ${i + 1}`, {}, 1)}</div>`).join("")}</div>` : `<div class="placeholder-art">${icon ? img(icon, `${p.name} app icon`, {}, 1) : ""}</div>`}</div>
</section>
${gallery}
<section class="wrap page" aria-labelledby="h-facts"><div class="card">
<h2 id="h-facts">Key facts</h2>
<dl class="facts">${p.facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
${tutorialHtml}
</div></section>
<section class="wrap page" aria-labelledby="h-faq"><div class="card">
<h2 id="h-faq">Frequently asked questions</h2>
${faqHtml(p.faq)}
<p>More help: <a href="support.html">${esc(p.name)} support</a> &middot; <a href="privacy.html">Privacy policy</a>${p.hasTerms ? ` &middot; <a href="terms.html">Terms of service</a>` : ""}${p.hasDelete ? ` &middot; <a href="delete-account.html">Delete your account</a>` : ""}</p>
</div></section>`;

  const sameAs = [p.stores.apple, p.stores.play].filter(Boolean);
  const app = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: p.name,
    ...(p.altNames.length ? { alternateName: p.altNames } : {}),
    description: p.definition,
    url,
    applicationCategory: p.schemaCategory,
    operatingSystem: p.os,
    inLanguage: "en",
    ...(icon ? { image: `${SITE.url}/${icon.src}` } : {}),
    ...(shots.length ? { screenshot: shots.map((s) => `${SITE.url}/${s.src}`) } : {}),
    ...(p.free === true ? { offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } } : {}),
    ...(sameAs.length ? { installUrl: sameAs[0], sameAs } : {}),
    author: { "@type": "Person", name: SITE.owner },
    publisher: publisherLd,
  };
  savePage(
    `${p.slug}/index.html`,
    shell({
      depth: 1,
      title: p.seoTitle || `${p.name}: ${p.tagline.replace(/\.$/, "")}`,
      description: clip(firstSentence(p.definition), 155),
      canonicalPath: `${p.slug}/`,
      ogImage: p.img.og,
      ogAlt: `${p.name} app`,
      body,
      jsonLd: [app, faqLd(p.faq), breadcrumbLd([["Home", `${SITE.url}/`], [p.name, url]])],
    }),
    "0.9"
  );
}

/* ---------- About page (long form; only for products that have an `about` block) ---------- */
const ICONS = {
  notes: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M21 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  chart: '<path d="M5 20V10M12 20V4M19 20v-7"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  cloud: '<path d="M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  infinity: '<path d="M6 9c-2.2 0-4 1.3-4 3s1.8 3 4 3c4 0 8-6 12-6 2.2 0 4 1.3 4 3s-1.8 3-4 3c-4 0-8-6-12-6z"/>',
  sync: '<path d="M20 8A8 8 0 0 0 5.6 6M4 4v4h4"/><path d="M4 16a8 8 0 0 0 14.4 2M20 20v-4h-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  play: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>',
  phonelock: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><rect x="10" y="12" width="4" height="3.5" rx="0.8"/><path d="M10.7 12v-1.4a1.3 1.3 0 0 1 2.6 0V12"/>',
  wifioff: '<path d="M3 3l18 18"/><path d="M8.5 12.6a5 5 0 0 1 3.5-1.6M5 9a9 9 0 0 1 4-2.2M16 8.6A9 9 0 0 1 19 9M12 18h.01"/>',
  ban: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
  sparkles: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  wallet: '<path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V9H5a2 2 0 0 1-2-2z"/><circle cx="16.5" cy="14" r="1"/>',
  pie: '<path d="M12 3v9h9"/><path d="M20.5 15A9 9 0 1 1 9 3.5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  scan: '<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
};
const icon = (name) =>
  `<svg class="ico" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

function buildAbout(p) {
  const a = p.about;
  const { icon: appIcon, shots } = p.img;
  const url = `${SITE.url}/${p.slug}/about.html`;
  const shot = (n) => shots[n - 1];
  // Cards with a title (One On One style) or plain icon + sentence rows (bullet lists).
  const feature = (f) =>
    f.title
      ? `<article class="feature"><span class="feature__icon">${icon(f.icon)}</span><h3>${esc(f.title)}${f.soon ? '<span class="badge">Coming soon</span>' : ""}</h3><p>${esc(f.text)}</p></article>`
      : `<article class="feature feature--row"><span class="feature__icon">${icon(f.icon)}</span><p>${esc(f.text)}</p></article>`;
  const heroIdx = a.heroShots || [1, 2];
  const heroShots = heroIdx.map(shot).filter(Boolean);
  const closeParts = a.closing ? a.closing.split(/(?<=\.)\s+/) : [];
  const closeHead = a.closingHeading || closeParts[0] || "";
  const closeRest = a.closingHeading ? closeParts : closeParts.slice(1);

  const heroIcon = !a.statement && appIcon ? `<div class="about-id">${img(appIcon, `${p.name} app icon`, { cls: "layer__icon", eager: true }, 1)}<p class="eyebrow">${esc(a.eyebrow)}</p></div>` : `<p class="eyebrow">${esc(a.eyebrow)}</p>`;
  const sections = [];

  sections.push(`<section class="about-hero">
<div class="wrap">
<div>
${heroIcon}
<h1>${esc(a.h1)}</h1>
${a.lead.map((t) => `<p class="lead">${esc(t)}</p>`).join("\n")}
${a.heroChips ? `<ul class="chips">${a.heroChips.map((c) => `<li class="chip">${esc(c)}</li>`).join("")}</ul>` : ""}
${storeButtons(p, 1)}
<p class="fineprint">${esc(a.fineprint || "")}</p>
</div>
<div class="shots">${heroShots.map((s, i) => `<div class="phone">${img(s, `${p.name} screenshot ${i + 1}`, { eager: i === 0 }, 1)}</div>`).join("")}</div>
</div>
</section>`);

  if (a.statement) {
    sections.push(`<section class="section wrap" aria-labelledby="h-statement">
<div class="statement card">
${appIcon ? img(appIcon, `${p.name} app icon`, { cls: "layer__icon" }, 1) : ""}
<div><h2 id="h-statement">${esc(a.statement)}</h2>
<ul class="chips">${a.chips.map((c) => `<li class="chip">${esc(c)}</li>`).join("")}</ul></div>
</div>
</section>`);
  }

  if (a.how) {
    const howShot = a.how.shot ? shot(a.how.shot) : null;
    sections.push(`<section class="section wrap" aria-labelledby="h-how">
<div class="how card">
<div>
<h2 id="h-how">${esc(a.how.title)}</h2>
${a.how.paragraphs.map((t) => `<p class="lead">${esc(t)}</p>`).join("\n")}
</div>
${howShot ? `<div class="phone">${img(howShot, `${p.name} screenshot: ${a.how.caption || "how it works"}`, {}, 1)}</div>` : ""}
</div>
</section>`);
  }

  if (a.pillars) {
    sections.push(`<section class="section wrap" aria-labelledby="h-pillars">
<h2 id="h-pillars" class="visually-hidden">Why ${esc(p.name)}</h2>
<div class="features">${a.pillars.map(feature).join("")}</div>
${a.pillarsLink ? '<p class="section-intro"><a href="privacy.html">Read the full privacy policy</a></p>' : ""}
</section>`);
  }

  if (a.features) {
    sections.push(`<section class="section wrap" aria-labelledby="h-features">
<h2 id="h-features" class="section-title">${esc(a.featuresTitle)}</h2>
<div class="features${a.features.every((f) => !f.title) ? " features--rows" : ""}">${a.features.map(feature).join("")}</div>
</section>`);
  }

  if (a.showcase) {
    sections.push(`<section class="section section--tint" aria-labelledby="h-see">
<div class="wrap">
<h2 id="h-see" class="section-title">See it in action</h2>
<div class="showcase">${a.showcase
      .map((c) => `<figure><div class="phone">${img(shot(c.shot), `${p.name} screenshot: ${c.caption}`, {}, 1)}</div><figcaption><strong>${esc(c.caption)}</strong>${esc(c.text)}</figcaption></figure>`)
      .join("")}</div>
</div>
</section>`);
  }

  if (a.useCases) {
    sections.push(`<section class="section wrap" aria-labelledby="h-uses">
<h2 id="h-uses" class="section-title">${esc(a.useCases.title)}</h2>
${a.useCases.intro ? `<p class="section-intro">${esc(a.useCases.intro)}</p>` : ""}
<ul class="chips chips--center">${a.useCases.items.map((c) => `<li class="chip">${esc(c)}</li>`).join("")}</ul>
</section>`);
  }

  if (a.privacy || a.privacyText) {
    const inner = a.privacy
      ? `<p class="section-intro">${esc(a.privacyIntro)}</p><div class="features">${a.privacy.map(feature).join("")}</div>`
      : `<div class="privacy-card card"><span class="feature__icon">${icon("shield")}</span><div>${a.privacyText.map((t) => `<p class="lead">${esc(t)}</p>`).join("")}</div></div>`;
    sections.push(`<section class="section wrap" aria-labelledby="h-privacy">
<h2 id="h-privacy" class="section-title">${esc(a.privacyTitle)}</h2>
${inner}
<p class="section-intro"><a href="privacy.html">Read the full privacy policy</a></p>
</section>`);
  }

  if (a.pro) {
    sections.push(`<section class="section wrap" aria-labelledby="h-pro">
<div class="pro-card">
<span class="pro-badge">${esc(a.proBadge)}</span>
<h2 id="h-pro">${esc(a.proTitle)}</h2>
<p class="pro-intro">${esc(a.proIntro)}</p>
<div class="features">${a.pro.map(feature).join("")}</div>
</div>
</section>`);
  }

  if (closeHead) {
    sections.push(`<section class="cta-band">
<div class="wrap">
<h2>${esc(closeHead)}</h2>
${closeRest.length ? `<p class="lead">${esc(closeRest.join(" "))}</p>` : ""}
${storeButtons(p, 1)}
</div>
</section>`);
  }

  sections.push(`<section class="section wrap" aria-labelledby="h-faq">
<div class="card faq">
<h2 id="h-faq">Frequently asked questions</h2>
${faqHtml(p.faq)}
<p>More: <a href="./">${esc(p.name)} overview</a> &middot; <a href="support.html">Support</a> &middot; <a href="privacy.html">Privacy policy</a></p>
</div>
</section>`);

  const body = `${crumbs(1, [[p.name, "./"], ["About", null]])}\n${sections.join("\n\n")}`;

  const sameAs = [p.stores.apple, p.stores.play].filter(Boolean);
  const featureList = (a.features || []).map((f) => (f.title ? `${f.title}${f.soon ? " (coming soon)" : ""}: ${f.text}` : f.text));
  const appLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: p.name,
    ...(p.altNames.length ? { alternateName: p.altNames } : {}),
    description: p.definition,
    url: `${SITE.url}/${p.slug}/`,
    applicationCategory: p.schemaCategory,
    operatingSystem: p.os,
    inLanguage: "en",
    ...(featureList.length ? { featureList } : {}),
    ...(a.keywords ? { keywords: a.keywords.join(", ") } : {}),
    ...(appIcon ? { image: `${SITE.url}/${appIcon.src}` } : {}),
    ...(shots.length ? { screenshot: shots.slice(0, a.schemaShots || shots.length).map((s) => `${SITE.url}/${s.src}`) } : {}),
    ...(p.free === true ? { offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } } : {}),
    ...(sameAs.length ? { installUrl: sameAs[0], sameAs } : {}),
    author: { "@type": "Person", name: SITE.owner },
    publisher: publisherLd,
  };
  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: a.seoTitle,
    url,
    description: a.seoDescription,
    inLanguage: "en",
    dateModified: TODAY,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    about: { "@type": "MobileApplication", name: p.name, url: `${SITE.url}/${p.slug}/` },
    publisher: publisherLd,
  };
  savePage(
    `${p.slug}/about.html`,
    shell({
      depth: 1,
      title: a.seoTitle,
      description: a.seoDescription,
      canonicalPath: `${p.slug}/about.html`,
      ogImage: p.img.og,
      ogAlt: `About ${p.name}`,
      body,
      jsonLd: [aboutLd, appLd, faqLd(p.faq), breadcrumbLd([["Home", `${SITE.url}/`], [p.name, `${SITE.url}/${p.slug}/`], ["About", url]])],
    }),
    "0.8"
  );
}

/* ---------- support ---------- */
function buildSupport(p) {
  const url = `${SITE.url}/${p.slug}/support.html`;
  const faq = [...(p.supportFaq || []), ...(p.faq || [])];
  const body = `${crumbs(1, [[p.name, "./"], ["Support", null]])}
<section class="wrap page stack">
<div class="card">
<h1>${esc(p.name)} Support</h1>
<p class="lead">${esc(p.supportIntro)}</p>
<p><strong>Email:</strong> <a href="mailto:${SITE.email}?subject=${encodeURIComponent(p.name + " support")}">${SITE.email}</a></p>
<p>We typically respond within ${SITE.replyTime}.</p>
<p><a class="btn" href="mailto:${SITE.email}?subject=${encodeURIComponent(p.name + " support")}">Email support</a></p>
</div>
<div class="card faq">
<h2>Common questions</h2>
${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("")}
<p>See also: <a href="${p.about ? "about.html" : "./"}">About ${esc(p.name)}</a> &middot; <a href="privacy.html">Privacy policy</a>${p.hasDelete ? ` &middot; <a href="delete-account.html">Delete your account</a>` : ""}</p>
</div>
</section>`;
  savePage(
    `${p.slug}/support.html`,
    shell({
      depth: 1,
      title: `${p.name} Support | ${SITE.name}`,
      description: `Get help with ${p.name}: contact ${SITE.email}, typical reply within ${SITE.replyTime}, and answers to common questions.`,
      canonicalPath: `${p.slug}/support.html`,
      ogImage: p.img.og,
      ogAlt: `${p.name} support`,
      body,
      jsonLd: [faqLd(faq), breadcrumbLd([["Home", `${SITE.url}/`], [p.name, `${SITE.url}/${p.slug}/`], ["Support", url]])],
    }),
    "0.5"
  );
}

/* ---------- privacy (policy text is copied word for word from content/<slug>/privacy.body.html) ---------- */
function buildPrivacy(p) {
  const fragment = fs.readFileSync(path.join(ROOT, `content/${p.slug}/privacy.body.html`), "utf8").trim();
  const url = `${SITE.url}/${p.slug}/privacy.html`;
  const bar = p.privacyLangs ? `<div class="lang-bar"><div id="google_translate_element"></div></div>\n` : "";
  const body = `${crumbs(1, [[p.name, "./"], ["Privacy policy", null]])}
<div class="wrap"><article class="policy">
${bar}${fragment}
</article></div>`;
  savePage(
    `${p.slug}/privacy.html`,
    shell({
      depth: 1,
      title: `Privacy Policy: ${p.name} | ${SITE.name}`,
      description: `Privacy policy for ${p.name}: what data the app handles, how it is used, and how to delete it.`,
      canonicalPath: `${p.slug}/privacy.html`,
      ogImage: p.img.og,
      ogAlt: `${p.name} privacy policy`,
      body,
      langs: p.privacyLangs || "",
      jsonLd: [
        { "@context": "https://schema.org", "@type": "WebPage", name: `Privacy Policy: ${p.name}`, url, isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url }, about: { "@type": "MobileApplication", name: p.name } },
        breadcrumbLd([["Home", `${SITE.url}/`], [p.name, `${SITE.url}/${p.slug}/`], ["Privacy policy", url]]),
      ],
    }),
    "0.4"
  );
}

/* ---------- terms of service (text is in content/<slug>/terms.body.html) ---------- */
function buildTerms(p) {
  const fragment = fs.readFileSync(path.join(ROOT, `content/${p.slug}/terms.body.html`), "utf8").trim();
  const url = `${SITE.url}/${p.slug}/terms.html`;
  const body = `${crumbs(1, [[p.name, "./"], ["Terms of service", null]])}
<div class="wrap"><article class="policy">
${fragment}
</article></div>`;
  savePage(
    `${p.slug}/terms.html`,
    shell({
      depth: 1,
      title: `Terms of Service: ${p.name} | ${SITE.name}`,
      description: `Terms of service for ${p.name}: how the app may be used, your data, purchases and limits of liability.`,
      canonicalPath: `${p.slug}/terms.html`,
      ogImage: p.img.og,
      ogAlt: `${p.name} terms of service`,
      body,
      jsonLd: [
        { "@context": "https://schema.org", "@type": "WebPage", name: `Terms of Service: ${p.name}`, url, isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url }, about: { "@type": "MobileApplication", name: p.name } },
        breadcrumbLd([["Home", `${SITE.url}/`], [p.name, `${SITE.url}/${p.slug}/`], ["Terms of service", url]]),
      ],
    }),
    "0.3"
  );
}

/* ---------- account deletion page (Where is my people) ---------- */
function buildDelete(p) {
  const url = `${SITE.url}/${p.slug}/delete-account.html`;
  const form = p.deleteFormUrl
    ? `<p><a class="btn" href="${esc(p.deleteFormUrl)}" rel="noopener">Request account deletion (form)</a></p>`
    : "";
  const faq = [
    ["What is deleted?", "Your profile, your latest location, the places you created and your family memberships are removed from our database. If you created a family circle, the circle and its places are removed with your account, so its members lose access to it."],
    ["How long does it take?", "Deleting inside the app is immediate. Requests made by email or form are processed within 7 business days."],
    ["Can I get a copy of my data first?", "Yes. In the app go to Settings, then Export my data, before you delete your account."],
  ];
  const body = `${crumbs(1, [[p.name, "./"], ["Delete your account", null]])}
<section class="wrap page stack">
<div class="card">
<h1>Delete your ${esc(p.name)} account</h1>
<p class="lead">You can delete your account and data yourself in the app, or ask us to do it.</p>
<h2>Option 1: in the app (fastest)</h2>
<ol>
<li>Open ${esc(p.name)} and sign in.</li>
<li>Go to <strong>Settings</strong>.</li>
<li>Tap <strong>Delete account</strong> and confirm.</li>
</ol>
<h2>Option 2: ask us to delete it</h2>
<p>If you cannot open the app, request deletion${p.deleteFormUrl ? " with the form below or" : ""} by emailing <a href="mailto:${SITE.email}?subject=${encodeURIComponent("Delete my " + p.name + " account")}">${SITE.email}</a> from the email address of your account. Include the subject <em>Delete my ${esc(p.name)} account</em>. We may ask you to confirm it is you.</p>
${form}
</div>
<div class="card faq">
<h2>Good to know</h2>
${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("")}
<p>See also: <a href="privacy.html">Privacy policy</a> &middot; <a href="support.html">Support</a></p>
</div>
</section>`;
  savePage(
    `${p.slug}/delete-account.html`,
    shell({
      depth: 1,
      title: `Delete your ${p.name} account | ${SITE.name}`,
      description: `How to delete your ${p.name} account and data: in the app under Settings, or by request. Requests are processed within 7 business days.`,
      canonicalPath: `${p.slug}/delete-account.html`,
      ogImage: p.img.og,
      ogAlt: `Delete your ${p.name} account`,
      body,
      jsonLd: [faqLd(faq), breadcrumbLd([["Home", `${SITE.url}/`], [p.name, `${SITE.url}/${p.slug}/`], ["Delete your account", url]])],
    }),
    "0.4"
  );
}

/* ---------- tutorial (copied as is, with canonical URL added) ---------- */
function buildTutorial(p) {
  let html = fs.readFileSync(path.join(ROOT, `content/${p.slug}/tutorial.source.html`), "utf8");
  const canonical = `${SITE.url}/${p.slug}/tutorial.html`;
  if (!html.includes('rel="canonical"')) {
    html = html.replace("</head>", `    <link rel="canonical" href="${canonical}">\n    <meta property="og:url" content="${canonical}">\n</head>`);
  }
  savePage(`${p.slug}/tutorial.html`, html, "0.5");
}

/* ---------- 404, sitemap, robots, llms.txt, manifest ---------- */
function build404() {
  const style = `${SITE.url}/assets/style.css`;
  write(
    "404.html",
    `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found | ${SITE.name}</title><meta name="robots" content="noindex">
<link rel="stylesheet" href="${style}"></head>
<body><main class="wrap center"><h1>Page not found</h1><p class="lead">That page does not exist.</p>
<p><a class="btn" href="${SITE.url}/">Go to ${SITE.name}</a></p></main></body></html>
`
  );
}

function buildFiles() {
  write(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
      .map((x) => `  <url><loc>${x.loc}</loc><lastmod>${TODAY}</lastmod><priority>${x.priority}</priority></url>`)
      .join("\n")}\n</urlset>\n`
  );

  const bots = ["Googlebot", "Bingbot", "Applebot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended"];
  write(
    "robots.txt",
    `# Everyone, including search engines and AI assistants, may read this site.\nUser-agent: *\nAllow: /\n\n${bots.map((b) => `User-agent: ${b}\nAllow: /\n`).join("\n")}\nSitemap: ${SITE.url}/sitemap.xml\n`
  );

  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.tagline} Built by ${SITE.owner}. Each app has its own page, support page and privacy policy.`,
    "",
    "## Apps",
    ...PRODUCTS.map((p) => `- [${p.name}](${SITE.url}/${p.slug}/): ${firstSentence(p.definition)}${p.altNames.length ? ` (also known as ${p.altNames.join(", ")})` : ""}`),
    "",
    "## Support and privacy",
    ...PRODUCTS.flatMap((p) => [
      ...(p.about ? [`- [About ${p.name}](${SITE.url}/${p.slug}/about.html): ${p.about.seoDescription}`] : []),
      `- [${p.name} support](${SITE.url}/${p.slug}/support.html)`,
      `- [${p.name} privacy policy](${SITE.url}/${p.slug}/privacy.html)`,
    ]),
    ...PRODUCTS.filter((p) => p.hasDelete).map((p) => `- [Delete your ${p.name} account](${SITE.url}/${p.slug}/delete-account.html)`),
    "",
    "## Contact",
    `- Email: ${SITE.email} (reply within ${SITE.replyTime})`,
    "",
  ];
  write("llms.txt", lines.join("\n"));

  write(
    "site.webmanifest",
    JSON.stringify(
      { name: SITE.name, short_name: SITE.name, start_url: "./", display: "browser", background_color: "#f3f8fd", theme_color: "#f3f8fd", icons: [{ src: "assets/icons/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "assets/icons/icon-512.png", sizes: "512x512", type: "image/png" }] },
      null,
      2
    ) + "\n"
  );
  write(".nojekyll", "");
}

/* ---------- run ---------- */
buildHome();
for (const p of PRODUCTS) {
  buildProduct(p);
  buildSupport(p);
  if (p.about) buildAbout(p);
  if (p.hasPrivacy) buildPrivacy(p);
  if (p.hasTerms) buildTerms(p);
  if (p.hasDelete) buildDelete(p);
  if (p.hasTutorial) buildTutorial(p);
}
build404();
buildFiles();
console.log(`Built ${pages.length} pages + sitemap.xml, robots.txt, llms.txt, site.webmanifest, 404.html`);
