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

Optional frontmatter: `target`

- `target`: (optional) a URL indicating the primary product, app, or website the skill is targeted at, e.g. `target: https://tasking.tech`. Use this when a skill primarily supports a specific product or domain.

Installing skills locally (recommended)

- Windows (PowerShell): install or symlink skills to `%USERPROFILE%\.taskingtech\skills` so Tasking.tech agents can load them automatically.
  - Example (create dir + copy):
    - `New-Item -ItemType Directory -Force $env:USERPROFILE\.taskingtech\skills`
    - `Copy-Item -Path .\skills\wasm-spa-autofix-react-imports -Destination $env:USERPROFILE\.taskingtech\skills -Recurse`
  - Example (symlink):
    - `New-Item -ItemType SymbolicLink -Path $env:USERPROFILE\.taskingtech\skills\wasm-spa-autofix-react-imports -Target 'C:\path\to\repo\skills\wasm-spa-autofix-react-imports'`

- macOS / Linux: use `~/.taskingtech/skills` (or symlink) — e.g. `mkdir -p ~/.taskingtech/skills && cp -r skills/wasm-spa-autofix-react-imports ~/.taskingtech/skills/` or `ln -s /path/to/repo/skills/wasm-spa-autofix-react-imports ~/.taskingtech/skills/`.

- Compatibility note: Tasking.tech agents prefer `~/.taskingtech/skills` (or `%USERPROFILE%\\.taskingtech\\skills` on Windows) but will remain compatible with existing `~/.claude/skills` or `%USERPROFILE%\\.claude\\skills` where supported.

- Directory layout: each skill is a folder containing `SKILL.md` (and optional `README.md`, examples, or assets). Keep the same layout as this repo when copying/symlinking.

- Tip: during development, symlink repository skill folders into your local skills directory so edits are picked up instantly by the agent runtime.


