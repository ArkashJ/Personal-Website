---
name: checkpoint
description: Force a save-point NOW — commit, push, checkpoint log, status. For leaving, risk, or a session that feels wobbly
---

Force a checkpoint right now, exactly as /start rule 3 defines it — this is the manual override
for when I'm about to step away, kill the session, or something feels risky. Do not start new
work after this until I say so.

1. Commit everything committable (logical commits), push. If something is genuinely not
   committable, say what and why — do not leave it silently dirty.
2. Append to the rolling "Checkpoint log" comment on the draft PR (create it if missing):
   what landed since the last checkpoint — each item with its `verify:` certificate (one
   command/URL/screenshot that proves it in under 2 min, or an explicit "judgment-only, needs
   human review" tag) — what is in flight (agents, background work — and whether their work is
   pushed or would die with them), what's next, plus any un-captured `SURPRISE:` / `FALSIFIED:`
   lines from recent work while they're fresh.
3. Print the status line: branch, HEAD, PR state, CI state, agents in flight, dirty files,
   and the one thing most likely to bite whoever resumes.

Raw capture only — no changelog, no issue updates, no doc edits. That distillation is /wrap's
job. If I invoke this and the session later resumes, just continue; if it dies, the next
session's /start recovers from the log.
