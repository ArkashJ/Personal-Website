---
title: 'feat: Website multi-feature overhaul (share image, sections merge, Clerk admin, weekly trim, commits sidebar, second-brain → essays)'
type: feat
status: active
date: 2026-05-03
---

# Website multi-feature overhaul

## Summary

Eleven scoped changes to arkashj.com, executed across parallel git worktrees. Splits naturally into four independent worktree groups: **(A) SEO + nav cleanup** (remove face-as-logo, delete /experience), **(B) home page restructure** (paginated rolling log, merge Now+ThisWeek into one section, connect to changelog), **(C) weekly UX polish** (trim item bodies, fix sticky tags, clickable tag index + fzf, commits-sidebar grid, RSS), **(D) admin + content migration** (Clerk-gated weekly editor, move essay-shaped knowledge articles into writing). Each worktree gets a model recommendation (haiku/sonnet/opus) sized to the work, and each carries playwright-MCP screenshot verification through `/ce-frontend-design`.

---

## Original prompt (verbatim, for traceability)

> I want a few changes to my website:
>
> - whenever I share the website, my face shows up as the logo, remove that image
> - Remove the experience page because the about page has all the info
> - on the main page, I need paginated scrolls with dates for updates so that its a rolling log
> - ensure that the main changelog is connected to the weekly change logs
> - make now and this week a single section; it can be divided by milestones, writing, media and projects
> - Make an admin login for me using clerk so that I can easily add stuff to weekly, basically choosing the podcast/video link, title, description
> - on the weekly page in this specific component, remove the text below the items (keep first 6 components + foundry CLI + 71 claude skills, remove the rest)
> - Why are the tags hanging around? (tags should not be in scroll-motion all the way down)
> - on the changelog: add commits and history as a grid element to the right (use /ce-ideate + websearch for best design); tags clickable + indexable from the weekly global page along with fzf
> - take articles from second brain and move them under essays
> - be creative and recommend things
>
> Use /ce-work + /ce-strategy to set up worktrees per feature, plan each with the correct model (haiku/sonnet/opus), each using playwright MCP and /ce-frontend-design.

---

## Problem Frame

The site is structurally sound but accumulating papercuts: link previews show a personal headshot instead of a branded card; the home page has two near-identical update sections (Now + This Week); the weekly viewer has a sticky filter wall that follows you all the way down; tags exist but aren't navigable; commits live siloed on weekly detail pages with no global view; experience duplicates `/about`; and adding a new podcast/video to the weekly log still requires hand-editing MDX. None of these are individually large; together they are the difference between "a portfolio that ships" and "a daily-driver knowledge surface."

---

## Requirements

- R1. Sharing any URL on Twitter/iMessage/LinkedIn renders a branded OG card, not the personal headshot.
- R2. `/experience` is removed from the codebase, nav, sitemap, internal links, and CommandPalette without 404s on inbound links (server redirect to `/about#career`).
- R3. The home page surfaces a paginated, date-stamped rolling log of weekly updates (replaces the single "This Week" card).
- R4. Each weekly entry on the home page deep-links into its detail page; the home rolling log and `CHANGELOG.md` cross-reference each other.
- R5. "Now" and "This Week" are unified into one section on the home page, internally divided into Milestones / Writing / Media / Projects tabs or rails.
- R6. A Clerk-gated `/admin/weekly` route lets the owner add a new item (kind, title, source, href, description, optional thumbnail) to the current ISO-week MDX file via a server action.
- R7. On `/weekly/[slug]` item cards, the body text under the title is removed; only title, source pill, kind pill, optional thumbnail, and "Open original" remain.
- R8. The weekly filter bar (search + kind pills + tag pills) no longer scrolls with the page — it sits in flow, not sticky.
- R9. `/weekly` global index has a clickable, fzf-style searchable tag index that filters across all weeks.
- R10. The changelog surface (likely `/changelog` or a section on `/about`) renders the hand-written `CHANGELOG.md` plus a commits-and-history grid sidebar to the right.
- R11. Essay-shaped articles in `content/knowledge/` (e.g. `why-i-left-physics`, `aggregation-theory`, `claude-code-as-an-os`, `why-typescript-strict`) move into `content/writing/` with redirects from old URLs.
- R12. All changes are visually verified via Playwright MCP before merge.

---

## Scope Boundaries

- Not building a generic CMS: the admin form writes only to `content/weekly/<current-week>.mdx`; writing/knowledge stays git-authored.
- Not redesigning typography, color tokens, or the navbar shell.
- Not migrating away from Clerk or restructuring auth.
- Not adding analytics, comments, or dynamic personalization.
- The `/ce-ideate` step for the commits-grid sidebar (R10) happens **inside the worktree at execution time**, not in this plan.

### Deferred to Follow-Up Work

- RSS feed for `/weekly` (creative recommendation, see § Creative Recommendations) — separate PR after R7–R9 land.
- Per-week dynamic OG images (one per `/weekly/[slug]`) — separate PR after R1.
- Cmd-K palette entries for weekly tags — separate PR after R9.

---

## Context & Research

### Relevant Code and Patterns

**OG / share image (R1):**

