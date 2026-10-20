# Xefiro website

Static website implementation of [Public Website Foundation](https://www.notion.so/3ff3718c5aaa81648545f142540915d5). Independent of Boryn iOS. Plain static HTML/CSS with a dependency-free Node build; no client JavaScript, external fonts, backend, or tracking.

## Local development

Requires Node 20 or newer. No dependency installation is needed.

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:4173. Use `PORT=4174 npm run preview` if needed. Rebuild after editing source, then refresh the browser; there is no live reload.

`src/pages.mjs` owns page content; `src/site.css` owns provisional visual tokens and responsive styling; `scripts/build.mjs` supplies the shared document shell. Generated `dist/` is ignored. Do not edit generated HTML directly.

```sh
npm test
```

Checks include unique metadata, heading order, internal links and anchors, no scripts or external stylesheet dependencies, final privacy disclosures and publication placeholder checks, direct HTTP routes/reloads, redirects, HEAD, assets, and real HTTP 404s. The HTTP tests require permission to bind loopback ports in sandboxed environments.

## Route contract

| Public path | Output |
| --- | --- |
| `/` | `dist/index.html` |
| `/boryn` | `dist/boryn.html` |
| `/boryn/privacy` | `dist/boryn/privacy.html` |
| `/boryn/support` | `dist/boryn/support.html` |
| Unknown paths | `dist/404.html`, HTTP 404 |

Preview normalizes `.html`, `/index.html`, and trailing slash aliases to clean paths, retaining query strings. A top-level `404.html` prevents Cloudflare Pages’ implicit SPA fallback. Canonical origin is `https://xefiro.io`; localhost is only the preview origin. Sitemap and robots describe the future public site, not a launch claim.

## Cloudflare Pages deployment

Source is public at [xefiro-io/XefiroWeb](https://github.com/xefiro-io/XefiroWeb), with `main` as the default and production branch. Cloudflare Pages uses this GitHub repository for automatic builds. Configure build command `npm run build`, output directory `dist`, root directory the repository root, and a supported Node version >=20. No Functions or SPA rewrite are needed. Follow [Cloudflare’s static HTML guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) and [serving behaviour](https://developers.cloudflare.com/pages/configuration/serving-pages/).

The policy was approved for publication on 20 October 2026; audit evidence is in `docs/review.md`. Verify custom-domain DNS, HTTPS, canonical host redirects, clean paths/deep links, actual 404 status, and all navigation. Record mailbox delivery verification separately. Coordinate final privacy/support URLs with the iOS app and App Store Connect separately. The policy effective date is 20 October 2026, the first public source publication date in Asia/Singapore. Record completed production checks in `docs/deployment.md`.

No final logo, product screenshots, TestFlight join link, or legal incorporation claim is included. The wordmark, palette, and “Thoughtfully made” copy are provisional.
