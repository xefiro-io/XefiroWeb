import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createPreviewServer } from '../scripts/preview.mjs';

const routes = ['/', '/boryn', '/boryn/privacy', '/boryn/support'];
const readPage = route => readFile(new URL(`../dist/${route === '/' ? 'index' : route.slice(1)}.html`, import.meta.url), 'utf8');

test('every generated page has metadata, accessible structure, and valid internal targets', async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const route of routes) {
    const html = await readPage(route);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    const description = html.match(/name="description" content="([^"]+)"/)[1];
    assert(!titles.has(title)); titles.add(title);
    assert(!descriptions.has(description)); descriptions.add(description);
    assert(html.includes(`rel="canonical" href="https://xefiro.io${route}"`));
    for (const name of ['type', 'site_name', 'title', 'description', 'url']) assert(html.includes(`property="og:${name}"`));
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
    assert(html.includes('<html lang="en">'));
    assert(html.includes('<main id="main" tabindex="-1">'));
    assert(html.includes('href="#main">Skip to content'));
    assert(!/<script|<iframe|@import|https?:\/\/[^" ]+\.(?:js|css)/i.test(html));
    let previousLevel = 1;
    for (const match of html.matchAll(/<h([1-6])[ >]/g)) {
      const level = Number(match[1]); assert(level <= previousLevel + 1, `Heading jump on ${route}`); previousLevel = level;
    }
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate IDs on ${route}`);
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      if (href.startsWith('mailto:')) { assert.equal(new URL(href).pathname, 'boryn_support@xefiro.io'); continue; }
      const url = new URL(href, `https://xefiro.io${route}`);
      if (url.origin !== 'https://xefiro.io') { assert.equal(url.protocol, 'https:'); continue; }
      if (url.pathname === '/assets/site.css') { await readFile(new URL('../dist/assets/site.css', import.meta.url)); continue; }
      assert(routes.includes(url.pathname), `Invalid link ${href} on ${route}`);
      if (url.hash) assert((await readPage(url.pathname)).includes(`id="${url.hash.slice(1)}"`), `Missing anchor ${href}`);
    }
  }
});

test('release policy includes effective date, accurate disclosures and no review placeholders', async () => {
  const html = await readPage('/boryn/privacy');
  for (const text of ['not encrypted', 'source evidence', 'TestFlight', 'does not reset all app data', 'boryn_support@xefiro.io', 'Delete Source Evidence', 'Offload App', 'public link', 'only as needed', 'request deletion']) assert(html.includes(text));
  const date = html.match(/<time datetime="(\d{4}-\d{2}-\d{2})">/);
  assert(date, 'Missing effective date');
  assert.equal(new Date(date[1]).toISOString().slice(0, 10), date[1]);
  for (const route of routes) assert(!/\bdraft\b|pending developer review|must be confirmed|unpublished review|not yet set/i.test(await readPage(route)), `Publication placeholder on ${route}`);
  const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  for (const route of routes) assert(sitemap.includes(`<loc>https://xefiro.io${route}</loc>`));
  assert(!sitemap.includes('/404'));
});

test('preview serves direct routes, reloads, redirects, HEAD, assets and actual 404 responses', async () => {
  const server = createPreviewServer();
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const origin = `http://127.0.0.1:${server.address().port}`;
  try {
    for (const route of routes) {
      for (let reload = 0; reload < 2; reload++) {
        const response = await fetch(origin + route); assert.equal(response.status, 200); assert((await response.text()).includes('<main'));
      }
      const response = await fetch(origin + route, { method: 'HEAD' }); assert.equal(response.status, 200); assert.equal(await response.text(), '');
    }
    for (const route of ['/missing', '/boryn/missing', '/assets/missing.css', '/src/pages.mjs', '/.git/config']) {
      const response = await fetch(origin + route); assert.equal(response.status, 404); assert((await response.text()).includes('A wrong turn.'));
    }
    for (const [from, to] of [['/index.html', '/'], ['/boryn.html', '/boryn'], ['/boryn/', '/boryn'], ['/boryn/privacy.html?review=1', '/boryn/privacy?review=1']]) {
      const response = await fetch(origin + from, { redirect: 'manual' }); assert.equal(response.status, 301); assert.equal(response.headers.get('location'), to);
    }
    assert.equal((await fetch(origin + '/bad%ZZ')).status, 400);
    assert.equal((await fetch(origin + '/', { method: 'POST' })).status, 405);
    for (const [asset, type] of [['/assets/site.css', 'text/css'], ['/sitemap.xml', 'application/xml'], ['/robots.txt', 'text/plain']]) {
      const response = await fetch(origin + asset); assert.equal(response.status, 200); assert(response.headers.get('content-type').startsWith(type));
    }
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});