- `lib/metadata.ts` line 45 — `buildMetadata()` defaults `og:image` to `${SITE.url}/images/profile.jpeg`. **Replace with route-relative `/opengraph-image` so Next's dynamic OG handler is used by default.**
- `lib/structured-data.ts` line 9 — `personSchema()` references `/images/profile.jpeg` for `image`. **Keep** (Person schema correctly uses a headshot; this is not the share-card).
- `app/opengraph-image.tsx` — already exists, renders branded card via `lib/og.tsx#renderOg`. Reuse.
- `app/apple-icon.tsx` — already branded (AJ initials, no face). Leave alone.
- `app/layout.tsx` — verify no explicit `<meta property="og:image">` or `icons` field hardcodes `profile.jpeg`.

**Experience deletion (R2):**

- `app/experience/page.tsx` — delete.
- `lib/site.ts` line 30 — remove `{ href: '/experience', label: 'Experience' }` from `NAV_LINKS`.
- `app/sitemap.ts` — remove `/experience` entry.
- `app/page.tsx` — search for any `href="/experience"` link and replace with `/about#career`.
- `components/layout/Footer.tsx` — same.
- `components/ui/CommandPalette.tsx` — remove Experience entry.
- Add `redirects()` in `next.config.js`: `/experience → /about#career` (308 permanent).

**Home rolling log (R3, R5):**

- `app/page.tsx` lines 44–77 — current "This Week" inline block. Replace.
- `components/sections/CurrentUpdates.tsx` — current "Now" component. Either fold into new merged section or delete after migration.
- `lib/weekly.ts#getAllWeeklyLogs` — already returns sorted list; use for pagination.
- New: `components/sections/HomeUpdatesFeed.tsx` — paginated rolling log component (client component for pagination state, or server component using URL `?page=N` for SSR-friendliness).
- New: `components/sections/MergedNowSection.tsx` — tabs/rails for Milestones/Writing/Media/Projects, sourced from `TIMELINE`, `getAllWritingPosts`, `MEDIA`, `PROJECTS` (all in `lib/`).

**Changelog ↔ weekly link (R4, R10):**

- `CHANGELOG.md` — hand-written, lives at repo root.
- `content/_generated/git-changelog.json` — auto, via `scripts/sync-git-changelog.mjs`.
- `lib/git-changelog.ts#getCommitsForWeek` — already filters commits by week.
- `components/sections/GitChangelog.tsx` — client component for rendering, will be reused in the sidebar.
- New: `app/changelog/page.tsx` — renders parsed `CHANGELOG.md` (left, ~⅔ width) with a sticky `CommitsSidebar` (right, ~⅓ width) showing recent commits, type-grouped, with deep links to weekly entries (when commit date falls inside a week).
- New: `lib/changelog-md.ts` — parser for `CHANGELOG.md` Keep-a-Changelog format → typed releases array.

**Clerk admin (R6):**

- `app/ce-plan/` — existing pattern: `ClerkAuthGate.tsx`, `Editor.tsx`, `actions.ts` (server action), `page.tsx` (1.2K shell with dynamic import to avoid SSR-without-Clerk-keys break).
- `@clerk/nextjs` v7.3.0 already installed; `ClerkProvider` already wraps `app/layout.tsx`.
- `app/sign-in/[[...sign-in]]/page.tsx` already exists.
- New: `app/admin/weekly/page.tsx` (shell), `ClerkAuthGate.tsx` (re-import), `WeeklyItemForm.tsx` (client form), `actions.ts` (server action that reads current ISO week, parses MDX frontmatter, appends to correct rail array, writes back).
- Server action uses `gray-matter` (already a dep) for round-trip parse/write.
- **Auth restriction**: gate to a single allowlisted email (`arkash@benmore.tech`) read from `process.env.ADMIN_EMAIL` — Clerk gives the email in `auth().sessionClaims`.

**Weekly item card trim (R7):**

- `app/weekly/[slug]/WeeklyGrid.tsx` `ItemCard` — remove the notes block (line ~333: `<p className="line-clamp-2 ...">{item.notes}</p>`). Keep title (line-clamp-2), source pill, kind pill, thumbnail, "Open original" link.
- `DetailModal` (line 69) is unaffected — clicking the card still opens the modal with full body.

**Sticky tags (R8):**

- `app/weekly/[slug]/WeeklyGrid.tsx` line 441 — filter bar div: `sticky top-0 z-20 -mx-6 px-6 py-3 mb-6 bg-background/85 backdrop-blur`. Remove `sticky top-0 z-20 ... bg-background/85 backdrop-blur` so the bar sits in flow.

**Tag index + fzf (R9):**

- New: `app/weekly/page.tsx` enhancement OR `app/weekly/tags/page.tsx`.
- Use existing `lib/tags.ts#tagsByFrequency` to build a global tag → entries map.
- `cmdk` library (likely already used by CommandPalette — verify) for fzf-style filter; if not, lightweight fuse.js or hand-rolled `String.prototype.includes` chain works.
- Each tag is a `<Link>` to `/weekly?tag=<slug>` — `app/weekly/page.tsx` reads `searchParams.tag` and filters cards.

**Second brain → essays (R11):**

