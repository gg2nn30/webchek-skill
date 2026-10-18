import { chromium } from 'playwright';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';

// No remote target or credentials: verify the actual CI browser with sandbox on.
const executablePath = process.env.WEBCHEK_BROWSER || chromium.executablePath();
let browser;
try {
  await access(executablePath, constants.X_OK);
  browser = await chromium.launch({ executablePath, headless: true, chromiumSandbox: true });
  const page = await browser.newPage();
  await page.setContent('<!doctype html><title>webchek preflight</title><p>Ready</p>');
  if (await page.title() !== 'webchek preflight') throw new Error('Browser rendering failed.');
  console.log(JSON.stringify({ status: 'passed', executablePath, version: browser.version(), sandbox: true }));
} catch (error) {
  console.error(`Browser preflight failed: ${error.message}`);
  console.error('Check the executable, OS dependencies and sandbox/AppArmor policy. Do not disable the sandbox to hide this failure.');
  process.exitCode = 2;
} finally {
  await browser?.close();
}
