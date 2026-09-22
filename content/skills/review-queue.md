---
name: review-queue
description: Triage and review every open PR in a repo — Jev picks depth and model, code picks merge order
argument-hint: OWNER/REPO (default: this repo's origin)
---

Load the `qa` skill, REVIEW mode. Target: $ARGUMENTS (else `gh repo view --json nameWithOwner`).

1. Run `python3 ~/.claude/skills/qa/review.py <repo>`; show the table as-is.
2. `covered` PRs: list them with the PR that contains them; offer to close (ask first).
3. `blocked`: name the failing check per PR (`gh pr checks`), don't review.
4. For the rest, in merge order, launch one review agent per PR in ONE message, `model` from the
   table; `deep` agents start from the hot files and add a `qa` PLAN of the blast radius.
5. Report per PR: verdict (approve / changes / block), findings with file:line, merge order. No
   approvals, merges or closes without the user saying so.
