// Renders the share images (Open Graph, 1200x630), the app-icon PNGs and the favicon PNGs using headless Edge/Chrome.
//   node tools/og.mjs        (needs Microsoft Edge or Google Chrome installed; re-run after changing icons or names)
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { SITE, PRODUCTS } from "./products.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const BROWSERS = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];
const browser = BROWSERS.find((b) => fs.existsSync(b));
if (!browser) throw new Error("Install Microsoft Edge or Google Chrome to render images.");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hv-og-"));

function shot(html, out, w, h) {
  const page = path.join(tmp, "page.html");
  fs.writeFileSync(page, html);
  const dest = path.join(ROOT, out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", `--window-size=${w},${h}`, `--screenshot=${dest}`, pathToFileURL(page).href], { stdio: "ignore" });
  const b = fs.readFileSync(dest);
  console.log(out.padEnd(34), b.readUInt32BE(16) + "x" + b.readUInt32BE(20));
}

const fileUrl = (rel) => pathToFileURL(path.join(ROOT, rel)).href;
const iconOf = (p) => ["icon.png", "icon.svg"].map((f) => `assets/img/${p.slug}/${f}`).find((f) => fs.existsSync(path.join(ROOT, f)));
const base = `html,body{margin:0;width:100%;height:100%}body{font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:linear-gradient(135deg,#eaf3fb,#cfe3f6);color:#17324d;display:flex;align-items:center;justify-content:center}`;

// Favicon / app icons from favicon.svg
for (const [size, out] of [[180, "apple-touch-icon.png"], [192, "assets/icons/icon-192.png"], [512, "assets/icons/icon-512.png"]]) {
  shot(`<style>html,body{margin:0;background:#fff}img{display:block;width:${size}px;height:${size}px}</style><img src="${fileUrl("favicon.svg")}">`, out, size, size);
}

// Home share image: brand + tagline + the five app icons
const icons = PRODUCTS.map((p) => `<img src="${fileUrl(iconOf(p))}" style="width:132px;height:132px;border-radius:30px;box-shadow:0 8px 24px rgba(23,50,77,.18)">`).join("");
shot(
  `<style>${base}.c{width:1040px}h1{font-size:104px;margin:0 0 12px;color:#1a5c99;letter-spacing:-2px}p{font-size:38px;margin:0 0 44px;color:#4f6479;line-height:1.3}.r{display:flex;gap:28px}</style>
   <div class="c"><h1>${SITE.name}</h1><p>${SITE.tagline}</p><div class="r">${icons}</div></div>`,
  "assets/og/home.png",
  1200,
  630
);

// One share image per app: icon + name + tagline
for (const p of PRODUCTS) {
  shot(
    `<style>${base}.c{display:flex;align-items:center;gap:56px;width:1040px}img{width:260px;height:260px;border-radius:58px;box-shadow:0 12px 32px rgba(23,50,77,.22)}h1{font-size:76px;margin:0 0 16px;line-height:1.05;letter-spacing:-1.5px}p{font-size:36px;margin:0 0 22px;color:#4f6479;line-height:1.3}b{font-size:28px;color:#1a5c99}</style>
     <div class="c"><img src="${fileUrl(iconOf(p))}"><div><h1>${p.name}</h1><p>${p.tagline}</p><b>${SITE.name} &middot; humanvoice.in</b></div></div>`,
    `assets/og/${p.slug}.png`,
    1200,
    630
  );
}
fs.rmSync(tmp, { recursive: true, force: true });
