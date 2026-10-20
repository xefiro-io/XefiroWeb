import { mkdir, writeFile, copyFile, rm } from 'node:fs/promises';
import { pages } from '../src/pages.mjs';

const origin = 'https://xefiro.io';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const nav = (href, label, route) => `<a href="${href}"${href === route ? ' aria-current="page"' : ''}>${label}</a>`;

export function render(page) {
  const title = `${page.title} — Xefiro`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(page.description)}">
  ${page.route === '/404' ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${origin}${page.route}">`}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Xefiro">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(page.description)}">
  <meta property="og:url" content="${origin}${page.route}">
  <link rel="stylesheet" href="/assets/site.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="shell">
    <header class="site-header">
      <a class="wordmark" href="/" aria-label="Xefiro home">xefiro<span aria-hidden="true">.</span></a>
      <nav aria-label="Main navigation">${nav('/', 'Studio', page.route)}${nav('/boryn', 'Boryn', page.route)}${nav('/boryn/support', 'Support', page.route)}</nav>
    </header>
    <main id="main" tabindex="-1">${page.content}</main>
    <footer class="site-footer">
      <div><a class="footer-name" href="/">xefiro.</a></div>
      <nav aria-label="Footer navigation">${nav('/boryn', 'Boryn', page.route)}${nav('/boryn/privacy', 'Privacy', page.route)}${nav('/boryn/support', 'Support', page.route)}</nav>
      <span class="footer-note">Made with intention.</span>
    </footer>
  </div>
</body>
</html>\n`;
}

await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
await mkdir(new URL('../dist/assets/', import.meta.url), { recursive: true });
await mkdir(new URL('../dist/boryn/', import.meta.url), { recursive: true });
for (const page of pages) {
  const file = page.route === '/' ? 'index.html' : `${page.route.slice(1)}.html`;
  await writeFile(new URL(`../dist/${file}`, import.meta.url), render(page));
}
await copyFile(new URL('../src/site.css', import.meta.url), new URL('../dist/assets/site.css', import.meta.url));
await writeFile(new URL('../dist/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(p => p.route !== '/404').map(p => `<url><loc>${origin}${p.route}</loc></url>`).join('')}</urlset>\n`);
await writeFile(new URL('../dist/robots.txt', import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log('Built four pages and 404 into dist/.');
