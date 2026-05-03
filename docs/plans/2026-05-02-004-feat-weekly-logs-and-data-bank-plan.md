---
title: 'feat: Weekly Running Logs + Daily Highlights Data Bank'
type: feat
status: active
date: 2026-05-02
---

# feat: Weekly Running Logs + Daily Highlights Data Bank

## Summary

Two related-but-separable features. **Weekly logs** = a public, append-only "what I read/watched/learned this week" journal at `/weekly`, with one MDX file per ISO week. **Data bank** = a structured highlights store (`lib/highlights.ts`) where Arkash logs notable daily wins (papers read, talks watched, milestones shipped) tagged by category and priority; the home page pulls the top N to a "Recent wins" rail. Both work file-based (no DB), deploy-on-commit, and feed `llms-full.txt` so AI assistants cite Arkash's recent activity.

---

## Problem Frame

Arkash ships impressive things daily but most evaporates: a paper read in the morning, a talk watched at lunch, a CLI flag fixed in an afternoon — none of it shows up on the site. The site reads as a static dossier of completed work, not a _running engine_ of activity. Two costs:

1. **O-1 evidence loss.** Continuous output is the strongest visa signal, but the site has no surface that proves cadence — only milestones.
2. **Reader fatigue / no return reason.** Visitors who saw the site once have no reason to come back. A weekly log creates one.

The data bank exists because a single weekly file is too coarse for "what was the best thing this Monday?" — Arkash wants per-item granularity that the home page can curate.

---

## Requirements

- R1. A `/weekly` index lists all weekly logs reverse-chronologically with title, date range, and a short blurb.
- R2. Each weekly log lives at `content/weekly/<YYYY>-W<NN>.mdx` (ISO week format) with structured frontmatter.
- R3. A `/weekly/<YYYY>-W<NN>` route renders the MDX.
- R4. A typed `lib/highlights.ts` exports `HIGHLIGHTS: Highlight[]` with date, category, headline, link, tags, and priority (1–5).
- R5. The home page pulls top-priority highlights from the last 30 days and renders them as a "Recent wins" rail above the existing "Latest milestones".
- R6. `llms-full.txt` and `/llm` (when built) include the latest 8 weekly logs and top 12 highlights so AI assistants cite them.
- R7. Adding a new highlight or weekly log requires editing only **one** file; no codegen, no migrations, no Notion sync.

---

## Scope Boundaries

- This plan does NOT add a CMS, database, or external sync (Notion / Airtable / Linear). File-based only.
- This plan does NOT add an authenticated UI for posting from the browser — `/ce-plan` (Clerk) can be extended later.
- Weekly logs are not a replacement for `/writing`. Writing = essays. Weekly = quick log entries.
- Highlights are not a replacement for `/learnings`. Learnings = durable lessons. Highlights = recent activity.

### Deferred to Follow-Up Work

- Auto-generating weekly log skeletons from highlights data (e.g., "build me a draft of this week's log from the last 7 highlights") — useful but premature.
- RSS/Atom feed at `/weekly/feed.xml` — easy follow-up.
- A `/now` page (per nownownow.com) that shows highlights + current focus together.
- Notion two-way sync if Arkash starts logging there first.

---

## Context & Research

### Relevant Code and Patterns

- `lib/content.ts` — already has `getAllWritingPosts()`, `getAllKnowledgePosts()`, MDX loaders. Add `getAllWeeklyLogs()` here following the same pattern.
- `app/writing/page.tsx` + `app/writing/[slug]/page.tsx` — structurally identical to what `/weekly` needs. Copy the shape.
- `lib/data.ts` — pattern for typed exports (`PROJECTS`, `EXPERIENCE`, `TIMELINE`). Add `HIGHLIGHTS: Highlight[]` next to these.
- `app/page.tsx` — already has "Recent timeline strip" section. The "Recent wins" rail follows the same `latestTimeline` pattern.
- `public/llms.txt` — manually-maintained; add a "Recent activity" block. `app/llm/route.ts` (per plan 003) generates the dynamic version.

