---
name: investigate
description: Evidence-first multi-agent investigation of a repo/PR — evidence ladder, file ledger, adversarial synthesis
argument-hint: [PR url/number + concerns + write mode: read-only | update-comments | implement]
---

Perform an evidence-first, multi-agent investigation. Target and write mode: $ARGUMENTS
(if missing, ask for: PR, critical concerns, and write mode before starting).

## Gates first (each of these has failed a real run of this prompt)

- Preflight includes `gh auth status` — verify token scopes cover everything the write mode
  needs BEFORE wave 1, not at merge time.
- Every subagent that produces work commits and pushes to its own branch immediately; unpushed
  subagent work is invisible and dies with the agent.
- Each lane appends one progress line to a shared file on completion; status is answered from
  that file, never by polling agents.

## Method

1. Read repo instructions (CLAUDE.md/AGENTS.md) first.
2. Fetch the PR's head, base, commits, changed files, comments, reviews, checks, linked issues.
   REFETCH the head immediately before the final report so it cannot be stale.
3. File-by-file ledger for every changed file: what changed, which feature/incident it belongs
   to, callers and downstream consumers, security/money/migration/deploy risk, tests and docs.
4. Trace related PRs before and after — especially emergency fixes that may supersede parts.
5. Incident genealogy where reports exist: symptom → root cause → fixing PR → deployment
   evidence → remaining proof gap.
6. **Evidence ladder — never treat one level as proof of another:**
   source exists < unit/static passes < real SQL/route test passes < migration applied <
   exact SHA deployed < fresh end-to-end behavior verified. Tag every claim with its level.
7. Hunt specifically: migration collisions, dead routes, generic-CRUD bypasses, RBAC/tenant
   scope failures, mutable money inputs after signoff, tests passing via zero-discovery/mocks/
   skips, and stale counts in QA docs, PR descriptions, changelogs, issue checklists.
8. Run the safest relevant local verification; record exact commands, SHA, pass/fail/skip.
9. Two final skeptical agents: one attacks the technical conclusions, one reconciles counts,
   docs, ownership, and release claims. Their objections go in the report.

## Deliverables

Executive verdict (merge-ready / DEV-ready / prod-ready / gate open, with the gate named) ·
file ledger · genealogy · cross-PR collision map · findings ranked Critical→Low with file:line ·
evidence matrix by ladder level · safe order of operations to finish. If write mode permits:
tailored PR comments, non-duplicative issues with acceptance criteria, corrections to stale
docs/checklists — then a final list of writes performed. No merges, promotions, force-pushes,
or assignments without explicit per-action authorization.
