# 2026-05-02 — Skills library, unified search, weekly logs

**Version:** 2.4.0
**Recommended git tag:** `v2.4.0`

## What shipped

### Public skills library — `/skills`

- All **71 Claude Code skills** authored across Benmore engagements published as a browsable index.
- Source-of-truth: flat `content/skills/*.md` directory; loader + category rules in `lib/skills.ts`.
- Surfaces:
  - **`/skills`** — categorized list, client-side filter (`SkillsClient`).
  - **`/skills/[slug]`** — per-skill detail with rendered markdown body, line count, category, and a **Copy for LLM** button.
  - **`/skills/[slug]/raw`** — plain-text endpoint (`text/plain; charset=utf-8`), curl-able and pasteable into any LLM.
  - **`/skills.json`** — JSON index (`slug`, `name`, `description`, `category`, `lineCount`) for programmatic discovery.
- Install instructions on each page reference the public `skills.sh` bootstrap script (replaced per-skill GitHub link).
- Benmore badge moved out of nav; renders only on `/skills`.

### Unified search on `/writing`

- Single search input now spans **essays + knowledge-domain articles**, with tag-filter pills.
- `/learnings` content folded into `/writing`; the standalone `/learnings` route is being retired as a primary surface.

### Projects search + filter + pagination

- `/projects` gained a search box, top-8 tag filter with **+N more** expander, pagination, and folded in `WORK_TOOLS` (Foundry, RTK, Compound Skills, Excalidraw) so internal CLIs surface alongside public projects.

### Home page rewiring

- Skills card promotes `/skills` (replaces the prior Knowledge two-up).
- Recent Wins rail + Featured-banner support, sourced from the new `lib/highlights.ts` data bank.
- "Second brain" sections removed from home and `/writing`.

### `/weekly` route

- New ISO-week running log at `/weekly`, sourced from `content/weekly/*.mdx` and `lib/weekly.ts`.
- Shares the highlights data bank with the homepage Recent Wins rail.

### Timeline polish

- `<TimelineItem>` avatars bumped to **36 px** with monogram fallbacks and `bg-elevated` background.

## Why it matters

- The skills library converts ~70 internal markdown artifacts into a public, citable, machine-readable corpus — every skill has a stable URL, a plain-text endpoint, and is enumerated in `/skills.json` for AI crawlers and agent ingestion.
- Unified search collapses three previously separate surfaces (writing, knowledge, learnings) into one query, removing dead-ends in the IA.
- `/weekly` + Recent Wins gives the site an always-fresh "what changed this week" surface — load-bearing for the O-1 evidence narrative.

## Screenshots

Page tour committed under `docs/screenshots/final/`:

- `01-home.png` — homepage with Skills card + Recent Wins
- `02-about.png` — Life Changelog with 36 px avatars
- `03-experience.png`
- `04-projects.png` — search + tag filter + pagination
- `05-research.png`
- `06-writing.png` — unified search + tag filter
- `07-learnings.png` — pre-merge snapshot
- `08-skill-detail.png` — `/skills/[slug]` with Copy for LLM button
- `09-media.png`

## Plans

- `docs/plans/2026-05-02-003-feat-llm-copy-and-skills-public-plan.md`
- `docs/plans/2026-05-02-004-feat-weekly-logs-and-data-bank-plan.md`

## Diff stats (vs. prior `main`)

- 71 new files under `content/skills/`
- 7 new app routes (`/skills`, `/skills/[slug]`, `/skills/[slug]/raw`, `/skills.json`, `/weekly`, plus client components)
- 4 new lib modules (`skills.ts`, `weekly.ts`, `highlights.ts`, `banners.ts`)
- New diagram on `/architecture` covering the skills pipeline

## Links

- Live: https://www.arkashj.com/skills
- JSON index: https://www.arkashj.com/skills.json
- Architecture: https://www.arkashj.com/architecture (diagram 07)
- Changelog: [`CHANGELOG.md` § 2.4.0](../../CHANGELOG.md)