- Source: `content/knowledge/{math,physics,software,finance}/*.mdx` — pick essay-shaped (narrative, single-author voice, no reference grids).
  - Candidates: `why-i-left-physics.mdx`, `aggregation-theory.mdx`, `claude-code-as-an-os.mdx`, `why-typescript-strict.mdx`, `convergence-intuition.mdx`, `supercritical-fluids-paper.mdx`.
  - Keep in knowledge: `ai-hardware-stack.mdx` (reference deck), `fsdp-vs-tensor-parallel.mdx`, `flink-checkpointing.mdx`, `merkle-tree-rust-poc.mdx`, `raft-in-five-minutes.mdx`, `rocksdb-write-amplification.mdx`, `optimizers.mdx`, `spatialdino-lessons.mdx` (reference / worked examples).
- Move files to `content/writing/` (preserve frontmatter; add `originalDomain` field so we can render a small "from /knowledge/<domain>" badge).
- Add 308 redirect in `next.config.js`: `/knowledge/<domain>/<slug>` → `/writing/<slug>` for each moved file.
- Update `KNOWLEDGE_DOMAINS` article counts in `lib/data.ts`.

### Institutional Learnings

- `docs/plans/2026-05-02-001-feat-website-revamp-experience-writing-nav-plan.md` — prior session already discussed the writing/nav restructure. Read before starting Worktree A so we don't re-litigate decisions.
- `docs/plans/2026-05-02-004-feat-weekly-logs-and-data-bank-plan.md` — original weekly architecture; the trim and tag-index work should respect its data model.

### External References

- Next.js 15 dynamic OG: <https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image>
- Clerk + Next.js App Router server actions: <https://clerk.com/docs/references/nextjs/server-actions>
- Keep a Changelog 1.1.0 (the format `CHANGELOG.md` uses): <https://keepachangelog.com/en/1.1.0/>
- `cmdk` for fzf: <https://cmdk.paco.me/>

---

## Key Technical Decisions

- **OG default fix uses Next's file-convention `app/opengraph-image.tsx`**, not a manual `<meta>` override. Rationale: it's already wired; setting `metadataBase` in layout + removing the `og.images = '/images/profile.jpeg'` default in `lib/metadata.ts` lets Next discover the dynamic image automatically per-route.
- **Per-week dynamic OG (deferred)**: each `/weekly/[slug]/opengraph-image.tsx` would render the week's title + date range. Not in this plan.
- **Admin write-path is a server action, not a REST API.** Rationale: matches the `/ce-plan` precedent, avoids new fetch boilerplate, integrates `auth()` cleanly. Writes directly to `content/weekly/*.mdx` and triggers `revalidatePath('/weekly')` + `revalidatePath('/')`.
- **Admin auth is allowlist-by-email, not Clerk roles/orgs.** Rationale: single-user site, avoid Clerk org overhead. Env var `ADMIN_EMAIL` keeps the allowlist out of source.
- **Commits sidebar is a server component** that reads `getGitChangelog()` (already cached JSON), grouped by ISO week, with a "Notes from the corresponding weekly log →" link when a commit's date overlaps a week with a published entry.
- **Tag URLs are query params (`?tag=foo`), not segments.** Rationale: avoids per-tag static generation explosion; preserves SEO via canonical link to `/weekly`.
- **Knowledge → writing migration uses 308 redirects, not symlinks.** Rationale: indexable, search-engine friendly, single source of truth.
- **Sticky tag fix is a 4-class CSS removal, not a refactor.** Smallest possible change.

---

## Open Questions

### Resolved During Planning

- _Should the merged Now+ThisWeek section use tabs or stacked rails?_ → **Stacked rails with sticky in-section nav (anchor links)**. Tabs hide content from screen readers and SEO; rails keep everything indexable.
- _Does pagination on the home rolling log need server-side or client-side state?_ → **Server-side via `?page=N` searchParam.** Cheaper, SSR-friendly, shareable URLs.
- _Where does the changelog page live?_ → **New top-level `/changelog`.** `/about` already does the life-changelog; this one is the engineering changelog.

### Deferred to Implementation

- Exact Tailwind grid ratios for the changelog page sidebar — `/ce-ideate` + Playwright iteration inside Worktree C.
- Whether the weekly admin form needs a "preview" pane or a simpler "submit + reload" loop — start simple, add preview if friction shows up.
- Whether to move `optimizers.mdx` and `convergence-intuition.mdx` (borderline essay-vs-reference) — defer judgment to file-by-file read.

---

## Worktree Grouping & Model Selection

This plan executes across **four parallel git worktrees**. Each is independent enough to land as its own PR. `/ce-strategy` should set them up in order; `/ce-work` runs each. Each worktree includes a Playwright-MCP visual verification step via `/ce-frontend-design`.

