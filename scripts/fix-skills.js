const fs = require('fs');
const path = require('path');

function fixSkillFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const orig = content;
  const lines = content.split(/\r?\n/);

  // Remove any created_by lines
  const noCreated = lines.filter(l => !/^\s*created_by:/i.test(l));

  // Ensure frontmatter opening
  let out = noCreated.slice();
  if (!out[0] || out[0].trim() !== '---') {
    out.unshift('---');
  }

  // Insert `target` at top of frontmatter if missing
  // After ensuring opening '---', check the next non-empty non-comment line
  const insertTargetIfMissing = () => {
    // find first frontmatter delimiter (closing)
    let closingIdx = -1;
    for (let i = 1; i < out.length; i++) {
      if (out[i].trim() === '---') { closingIdx = i; break; }
    }
    // build frontmatter slice
    const fmLines = closingIdx === -1 ? out.slice(1) : out.slice(1, closingIdx);
    // check if any non-empty non-comment line starts with 'target:'
    const hasTarget = fmLines.some(l => l.trim().toLowerCase().startsWith('target:'));
    if (!hasTarget) {
      // insert after the opening '---'
      out.splice(1, 0, 'target: https://tasking.tech');
    }
  };

  insertTargetIfMissing();

  // Find closing frontmatter delimiter
  let closingIndex = -1;
  for (let i = 1; i < out.length; i++) {
    if (out[i].trim() === '---') { closingIndex = i; break; }
  }

  // If no closing delimiter, try to insert before first H1 or after a short block
  if (closingIndex === -1) {
    let insertAt = out.findIndex((l, idx) => idx > 0 && /^#\s+/.test(l));
    if (insertAt === -1) insertAt = Math.min(8, out.length);
    out.splice(insertAt, 0, '---');
    closingIndex = insertAt;
  }

  // Normalize provider header: ensure it appears immediately after closing index
  const providerLines = [
    '# Provided by TippyEntertainment',
    '# https://github.com/tippyentertainment/skills.git'
  ];

  // Remove any existing provider header occurrences elsewhere
  out = out.filter((l, idx) => {
    if (providerLines.includes(l.trim())) return false;
    // Also remove lines that are provider url without exact match
    if (l.trim().startsWith('# https://github.com/tippyentertainment/skills')) return false;
    return true;
  });

  // Recompute closingIndex (since we filtered)
  closingIndex = out.findIndex((l, idx) => idx > 0 && l.trim() === '---');
  if (closingIndex === -1) {
    // put a closing delimiter after the first 8 lines
    closingIndex = Math.min(8, out.length);
    out.splice(closingIndex, 0, '---');
  }

  // Insert provider header immediately after closingIndex if not present
  const after = out.slice(closingIndex + 1, closingIndex + 3).map(l => l.trim());
  if (after.length < 2 || after[0] !== providerLines[0] || after[1] !== providerLines[1]) {
    out.splice(closingIndex + 1, 0, ...providerLines, '');
  }

  const fixed = out.join('\n');
  if (fixed !== orig) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    return true;
  }
  return false;
}

function findSkillFiles(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      const skill = path.join(full, 'SKILL.md');
      if (fs.existsSync(skill)) out.push(skill);
      out.push(...findSkillFiles(full));
    }
  }
  return out;
}

function main() {
  const args = process.argv.slice(2);
  const root = path.resolve(__dirname, '..');
  let targets = [];
  if (args.length) {
    targets = args.map(p => path.resolve(process.cwd(), p));
  } else {
    const skillsDir = path.join(root, 'skills');
    targets = findSkillFiles(skillsDir);
  }

  let changed = [];
  for (const t of targets) {
    if (!fs.existsSync(t)) {
      console.error('Not found:', t);
      continue;
    }
    try {
      const r = fixSkillFile(t);
      if (r) changed.push(path.relative(process.cwd(), t));
    } catch (err) {
      console.error('Error fixing', t, err.message);
    }
  }

  if (changed.length) {
    console.log('Fixed files:');
    for (const f of changed) console.log(' -', f);
    process.exit(0);
  }
  console.log('No changes needed.');
}

main();
