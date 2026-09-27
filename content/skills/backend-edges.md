---
name: backend-edges
description: Backend edge-case hunt — every endpoint judged by Jev, failing tests written for real gaps
argument-hint: repo path (default: cwd)
---

Load the `qa` skill. Target: $ARGUMENTS (else the current repo).

1. `python3 ~/.claude/skills/qa/history.py <repo>` to find which backend classes escaped before.
2. Enumerate in code (count first): every route (method + path), its input schema, its auth/
   permission requirement (resolve constants), and its writes.
3. Per endpoint, one Jev request with narrow Nouls over the handler + schema only: nullable or
   empty input reaches logic unchecked · ownership/tenant not checked before read/write ·
   write not idempotent on retry · partial failure leaves inconsistent state · error path leaks
   internals or returns 200. Bands: ≥0.7 lead, 0.3–0.7 review.
4. Exact cross-checks in code, not Jev: frontend gate vs backend permission, schema vs model nullability.
5. For each proven lead, write a test that FAILS on current code (sonnet agents in parallel, one per module), then stop.
   Report: failing tests added (path, what they prove), dismissed leads with reason, unmeasured endpoints.

Close with (these were the follow-ups every studied run of this command got): `acted X of N`
over the leads, each one test written / fixed (commit) / issue (URL) / dismissed with a reason;
the live state of any background agent or workflow, read now rather than from memory ("are the
workflows running though or not???"); and, when work continues in another session, /wrap step
8's continuation prompt. Nothing is "on main" until `~/.claude/commands/bin/repo-hygiene.sh --landed` says so.