| Worktree                         | Branch                                     | Units          | Model                                                                                       | Why                                                                                    |
| -------------------------------- | ------------------------------------------ | -------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **A. SEO + nav cleanup**         | `feat/share-image-and-experience-removal`  | U1, U2         | **haiku**                                                                                   | Mechanical: 2 file edits + 1 directory delete + 1 redirect. Low ambiguity.             |
| **B. Home restructure**          | `feat/home-rolling-log-and-merged-section` | U3, U4, U5     | **sonnet**                                                                                  | Component composition + new sections. Needs design judgment but no novel architecture. |
| **C. Weekly UX + changelog**     | `feat/weekly-trim-tags-changelog-sidebar`  | U6, U7, U8, U9 | **sonnet** (with **opus** consult for U9 commits-grid via `/ce-ideate`)                     | Mix of mechanical fixes (U6, U7) and design-heavy work (U9).                           |
| **D. Admin + content migration** | `feat/clerk-weekly-admin-and-essays-move`  | U10, U11       | **opus** for U10 (Clerk + server action + form), **haiku** for U11 (file moves + redirects) | Admin has security surface; move is mechanical.                                        |

Worktrees A, B, C can run fully in parallel. D depends on nothing but should land last (admin form benefits from the trimmed weekly UX it edits into).

---

## Implementation Units

### U1. **Replace face headshot as default share image**

**Goal:** Sharing any URL renders the branded `app/opengraph-image.tsx` card, not `profile.jpeg`.

**Requirements:** R1

**Dependencies:** none

**Files:**

- Modify: `lib/metadata.ts` (remove `images: [...profile.jpeg]` default; let Next file-convention discover `opengraph-image.tsx`)
- Verify: `app/layout.tsx`, `app/page.tsx`, every `app/**/page.tsx` with custom `generateMetadata` — none should hardcode `profile.jpeg` for og:image
- Keep: `lib/structured-data.ts` (Person.image is correct)
- Keep: `public/images/profile.jpeg` (still used by TimelineItem and Person JSON-LD)

**Approach:**

- In `buildMetadata()`, drop the `openGraph.images` default entirely — Next will use the file-convention `opengraph-image.tsx`. Same for `twitter.images`.
- For pages that explicitly want a custom OG (writing posts already have `opengraph-image.tsx` per route), behavior is unchanged.

**Patterns to follow:**

- `app/writing/[slug]/opengraph-image.tsx` (already exists)

**Test scenarios:**

- Happy path: `curl -sI https://localhost:3000/ | grep og:image` returns `/opengraph-image` route, not `/images/profile.jpeg`.
- Happy path: paste localhost URL into <https://www.opengraph.xyz/> after deploy preview — card shows "arkashj.com / Arkash Jain", no face.
- Edge case: `/writing/why-fde` still uses its per-route opengraph-image (regression check).
- Integration: Twitter card validator + LinkedIn post inspector after merge.

**Verification:**

- Network tab on prod page shows `og:image` pointing to `/opengraph-image` (or per-route override), never `profile.jpeg`.

---

### U2. **Delete `/experience` page; redirect inbound links to `/about#career`**

**Goal:** `/experience` no longer exists in the codebase; nav, sitemap, footer, CommandPalette, and home page link to `/about#career`; old URL 308-redirects.

**Requirements:** R2

**Dependencies:** none

**Files:**

- Delete: `app/experience/page.tsx`
- Modify: `lib/site.ts` (remove from NAV_LINKS)
- Modify: `app/sitemap.ts` (remove `/experience` entry)
- Modify: `components/layout/Footer.tsx` (audit + remove if present)
- Modify: `components/ui/CommandPalette.tsx` (remove entry)
- Modify: `next.config.js` (add `redirects()` returning `[{ source: '/experience', destination: '/about#career', permanent: true }]`)
- Audit-grep: any other `href="/experience"` across `app/`, `components/`, `lib/`

**Approach:**

- One mechanical pass; no design decisions.

**Test scenarios:**

- Happy path: `curl -I http://localhost:3000/experience` returns 308 with `Location: /about#career`.
- Happy path: nav no longer shows "Experience" link.
- Edge case: sitemap.xml does not contain `/experience`.
- Integration: CommandPalette ⌘K search for "exp" returns no `/experience` result.

**Verification:**

- `grep -r "/experience" app components lib` returns zero matches outside `next.config.js` redirect rule.

---

### U3. **Paginated rolling-log section on home page**

**Goal:** Home page has a date-stamped, paginated list of weekly updates (5 per page), replacing the single-card "This Week" block.

**Requirements:** R3, R4

**Dependencies:** none (independent of U4/U5 but logically belongs to the same worktree)

**Files:**

- Create: `components/sections/RollingLog.tsx` (server component reading `getAllWeeklyLogs()`, paginating via `searchParams.page`)
- Modify: `app/page.tsx` — replace inline "This Week" block (lines 44–77) with `<RollingLog page={page} />`
- Test: `__tests__/sections/RollingLog.test.tsx` (if a test runner is added) — otherwise covered by Playwright snapshot below

**Approach:**

- 5 entries per page; page 1 default; `?page=2` etc.
- Each entry: ISO week badge, date range, title, 1-line description, item count, top 3 tags, "Read the log →".
- Pagination controls: « Prev · 1 2 3 · Next » at bottom.
- Server-rendered → fully indexable.

**Patterns to follow:**

- Existing weekly index page (`app/weekly/page.tsx`) for card markup.
- Existing `Card` component variants.

**Test scenarios:**

