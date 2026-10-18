#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { mkdir, mkdtemp, writeFile, readFile } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { launch } from 'chrome-launcher';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const HELP = `Website audit (read-only navigation; no forms submitted)
Usage: npm run audit -- --url https://example.com [options]
Modes: audit, audit:browser, audit:axe, audit:lighthouse
Options:
  --url URL               Required HTTP(S) page; no embedded credentials
  --out DIRECTORY         Report parent directory (default: artifacts)
  --browser PATH          Existing Chrome/Chromium executable
  --device mobile|desktop Default: mobile
  --min-performance N     Optional Lighthouse performance gate, 0–100
  --no-sandbox            Explicit opt-in for isolated trusted containers only
  --help                  Show this help
Exit codes: 0 checks passed, 1 findings, 2 tool/configuration failure.
Each invocation creates a unique run directory containing summary.json.
`;

function options() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      url: { type: 'string' }, out: { type: 'string', default: 'artifacts' },
      browser: { type: 'string' }, device: { type: 'string', default: 'mobile' },
      'min-performance': { type: 'string' }, 'no-sandbox': { type: 'boolean', default: false },
      help: { type: 'boolean', default: false },
    },
  });
  if (values.help) return { help: true };
  const mode = positionals[0] ?? 'all';
  if (positionals.length > 1 || !['all', 'browser', 'axe', 'lighthouse'].includes(mode)) {
    throw new Error('Unknown mode. Use --help.');
  }
  if (!values.url) throw new Error('--url is required.');
  const url = new URL(values.url);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Use an HTTP(S) URL without embedded credentials.');
  }
  if (!['mobile', 'desktop'].includes(values.device)) throw new Error('Invalid --device.');
  const minPerformance = values['min-performance'] === undefined
    ? null : Number(values['min-performance']);
  if (minPerformance !== null && (!values['min-performance'].trim() ||
      !Number.isFinite(minPerformance) || minPerformance < 0 || minPerformance > 100)) {
    throw new Error('--min-performance must be between 0 and 100.');
  }
  if (minPerformance !== null && !['all', 'lighthouse'].includes(mode)) {
    throw new Error('--min-performance requires Lighthouse mode.');
  }
  return { ...values, url: url.href, mode, minPerformance };
}

async function json(path, data) {
  await writeFile(path, `${JSON.stringify(data, null, 2)}\n`);
}

async function packageVersion(name) {
  let directory = dirname(require.resolve(name));
  while (true) {
    try {
      const pkg = JSON.parse(await readFile(join(directory, 'package.json'), 'utf8'));
      if (pkg.name === name) return pkg.version;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    const parent = dirname(directory);
    if (parent === directory) throw new Error(`Cannot determine version of ${name}`);
    directory = parent;
  }
}

async function browserAudit(config, dir, run) {
  const browser = await chromium.launch({
    executablePath: config.browser || undefined,
    headless: true,
    chromiumSandbox: !config['no-sandbox'],
  });
  try {
    const mobile = config.device === 'mobile';
    const context = await browser.newContext({
      viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
      isMobile: mobile, hasTouch: mobile,
      serviceWorkers: 'block',
    });
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(45000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(config.url, { waitUntil: 'load' });
    await page.locator('body').waitFor();
    const metadata = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      lang: document.documentElement.lang,
      h1: [...document.querySelectorAll('h1')].map(el => el.textContent.trim()),
      description: document.querySelector('meta[name="description"]')?.content ?? null,
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      robots: document.querySelector('meta[name="robots"]')?.content ?? null,
      links: [...document.querySelectorAll('a[href]')].map(el => ({
        text: el.textContent.trim(), href: el.href,
      })),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => {
        try { return { validJson: true, value: JSON.parse(el.textContent) }; }
        catch { return { validJson: false }; }
      }),
      bodyTextLength: document.body.innerText.trim().length,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    }));
    const findings = [];
    if (!response || response.status() >= 400) findings.push('HTTP response missing or >= 400');
    if (!metadata.title.trim()) findings.push('Missing document title');
    if (!metadata.bodyTextLength) findings.push('No visible body text');
    if (errors.length) findings.push('Uncaught JavaScript errors');
    if (metadata.horizontalOverflow) findings.push('Horizontal overflow at selected viewport');
    await page.screenshot({ path: join(dir, 'page.png'), fullPage: true });
    await json(join(dir, 'browser.json'), {
      browserVersion: browser.version(), device: config.device,
      viewport: page.viewportSize(), status: response?.status() ?? null,
      ...metadata, errors, findings,
      limitations: ['Single-page smoke check, not a complete E2E journey.',
        'Snapshot after load; delayed application states need separate tests.',
        'JSON-LD parseability is not Schema.org or Rich Results validation.'],
    });
    run.checks.browser = { status: findings.length ? 'failed' : 'passed', findings,
      artifacts: ['browser.json', 'page.png'] };
    if (config.mode === 'all' || config.mode === 'axe') {
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      await json(join(dir, 'axe.json'), result);
      const blocking = result.violations.filter(item => ['serious', 'critical'].includes(item.impact));
      run.checks.axe = {
        status: blocking.length ? 'failed' : 'passed',
        violations: result.violations.length, blockingViolations: blocking.length,
        incomplete: result.incomplete.length,
        gate: 'No serious or critical violations in selected WCAG A/AA rules.',
        artifacts: ['axe.json'],
        limitations: ['Moderate/minor violations and incomplete results require review.',
          'Automated checks do not establish WCAG conformity.'],
      };
    }
  } finally {
    await browser.close();
  }
}

async function lighthouseAudit(config, dir, run) {
  const chrome = await launch({
    chromePath: config.browser || chromium.executablePath(),
    chromeFlags: ['--headless', '--disable-dev-shm-usage',
      ...(config['no-sandbox'] ? ['--no-sandbox'] : [])],
  });
  try {
    const result = await lighthouse(config.url, {
      port: chrome.port, output: ['json', 'html'], logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    }, config.device === 'desktop' ? desktopConfig : undefined);
    if (!result) throw new Error('Lighthouse returned no report.');
    await writeFile(join(dir, 'lighthouse.json'), result.report[0]);
    await writeFile(join(dir, 'lighthouse.html'), result.report[1]);
    if (result.lhr.runtimeError) throw new Error(`Lighthouse: ${result.lhr.runtimeError.message}`);
    const scores = Object.fromEntries(Object.entries(result.lhr.categories)
      .map(([key, value]) => [key, value.score === null ? null : Math.round(value.score * 100)]));
    const performance = scores.performance;
    if (config.minPerformance !== null && performance === null) {
      throw new Error('Lighthouse performance score unavailable for requested gate.');
    }
    run.checks.lighthouse = {
      status: config.minPerformance !== null && performance < config.minPerformance ? 'failed' : 'passed',
      scores, minPerformance: config.minPerformance,
      gate: config.minPerformance === null ? 'Report generated; scores are informational.' : 'Requested performance threshold.',
      warnings: result.lhr.runWarnings,
      artifacts: ['lighthouse.json', 'lighthouse.html'],
      limitations: ['Laboratory run, not field Core Web Vitals or full SEO validation.',
        'Single run; compare repeated runs under matching conditions.'],
    };
  } finally {
    await chrome.kill();
  }
}

async function main() {
  const config = options();
  if (config.help) { console.log(HELP); return; }
  const parent = resolve(config.out);
  await mkdir(parent, { recursive: true });
  const dir = await mkdtemp(join(parent, 'run-'));
  const run = {
    startedAt: new Date().toISOString(), target: config.url, mode: config.mode,
    device: config.device, sandboxDisabled: config['no-sandbox'],
    versions: Object.fromEntries(await Promise.all(
      ['playwright', '@axe-core/playwright', 'lighthouse', 'chrome-launcher']
        .map(async name => [name, await packageVersion(name)]))),
    checks: {}, errors: [],
  };
  // Persist even if the process is interrupted before completing a check.
  await json(join(dir, 'summary.json'), { ...run, status: 'running' });
  const jobs = [];
  if (config.mode !== 'lighthouse') jobs.push(['browser', browserAudit]);
  if (config.mode === 'all' || config.mode === 'lighthouse') jobs.push(['lighthouse', lighthouseAudit]);
  for (const [name, execute] of jobs) {
    try { await execute(config, dir, run); }
    catch (error) {
      run.errors.push({ check: name, message: error.message });
      if (!run.checks[name]) run.checks[name] = { status: 'error' };
      if (name === 'browser' && ['all', 'axe'].includes(config.mode) && !run.checks.axe) {
        run.checks.axe = { status: 'not_completed' };
      }
    }
  }
  const exitCode = run.errors.length ? 2
    : Object.values(run.checks).some(check => check.status === 'failed') ? 1 : 0;
  run.finishedAt = new Date().toISOString();
  run.status = exitCode === 2 ? 'error' : exitCode === 1 ? 'findings' : 'passed';
  run.exitCode = exitCode;
  await json(join(dir, 'summary.json'), run);
  console.log(JSON.stringify({ directory: dir, ...run }, null, 2));
  process.exitCode = exitCode;
}

main().catch(error => { console.error(error.message); process.exitCode = 2; });
