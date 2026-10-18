import { test } from 'node:test';
import assert from 'node:assert/strict';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';

const execute = promisify(execFile);
const script = new URL('../scripts/browser-preflight.mjs', import.meta.url);

test('browser preflight renders locally with the sandbox enabled', async () => {
  const { stdout } = await execute(process.execPath, [script.pathname], { timeout: 30000 });
  const result = JSON.parse(stdout);
  assert.equal(result.status, 'passed');
  assert.equal(result.sandbox, true);
  assert.ok(result.version);
});

test('browser preflight rejects a missing executable with actionable diagnostics', async () => {
  await assert.rejects(execute(process.execPath, [script.pathname], {
    env: { ...process.env, WEBCHEK_BROWSER: '/nonexistent/webchek-chromium' }, timeout: 30000,
  }), error => {
    assert.equal(error.code, 2);
    assert.match(error.stderr, /Browser preflight failed/);
    assert.match(error.stderr, /sandbox\/AppArmor/);
    return true;
  });
});
