---
name: mission
description: Long-running autonomous run — chains start → phases → per-phase wrap → final wrap. One invocation, hours of work, zero babysitting
argument-hint: [the mission — everything you want done this run]
---

This is an autonomous multi-hour run. Mission: $ARGUMENTS

Execute the /start instructions first (preflight, enumeration, working rules — including
continuous commit/push/checkpoint-log and volunteered status lines).

Then, BEFORE executing: resolve every concrete token in the mission text above against this
repo — run `~/.claude/commands/bin/resolve-plan.sh <planfile>` (or pipe the mission text to
it); it checks commits, #issues/PRs, and file paths, and exits 1 on anything stale. Branches
and counts it can't see: `git ls-remote --heads origin <name>`, test counts by running them. A handed-in plan goes stale the same
way CLAUDE.md does, and can even belong to a different repository — 06f4a671's did (cited commit
`602f40b`: "Not a valid object name"; cited 1275 tests: repo runs 120), caught by exactly this
check, saving the whole run. Report what failed to resolve and adapt before phase 1.

**A brief labelled "verified at source — do not re-derive" gets verified anyway.** In this corpus
that label correlates with staleness, not accuracy: b8e9d4ee's mission prompt said exactly that
about a PR stack already merged, and obeying the instruction is what would have caused damage.
Same shape in 71d1d872 and e7665ec7 (handoff asserted an open PR that was merged), 4a337317 (plan
named an already-merged PR), 6216dc70 (brief claimed CI disabled while a run had finished 15
minutes earlier). The preflight catches these EVERY time it runs — so when you write the handoff
at the end of this run, **emit commands, not claims**: the next session should re-derive state
from `git`/`gh`, never read it out of your prose.

Then run the mission in phases, fully autonomously. Invoke the other commands as skills when a phase matches their
shape: /map for unmapped ground, /featuredev for feature/QA loops, /investigate for reviewing
PRs (including adversarially reviewing your own output before calling a phase done).

## Autonomy rules — these are what make hours-long unattended work safe

1. **Phase boundaries are wrap points.** Break the mission into phases up front and post the
   phase plan to the draft PR. At the END of each phase run the /wrap distillation for that
   phase (changelog delta, issues/board updates, PR comment with done/not-done/not-read). A run
   that dies mid-phase loses at most one phase, never the day.
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

   **Narrow lanes before wide ones.** The spend limit is spent by BREADTH, and a lane killed
   mid-flight costs its tokens AND its output: nine broad lanes burned the limit outright
   (0ad310c2), a killed lane left a half-written module behind (1f231c21), and another left its
   work unverified (3ba29048) — three runs in this corpus. Prefer fewer, tightly-scoped lanes
   with a declared file set and a verify step over many exploratory ones.

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
6. **Adversarial pass before final wrap.** Before ending, run an /investigate-style skeptical
   review of this run's own output (fresh agents, prompted to refute). Fix what it finds, then
   do the final /wrap: full distillation, board/issues/changelog, handoff, final status line,
   and the batched decision list — each with a recommendation.
