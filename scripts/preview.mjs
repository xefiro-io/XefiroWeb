import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
export function createPreviewServer() {
  return createServer(async (req, res) => {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }).end(); return; }
    try {
      const url = new URL(req.url, 'http://localhost');
      let path;
      try { path = decodeURIComponent(url.pathname); } catch { res.writeHead(400).end('Bad request'); return; }
      if (path.includes('\0') || path.includes('\\')) { res.writeHead(400).end('Bad request'); return; }
      let canonical = path;
      if (path.endsWith('/index.html')) canonical = path.slice(0, -11) || '/';
      else if (path.endsWith('.html') && path !== '/404.html') canonical = path.slice(0, -5);
      else if (path !== '/' && path.endsWith('/')) canonical = path.replace(/\/+$/, '');
      // Never emit a protocol-relative Location, even for malformed double-slash requests.
      if (canonical !== path && !canonical.startsWith('//')) { res.writeHead(301, { Location: canonical + url.search }).end(); return; }
      const relative = path === '/' ? 'index.html' : path.slice(1) + (extname(path) ? '' : '.html');
      const file = resolve(root, relative);
      if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(404).end(); return; }
      let body; let status = 200; let type = types[extname(file)] || 'application/octet-stream';
      try { body = await readFile(file); } catch (error) {
        if (!['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code)) throw error;
        status = 404; type = types['.html']; body = await readFile(resolve(root, '404.html'));
      }
      res.writeHead(status, { 'Content-Type': type, 'Content-Length': body.length, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(500).end('Build the site with npm run build before previewing.'); }
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  const server = createPreviewServer();
  server.on('error', error => { console.error(error.message); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
}