- Happy path: Playwright loads `/`, sees 5 weekly cards in date-desc order, ISO week badges visible.
- Happy path: clicking "Next" navigates to `/?page=2`, shows next 5.
- Edge case: only 1 weekly log → no pagination controls render.
- Edge case: `?page=999` → empty state with "Back to page 1" link.
- Integration: each card's "Read the log →" link resolves to a 200 weekly detail page.

**Verification:**

- `npm run build` includes the new component, no hydration warnings, Playwright screenshot matches design.

---

### U4. **Merge "Now" and "This Week" into one section, divided by Milestones / Writing / Media / Projects**

**Goal:** Single home-page section titled "Now" with four anchor-linked rails: Milestones, Writing, Media, Projects. Replaces both the old `CurrentUpdates` block and any leftover "Now" eyebrows.

**Requirements:** R5

**Dependencies:** U3 (sequencing — same worktree, lands after rolling log so ordering on home is final)

**Files:**

- Create: `components/sections/NowSection.tsx` (server component composing 4 rails)
- Delete: `components/sections/CurrentUpdates.tsx` (after migrating its writing-fetch logic)
- Modify: `app/page.tsx` (replace `<CurrentUpdates />` with `<NowSection />`)
- Read: `lib/data.ts` (TIMELINE for Milestones, PROJECTS for Projects), `lib/content.ts` (getAllWritingPosts), `lib/media.ts` (MEDIA for Media)

**Approach:**

- Section header: eyebrow "Now", title "What I'm doing", italic accent "this month".
- 4 rails stacked, each with a sub-eyebrow + 3 most-recent items as compact cards + "View all →" link.
- Anchor links at top: `#now-milestones #now-writing #now-media #now-projects`.

**Patterns to follow:**

- `SectionHeader` component for the section title.
- `CurrentUpdates.tsx` card markup for the per-rail cards.

**Test scenarios:**

- Happy path: section renders 4 rails with correct labels and 3 items each.
- Happy path: anchor links scroll to corresponding rail.
- Edge case: a rail with <3 items renders what it has, no placeholder ghosts.
- Integration: clicking any card lands on the correct detail page.

**Verification:**

- Playwright screenshot of home page shows merged section in place of two former sections; no orphaned headers.

---

### U5. **Connect `CHANGELOG.md` ↔ weekly logs (bidirectional)**

**Goal:** `CHANGELOG.md` rendering shows a "Related weekly log →" link per release date that falls inside a published week. Weekly detail pages show a "Released in CHANGELOG: vX.Y.Z" badge when the week contains a release.

**Requirements:** R4

**Dependencies:** U3 (changelog page renders rolling log entries)

**Files:**

- Create: `lib/changelog-md.ts` — parses `CHANGELOG.md` (Keep-a-Changelog format) into `{ version, date, sections: { Added, Changed, Fixed, ... }[] }`.
- Create: `app/changelog/page.tsx` — renders parsed changelog (left column, ⅔ width). Sidebar (right) added in U9.
- Modify: `app/weekly/[slug]/page.tsx` — read parsed changelog, find release with date in `[weekStart, weekEnd]`, render badge + link to `/changelog#vX.Y.Z`.

**Approach:**

- Pure markdown parser — use `remark`/`gray-matter` already installed; or hand-roll regex (changelog format is stable).
- Cache in module scope (read once per process).

**Test scenarios:**

- Happy path: `/changelog` renders all releases.
- Happy path: each release with a matching weekly log shows "Related weekly →" with correct slug.
- Happy path: a weekly log whose week contains a release shows release-version badge.
- Edge case: weekly log with no release in window shows no badge (no empty space).
- Edge case: malformed changelog entry doesn't crash build (parser returns partial list with warning logged).

**Verification:**

- Manually click through 3 weeks' worth of cross-links; both directions work.

---

### U6. **Trim weekly item card body text**

**Goal:** On `/weekly/[slug]` item cards (the flat grid below the filter bar), the notes paragraph is removed. Title, source pill, kind pill, thumbnail, and "Click to read →" remain.

**Requirements:** R7

**Dependencies:** none

**Files:**

- Modify: `app/weekly/[slug]/WeeklyGrid.tsx` (`ItemCard`, around line 333) — delete the `<p className="line-clamp-2 ...">{item.notes}</p>` element.

**Approach:**

- Single-line CSS-block deletion. Modal still shows full body on click — unchanged.

**Test scenarios:**

- Happy path: Playwright loads `/weekly/2026-W18`, no notes paragraph appears below any item card title.
- Happy path: clicking an item still opens the modal with full body content.
- Edge case: item with no thumbnail still renders cleanly.

**Verification:**

- Visual diff between before/after on `/weekly/2026-W18` Playwright screenshot.

---

### U7. **Unstick the weekly filter bar (tags + kinds + search)**

**Goal:** The filter bar on `/weekly/[slug]` no longer follows the user as they scroll.

**Requirements:** R8

**Dependencies:** none

**Files:**

- Modify: `app/weekly/[slug]/WeeklyGrid.tsx` line ~441 — remove `sticky top-0 z-20 -mx-6 px-6 py-3 mb-6 bg-background/85 backdrop-blur` from the filter container's className. Keep margin/padding for spacing.

**Approach:**

- 4-class deletion. No new behavior.

**Test scenarios:**

