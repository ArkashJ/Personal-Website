---
name: wrap
description: Close a session — commit, derive all bookkeeping from git/gh, hand off into the PR
---

Close this session. The rule for every artifact below: **derive it from the authoritative
source (git log, diffs, PR state, the enumeration from /start) — never hand-write what can be
computed, and never write down state that a command can fetch fresh.** Do all applicable steps;
for any that don't apply, say so in one line. Use cheap-model subagents for the mechanical
derivations where it helps.

## 1. Land the work

`git status --porcelain` must end empty: commit remaining work (logical commits, not one blob),
push, and make sure the draft PR exists and is current. Remove scratch artifacts from the tree.

## 2. Handoff → PR, not loose files

Distill the rolling "Checkpoint log" comment first: every `SURPRISE:` / `FALSIFIED:` line gets
routed somewhere in the steps below (docs fix, issue, changelog note) or explicitly discarded
with a reason — freshness was captured in the log so nothing here relies on memory.

Then update the PR description (or add a final PR comment) with: what's done, what's not, what
was NOT read or covered (from the /start enumeration), surprises/falsifications hit, and exact
next steps.
This is the memory the next session's preflight picks up. No loose handoff markdown files.

## 3. Changelog

Derive the entry from commits/merged PRs since the last changelog entry — titles and diffs, not
memory. Conclusions only ("added X", "fixed Y because Z"), no state ("currently at version N").
Write it into `CHANGELOG.md` at the repo root (create the file if the repo lacks one) and commit
it with the wrap — a changelog that lives only in a PR comment is not a changelog.

## 4. Issues and board

For each issue touched: update or close via `gh issue`, with a link to the proving commit/PR —
never mark done without the rule-5 verification from /start. Create issues for anything
discovered-but-not-fixed (one per root cause, with evidence). Move board/kanban items
(`gh project item-edit`) to match reality.

## 5. % completion — only with a denominator

A percentage requires a countable ledger: X of N enumerated items, with the N named. No ledger →
report "done / in-progress / not-started" per item instead of a number. "Blocked" is only valid
with a recorded failing command/response attached; otherwise it is "not attempted".

## 6. API / docs sync

If code changed any surface that docs describe (API routes, schemas, CLI flags, env vars): diff
docs against the generated spec or the code itself, fix drift, and flag—don't silently fix—any
doc claim that was already wrong before this session. Never add mutable state to auto-loaded
files (CLAUDE.md and kin); those carry only invariants and pointers to commands.

A link checker is not a claim checker: `verify.docs-links` passes green on a roadmap with a
wrong issue count, a stale CI banner and a hostname that now 502s (33ecb76f). Any doc that
carries **values** — counts, hostnames, DNS records, credentials, issue numbers — is
regenerated from a readback of the authoritative system, never proofread by eye (e3815767
caught committed client-facing DNS values disagreeing with live infra that way).

## 6b. Repo hygiene — run the script, do not re-derive it

```bash
~/.claude/commands/bin/repo-hygiene.sh          # reports; exit 1 = something is stale
```

Then act on what it prints: prune worktrees, delete branches whose PR is merged, commit
any dirty agent-instruction file. **Deleting a branch or worktree is a blast-radius
action — name it and confirm before each sweep; the script deliberately deletes nothing.**

Do not re-derive this by hand. Harvests of 2026-08-10 found branch/worktree cleanup
re-enumerated from scratch in eight sessions across five repos, human-initiated in most
of them, and one session's handoff prompt carried a hand-written nine-branch deletion
loop as prose — the automation had been written repeatedly and never made a file.

Two traps the script already encodes, so you don't rediscover them:

- `git branch --merged` **lies after a squash merge**. Merge state comes from `gh pr list
--state merged`, never from git's merge base.
- Never report "cleanup done" while an open PR owns a surviving branch (0b192049 did).

## 7. Confidentiality gate

Before committing any derived artifact: no client names, addresses, credentials, or confidential
document content in anything committed or posted. Patterns, not payloads.

## 8. Final status line

End with: branch, HEAD, PR URL + state, CI state, issues updated/created, board moves, anything
left dirty or in flight — and the one thing most likely to bite the next session.

Any "deployed / live / fixed in prod" claim in this line requires a fresh readback from the
serving system IN THIS CLOSING TURN: curl the live URL and check for the NEW behavior —
checking for absence of the old string passes on any error page (c3cabb5f: "Fixed and live"
while the server held old pages in memory; cbfc486c: three prod deploys stalled silently while
CLI exit and PR state said done, and the human had to ask "was this pr deployed??").
