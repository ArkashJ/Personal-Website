---
name: map
description: Explore a repo in parallel and persist ONLY the stable map — conclusions to docs, state never
---

Explore this repo comprehensively with parallel Explore agents (cheap models), then persist what
cannot go stale. The split below is the whole point — violating it poisons every future session.

## Lanes (parallel)

1. Structure: tree of frontend/backend, build/test/lint commands, entry points.
2. Backend: API surface (openapi if present), models/schema, migrations, auth.
3. Frontend: routing, state management, API client generation, component conventions.
4. Docs: README, docs/, data dictionary, existing plans — note claims that contradict the code.
5. Runtime: how to actually run it locally, and whether it runs.

## Persist — conclusions only

Synthesize into CLAUDE.md (create or surgically update, keep it SMALL): build/test/run commands,
conventions, entry points, invariants and gotchas, architecture map with file:line references.
Distilled prose, no raw dumps. If docs claimed things the code contradicts, flag each mismatch
explicitly rather than silently writing the corrected version.

## Never persist — state

No roadmap sections, no issue numbers, no PR statuses, no "current version", no "X is broken",
no inventories of what exists today. All of that is one `gh`/`git` command away and goes stale
in days; it is fetched fresh by /start, not written down. If you are about to write a sentence
that could be false next week, delete it or replace it with the command that answers it.

Finish with: what you mapped, what you could NOT determine (didn't run, couldn't reach), and the
three things most likely to surprise a new session here.
