#!/usr/bin/env node
/**
 * scripts/install-to-taskingtech.js
 *
 * Symlink (or copy as fallback) all skill folders from this repo into the
 * local Tasking.tech skills directory (%USERPROFILE%/.taskingtech/skills on
 * Windows, ~/.taskingtech/skills on macOS/Linux).
 *
 * Usage:
 *   node scripts/install-to-taskingtech.js        # dry-run, lists actions
 *   node scripts/install-to-taskingtech.js --apply
 *   node scripts/install-to-taskingtech.js --apply --copy   # force copy instead of symlink
 *   node scripts/install-to-taskingtech.js --dir "C:\Users\you\\.taskingtech\\skills"
 */

'use strict';

const fs = require('fs').promises;
const path = require('path');
const os = require('os');

const argv = process.argv.slice(2);
const opts = {
  apply: argv.includes('--apply') || argv.includes('-a'),
  copyFallback: argv.includes('--copy'),
  force: argv.includes('--force') || argv.includes('-f'),
  listOnly: argv.includes('--list'),
};

const dirFlagIndex = argv.findIndex(a => a === '--dir' || a === '--dest');
if (dirFlagIndex >= 0 && argv[dirFlagIndex + 1]) {
  opts.destBase = argv[dirFlagIndex + 1];
}

function help() {
  console.log(`Usage: node scripts/install-to-taskingtech.js [--apply] [--copy] [--dir <path>] [--force]

Options:
  --apply       Make changes (default is dry-run)
  --copy        Copy folders instead of creating symlinks (useful on Windows without privileges)
  --dir <path>  Destination skills directory (defaults to %USERPROFILE%\\.taskingtech\\skills or ~/.taskingtech/skills)
  --force       Overwrite existing destination entries
  --list        Just list which skills would be linked/copied
`);
}

if (argv.includes('--help') || argv.includes('-h')) {
  help();
  process.exit(0);
}

async function pathExists(p) {
  try {
    await fs.lstat(p);
    return true;
  } catch (e) {
    return false;
  }
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const ent of entries) {
    const srcPath = path.join(src, ent.name);
    const destPath = path.join(dest, ent.name);
    if (ent.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (ent.isSymbolicLink()) {
      try {
        const real = await fs.readlink(srcPath);
        await fs.symlink(real, destPath);
      } catch (err) {
        // fallback to copy
        await fs.copyFile(srcPath, destPath);
      }
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

(async function main() {
  const home = process.env.USERPROFILE || os.homedir();
  const defaultDest = path.join(home, '.taskingtech', 'skills');
  const destBase = opts.destBase ? path.resolve(opts.destBase) : defaultDest;
  const repoRoot = path.resolve(__dirname, '..');
  const repoSkills = path.join(repoRoot, 'skills');

  // gather skill folders
  const dirents = await fs.readdir(repoSkills, { withFileTypes: true });
  const skills = dirents.filter(d => d.isDirectory()).map(d => d.name).sort();

  if (skills.length === 0) {
    console.log('No skill folders found in ./skills — nothing to do.');
    process.exit(0);
  }

  console.log(`${opts.apply ? 'Applying' : 'Dry-run'}: installing ${skills.length} skill(s) to: ${destBase}\n`);

  for (const name of skills) {
    const src = path.join(repoSkills, name);
    const dest = path.join(destBase, name);

    const action = opts.copyFallback ? 'copy' : 'symlink';

    if (!opts.apply || opts.listOnly) {
      console.log(`[DRY] ${action.padEnd(7)} ${src} -> ${dest}`);
      continue;
    }

    // ensure destination directory exists
    await fs.mkdir(destBase, { recursive: true });

    if (await pathExists(dest)) {
      const st = await fs.lstat(dest);
      if (st.isSymbolicLink()) {
        const linkTarget = await fs.readlink(dest).catch(() => null);
        if (linkTarget && path.resolve(linkTarget) === path.resolve(src)) {
          console.log(`skipped (already symlinked) ${dest}`);
          continue;
        }
      }

      if (!opts.force) {
        console.log(`skipped (destination exists) ${dest} — use --force to overwrite`);
        continue;
      }

      // remove existing
      await fs.rm(dest, { recursive: true, force: true });
    }

    if (!opts.copyFallback) {
      try {
        const type = process.platform === 'win32' ? 'junction' : 'dir';
        await fs.symlink(src, dest, type);
        console.log(`symlinked ${dest} -> ${src}`);
        continue;
      } catch (err) {
        console.warn(`symlink failed for ${name}: ${err.message}. Falling back to copy.`);
      }
    }

    // fallback copy
    try {
      await copyDir(src, dest);
      console.log(`copied ${dest} <- ${src}`);
    } catch (err) {
      console.error(`failed to install ${name}: ${err.message}`);
    }
  }

  console.log('\nDone.');
})();
