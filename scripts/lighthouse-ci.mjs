import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const root = resolve(import.meta.dirname, '..');

export async function runCI() {
  // Fail before collecting if targets or config are invalid.
  require(join(root, 'lighthouserc.cjs'));
  const parent = join(root, 'artifacts', 'lhci');
  await mkdir(parent, { recursive: true });
  const directory = await mkdtemp(join(parent, 'run-'));
  const summary = { startedAt: new Date().toISOString(), directory, stages: {}, status: 'running' };
  await writeFile(join(directory, 'summary.json'), JSON.stringify(summary, null, 2));
  const cli = require.resolve('@lhci/cli/src/cli.js');
  async function stage(name) {
    return new Promise((resolveStage, reject) => {
      const child = spawn(process.execPath, [cli, name, `--config=${join(root, 'lighthouserc.cjs')}`], {
        cwd: directory, env: process.env, stdio: 'inherit',
      });
      child.once('error', reject);
      child.once('close', code => { summary.stages[name] = code ?? 2; resolveStage(code ?? 2); });
    });
  }
  let code = 2;
  try {
    const collected = await stage('collect');
    if (collected === 0) {
      const asserted = await stage('assert');
      // Always keep the reports, even when a quality gate fails. Filesystem only.
      const exported = await stage('upload');
      code = exported !== 0 ? 2 : asserted !== 0 ? 1 : 0;
    }
  } finally {
    summary.exitCode = code;
    summary.status = code === 0 ? 'passed' : code === 1 ? 'findings' : 'error';
    summary.finishedAt = new Date().toISOString();
    await writeFile(join(directory, 'summary.json'), JSON.stringify(summary, null, 2));
    console.log(`Lighthouse CI reports: ${directory}`);
  }
  return { code, directory };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  runCI().then(result => { process.exitCode = result.code; })
    .catch(error => { console.error(error.message); process.exitCode = 2; });
}