- Happy path: Playwright scrolls page, filter bar stays at its top-of-page position (does not float).
- Edge case: filter pills still selectable, filter still applies to grid below.
- Edge case: page header above the filter bar is no longer occluded by the sticky overlay.

**Verification:**

- Playwright screencast of scroll on `/weekly/2026-W18` — filter bar exits viewport on scroll.

---

### U8. **Clickable, fzf-searchable tag index on `/weekly`**

**Goal:** `/weekly` page has a tag cloud at the top (or a dedicated `/weekly/tags` block) where each tag is clickable and there's a fzf-style search-as-you-type filter that narrows the visible weekly cards by matching tag.

**Requirements:** R9

**Dependencies:** U6, U7 (same worktree)

**Files:**

- Modify: `app/weekly/page.tsx` — add `searchParams.tag` filter, render tag-index block above weekly grid.
- Create: `components/weekly/TagFzf.tsx` — client component with `cmdk` (or fuse.js) input. On select, navigates to `/weekly?tag=<slug>`.
- Read: `lib/tags.ts#tagsByFrequency` over all `getAllItems()` from all weekly logs.

**Approach:**

- Tag index = top 30 by frequency, rendered as `Badge` components, each is a `<Link href="/weekly?tag=foo">`.
- Active tag filter shows an "× clear" affordance.
- Fzf input above tag cloud: filters the visible badges live (client-side); Enter on first match navigates.

**Patterns to follow:**

- `components/ui/CommandPalette.tsx` for cmdk usage (verify which lib it uses).

**Test scenarios:**

- Happy path: `/weekly` shows tag cloud; clicking "benmore" navigates to `/weekly?tag=benmore`, only matching weekly cards remain.
- Happy path: typing "bench" in fzf input narrows badges to "Benchmark Gap".
- Edge case: `?tag=does-not-exist` shows empty state with "Clear filter" link.
- Edge case: pressing Enter with no matches is a no-op.
- Integration: pressing the home page's weekly card (U3) into a tag-filter view also works (URL composition).

**Verification:**

- Click 3 different tags, each filters correctly and is shareable via URL.

---

### U9. **`/changelog` page with commits-and-history grid sidebar (right)**

**Goal:** `/changelog` renders parsed `CHANGELOG.md` on the left (~⅔ width) with a sticky `CommitsSidebar` on the right (~⅓ width) showing recent conventional commits, type-grouped, with deep links to weekly entries when commit date is in a published week.

**Requirements:** R10

**Dependencies:** U5 (changelog parser), U3 (rolling log on home for cross-link patterns)

**Files:**

- Modify: `app/changelog/page.tsx` (created in U5) — add 2-column layout
- Create: `components/sections/CommitsSidebar.tsx` (server component reading `getGitChangelog()`)
- Reuse: `components/sections/GitChangelog.tsx` rendering primitives where possible

**Approach:**

- **Run `/ce-ideate` + websearch inside the worktree** to choose the sidebar visual treatment (timeline rail vs. heatmap-grid vs. type-grouped accordion). Fixed constraints: must be sticky on desktop, collapses below changelog on mobile, must show commit hash + type + summary, must deep-link to GitHub commit and (when applicable) to `/weekly/<slug>`.
- Default if `/ce-ideate` is inconclusive: type-grouped accordion (`feat`, `fix`, `refactor`, ...) with the 20 most recent commits per group.

**Patterns to follow:**

- `GitChangelog.tsx` (existing) for commit row rendering.
- `lib/git-changelog.ts#getCommitsForWeek` for date-range filtering.

**Test scenarios:**

- Happy path: `/changelog` renders 2-column on desktop, stacked on mobile.
- Happy path: sidebar sticks to top of viewport on scroll (this one _should_ be sticky; contrast with U7).
- Happy path: clicking a commit hash opens GitHub in new tab.
- Happy path: a commit dated `2026-04-30` shows "→ /weekly/2026-W18" link.
- Edge case: empty changelog (no releases) renders the sidebar alone with a "First release coming" left-column placeholder.
- Edge case: 200-commit cap (per `sync-git-changelog.mjs`) does not exceed render budget.

**Verification:**

- Playwright screenshot reviewed by `/ce-frontend-design`; iterate until the layout passes.

---

### U10. **Clerk-gated `/admin/weekly` editor (server action)**

**Goal:** Owner can sign in via Clerk and add a new item (kind, title, source, href, optional thumbnail, description) to the current ISO-week MDX file via a form that triggers a server action.

**Requirements:** R6

**Dependencies:** none

**Files:**

- Create: `app/admin/weekly/page.tsx` (shell, dynamic-import the form to avoid SSR-without-Clerk-keys break — mirror `app/ce-plan/page.tsx` pattern)
- Create: `app/admin/weekly/ClerkAuthGate.tsx` (re-import or copy from `app/ce-plan/ClerkAuthGate.tsx`)
- Create: `app/admin/weekly/WeeklyItemForm.tsx` (client component with controlled inputs)
- Create: `app/admin/weekly/actions.ts` (server action: `addWeeklyItem(formData)`)
- Modify: `next.config.js` if needed (no new image hosts likely)

**Approach:**

