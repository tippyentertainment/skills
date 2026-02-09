const fs = require('fs');
const path = require('path');

function findSkillFiles(dir) {
  const result = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const skillPath = path.join(full, 'SKILL.md');
      if (fs.existsSync(skillPath)) result.push(skillPath);
      // Also descend to catch nested folders if needed
      result.push(...findSkillFiles(full));
    }
  }
  return result;
}

function checkSkillFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const errors = [];

  // Check frontmatter start
  if (!lines[0].trim().startsWith('---')) {
    errors.push('Missing opening frontmatter delimiter (---) at top.');
    return errors; // other checks depend on frontmatter, bail early
  }

  // Find closing frontmatter delimiter
  let closingIndex = -1;
  // Search the entire file for the closing delimiter (frontmatter can be long)
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { closingIndex = i; break; }
  }
  if (closingIndex === -1) {
    errors.push('Missing closing frontmatter delimiter (---).');
    return errors;
  }

  // Provider header should exist immediately after frontmatter
  const nextLines = lines.slice(closingIndex + 1, closingIndex + 6).map(l => l.trim()).filter(Boolean);
  const providerLine = '# Provided by TippyEntertainment';
  const providerUrl = '# https://github.com/tippyentertainment/skills.git';
  if (nextLines.length < 2 || nextLines[0] !== providerLine || nextLines[1] !== providerUrl) {
    errors.push('Provider header missing or not immediately after frontmatter. Expected two lines: "# Provided by TippyEntertainment" and the repo URL.');
  }

  // No created_by allowed
  if (/^\s*created_by:/mi.test(content)) {
    errors.push('`created_by:` frontmatter field is not allowed.');
  }

  // Optional: validate `target` field if present in frontmatter (must be http(s) URL)
  const frontmatter = lines.slice(1, closingIndex).join('\n');
  const targetMatch = frontmatter.match(/^\s*target:\s*(.+)$/m);
  if (targetMatch) {
    const targetValue = targetMatch[1].trim();
    try {
      const parsed = new URL(targetValue);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        errors.push('`target` must be an http or https URL.');
      }
    } catch (e) {
      errors.push('`target` frontmatter must be a valid URL (e.g., https://tasking.tech).');
    }
  }

  return errors;
}

function main() {
  const root = path.resolve(__dirname, '..');
  const skillsDir = path.join(root, 'skills');
  if (!fs.existsSync(skillsDir)) {
    console.error('No skills/ directory found, nothing to validate.');
    process.exit(0);
  }

  const skillFiles = findSkillFiles(skillsDir).filter((v, i, a) => a.indexOf(v) === i);
  const failures = [];
  for (const f of skillFiles) {
    const rel = path.relative(root, f);
    const errs = checkSkillFile(f);
    if (errs.length) failures.push({ file: rel, errors: errs });
  }

  if (failures.length) {
    console.error('\nSKILL.md validation failed for the following files:\n');
    for (const fail of failures) {
      console.error(`- ${fail.file}`);
      for (const e of fail.errors) console.error(`  • ${e}`);
    }
    console.error('\nFix the errors and try again.');
    process.exit(1);
  }

  console.log('All SKILL.md files passed validation.');
}

main();
