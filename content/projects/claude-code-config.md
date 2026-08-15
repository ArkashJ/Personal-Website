# Claude Code config

Portable half of `~/.claude`. Runtime state (transcripts, caches, session locks, plugin
install trees) is ignored — see `.gitignore`. This repo is the whole config surface.

| Path                     | What                                                                     |
| ------------------------ | ------------------------------------------------------------------------ |
| `CLAUDE.md`              | Global instructions applied to every project                             |
| `settings.json`          | Permissions, hooks, model, enabled plugins, auto-mode policy             |
| `commands/*.md`          | Slash commands (`/start`, `/wrap`, `/mission`, …)                        |
| `commands/bin/`          | `claude-sync`, `sync-skills.sh`, `repo-hygiene.sh`, `resolve-plan.sh`    |
| `commands/hooks/`        | `session-preflight.sh`, `block-wasteful-shell.sh` (wired in settings)    |
| `commands/.codex/`       | Codex-adapted variants + their own `sync.sh`                             |
| `rules/`                 | Topic rules pulled into context                                          |
| `skills/`                | Skills. Entries symlinked to `~/.agents/skills` dangle until reinstalled |
| `agents-skill-lock.json` | Copy of `~/.agents/.skill-lock.json` — source URL for each such skill    |
| `plugins/*.json`         | Installed-plugin + marketplace manifests                                 |

`settings.local.json` and anything matching `*.local.json` are machine-local and never sync.

## Sync

```sh
claude-sync        # commit + push this machine's config, and publish
                   # commands/*.md to arkashj.com/skills
claude-sync pull   # fast-forward this machine from the remote
```

## New machine

```sh
git clone git@github.com:ArkashJ/Claude_code_config.git ~/.claude
ln -s ~/.claude/commands/bin/claude-sync ~/.local/bin/claude-sync
```

Then reinstall the `~/.agents/skills` entries listed in `agents-skill-lock.json` to
resolve the dangling symlinks under `skills/`.

## History

`archive/2026-06` holds the previous contents of this repo (a hand-copied snapshot,
last pushed 2026-06-22). `main` was rewritten on 2026-08-14 to track `~/.claude`
directly, inheriting the git history of the former `~/.claude/commands` repo.
