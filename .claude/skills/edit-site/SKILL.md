---
name: edit-site
description: Make a change to the grandas.ch Astro website (new section, text or translation change, contact details, service, photos, styling), check it visually and publish it. Use for any edit to this repo's site, e.g. "add a section", "change the phone number", "add a service", "translate", "make it nicer", "push and give me the preview link".
---

# Editing the grandas.ch site

Single-page Astro 5 site for Grandas (tiling & renovation, Lausanne region), in four languages: French at `/` (default), `/en/`, `/de/`, `/it/`. The README (in French) documents the content files for non-developers; keep it up to date when you change where things live.

## Where things live

| What | File |
| --- | --- |
| Section order on the page | `src/components/Home.astro` (Hero → Services → About → Process → Contact) |
| One component per section | `src/components/*.astro` |
| Company details: name, address, phone, WhatsApp, e-mail, hours, service areas, form endpoint | `src/data/site.ts` (single source, never hard-code these in components) |
| All interface text, per language | `src/i18n/ui.ts` |
| Services (photos + text in 4 languages) | `src/content/services/*.yaml`, schema in `src/content.config.ts` |
| Service photos | `src/assets/services/` (shrink phone photos first with `node scripts/resize.mjs <src> src/assets/services`) |
| Design tokens and shared classes | `src/styles/global.css` |
| `<head>`, SEO meta, hreflang | `src/layouts/Base.astro` |

## Rules

- **Every text exists in all four languages.** A new key in `ui.ts` goes into `fr`, `en`, `de` and `it`. `UIKey` is typed from `fr`, and missing keys silently fall back to French, so check each language yourself. German is Swiss German usage: "Offerte" (not "Angebot"), "Mass" and "ss" (no "ß"). Formal address everywhere ("vous", "Sie", "voi").
- **Place names are not translated** (Lausanne, Romanel-sur-Lausanne, Gros-de-Vaud…). Use full official commune names; they also help local SEO.
- **Contact details must stay identical** to the Google Business Profile, local.ch and search.ch. Change them only in `site.ts`.
- **Reuse the existing look.** Sections use `<section class="section" id="…">`, a `.section-head` with `.kicker`, `h2` and lead `p`, and the buttons `.btn .btn-primary` / `.btn-ghost`. Colours come from the CSS variables (`--brand`, `--brand-dark`, `--brand-soft`, `--ink*`, `--line`, `--card`, `--bg`). Alternate section backgrounds so neighbouring sections stay distinct (About is orange, Process is white `--card`, the others use `--bg`). Icons are inline 24×24 stroke SVGs (Lucide style, `stroke-width="1.8"`). Every section must work at phone width (breakpoints around 860–900 px).
- **Image paths in `public/`** must go through `import.meta.env.BASE_URL` (see existing `logo.svg` usages), because the preview build runs under a sub-path.

## Build and check

The machine's default Node (18.17) is too old for Astro. Build with Node 20 through npx:

```bash
npx -y -p node@20 npm run build
```

Then check the result in the built HTML (e.g. `grep` a new string in `dist/index.html` and `dist/de/index.html`) and look at it. To take screenshots without a dev server, serve `dist/` briefly and use headless Chrome (installed at `/usr/bin/google-chrome`); write the images to the session scratchpad, not the repo:

```bash
(cd dist && timeout 40 python3 -m http.server 4399 >/dev/null 2>&1 &)
google-chrome --headless=new --disable-gpu --hide-scrollbars --window-size=1300,6000 \
  --virtual-time-budget=4000 --screenshot=<scratchpad>/desktop.png http://localhost:4399/
google-chrome --headless=new --disable-gpu --hide-scrollbars --window-size=400,10000 \
  --virtual-time-budget=4000 --screenshot=<scratchpad>/mobile.png http://localhost:4399/
```

The page is long, so crop to the changed part before viewing (`sharp` is a project dependency): `node -e "require('sharp')('<in>').extract({left:0,top:<y>,width:<w>,height:<h>}).toFile('<out>')"`. Check desktop (1300 px) and mobile (400 px).

## Publishing

`.github/workflows/deploy.yml` deploys to GitHub Pages on every push to `main`. Nothing else deploys, so a pushed feature branch has no preview.

- **Before the domain switch:** the build workflow sets `SITE`/`BASE` for the preview, and `main` publishes to https://gianniii.github.io/grandas-ch-AI/. The live https://www.grandas.ch/ is still the old site in `Gianniii/grandas-ch`.
- **After the domain switch** (PR "Serve the Astro site on www.grandas.ch" merged and the custom domain moved to this repo): pushing to `main` changes the **live business site**. Ask before pushing to `main` from then on, and prefer a pull request.

Check which state applies with `gh api repos/Gianniii/grandas-ch-AI/pages --jq .cname` (`null` means preview only). After a push to `main`, follow the run with `gh run list --workflow deploy.yml --limit 1` and confirm the page shows the change before giving the user the link.

Commit messages are short English sentences in the imperative ("Add WhatsApp as a contact option").