- **Auth**: server action calls `auth()` from `@clerk/nextjs/server`, reads `sessionClaims.email`, compares to `process.env.ADMIN_EMAIL`, throws 403 otherwise.
- **Write path**: action reads current ISO week → resolves `content/weekly/<YYYY>-W<NN>.mdx` → if missing, creates it from a template with default frontmatter (`title: 'Draft'`, `weekStart`, `weekEnd`, empty rails) → uses `gray-matter` to parse → appends item to the chosen rail array → serializes back → writes file.
- **Form fields**: rail (read/watched/built/shipped/learned/met dropdown), kind (auto-derived from rail with override), title, source (string), href (URL, validated), description (textarea), thumbnail URL (optional), tags (comma-separated).
- **Post-submit**: `revalidatePath('/weekly')`, `revalidatePath('/weekly/<slug>')`, `revalidatePath('/')` so home rolling log updates immediately.
- **Operational note**: writing to the filesystem in production (Vercel) is read-only. Two safe paths:
  1. **Local-only admin** (recommended): mark the route as gated by `NODE_ENV === 'development'` OR run admin only when the user is editing locally + commits the file. Document this in the form's empty state.
  2. **GitHub commit via API**: server action commits via `@octokit/rest` to the repo; Vercel rebuilds on push.
  - Default to (1); flag (2) as a follow-up if friction shows up.

**Execution note:** Implement with a failing integration test: `addWeeklyItem` called as unauthenticated → expects 403; called as `ADMIN_EMAIL` → file diff shows new entry.

**Patterns to follow:**

- `app/ce-plan/{ClerkAuthGate,Editor,page,actions}.tsx` end to end.
- Existing `gray-matter` usage in `lib/weekly.ts`.

**Test scenarios:**

- Happy path: signed-in admin submits form → MDX file gets new entry under correct rail → home page rolling log re-renders with updated count.
- Edge case: signed-in non-admin email → server action returns 403, form shows error toast.
- Edge case: unsigned-in user visits `/admin/weekly` → ClerkAuthGate redirects to `/sign-in?redirect=/admin/weekly`.
- Edge case: current week's MDX file does not exist → action creates it with template frontmatter.
- Error path: invalid URL in `href` field → form-level validation error, action not called.
- Error path: filesystem write fails (production) → action returns explicit "Run this locally then commit" error string.
- Integration: after submit, navigating to `/weekly/<current-week>` shows the new item card.

**Verification:**

- Manual end-to-end on local dev: sign in, add a real entry, see it on `/`, see it on `/weekly/<current-week>`, commit the diff.

---

### U11. **Move essay-shaped knowledge articles into `/writing`**

**Goal:** Selected `content/knowledge/<domain>/<slug>.mdx` files move to `content/writing/<slug>.mdx` with redirects from old URLs and updated KNOWLEDGE_DOMAINS counts.

**Requirements:** R11

**Dependencies:** none

**Files:**

- Move: `content/knowledge/physics/why-i-left-physics.mdx` → `content/writing/why-i-left-physics.mdx`
- Move: `content/knowledge/finance/aggregation-theory.mdx` → `content/writing/aggregation-theory.mdx`
- Move: `content/knowledge/software/claude-code-as-an-os.mdx` → `content/writing/claude-code-as-an-os.mdx`
- Move: `content/knowledge/software/why-typescript-strict.mdx` → `content/writing/why-typescript-strict.mdx`
- _(Borderline — read first then decide)_ `content/knowledge/math/convergence-intuition.mdx`, `content/knowledge/physics/supercritical-fluids-paper.mdx`
- Modify: each moved file's frontmatter — add `originalDomain: '<domain>'` so `WritingPostPage` can render a "from /knowledge/<domain>" badge.
- Modify: `next.config.js` `redirects()` — add 308 for each moved slug: `/knowledge/<domain>/<slug>` → `/writing/<slug>`.
- Modify: `lib/data.ts` `KNOWLEDGE_DOMAINS` — decrement article counts.
- Audit: any internal `<Link>` to moved articles.

**Approach:**

- Mechanical move + frontmatter merge. No content edits.

**Test scenarios:**

- Happy path: `/writing` index shows moved essays.
- Happy path: `/writing/why-i-left-physics` renders correctly with "from /knowledge/physics" badge.
- Happy path: `curl -I /knowledge/physics/why-i-left-physics` returns 308 → `/writing/why-i-left-physics`.
- Edge case: knowledge domain index page no longer lists the moved article and the count badge is correct.
- Integration: sitemap.xml has the new `/writing/<slug>` URLs and not the old `/knowledge/<domain>/<slug>` ones.

**Verification:**

- `grep -r "knowledge/physics/why-i-left-physics" app components lib content` returns zero matches outside the redirect rule.

---

## System-Wide Impact

