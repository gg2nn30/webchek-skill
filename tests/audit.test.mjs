import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdtemp, readdir, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const browser = process.env.WEBCHEK_BROWSER || chromium.executablePath();
const noSandbox = process.env.WEBCHEK_NO_SANDBOX === '1';
const page = (body, title = 'Audit fixture') => `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Local website audit integration fixture.">
<title>${title}</title><style>body{font:18px sans-serif;color:#111;background:#fff;margin:24px}
a{color:#004499}button,input{font:inherit}input{max-width:90%}</style></head>
<body><main><h1>Website audit fixture</h1>${body}</main></body></html>`;

function execute(args) {
  return new Promise((resolveResult, reject) => {
    const child = spawn(process.execPath, ['scripts/audit.mjs', ...args], {
      cwd: resolve(import.meta.dirname, '..'), stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '', stderr = '';
    child.stdout.on('data', data => { stdout += data; });
    child.stderr.on('data', data => { stderr += data; });
    child.on('error', reject);
    const timer = setTimeout(() => child.kill('SIGTERM'), 150000);
    child.on('close', (code, signal) => {
      clearTimeout(timer);
      resolveResult({ code, signal, stdout, stderr });
    });
  });
}

test('CLI rejects unsupported URLs and invalid options', async () => {
  for (const args of [[], ['all', '--url', 'file:///etc/passwd'],
    ['all', '--url', 'https://user:password@example.com'],
    ['all', '--url', 'https://example.com', '--min-performance', '101']]) {
    const result = await execute(args);
    assert.equal(result.code, 2, result.stderr);
  }
});

test('real browser, axe and Lighthouse produce evidence and preserve failures', { timeout: 240000 }, async t => {
  let submissions = 0;
  const server = createServer((req, res) => {
    if (req.method !== 'GET') { submissions++; res.writeHead(405).end(); return; }
    res.setHeader('content-type', 'text/html; charset=utf-8');
    if (req.url === '/broken') {
      res.end(page('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><button></button>'));
    } else if (req.url === '/contact') {
      res.end(page('<form method="post"><label for="email">Email</label><input id="email" name="email" type="email" required><button>Send request</button></form>'));
    } else if (req.url === '/') {
      res.end(page('<p>A working public page for audits.</p><a href="/contact">Contact</a>'));
    } else { res.writeHead(404).end(page('<p>Not found</p>')); }
  });
  await new Promise(resolveReady => server.listen(0, '127.0.0.1', resolveReady));
  t.after(() => { server.closeAllConnections(); server.close(); });
  const base = `http://127.0.0.1:${server.address().port}`;
  const out = await mkdtemp(join(tmpdir(), 'webchek-validation-'));
  const flags = ['--out', out, '--browser', browser, ...(noSandbox ? ['--no-sandbox'] : [])];

  await t.test('combined passing audit writes current reports', async () => {
    const result = await execute(['all', '--url', base, ...flags]);
    assert.equal(result.code, 0, result.stderr + result.stdout);
    const summary = JSON.parse(result.stdout);
    assert.equal(summary.checks.browser.status, 'passed');
    assert.equal(summary.checks.axe.status, 'passed');
    assert.equal(summary.checks.lighthouse.status, 'passed');
    assert.equal(typeof summary.checks.lighthouse.scores.performance, 'number');
    const files = await readdir(summary.directory);
    for (const file of ['summary.json', 'browser.json', 'page.png', 'axe.json', 'lighthouse.json', 'lighthouse.html']) {
      assert.ok(files.includes(file), file);
      assert.ok((await readFile(join(summary.directory, file))).length > 0, file);
    }
    console.log(`Combined audit artifacts: ${summary.directory}`);
  });

  await t.test('axe detects deliberate defects and exits 1', async () => {
    const result = await execute(['axe', '--url', `${base}/broken`, ...flags]);
    assert.equal(result.code, 1, result.stderr + result.stdout);
    const summary = JSON.parse(result.stdout);
    const axe = JSON.parse(await readFile(join(summary.directory, 'axe.json'), 'utf8'));
    assert.ok(axe.violations.some(item => item.id === 'button-name'));
    assert.ok(axe.violations.some(item => item.id === 'image-alt'));
    assert.equal(summary.checks.axe.status, 'failed');
    console.log(`Deliberate defect artifacts: ${summary.directory}`);
  });

  await t.test('standalone Lighthouse uses desktop preset and explicit threshold', async () => {
    const result = await execute(['lighthouse', '--url', base, '--device', 'desktop', '--min-performance', '0', ...flags]);
    assert.equal(result.code, 0, result.stderr + result.stdout);
    const summary = JSON.parse(result.stdout);
    assert.deepEqual(Object.keys(summary.checks), ['lighthouse']);
    assert.equal(summary.checks.lighthouse.minPerformance, 0);
    const report = JSON.parse(await readFile(join(summary.directory, 'lighthouse.json'), 'utf8'));
    assert.equal(report.configSettings.formFactor, 'desktop');
    assert.equal(report.configSettings.screenEmulation.mobile, false);
  });

  await t.test('HTTP errors are findings', async () => {
    const result = await execute(['browser', '--url', `${base}/missing`, ...flags]);
    assert.equal(result.code, 1, result.stderr + result.stdout);
    const summary = JSON.parse(result.stdout);
    assert.equal(summary.checks.browser.status, 'failed');
  });

  await t.test('browser launch errors are incomplete, not passing', async () => {
    const result = await execute(['axe', '--url', base, '--out', out, '--browser', '/nonexistent/webchek-chromium']);
    assert.equal(result.code, 2, result.stderr + result.stdout);
    const summary = JSON.parse(result.stdout);
    assert.equal(summary.checks.browser.status, 'error');
    assert.equal(summary.checks.axe.status, 'not_completed');
  });

  await t.test('Playwright can follow a journey and verify native validation', async () => {
    const instance = await chromium.launch({ executablePath: browser, chromiumSandbox: !noSandbox });
    try {
      const context = await instance.newContext({ viewport: { width: 390, height: 844 } });
      const tab = await context.newPage();
      await tab.goto(base);
      await tab.getByRole('link', { name: 'Contact' }).click();
      assert.equal(new URL(tab.url()).pathname, '/contact');
      const email = tab.getByLabel('Email');
      await email.fill('not-an-email');
      await tab.getByRole('button', { name: 'Send request' }).click();
      assert.equal(await email.evaluate(el => el.validity.typeMismatch), true);
      await email.fill('test@example.com');
      assert.equal(await email.evaluate(el => el.checkValidity()), true);
      // Valid forms are deliberately not submitted by this read-only fixture test.
      assert.equal(submissions, 0);
    } finally { await instance.close(); }
  });
});
