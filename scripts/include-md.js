const fs = require('fs');
const path = require('path');

function findSkillFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      const skillFile = path.join(full, 'SKILL.md');
      if (fs.existsSync(skillFile)) results.push(skillFile);
      results.push(...findSkillFiles(full));
    }
  }
  return results;
}

function includeFilesInSkill(skillPath) {
  let content = fs.readFileSync(skillPath, 'utf8');
  const dir = path.dirname(skillPath);
  const includeRegex = /<!--\s*include:([^\s>]+)\s*-->/g;
  let m;
  let changed = false;

  while ((m = includeRegex.exec(content)) !== null) {
    const includeRel = m[1];
    const includePath = path.resolve(dir, includeRel);
    if (!fs.existsSync(includePath)) {
      console.error(`Missing include file: ${includeRel} referenced from ${skillPath}`);
      process.exitCode = 2;
      continue;
    }
    const includeText = fs.readFileSync(includePath, 'utf8').trim();
    const replacement = `<!-- BEGIN include:${includeRel} -->\n${includeText}\n<!-- END include:${includeRel} -->`;
    const before = content.substring(0, m.index);
    const after = content.substring(m.index + m[0].length);
    content = before + replacement + after;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(skillPath, content, 'utf8');
    return true;
  }
  return false;
}

function main() {
  const root = path.resolve(__dirname, '..');
  const skillsDir = path.join(root, 'skills');
  if (!fs.existsSync(skillsDir)) {
    console.error('No skills/ directory found.');
    process.exit(1);
  }

  const skills = findSkillFiles(skillsDir).filter((v, i, a) => a.indexOf(v) === i);
  const changed = [];
  for (const s of skills) {
    try {
      if (includeFilesInSkill(s)) changed.push(s);
    } catch (err) {
      console.error('Error processing', s, err.message);
      process.exit(1);
    }
  }

  if (changed.length) {
    console.log('Updated files:');
    changed.forEach(f => console.log(' -', f));
    console.log('\nPlease review changes and commit them (or run this locally before opening a PR).');
    process.exit(0);
  }

  console.log('No placeholder includes found or all includes already injected.');
}

main();
