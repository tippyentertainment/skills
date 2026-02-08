# Skills

This repository is a growing list of our skills — current, evolving, and future. 🚀

**What to expect:** new skill pages, projects, examples, and curated resources will be added over time. Contributions are welcome — add skills, examples, or links via pull requests.

**Files required per skill**

Each skill folder should include a `SKILL.md` containing YAML frontmatter with `name` and `description`. Optionally add a `README.md` and example files (scenes, scripts, assets) using the engine-appropriate formats shown in each skill's `Files & Formats` section.

- `godot-engine-3D-game-developer.md` — Notes and roadmap for 3D Godot development.

---

## Includes & auto-injection

You can inline small auxiliary docs (checklists, runbooks) into a `SKILL.md` using an include placeholder. Use the exact syntax:

`<!-- include:relative/path/to/file.md -->`

- Run locally: `node scripts/include-md.js` — this replaces placeholders with the referenced file content (wrapped with BEGIN/END markers). Review and commit the generated changes before opening a PR.
- CI enforcement: `.github/workflows/include-md.yml` runs the same script on push/PR and fails if injected includes are out of date, prompting contributors to run the script and commit changes.

This keeps `SKILL.md` files readable while making it easy to maintain small supporting docs separately.

