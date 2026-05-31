# Claude Code Config

Personal `~/.claude` configuration for [Claude Code](https://claude.ai/code) — versioned so the same
setup is reproducible across machines in under two minutes.

Everything generated or machine-specific (transcripts, caches, credentials, downloaded plugin code)
is git-ignored. Only hand-authored config is committed.

---

## Repo layout

```
~/.claude/
├── CLAUDE.md                    global instructions for all projects
├── RTK.md                       RTK (Rust Token Killer) usage reference, @-included by CLAUDE.md
├── settings.json                harness config: permissions, hooks, env, MCP servers
├── statusline.sh                custom Claude Code status line
├── sync.sh                      push / pull / setup helper (see below)
│
├── commands/                    custom slash commands
│   └── full-app-test.md
│
├── hooks/                       PreToolUse / PostToolUse / Stop hook scripts
│   └── context-mode-cache-heal.mjs
│
├── rules/                       auto-loaded rule files (@-included by CLAUDE.md)
│   └── context7.md              ctx7 docs-fetching rule
│
├── skills/                      installed agent skills (41 skills)
│   ├── ast-grep/
│   ├── build-a-chatbot/
│   ├── pdf/   xlsx/   docx/
│   ├── playwright-cli/   playwright-doc-generator/
│   └── … (see skills/ directory for full list)
│
└── plugins/
    ├── installed_plugins.json   reproducible plugin manifest (committed)
    └── known_marketplaces.json  marketplace registry (committed)
    └── cache/  data/  marketplaces/  ← downloaded plugin code (git-ignored)
```

### What is never committed

| Path                               | Why                                                              |
| ---------------------------------- | ---------------------------------------------------------------- |
| `projects/`                        | Full conversation transcripts — may contain client data (1.4 GB) |
| `context-mode/`                    | ctx knowledge-base SQLite DB (1.2 GB)                            |
| `plugins/cache,data,marketplaces/` | Downloaded plugin code — reinstall from manifest                 |
| `security/`                        | Security-related caches (266 MB)                                 |
| `file-history/`                    | Local edit history (134 MB)                                      |
| `history.jsonl`                    | CLI history — may contain secrets passed on the command line     |
| `settings.local.json`              | Machine-specific overrides                                       |
| `.credentials.json`                | Credentials — stored in macOS Keychain                           |
| `*-cache.json`, `*.bak`            | Ephemeral state                                                  |

---

## New machine setup

Claude Code creates `~/.claude` on first run. Clone on top of it:

```bash
# 1. Install Claude Code (https://claude.ai/code) — creates ~/.claude
# 2. Then, in a terminal:
cd ~/.claude
./sync.sh setup https://github.com/ArkashJ/Claude_code_config.git
```

`sync.sh setup` runs: `git init → remote add → fetch → reset --hard origin/main → set upstream`.
It only overwrites tracked config files; your local transcripts and caches are untouched.

### Restore plugins after setup

The committed JSON manifests list every plugin that was installed:

```bash
cat ~/.claude/plugins/known_marketplaces.json   # which marketplaces to add
cat ~/.claude/plugins/installed_plugins.json     # which plugins to install
```

Re-add them inside Claude Code via `/plugin add <marketplace>` and `/plugin install <name>`.

---

## Day-to-day sync

```bash
cd ~/.claude
./sync.sh status              # show pending tracked changes
./sync.sh push "message"      # commit all tracked changes and push (message optional)
./sync.sh pull                # rebase local config on top of remote
./sync.sh setup <git-url>     # first-time setup on a new machine (see above)
```

Flow across two machines:

```
Machine A                          GitHub                        Machine B
   │                                  │                               │
   ├─ edit CLAUDE.md ────────────────►│                               │
   ├─ ./sync.sh push ────────────────►│                               │
   │                                  │◄── ./sync.sh pull ────────────┤
   │                                  │                               ├─ changes applied
```

---

## Adding a file or directory to version control

The `.gitignore` uses a **whitelist** pattern (`/*` ignores everything; `!path` re-includes).
A new top-level file is ignored by default until explicitly allowed:

```bash
# 1. Add a re-include line to .gitignore
echo '!/my-new-file.md' >> ~/.claude/.gitignore

# 2. Or for a new directory and all its contents
echo '!/my-dir/' >> ~/.claude/.gitignore

# 3. Commit the gitignore change + the new file together
./sync.sh push "track my-new-file"
```

---

## Skills

Skills are modular knowledge packages that extend Claude Code's capabilities.
Installed via `npx skills add <package>` and stored in `skills/`.

| Skill                         | Purpose                                      |
| ----------------------------- | -------------------------------------------- |
| `ast-grep`                    | Structural code search using AST patterns    |
| `build-a-chatbot`             | Chatbot / AI assistant wiring guide          |
| `client-value-maximizer`      | High-impact codebase improvement audit       |
| `docx` / `pdf` / `xlsx`       | Document creation and manipulation           |
| `playwright-cli`              | Browser automation and E2E testing           |
| `playwright-doc-generator`    | Screenshot-driven client-facing docs         |
| `frontend-design`             | Production-grade UI component generation     |
| `network-graph-modal`         | Force-directed relationship graph modal      |
| `vercel-react-best-practices` | React / Next.js performance patterns         |
| `vercel-composition-patterns` | React composition and component API design   |
| `remotion-best-practices`     | Video creation in React with Remotion        |
| `presentation_maker`          | Formatted presentation generation            |
| `find-skills`                 | Skill discovery from the skills.sh ecosystem |

Browse all installed skills in `skills/`.

---

## Hooks

Hooks run automatically on Claude Code events (configured in `settings.json`):

| Hook                          | Trigger    | Purpose                                                 |
| ----------------------------- | ---------- | ------------------------------------------------------- |
| `context-mode-cache-heal.mjs` | PreToolUse | Ensures context-mode cache is healthy before tool calls |

---

## RTK (Rust Token Killer)

All shell commands are transparently rewritten through `rtk` (a token-optimizing proxy)
via a hook in `settings.json`. See `RTK.md` for usage and `rtk gain` for savings analytics.

---

## Related

- [Claude Code docs](https://docs.anthropic.com/claude-code)
- [skills.sh ecosystem](https://skills.sh)
- [context-mode plugin](https://github.com/context-mode/context-mode)
