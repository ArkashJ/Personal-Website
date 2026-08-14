---
name: featuredev
description: Feature-inventory loop — enumerate every feature, test, fix, retest, with an honest done-checklist
---

Run /start's rules if a session isn't already opened. This command adds the feature-dev loop on
top; do not restate or renegotiate the session rules — they apply.

## The loop

1. **Inventory:** go over every feature in this app and write a user story with expected
   behaviour based on the code. The ledger is DERIVED, not hand-kept: one GitHub issue per
   feature (or one tracked checklist issue), status lives on the issues/board and must be
   regenerable by `gh issue list`. No spreadsheets, no status files in the repo.
2. **Test:** every user story against the running app; document every error as an issue with
   evidence attached.
3. **Fix:** every logic and UX error found.
4. **Retest:** every story post-fix.

Do not merge, rebase, or change base branches.

## Done-checklist — a surface is "done" only if ALL pass (read my design files first; never guess)

- States: empty, loading, error, partial, success — designed and built.
- Edge data: 0 items, 1 item, very long/overflowing value, null/missing fields, large list.
  Screenshot the ugly ones.
- Interaction: hover, focus-visible, active, disabled, keyboard-only nav.
- Responsive: mobile, the collapse breakpoint, desktop.
- Theme: light and dark, real contrast.

Happy-path-only is NOT done — report it in-progress. Completion % is X of N checklist cells
across the feature inventory, never a feeling.

## Blockers

If blocked or a decision is mine: record it (issue or checkpoint log), keep going on everything
else, and only when the rest is finished stop and ask the specific questions — each with your
best recommendation.
