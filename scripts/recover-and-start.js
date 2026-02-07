#!/usr/bin/env node
const { spawnSync, spawn } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

function run(cmd, args, opts = {}) {
  console.log(`> ${cmd} ${args.join(' ')}`);
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: true, ...opts });
  return r.status === 0;
}

async function main() {
  const repoRoot = process.cwd();

  // 1) Extract files from markdown if script exists
  const extractJs = path.join(repoRoot, 'scripts', 'extractFilesFromMarkdown.js');
  const extractTs = path.join(repoRoot, 'scripts', 'extractFilesFromMarkdown.ts');
  if (existsSync(extractJs)) {
    if (!run('node', [extractJs])) console.warn('extractFilesFromMarkdown.js failed');
  } else if (existsSync(extractTs)) {
    // Try with ts-node via npx, fallback to skip
    if (!run('npx', ['ts-node', extractTs]))
      console.warn('Could not run TypeScript extractor (missing ts-node). Skipping.');
  } else {
    console.log('No extractor script found (scripts/extractFilesFromMarkdown.{js,ts}). Skipping extraction.');
  }

  // 2) Run syncToWebContainer if available as script or binary
  const syncScript = path.join(repoRoot, 'scripts', 'syncToWebContainer.js');
  const syncSh = path.join(repoRoot, 'scripts', 'syncToWebContainer.sh');
  if (existsSync(syncScript)) {
    if (!run('node', [syncScript])) console.warn('syncToWebContainer.js failed');
  } else if (existsSync(syncSh)) {
    if (!run('sh', [syncSh])) console.warn('syncToWebContainer.sh failed');
  } else {
    // try common npm scripts
    const tryPnpm = run('pnpm', ['run', 'syncToWebContainer']);
    const tryNpm = tryPnpm || run('npm', ['run', 'syncToWebContainer']);
    if (!tryPnpm && !tryNpm) console.log('No sync script found. Skipping sync step.');
  }

  // 3) Install dependencies (prefer pnpm)
  let usePnpm = false;
  try {
    const check = spawnSync('pnpm', ['--version'], { shell: true });
    usePnpm = check.status === 0;
  } catch (e) {
    usePnpm = false;
  }

  if (usePnpm) run('pnpm', ['install']);
  else run('npm', ['install']);

  // 4) Start dev server (try pnpm dev -> npm run dev -> node server)
  console.log('\n=== Starting dev server ===');
  if (usePnpm) {
    const child = spawn('pnpm', ['dev'], { stdio: 'inherit', shell: true });
    child.on('exit', (code) => process.exit(code));
  } else {
    // Try npm run dev
    const npmDev = spawn('npm', ['run', 'dev'], { stdio: 'inherit', shell: true });
    npmDev.on('exit', (code) => process.exit(code));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
