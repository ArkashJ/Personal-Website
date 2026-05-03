# 2.5.0 — Weekly grid + cached git changelog + per-project pages

**Tag:** `v2.5.0` · **Date:** 2026-05-02

This release replaces the rail-bucket UX on `/weekly/[slug]` with a flat searchable card grid, introduces a build-time-cached repository commit feed underneath the grid, ships per-project detail pages mirroring the `/writing/[slug]` pattern, and polishes the description modal per Emil Kowalski's design-engineering framework.

---

## TL;DR

- `/weekly/<slug>` is now one flat card grid (kind badge per card) with a sticky filter bar (search + tag pills + kind facet chips). URL-synced filters: `?q=&tag=&kind=`.
- Repository commit log rendered under the grid, default-scoped to this week, switchable to all-time. Tags = conventional-commit type + scope, frequency-ranked.
- New `/projects/<slug>` route per project, with the GitHub README snapshot at the bottom (fetched at build time via `gh`).
- Project cards keep the user on-site by default. Only the explicit "GitHub →" link goes external.
- Description modal: `max-w-3xl`, body-portaled, `cubic-bezier(0.23, 1, 0.32, 1)` entry/exit, `motion-reduce` safe.

## Why these changes

The user's complaint was that the rail buckets buried items behind a structural choice (which rail did this go in?), the page header was a wall of tag pills, and project cards yanked you off-site to GitHub the moment you clicked. This release flattens the structure, demotes tags from header to filter, and treats GitHub as one optional destination among several.

## Files added

- `app/weekly/[slug]/WeeklyGrid.tsx`
- `app/projects/[slug]/page.tsx`
- `components/sections/GitChangelog.tsx`
- `lib/tags.ts`
- `lib/url-state.ts`
- `lib/weekly-types.ts`
- `lib/git-changelog.ts`
- `lib/git-commit.ts`
- `lib/projects.ts`
- `lib/projects-readme.ts`
- `scripts/sync-git-changelog.mjs`
- `scripts/sync-project-readmes.mjs`
- `content/_generated/git-changelog.json` (committed snapshot)
- `content/projects/<slug>.md` (per-repo README snapshots)

## Files removed

- `app/weekly/[slug]/WeeklyRails.tsx` (replaced by `WeeklyGrid.tsx`)

## Build pipeline

`package.json` gains:

- `"predev": "node scripts/sync-git-changelog.mjs"`
- `"prebuild": "node scripts/sync-git-changelog.mjs && node scripts/sync-project-readmes.mjs"`
- `"sync:changelog"` and `"sync:readmes"` for manual reruns.

## Verification

- `npm run lint` clean (allow the existing pre-existing warnings).
- `npm run build` green.
- Playwright smoke (verified):
  - `/weekly/2026-W18` renders 17 cards, no rail headings, sticky filter bar works, modal opens with full notes.
  - `/projects/spatialdino`, `/projects/raft`, `/projects/benmore-meridian` return 200 with description + highlights + tech + README.
  - `/` selected-work cards click → `/projects/<slug>` (no longer external GitHub).

## Out of scope (deferred)

- Command-palette indexing of weekly items.
- Top-level `/changelog` route reusing `<GitChangelog>` site-wide.
- RSS / JSON feeds for weekly items.
- Per-item dynamic OG images.
