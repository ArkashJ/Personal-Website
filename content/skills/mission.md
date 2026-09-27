---
name: mission
description: Long-running autonomous run — phases with per-phase wraps, batched blockers, self-preservation before limits, skeptical review before final wrap
---

This is an autonomous multi-hour run. Mission: $ARGUMENTS

Run /start first (preflight, enumeration, working rules — including
continuous commit/push/checkpoint-log and volunteered status lines).

Then, BEFORE executing: resolve every concrete token in the mission text above against this
repo — commits (`git cat-file -e <sha>`), branches (`git ls-remote --heads origin <name>`),
issues/PRs (`gh issue view <n>`, escalated out of the sandbox), test counts, file paths. A
handed-in plan goes stale the same way CLAUDE.md/AGENTS.md does, and can even belong to a
different repository — 06f4a671's did (cited commit `602f40b`: "Not a valid object name";
cited 1275 tests: repo runs 120), caught by exactly this check, saving the whole run. Report
what failed to resolve and adapt before phase 1.

Then run the mission in phases, fully autonomously. When a phase needs it, invoke the commands
rather than improvising them: /map for unfamiliar ground, /featuredev for a feature|QA loop,
/investigate for an evidence-first review of your own PRs — before calling a phase done.

## Autonomy rules — these are what make hours-long unattended work safe

1. **Phase boundaries are wrap points.** Break the mission into phases up front and post the
   phase plan to the draft PR. At the END of each phase run the /wrap distillation for that
   phase (changelog delta, issues/board updates, PR comment with done/not-done/not-read). A run
   that dies mid-phase loses at most one phase, never the day.
   Each phase wrap also runs `python3 ~/.claude/skills/harvest/signals.py` and posts
   `asks proven X of N` (wrap step 0b), plus `hunt.py <repo> --since <phase start>` when the
   phase changed React/TanStack code. Long runs studied ended with the human asking "did you act
   on all the changes???" and "are the workflows running though or not???", which a per-phase
   ledger answers before it is asked.
2. **Never stop to ask mid-run — but never run silent either.** Blockers and decisions-that-are-
   mine get recorded (issue or checkpoint log) with your best recommendation, and you continue
   with everything not blocked by them. Only when nothing actionable remains do you stop and
   present the batched questions. Post an unprompted status line to the checkpoint log at every
   phase boundary AND at least every ~15 minutes of work — if the human has to probe, the run
   has failed at this rule (592c8a27: three probes in one session; "You had to ask — that's on me").
3. **Self-preserve before limits kill you.** You cannot see spend limits coming, so behave as if
   the run can be killed at any moment (that is what continuous checkpointing is for). When you
   notice context pressure, checkpoint immediately, write a continuation prompt INTO the PR
   (state, next steps, open questions), and either delegate remaining phases to fresh subagents
   or wrap. Never start a delicate irreversible operation you might not finish.
4. **Delegate hard, tiered.** This run should be mostly orchestration: haiku lanes for sweeps
   and summaries, sonnet lanes for well-specified implementation, strongest model for judgment
   and adversarial verification. Dispatch isolation per /start rule 4. Prefer many small pushed
   commits from lanes over large unpushed work — unpushed lane work dies with the lane. A lane's
   work exists only once VERIFIED LANDED: when a lane returns (or dies), check its worktree is
   clean and its commits are reachable from the branch before believing its report (2d8120f4: a
   killed agent's 9 dirty files sat in a worktree while the session believed the work landed;
   3 of 8 lanes died silently in the same run).
5. **Blast radius still holds.** Merges, deploys, bulk deletes, prod data mutations are NEVER
   autonomous — queue them as the batched questions at the end, with everything staged so each
   is one approved command away.
6. **Adversarial pass before final wrap.** Before ending, run a skeptical
   review of this run's own output (/investigate, or fresh agents prompted to refute). Fix what it finds, then
   do the final /wrap: full distillation, board/issues/changelog, handoff, final status line,
   and the batched decision list — each with a recommendation.

## Status format — banned: completion percentages

Never emit a completion percentage. A number no command produces cannot be checked, so it
drifts (observed going 98→90→96 and "100%" before the suite ever ran). Status is: the pasted
output of the done-criteria checks (test/lint/build results, PR state, dirty files) plus
what's next. If a denominator genuinely exists (X of N enumerated items), say X of N.
