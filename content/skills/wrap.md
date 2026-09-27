---
name: wrap
description: Close a session — land all work, derive changelog/issues/board from git and gh, hand off into the PR, final gate-output status (no percentages)
---

Close this session. The rule for every artifact below: **derive it from the authoritative
source (git log, diffs, PR state, the enumeration from /start) — never hand-write what can be
computed, and never write down state that a command can fetch fresh.** Do all applicable steps;
for any that don't apply, say so in one line. Use cheap-model subagents for the mechanical
derivations where it helps.

## 0. If /harvest ran too: harvest first, wrap consumes it

Harvest builds and commits guards. Wrap lands, merges, cleans up and hands off. Harvest's
undispositioned signals go into step 8's "Not done", never silently dropped.

## 0b. The asks ledger: prove every request with a command

```bash
python3 ~/.claude/skills/harvest/signals.py     # skip if harvest just printed ASKS
```

If harvest did not run, still do its step 0c (`hunt.py --since <session start>`) on the code this
session changed. It is the last Jev look that code gets before the next fresh session.

If this session fixed a bug, its siblings in other repos are found with harvest step 0b: a
calibrated `qa/sweep.py` family run with `--all-repos`. Wrap does not fix them. Each verified
sibling becomes an issue in its repo or a line in step 8, so the fix carries across repos instead
of ending with this session.

| kind           | proof                                                                |
| -------------- | -------------------------------------------------------------------- |
| push / cleanup | `~/.claude/commands/bin/repo-hygiene.sh --landed` (step 6b)          |
| merge          | `gh pr view <n> --json state,mergedAt,mergeCommit`                   |
| deploy         | fresh readback of the NEW behaviour from the serving system (step 9) |
| issues_board   | `gh issue view <n> --json state,projectItems`                        |
| handoff        | the step 8 block, printed                                            |
| code_change    | the commit SHA is on the remote: `git branch -r --contains <sha>`    |
| study / other  | read the turn yourself. These rows never gate ending.                |

Report `asks proven X of N`. An unproven ask goes into "Not done" with its failing command.
Studied follow-ups this answers before they are asked: "did you merge and deploy??", "Are the
files on main or no??", "did you act on all the changes???", "are the workflows running though
or not???".

## 1. Land the work

`git status --porcelain` must end empty: commit remaining work (logical commits, not one blob),
push, and make sure the draft PR exists and is current. Remove scratch artifacts from the tree.
Batch the push: one push per branch at the end, not one per fix. Every push re-runs hosted CI
and sometimes a deploy ("you cannot rerun ci cd after every push", Codex 01a0d50e).

**Hosted CI is not a gate (user policy, 2026-09-27).** It costs money and hours; runs were blocked by
Actions billing in several studied sessions. Run the repo's own local gates (tests, lint, typecheck,
its `verify`/`check:*` scripts) and paste their output into the PR. Do not wait for hosted CI, poll
it, or re-run it. When branch protection blocks a merge only on hosted CI, merge with
`gh pr merge <n> --squash --admin --delete-branch`, citing the local gate output in the PR. A merge
needs that local evidence; the bypass is not permission to skip it.

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
files (CLAUDE.md, AGENTS.md and kin); those carry only invariants and pointers to commands.

A link checker is not a claim checker: `verify.docs-links` passes green on a roadmap with a
wrong issue count, a stale CI banner and a hostname that now 502s (33ecb76f). Any doc that
carries **values** — counts, hostnames, DNS records, credentials, issue numbers — is
regenerated from a readback of the authoritative system, never proofread by eye (e3815767
caught committed client-facing DNS values disagreeing with live infra that way).

## 6b. Repo hygiene — run the script, do not re-derive it

```bash
~/.claude/commands/bin/repo-hygiene.sh --landed   # reports; exit 1 = something is stale or unlanded
```

`--landed` adds: uncommitted files in every worktree, commits that exist on no remote (including
branches that have no upstream), and your open PRs with their check state. Those PRs are durable
but not yet on the default branch. It ends with `SAFE TO END: yes|no — <reason>`. Step 9 quotes
that line verbatim. Never write it by hand.

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

## 8. Continuation prompt — print it, don't just file it

The single most frequent request across 236 harvested sessions (58 of them, 77 turns — more
than "status?", more than "merge") is some form of _"give me a handoff prompt"_. The PR
comment in step 2 is the durable record, but the next session is started by PASTING A PROMPT,
so end the wrap by printing one in a fenced block the human can copy whole:

```
/start then: <one-sentence mission>.
Re-derive before acting (never trust this block): `git -C <repo> fetch --prune && git status
--porcelain && gh pr view <n> --json state,mergeable && gh pr checks <n>`.
Done: <3 lines max, each with its verify command>.
Not done: <items, each "blocked: <failing command>" or "not attempted">.
Decisions waiting on the human: <each one approved command away, with a recommendation —
  for a merge, literally: `gh pr merge <n> --squash --delete-branch` — say go. Recommend: yes/no, why>.
Siblings elsewhere: <repo/path:line from the sweep ledger, verified; or "no family calibrated this session">.
Read first: PR #<n> checkpoint log; <one file>.
```

Commands, not claims — the /mission preamble explains why a brief labelled "verified" is the
one that gets you. If the human asks for the prompt before /wrap, this block IS the answer;
do not make them ask twice (32 sessions contain a re-ask of an already-answered request).

Ask pending decisions with the interactive question tool, all in one call (merge bypasses,
deletions, product choices), each with a recommended option. Do not leave them as a prose list.
"ask all interactively!!" was a correction in 3 studied sessions.

## 9. Final status line

End with: branch, HEAD, PR URL + state, CI state, issues updated/created, board moves, anything
left dirty or in flight — and the one thing most likely to bite the next session.

The last line is the `SAFE TO END:` line, copied verbatim from a `repo-hygiene.sh --landed` run
made in this closing turn. "do i end session" / "So do we end this session?" was asked after 3
studied wraps. This line answers it before it is asked.

Any "deployed / live / fixed in prod" claim in this line requires a fresh readback from the
serving system IN THIS CLOSING TURN: curl the live URL and check for the NEW behavior —
checking for absence of the old string passes on any error page (c3cabb5f: "Fixed and live"
while the server held old pages in memory; cbfc486c: three prod deploys stalled silently while
CLI exit and PR state said done, and the human had to ask "was this pr deployed??").
