import { createServer } from 'node:http';
import { runCI } from './lighthouse-ci.mjs';
import { parseArgs } from 'node:util';
const { values } = parseArgs({ options: { broken: { type: 'boolean', default: false } } });
const server = createServer((req, res) => {
  if (req.url === '/robots.txt') { res.setHeader('Content-Type', 'text/plain'); res.end('User-agent: *\nAllow: /\n'); return; }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (values.broken) {
    res.end('<!doctype html><html><head><meta name="robots" content="noindex"></head><body><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><button></button><input><p>Deliberately broken CI fixture.</p></body></html>');
    return;
  }
  res.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Local Lighthouse CI fixture for webchek integration validation."><title>Webchek CI validation</title><link rel="icon" href="data:,"></head><body><main><h1>Webchek CI validation</h1><p>This is a local integration fixture, not a customer website.</p></main></body></html>');
});
try {
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  process.env.WEBCHEK_CI_URLS = JSON.stringify([`http://127.0.0.1:${server.address().port}/`]);
  process.exitCode = (await runCI()).code;
} catch (error) { console.error(error.message); process.exitCode = 2; }
finally { server.closeAllConnections(); server.close(); }
