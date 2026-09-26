# Humanvoice website (humanvoice.in)

Static website for Humanvoice apps: a landing page with one section per app, and for each app a product page,
a support page and a privacy policy. Hosted free on GitHub Pages. No frameworks and no dependencies.

## Structure

```
index.html                 landing page (generated)
<app>/index.html           product page (generated)
<app>/support.html         support page (generated)
<app>/privacy.html         privacy policy (generated from content/<app>/privacy.body.html)
where-is-my-people/delete-account.html   account deletion page (generated)
shared-ai-budget-tracker/tutorial.html   tutorial (copied from content/.../tutorial.source.html)
assets/                    style.css, translate.js, images (icons and screenshots from each app's Google Play page), share images
content/                   the privacy policy texts (copied word for word from the old per-app repos)
tools/products.mjs         ALL page text and links for the five apps
tools/build.mjs            generates the pages, sitemap.xml, robots.txt, llms.txt, site.webmanifest, 404.html
tools/og.mjs               renders share images and icon PNGs (needs Microsoft Edge or Google Chrome)
tools/verified-i18n.mjs     text of where-is-my-people/verified.html in 16 languages (the page where the signup email link lands; noindex, not in the sitemap; switched on by `hasVerified` in products.mjs)
tools/check.mjs            checks links, titles, descriptions, structured data, image alt text, placeholders
```

The `.html` pages are committed so GitHub Pages can serve them as they are. Do not edit the generated pages by hand;
edit `tools/products.mjs` (text and links) or `content/` (policies) and rebuild.

## Change something

1. Edit `tools/products.mjs` (or a policy in `content/<app>/privacy.body.html`, or `assets/style.css`).
2. `node tools/build.mjs`   (regenerates all pages)
3. `node tools/check.mjs`   (must print "All checks passed.")
4. If you changed an icon or an app name: `node tools/og.mjs` first, then step 2.
5. `git add -A`, `git commit -m "Describe the change"`, `git push`. GitHub Pages updates in a few minutes.

Node 18 or newer is needed for the tools (`node --version`).

## Common edits

- **Where is my people images:** put a 512x512 `icon.png` and `screenshot-1.png` (or `.jpg`), `screenshot-2.png`, ...
  in `assets/img/where-is-my-people/`, then run `node tools/og.mjs` and `node tools/build.mjs`. Before adding a
  screenshot, check it shows no real names, invite codes or home locations. Keep large or sensitive originals in
  `_originals/` (it is git-ignored, so it is never published).
- **Account deletion form link:** set `deleteFormUrl` for Where is my people in `tools/products.mjs`.
- **App released:** set `status: "live"`, `stores.apple` and `stores.play`, and `free` in `tools/products.mjs`.
- **New app:** add an object to `PRODUCTS` (copy an existing one), add its policy text to `content/<slug>/`,
  put its icon and screenshots in `assets/img/<slug>/`.

## Important

- The old per-app repositories (KidsSafeVideoPlayerPrivacyPolicy, shared-ai-budget-tracker-privacy-policy,
  one-on-one-tracker-privacy, smart-gate-privacy) are still the privacy-policy URLs in the app stores. Do not delete
  or rename them until each store listing has been switched to the humanvoice.in URLs.
- Privacy policies are legal text. Change them only on purpose, and update the "Last Updated" date when you do.
- No secrets belong in this repository: it is public.
