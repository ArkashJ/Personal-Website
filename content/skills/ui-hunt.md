---
name: ui-hunt
description: Find the UI bugs this repo keeps shipping — history → shared causes → browser proof
argument-hint: repo path (default: cwd) [--base URL]
---

Load the `qa` skill. Target: $ARGUMENTS (else the current repo).

1. `python3 ~/.claude/skills/qa/history.py <repo>`: the top surface × mechanism rows are the hunt list.
2. For each top row, enumerate every instance in code (shared component → all its consumers;
   status mapping → every branch; list → empty/error/partial states). Count first.
3. React/TanStack repos: `hunt.py` with the repo's `.qa/invariants.json`. Other stacks: parallel
   agents, one per top surface, each verifying candidates at file:line.
4. Prove in the browser with `qa verify <repo> --base URL` / `playwright-cli`, driving the
   `ui-stress` states (empty, error, slow, long text, 320px, denied).
5. Group findings by shared cause: one fix at the shared component, then re-measure every consumer.
   Report: verified defects (P1–P3, file:line, what the user sees), the shared causes, and what stayed unmeasured.