### Institutional Learnings

- Plan 003 already stood up MDX content loaders for skills — proves the pattern works without a CMS.
- The home page already curates `featured: true` items from `TIMELINE`. Same priority-flag pattern for highlights.

### External References

- [now.now](https://nownownow.com) — community of "what I'm doing now" pages
- [derekKedziora.com/log](https://derekkedziora.com/log/) — running daily-log pattern
- [danluu.com](https://danluu.com) — weekly-ish updates that compound credibility
- ISO 8601 week numbering (`YYYY-Www`) is what `date-fns` `getISOWeek()` returns; pads to 2 digits.

---

## Key Technical Decisions

- **File-based, not DB.** MDX files in `content/weekly/`, typed array in `lib/highlights.ts`. Edit-and-deploy model. Matches how the rest of the site already works.
- **ISO week slugs.** `2026-W18.mdx` (zero-padded). Sorts naturally, is unambiguous, and matches what `date-fns` returns. Avoid `2026-05-week-1` style.
- **Highlights as TS, not MDX.** Highlights are short structured records (1 line per item). TS gives type safety + zero parsing overhead. MDX is overkill for one-line entries.
- **Priority + recency, not pinning.** Home page filter = `priority >= 4 AND date within 30 days`. No manual "pin to home" boolean — let recency + priority decide. Simpler mental model.
- **One commit = one log entry.** Weekly logs and highlights are append-only. Commit history doubles as a public timeline of activity.
- **No search initially.** Three weeks of logs don't need search. Add search when there are 50+ entries. YAGNI.

---

## Open Questions

### Resolved During Planning

- **One weekly log file, or one daily file?** Weekly. Daily creates 365 files/yr and most days don't merit a post. Weekly forces synthesis.
- **Where does `/weekly` live in nav?** Between `Writing` and `Learnings` in primary nav. It's higher-cadence than Writing.
- **Should highlights link out, or have their own detail pages?** Link out (to GitHub PRs, papers, tweets). Highlights are pointers, not content.

### Deferred to Implementation

- Whether to render a calendar heatmap on `/weekly` (nice-to-have; depends on density)
- Exact category taxonomy for highlights — start with `Read | Watched | Built | Shipped | Learned | Met` and refine after 4 weeks of usage.

---

## High-Level Technical Design

```
content/weekly/
  2026-W18.mdx       ← ISO week, frontmatter + body
  2026-W19.mdx
  ...

lib/
  weekly.ts          ← getAllWeeklyLogs(), getWeeklyLog(slug)
  highlights.ts      ← HIGHLIGHTS array + helpers (top, recent, byCategory)

app/
  weekly/
    page.tsx         ← reverse-chrono index list
    [slug]/page.tsx  ← MDX render
    feed.xml/        ← (deferred) RSS

  page.tsx           ← + "Recent wins" rail (top 4 highlights, last 30 days)
```

**Directional only — frontmatter shape:**

```yaml
---
title: 'Cattle Logic ranch onboarding'
weekStart: '2026-04-28' # Monday
weekEnd: '2026-05-04' # Sunday
slug: '2026-W18'
tags: [Benmore, Cattle Logic, FDE]
read: ['Marc Andreessen on agentic infra']
watched: ['Karpathy: state of LLM infra']
shipped: ['Foundry CLI v0.4', 'arkashj.com /skills']
met: ['ranch ops team in Texas']
---
(MDX body — narrative + links)
```

**Highlight type (directional):**

```ts
type Highlight = {
  date: string // YYYY-MM-DD
  category: 'Read' | 'Watched' | 'Built' | 'Shipped' | 'Learned' | 'Met'
  headline: string // 80 chars max
  link?: string
  tags?: string[]
  priority: 1 | 2 | 3 | 4 | 5 // 5 = home page-worthy
  weekSlug?: string // backlink to weekly log
}
```

---

## Implementation Units

- U1. **Add weekly log loader + types**

**Goal:** Stand up the content loader without touching any UI.

**Requirements:** R2

**Dependencies:** None

**Files:**

- Create: `lib/weekly.ts`
- Create: `content/weekly/.gitkeep`

**Approach:**

- Mirror `lib/content.ts` patterns exactly. Export `WeeklyLogMeta` type, `getAllWeeklyLogs(): WeeklyLogMeta[]`, `getWeeklyLog(slug): { meta, source } | null`.
- Sort descending by `weekStart`.
- Validate frontmatter has required fields (`title`, `weekStart`, `weekEnd`); skip invalid files with a console warning rather than crashing the build.

**Patterns to follow:** `lib/content.ts:37-54` (`getAllWritingPosts` + `getWritingPost`)

**Test scenarios:**

- Happy path: `getAllWeeklyLogs()` with 3 valid files returns 3 entries sorted newest-first
- Edge case: empty `content/weekly/` returns `[]`
- Edge case: file with missing `weekStart` is skipped with a warning
- Edge case: ISO week boundaries — Sunday placed in the wrong week is caught by validation

**Verification:** Manual: drop a sample MDX file, run `getAllWeeklyLogs()` from a server component, confirm shape.

---

- U2. **Build `/weekly` index + detail routes**

**Goal:** Public pages for the weekly logs.

**Requirements:** R1, R3

**Dependencies:** U1

**Files:**

- Create: `app/weekly/page.tsx` (server component)
- Create: `app/weekly/[slug]/page.tsx` (server component, MDX render)
- Modify: `lib/site.ts` (add `/weekly` to `NAV_LINKS`)
- Modify: `app/sitemap.ts` (enumerate weekly slugs)

**Approach:**

- Index: list cards with date range, title, blurb, count of items in each category (e.g., "5 read · 2 watched · 3 shipped")
- Detail: render MDX body via existing `MdxContent` component; show structured "what I…" lists from frontmatter as styled rails above the body
- Use `SectionHeader` + `Card` for consistency with the rest of the site

**Patterns to follow:** `app/writing/page.tsx`, `app/writing/[slug]/page.tsx`, `components/MdxContent.tsx`

**Test scenarios:**

- Happy path: index lists logs newest-first, each links to detail
- Happy path: detail page renders the frontmatter rails + MDX body
- Edge case: 404 for unknown slug
- Edge case: empty weekly state shows a "Coming soon — first log this Monday" placeholder

---

- U3. **Add highlights data bank**

**Goal:** Typed structured store for daily highlights, with helpers.

**Requirements:** R4

**Dependencies:** None (parallel to U1/U2)

**Files:**

- Create: `lib/highlights.ts`

**Approach:**

- Export `Highlight` type, `HIGHLIGHTS: Highlight[]` (seed with 5–10 real entries from the last week)
- Helpers: `recentHighlights(days = 30)`, `topHighlights(n = 4, days = 30)`, `highlightsByCategory(cat)`
- Sort newest-first by default
- No external dependencies

**Patterns to follow:** `lib/data.ts` (`PROJECTS`, `TIMELINE` typed-array exports), `lib/finance.ts` (`THESES` + `TRADES`)

**Test scenarios:**

- Happy path: `topHighlights(4, 30)` returns 4 newest with `priority >= 4` from last 30 days
- Happy path: `recentHighlights(7)` filters correctly
- Edge case: empty array returns `[]` with no errors
- Edge case: items dated in the future — exclude (defensive)

---

- U4. **Surface highlights on home page as "Recent wins" rail**

**Goal:** Top 4 high-priority highlights from the last 30 days appear on `/`.

**Requirements:** R5

**Dependencies:** U3

**Files:**

- Modify: `app/page.tsx`

**Approach:**

- New section between "Current updates" and "Latest milestones" — `eyebrow="Recent wins"`, `title="The highlight reel"`, `href="/weekly"` (latest log)
- Render as 2-col card grid: each card = category badge, date, headline, optional external-link arrow
- Skip the section entirely (don't render the SectionHeader) when `topHighlights().length === 0`, to avoid a hollow-state look while the data bank is empty

**Patterns to follow:** "Recent timeline strip" pattern already in `app/page.tsx`

**Test scenarios:**

- Happy path: 4 cards render with correct data
- Edge case: `HIGHLIGHTS = []` → entire section is omitted from the page
- Edge case: only 2 high-priority items → renders 2 cards (responsive grid handles it)

---

- U5. **Wire weekly logs + highlights into LLM surfaces**

**Goal:** AI crawlers see recent activity.

**Requirements:** R6

**Dependencies:** U1, U3

**Files:**

- Modify: `public/llms.txt` (add "Recent activity" block — pointer to `/weekly` and the dynamic `/llm` route)
- Modify: `app/llm/route.ts` (when plan 003 ships) to include latest 8 weekly logs + top 12 highlights
- Modify: `app/sitemap.ts` (already covered in U2 for weekly; highlights have no individual URLs so no sitemap impact)

**Approach:**

- LLM section format: `## Recent Activity\n- 2026-W18: Cattle Logic ranch onboarding (link)\n- ...`
- Keep the static `llms.txt` block short (last 4 weeks); the dynamic `/llm` route can carry more

**Test scenarios:**

- Happy path: `/llm` response includes the latest weekly log title in plain text
- Happy path: highlights appear under a clearly-labeled `## Recent Wins` section

---

- U6. **Document the workflow in CLAUDE.md (so future-Arkash + future-Claude know how to add entries)**

**Goal:** Short addition to the "Adding content (cheatsheet)" table.

**Requirements:** R7

**Dependencies:** U1, U3

**Files:**

- Modify: `CLAUDE.md`

**Approach:**

- Add two rows: "New weekly log → `content/weekly/YYYY-Www.mdx`" and "New highlight → append to `HIGHLIGHTS` in `lib/highlights.ts`"

**Test scenarios:** None — documentation only. Verification = a teammate (or Arkash in 6 months) can add an entry without re-reading this plan.

---

## System-Wide Impact

- **Interaction graph:** Home page now reads from `lib/highlights.ts`. No callbacks, no external services.
- **Error propagation:** Bad frontmatter in a single weekly file should warn-and-skip, not crash the build.
- **State lifecycle risks:** None — file-based, deploy-on-commit.
- **API surface parity:** New routes `/weekly`, `/weekly/[slug]`. No changes to existing routes.
- **Unchanged invariants:** `/writing` (essays), `/learnings` (durable lessons), `/about` timeline (major milestones) all stay scoped to their existing concerns.

---

## Risks & Dependencies

| Risk                                                                         | Mitigation                                                                                                                                                         |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Arkash starts strong but stops logging after 2 weeks → public dead surface   | The "skip empty section" rule on home + a "last logged: N weeks ago" stale indicator on `/weekly` makes silence visible to Arkash without being visible to readers |
| ISO week math gets edge cases wrong (week 53, year boundary)                 | Use `date-fns/getISOWeek` + `date-fns/getISOWeekYear`, never DIY                                                                                                   |
| Highlights pile up forever in `lib/highlights.ts` and the file gets unwieldy | Add an `archive: true` flag at ~12 months; helper functions ignore archived entries by default                                                                     |
| Privacy: a log entry mentions a client by name                               | Pre-publish review checklist in CLAUDE.md addition (U6); no PII / client names without permission                                                                  |

---

## Sources & References

- Origin user request (this conversation): "weekly logs of things I read, podcasts I watched, stuff I learnt" + "data bank of important info that I can choose to display on main page, because I do impressive stuff daily"
- Related plan: `docs/plans/2026-05-02-003-feat-llm-copy-and-skills-public-plan.md` (defines the `/llm` route this plan populates)
- Existing patterns: `lib/content.ts`, `lib/data.ts`, `app/writing/`