- **Interaction graph:** Home page recomposes (U3, U4); weekly detail page recomposes (U5 badge, U6 trim, U7 unsticky); `/weekly` index gains tag UI (U8); new `/changelog` and `/admin/weekly` routes; sitemap regenerates.
- **Error propagation:** Server-action failures in U10 must surface as user-visible toasts, not silent 500s. Changelog parser (U5) must degrade gracefully on malformed input.
- **State lifecycle risks:** U10 writes files — ensure `revalidatePath` fires on all surfaces that read the affected weekly. Admin form must not race with concurrent file edits (acceptable for single-user; document).
- **API surface parity:** No public API changes. Sitemap + robots.txt + redirects all need to reflect deletions and moves.
- **Integration coverage:** Playwright MCP screenshot diffs after each worktree's last unit; visual review via `/ce-frontend-design` pass.
- **Unchanged invariants:** All lib/ data shapes, all writing/knowledge frontmatter contracts (other than the new `originalDomain` field added in U11), Clerk provider configuration in `app/layout.tsx`, theme tokens.

---

## Risks & Dependencies

| Risk                                                                                           | Mitigation                                                                                                                              |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| OG cache: Twitter/LinkedIn aggressively cache previous og:image.                               | After U1 deploys, run their card validators to force re-scrape. Document in U1 verification.                                            |
| `next.config.js` redirects only apply on rebuild, not in dev — admin link audits could miss.   | U2 includes a `grep -r` audit step; U11 does the same.                                                                                  |
| Vercel filesystem is read-only → U10 admin form fails in prod.                                 | Explicitly designed as local-only for now (Approach §1); error message tells the user to commit. Octokit-commit follow-up flagged.      |
| Sticky filter removal (U7) might be regretted if users actually liked filtering on long pages. | Trivial revert (re-add 4 classes); no risk. User explicitly asked for it.                                                               |
| Knowledge → writing migration breaks inbound external links.                                   | 308 redirects preserve them; sitemap update tells search engines.                                                                       |
| Clerk session-claim email might not be populated on free-tier projects.                        | Verify in dev that `auth().sessionClaims?.email` exists; if not, switch to `auth().sessionClaims?.primaryEmail` or use `currentUser()`. |
| Commits sidebar (U9) may visually crowd the changelog page.                                    | `/ce-ideate` step is a hard gate — don't ship until visual review passes.                                                               |
| Playwright MCP requires browser install.                                                       | Already part of `/ce-frontend-design` workflow; should be available.                                                                    |

---

## Documentation / Operational Notes

- Update `CLAUDE.md` "Routes" table: remove `/experience`, add `/changelog`, add `/admin/weekly`.
- Update `CLAUDE.md` "Adding content" cheatsheet: note the admin form as an alternative to direct MDX edits for weekly.
- Update `README.md` if it lists `/experience`.
- Add an entry to `CHANGELOG.md` under `[Unreleased]` for each shipped worktree.
- Set `ADMIN_EMAIL` in Vercel env (if deploying U10's admin to prod via Octokit follow-up).

---

## Creative Recommendations (the "be creative" ask)

Surfaced separately from the implementation units so they don't bloat scope, but worth considering as follow-ups:

1. **RSS feed for `/weekly`** — `app/weekly/feed.xml/route.ts` rendering all weekly logs in Atom format. Subscribers (you, friends) get it pushed. ~30 min of work.
2. **Per-week dynamic OG images** — `app/weekly/[slug]/opengraph-image.tsx` with the week's title + date range + tag count, so each week's share-card is unique.
3. **Cmd-K weekly tag entries** — register top tags as palette entries so ⌘K → "benmore" → opens `/weekly?tag=benmore`.
4. **Weekly digest email** — Resend.com free tier; weekly cron to email yourself the new entry as plain HTML (good for archive; doubles as reading-list reminder).
5. **Changelog page sparkline** — small commits-per-week sparkline at top of `/changelog`, ties the engineering rhythm to the writing rhythm visually.
6. **Year-in-review page** at `/2026` aggregating all weekly tags, top podcasts, top repos — auto-generated from existing data.
7. **Tag co-occurrence graph** — small d3 force graph on `/weekly/tags` showing which topics cluster (Benmore + Cattle Logic, Stripe + Solow, etc.). Real "second brain" energy.
8. **"What changed since you last visited" banner** — cookie-based; shows count of new weekly entries / writing posts since last `localStorage.lastVisit`.
9. **Backfill old weekly logs from CHANGELOG.md** — every CHANGELOG release becomes a synthetic weekly log so the rolling log on home isn't empty pre-W18.
10. **Inline `og:image` validator on the admin form** — when admin pastes a YouTube/Substack URL, the form auto-fetches the og:image and shows a thumbnail preview before submit.

---

## Sources & References

- Original prompt: see § "Original prompt (verbatim, for traceability)" above.
- Related plans:
  - `docs/plans/2026-05-02-001-feat-website-revamp-experience-writing-nav-plan.md`
  - `docs/plans/2026-05-02-004-feat-weekly-logs-and-data-bank-plan.md`
- Key code:
  - `lib/metadata.ts:45`, `lib/structured-data.ts:9` (OG image source)
  - `lib/site.ts:30` (NAV_LINKS)
  - `app/weekly/[slug]/WeeklyGrid.tsx:333,441` (item notes + sticky filter bar)
  - `app/ce-plan/{page,Editor,actions,ClerkAuthGate}.tsx` (admin pattern)
  - `scripts/sync-git-changelog.mjs` (commits → JSON)
- External:
  - Next.js dynamic OG file convention
  - Clerk + Next.js server actions
  - Keep a Changelog 1.1.0
