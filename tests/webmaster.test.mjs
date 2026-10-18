import { test } from 'node:test';
import assert from 'node:assert/strict';
import { collectWebmaster, validateConfig } from '../scripts/webmaster.mjs';

test('credential absence fails without sending a request', async () => {
  await assert.rejects(collectWebmaster({ provider: 'google' }, { env: {}, fetcher: () => { throw new Error('must not run'); } }), /Missing GSC_ACCESS_TOKEN/);
});
test('Google property encoding, read-only query and pagination', async () => {
  const calls = [];
  const result = await collectWebmaster({ provider: 'google', site: 'sc-domain:example.com', start: '2026-09-01', end: '2026-09-30' }, {
    env: { GSC_ACCESS_TOKEN: 'test-token' },
    fetcher: async (url, options) => {
      calls.push({ url: String(url), options });
      return { ok: true, json: async () => ({ rows: calls.length === 1 ? Array(25000).fill({ keys: ['date', 'page'], clicks: 1 }) : [] }) };
    },
  });
  assert.equal(calls.length, 2);
  assert.match(calls[0].url, /sc-domain%3Aexample.com\/searchAnalytics\/query$/);
  assert.equal(calls[0].options.headers.Authorization, 'Bearer test-token');
  assert.equal(JSON.parse(calls[1].options.body).startRow, 25000);
  assert.equal(result.performance.rows.length, 25000);
  assert.equal(result.performance.capped, false);
});
test('Bing reads statistics and unwraps provider envelope', async () => {
  const calls = [];
  const result = await collectWebmaster({ provider: 'bing', site: 'https://example.com/' }, {
    env: { BING_WEBMASTER_API_KEY: 'test-key' },
    fetcher: async (url, options) => {
      calls.push(new URL(url));
      assert.equal(options.method, 'GET');
      return { ok: true, json: async () => ({ d: [{ Clicks: 3 }] }) };
    },
  });
  assert.equal(calls[0].searchParams.get('siteUrl'), 'https://example.com/');
  assert.equal(calls[0].searchParams.get('apikey'), 'test-key');
  assert.match(calls[1].pathname, /GetCrawlStats$/);
  assert.equal(result.queryStats[0].Clicks, 3);
});
test('provider/network errors never echo token or remote response', async () => {
  for (const fetcher of [async () => { throw new Error('test-secret'); },
    async () => ({ ok: false, status: 401, json: async () => ({ error: 'test-secret' }) }),
    async () => ({ ok: true, json: async () => ({ ErrorCode: 7, Message: 'test-secret' }) })]) {
    await assert.rejects(collectWebmaster({ provider: 'bing' }, { env: { BING_WEBMASTER_API_KEY: 'test-secret' }, fetcher }), error => !error.message.includes('test-secret'));
  }
});
test('invalid dates and unsupported provider parameters fail early', () => {
  for (const values of [{ provider: 'other' },
    { provider: 'google', site: 'https://example.com', start: '2026-02-30', end: '2026-03-01' },
    { provider: 'bing', start: '2026-01-01' },
    { provider: 'google', site: 'https://user:pass@example.com' }]) {
    assert.throws(() => validateConfig(values));
  }
});
