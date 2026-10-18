import { parseArgs } from 'node:util';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const HELP = `Read-only webmaster data
npm run webmaster -- --provider google|bing [--site PROPERTY]
Google performance also requires --start YYYY-MM-DD --end YYYY-MM-DD.
Without --site, lists accessible properties only.
Credentials: GSC_ACCESS_TOKEN (Google OAuth, webmasters.readonly scope),
or BING_WEBMASTER_API_KEY. Values are never command-line arguments.
--out DIRECTORY defaults to artifacts. --check-access checks presence only.
Bing query statistics use the provider's available period, not a selected range.
Exit: 0 success, 2 unavailable credentials, configuration or API error.
`;

export async function collectWebmaster(config, { env = process.env, fetcher = fetch } = {}) {
  const token = env[config.provider === 'google' ? 'GSC_ACCESS_TOKEN' : 'BING_WEBMASTER_API_KEY'];
  if (!token) throw new Error(`Missing ${config.provider === 'google' ? 'GSC_ACCESS_TOKEN' : 'BING_WEBMASTER_API_KEY'}; supply securely in environment settings.`);
  async function request(url, body) {
    let response;
    try {
      response = await fetcher(url, {
        method: body ? 'POST' : 'GET', redirect: 'error', signal: AbortSignal.timeout(30000),
        headers: config.provider === 'google'
          ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : {},
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
    } catch { throw new Error('Provider request failed; check network access. Request details redacted.'); }
    if (!response.ok) throw new Error(`Provider HTTP ${response.status}; check access, token expiry, property permission and quota. Response redacted.`);
    let data;
    try { data = await response.json(); }
    catch { throw new Error('Provider returned invalid JSON; response redacted.'); }
    if (data?.error || data?.ErrorCode || data?.d?.ErrorCode) throw new Error('Provider reported an API error; details redacted.');
    return config.provider === 'bing' ? data.d ?? data : data;
  }
  if (config.provider === 'google') {
    const base = 'https://www.googleapis.com/webmasters/v3/sites';
    if (!config.site) return { sites: await request(base) };
    const property = `${base}/${encodeURIComponent(config.site)}`;
    const rows = [];
    // At most 100k returned rows. Even smaller results are not a complete search log.
    let capped = false;
    for (let startRow = 0; startRow < 100000; startRow += 25000) {
      const data = await request(`${property}/searchAnalytics/query`, {
        startDate: config.start, endDate: config.end, type: 'web', dataState: 'final',
        dimensions: ['date', 'page'], rowLimit: 25000, startRow,
      });
      rows.push(...(data.rows ?? []));
      if ((data.rows ?? []).length < 25000) break;
      if (startRow === 75000) capped = true;
    }
    return { performance: { rows, capped, dimensions: ['date', 'page'], searchType: 'web', dataState: 'final' },
      limitations: ['Search Analytics returns selected/top rows, not all searches.',
        'Dates follow Search Console reporting timezone; recent data may be delayed.',
        'No separate AI visibility inferred from these totals.'] };
  }
  function bingUrl(method) {
    const url = new URL(`https://ssl.bing.com/webmaster/api.svc/json/${method}`);
    url.searchParams.set('apikey', token);
    if (config.site) url.searchParams.set('siteUrl', config.site);
    return url;
  }
  if (!config.site) return { sites: await request(bingUrl('GetUserSites')) };
  return {
    queryStats: await request(bingUrl('GetQueryStats')),
    crawlStats: await request(bingUrl('GetCrawlStats')),
    limitations: ['Period and aggregation are determined by Bing; inspect dates in returned records.',
      'Bing and Google query/crawl metrics are not interchangeable.',
      'Empty statistics do not establish absence of problems.'],
  };
}

export function validateConfig(values) {
  if (!['google', 'bing'].includes(values.provider)) throw new Error('--provider google|bing required.');
  if (values.site) {
    if (values.provider === 'google' && values.site.startsWith('sc-domain:')) {
      if (!/^sc-domain:[a-z0-9.-]+$/i.test(values.site)) throw new Error('Invalid domain property.');
    } else {
      const url = new URL(values.site);
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.hash || url.search) {
        throw new Error('Use the exact HTTP(S) property URL without credentials, query or fragment.');
      }
    }
  }
  for (const key of ['start', 'end']) {
    if (values[key] && (!/^\d{4}-\d{2}-\d{2}$/.test(values[key]) ||
      !Number.isFinite(Date.parse(values[key])) || new Date(values[key]).toISOString().slice(0, 10) !== values[key])) {
      throw new Error(`Invalid --${key} date.`);
    }
  }
  if (values.provider === 'google' && values.site && (!values.start || !values.end || values.start > values.end)) {
    throw new Error('Google property query requires ordered --start and --end dates.');
  }
  if (values.provider === 'bing' && (values.start || values.end)) throw new Error('Bing mode does not accept custom date ranges.');
  if (!values.site && (values.start || values.end)) throw new Error('Dates require --site.');
  return values;
}

async function main() {
  const { values } = parseArgs({ options: {
    provider: { type: 'string' }, site: { type: 'string' }, start: { type: 'string' }, end: { type: 'string' },
    out: { type: 'string', default: 'artifacts' }, help: { type: 'boolean' }, 'check-access': { type: 'boolean' },
  } });
  if (values.help) { console.log(HELP); return; }
  if (values['check-access']) {
    console.log(JSON.stringify({ GSC_ACCESS_TOKEN: Boolean(process.env.GSC_ACCESS_TOKEN),
      BING_WEBMASTER_API_KEY: Boolean(process.env.BING_WEBMASTER_API_KEY),
      note: 'Presence only; no authentication or property access verified.' }, null, 2));
    return;
  }
  const config = validateConfig(values);
  const data = await collectWebmaster(config);
  await mkdir(resolve(config.out), { recursive: true });
  const directory = await mkdtemp(join(resolve(config.out), 'webmaster-'));
  await writeFile(join(directory, 'report.json'), JSON.stringify({
    capturedAt: new Date().toISOString(), provider: config.provider, site: config.site ?? null,
    requestedPeriod: config.start ? { start: config.start, end: config.end } : null, ...data,
  }, null, 2), { mode: 0o600 });
  console.log(JSON.stringify({ directory, provider: config.provider, status: 'collected' }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 2; });
}
