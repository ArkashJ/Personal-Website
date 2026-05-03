---
title: 'feat: Website Revamp — Second Brain on Writing, Experience Stories, Route Accessibility'
type: feat
status: active
date: 2026-05-02
---

# feat: Website Revamp — Second Brain on Writing, Experience Stories, Route Accessibility

## Summary

This plan restructures arkashj.com across four axes: (1) merge the `/knowledge` "Second Brain" domains into the `/writing` page as a timeline-style section and retire the standalone knowledge index route; (2) build a dedicated `/experience` page with rich institutional stories and scroll-triggered animations for Benmore, Harvard, and BU, replacing the current redirect to `/about#career`; (3) fix route accessibility — add a discoverable nav entry for every built route; (4) make all card components clickable throughout the site. A fifth section produces a standalone Foundry public-launch plan for the Benmore Django repo.

---

## Problem Frame

The site has several structural gaps that hurt both usability and SEO:

- **Knowledge is orphaned from Writing**: The `/knowledge` page (Image #1) and `/writing` page operate as unrelated silos, even though they're both intellectual output. Visitors to `/writing` never discover the domain hubs.
- **Experience has no dedicated surface**: `/experience` is a dead-end redirect to `/about#career`. Benmore, Harvard, and BU deserve their own narrative treatment with context, stakes, and outcomes — not just bullet lists.
- **Hidden routes**: `/architecture`, `/learnings`, `/stack`, `/credentials`, `/docs` appear only in the footer secondary links. Direct URL access works, but discovery is broken.
- **Non-clickable cards**: Cards across the site (ExperienceCard, in particular) render rich content with no link behavior, breaking the expectation that cards are interactive.

---

## Requirements

- R1. The `/writing` page includes a "Second Brain" section showing all 6 knowledge domains as a timeline-style list with article counts, each linking to `/knowledge/[domain]`.
- R2. The standalone `/knowledge` index page is removed or redirects to `/writing#second-brain`.
- R3. `/knowledge/[domain]` and `/knowledge/[domain]/[slug]` routes continue to function unchanged.
- R4. A dedicated `/experience` page exists with stories, context, and scroll-triggered animations for Benmore, Harvard Medical School, and Boston University.
- R5. `/experience` is added to primary navigation (replacing or alongside the Knowledge link).
- R6. All built routes are reachable from the primary nav or a clearly-labeled "More" section — no route requires guessing the URL.
- R7. Every card component site-wide (ExperienceCard, ProjectCard, PaperCard, KnowledgeDomainCard, writing cards) is wrapped in a Link or has an explicit onClick.
- R8. SEO metadata (title, description, JSON-LD) is updated for all affected pages.
- R9. A Foundry public-launch plan is documented in `docs/plans/` for the Benmore Django repo.

---

## Scope Boundaries

- The `/knowledge/[domain]` and `/knowledge/[domain]/[slug]` article pages are NOT removed — only the index hub at `/knowledge` changes.
- The Life Changelog (`/about#timeline`) is NOT changed — the Second Brain section is added to `/writing`, not to `/about`.
- No new MDX content is created in this plan — only structural/navigation/UI changes.
- The Benmore website Django repo is planned here but implemented separately (different repo).

### Deferred to Follow-Up Work

- Per-experience detail pages (e.g., `/experience/benmore`) — individual deep-dive routes are out of scope for v1; the `/experience` page covers all three in one view.
- Foundry implementation (public launch) — the plan is produced here, but implementation is in the benmore repo.
- `/about/timeline/[slug]` deep-dive animations — separate effort.

---

## ASCII User Flows

### Flow A — Writing page with Second Brain

```
User visits /writing
  │
  ├─ [TOP] Hero: "Essays, notes, theses. What I'm learning, in public."
  │
  ├─ [SECTION 1] Tag filter bar + Writing cards grid (existing)
  │   └─ Each card → /writing/[slug]
  │
  └─ [SECTION 2] "Second Brain" domains (NEW)
      │  Timeline-style list of 6 domains
      │  AI · Finance · Distributed Systems · Math · Physics · Software
      └─ Each domain row → /knowledge/[domain]
```

### Flow B — Experience page (new)

```
User visits /experience (direct URL or nav click)
  │
  ├─ [HERO] "Where I've worked. Real stories."
  │
  ├─ [TIMELINE NODE 1] Benmore Technologies
  │   ├─ Role badge + date range
  │   ├─ Story paragraph (2-3 sentences of narrative)
  │   ├─ Impact stats (887% revenue, 15+ SMB clients)
  │   └─ Tech stack badges
  │
  ├─ [TIMELINE NODE 2] Harvard Medical School — Kirchhausen Lab
  │   ├─ Role badge + date range
  │   ├─ Story paragraph (SpatialDINO, DGX training)
  │   ├─ Links to papers
  │   └─ Tech stack badges
  │
  ├─ [TIMELINE NODE 3] Boston University
  │   ├─ Role + TA + researcher
  │   ├─ Story paragraph (Flink thesis, systems TA)
  │   └─ Course/research links
  │
  └─ [FOOTER CTA] See all experience → /about#career
```

### Flow C — Route Discovery

```
Nav bar (primary)
  About · Research · Projects · Coursework · Writing · Experience · Media

Footer (secondary)
  Learnings · Stack · Architecture · Credentials · Docs · Knowledge →

/sitemap.xml enumerates all routes for crawlers
```

### Flow D — Card Click (universal pattern)

```
Any Card component
  │
  ├─ If has href prop → wraps in <Link href={href}>
  ├─ If has onClick → wraps in <button>
  └─ If neither → Card renders as-is (rare; flagged in audit)
```

---

## Context & Research

### Relevant Code and Patterns

- Writing index: `app/writing/WritingIndexClient.tsx` — client component with tag filter; Second Brain section goes here below the posts grid
- Knowledge hub: `app/knowledge/page.tsx` — source of the domains grid; this page gets replaced with a redirect
- Experience redirect: `app/experience/page.tsx` — currently `redirect('/about#career')`; replaced with full page
- ExperienceCard: `components/sections/ExperienceCard.tsx` — no Link wrapper; add `href` prop
- Card primitive: `components/ui/Card.tsx` — accepts `className` but no `href`; extend with optional `href` that auto-wraps
- EXPERIENCE data: `lib/data.ts:EXPERIENCE[]` — extend with `story` field for narrative text, `stats` for impact numbers
- KNOWLEDGE_DOMAINS: `lib/data.ts:KNOWLEDGE_DOMAINS[]` — reused as-is in the Second Brain section
- Timeline visual: `components/sections/TimelineItem.tsx` — reference for the timeline node pattern used in Flow B
- Nav: `lib/site.ts:NAV_LINKS` — add Experience, adjust Knowledge
- SEO: `lib/metadata.ts:buildMetadata()`, `lib/structured-data.ts`
- Animations: `app/globals.css` — `.stagger`, `.reveal` utility classes exist; `prefers-reduced-motion` is honoured

### Institutional Learnings

- None from `docs/solutions/` yet (directory is new).

### External References

- Next.js 15.5 App Router: server components by default; client components opt-in via `'use client'`
- Tailwind CSS 3: animation utilities via `@keyframes` in `globals.css`; respect `prefers-reduced-motion`

---

## Key Technical Decisions

- **Second Brain placement**: Bottom of WritingIndexClient (below posts grid) rather than top — writing is the primary surface; knowledge is the "also explore" section. This avoids diluting the writing page's focus.
- **Timeline vs grid for Second Brain**: Domain rows rendered as a vertical timeline list (date-bar style) with article count badge on the right — matches the site's existing timeline aesthetic (see TimelineItem) rather than repeating the grid from `/knowledge`.
- **Card clickability strategy**: Extend the `Card` primitive with an optional `href?: string` prop. When present, the component renders as `<Link>` wrapping the card div. Components that pass click behavior via parent `<Link>` (already correct: WritingIndexClient, ProjectCard) require no change — only ExperienceCard and the knowledge domain cards need updates.
- **Experience data extension**: Add `story: string` and `stats?: {label: string, value: string}[]` fields to `ExperienceEntry` in `lib/data.ts`. The page renders these without touching existing `bullets[]`.
- **Experience page animations**: CSS-only entrance animations via `IntersectionObserver`-triggered class adds (already in use via `.reveal` / `.stagger`). No new animation library.
- **Knowledge index redirect**: `app/knowledge/page.tsx` becomes a `redirect('/writing#second-brain')`. Domain and slug sub-pages are untouched.
- **Nav restructure**: Replace `{ href: '/knowledge', label: 'Knowledge' }` with `{ href: '/experience', label: 'Experience' }` in `NAV_LINKS`. Knowledge hub is still discoverable via the Second Brain section on Writing and via Footer secondary links (add if missing).
- **Foundry public plan**: Separate plan document, produced as U9.

---

## Open Questions

### Resolved During Planning

- _Should `/knowledge` completely disappear or redirect?_ → Redirect to `/writing#second-brain`. All existing `/knowledge/[domain]/[slug]` permalinks stay valid (critical for SEO / O-1 evidence links).
- _Which experience entries get "story" treatment?_ → Benmore (current, flagship), Harvard (research narrative), BU (origin story). Battery Ventures and others keep bullet-only treatment.
- _Where does Experience sit in nav?_ → Replace Knowledge slot (7th item) with Experience. Knowledge remains discoverable via Writing page and Footer.

### Deferred to Implementation

- Exact copy for `story` fields — implementer drafts based on the bullets in `lib/data.ts:EXPERIENCE`; user reviews before commit.
- Whether `IntersectionObserver` needs a custom hook or can reuse the existing `.reveal` CSS trigger.

---

## High-Level Technical Design

> _This illustrates the intended approach and is directional guidance for review, not implementation specification._

### Second Brain timeline (in WritingIndexClient)

```
<section id="second-brain" className="mt-16 pt-12 border-t border-border">
  <eyebrow>Second Brain</eyebrow>
  <h2>Six domains. In public.</h2>
  <ol>
    {KNOWLEDGE_DOMAINS.map(domain =>
      <li>   ← timeline row
        <Link href="/knowledge/[domain.slug]">
          [dot] [domain.name]   [count badge]   [description]   →
        </Link>
      </li>
    )}
  </ol>
</section>
```

### Experience page structure

```
/experience  (server component)
  ├── <SectionHeader> "Where I've worked." "Real stories."
  └── <ol> timeline
        ├── ExperienceStoryNode (Benmore)  ← new reusable component
        ├── ExperienceStoryNode (Harvard)
        └── ExperienceStoryNode (BU)
        └── [collapsed] remaining entries via ExperienceCard (existing)

ExperienceStoryNode props:
  { org, role, dates, location, story, stats[], bullets[], tech[], links[] }
```

---

## Implementation Units

- U1. **Extend `ExperienceEntry` type + add story data**

**Goal:** Add `story` and `stats` fields to the data layer for Benmore, Harvard, and BU entries.

**Requirements:** R4

**Dependencies:** None

**Files:**

- Modify: `lib/data.ts`

**Approach:**

- Add `story?: string` and `stats?: { label: string; value: string }[]` to the `ExperienceEntry` type interface
- Populate `story` for Benmore (FDE narrative, Employee #2, 887% growth), Harvard (SpatialDINO, DGX, PyTorch PR), BU (Flink thesis, NSF UROP origin)
- Populate `stats` for Benmore: `[{label: 'Revenue growth', value: '887%'}, {label: 'Engagements', value: '15+'}]`; Harvard: `[{label: 'Papers', value: '3'}, {label: 'GPU nodes', value: 'DGX A100'}]`

**Patterns to follow:** Existing `ExperienceEntry` interface in `lib/data.ts`

**Test scenarios:**

- Test expectation: none — pure data extension, no logic

**Verification:** TypeScript build passes with no type errors on the new fields.

---

- U2. **Build `ExperienceStoryNode` component**

**Goal:** A reusable timeline node that renders a rich institutional story: logo, role, dates, narrative paragraph, impact stats row, and tech badges — with a scroll-triggered entrance animation.

**Requirements:** R4

**Dependencies:** U1

**Files:**

- Create: `components/sections/ExperienceStoryNode.tsx`

**Approach:**

- Props: `ExperienceEntry` (extended with story/stats)
- Logo via `InstitutionLogo` (Benmore, Harvard, BU logos already in `InstitutionLogo.tsx`)
- Stats rendered as a `<dl>` row of stat pills (small teal-bordered badges)
- Scroll animation: add `reveal` class; the existing CSS observer handles entrance
- Collapsed bullets (existing `Disclosure` component for the detail bullets)
- No client directive needed if `Disclosure` is already client — check; if so, extract the collapse to a thin `'use client'` wrapper

**Patterns to follow:**

- `components/sections/TimelineItem.tsx` — timeline node visual language
- `components/ui/Disclosure.tsx` — collapse behavior
- `components/ui/InstitutionLogo.tsx` — logo rendering

**Test scenarios:**

- Happy path: component renders with all props populated (org, role, dates, story, stats, bullets)
- Edge case: `stats` is undefined — stats row is hidden, no crash
- Edge case: `story` is undefined — paragraph is hidden, falls back to bullets-only
- Test expectation: visual regression snapshot if Storybook/jest-image-snapshot is available; otherwise manual browser check

**Verification:** Component renders correctly for all three institutions in dev; no TS errors; stats row shows/hides based on prop.

---

- U3. **Build `/experience` page**

**Goal:** Replace the `redirect('/about#career')` with a full server-rendered page: hero header + story timeline for Benmore/Harvard/BU + collapsed remaining entries.

**Requirements:** R4, R5, R8

**Dependencies:** U1, U2

**Files:**

- Modify: `app/experience/page.tsx`
- Modify: `app/experience/opengraph-image.tsx` (update OG title)

**Approach:**

- Server component; imports `ExperienceStoryNode` and existing `ExperienceCard`
- Featured entries: `['Benmore Technologies', 'Harvard Medical School - Kirchhausen Lab', 'Boston University']` — rendered as `ExperienceStoryNode`
- Remaining entries rendered as `ExperienceCard` under a "Earlier career" heading
- JSON-LD: person + organization structured data for SEO
- `buildMetadata()` with title "Experience — Benmore, Harvard, BU" and keywords

**Patterns to follow:**

- `app/about/page.tsx` — layout pattern, `SectionHeader`, breadcrumb JSON-LD
- `app/research/page.tsx` — server component pattern with JSON-LD

**Test scenarios:**

- Happy path: page renders all 3 featured entries + collapsed earlier entries
- Integration: `npm run build` passes (static export works for server component)
- SEO: `<title>` and `<meta description>` contain "Benmore", "Harvard", "Boston University"

**Verification:** Page loads at `/experience` with no redirect; three story nodes visible; breadcrumb JSON-LD present in source.

---

- U4. **Update Card primitive with optional href**

**Goal:** Allow any `Card` to be wrapped as a link by passing `href`, eliminating the pattern of wrapping every card in a parent `<Link>`.

**Requirements:** R7

**Dependencies:** None

**Files:**

- Modify: `components/ui/Card.tsx`

**Approach:**

- Add `href?: string` prop
- When `href` is present, render outer element as `<Link href={href}>` from `next/link`
- Keep all existing class/glow behavior unchanged
- Cards already wrapped in parent `<Link>` (WritingIndexClient, ProjectCard) are unaffected

**Patterns to follow:** `components/ui/Button.tsx` — conditional `href` → `<Link>` vs `<button>` pattern

**Test scenarios:**

- Happy path: `<Card href="/writing/foo">` renders as an anchor with correct href
- Happy path: `<Card>` without href renders as `<div>` (no regression)
- Edge case: href is empty string — renders as div (treat falsy href as absent)

**Verification:** No TypeScript errors; existing Card usages unaffected; new href usage navigates correctly.

---

- U5. **Make ExperienceCard clickable**

**Goal:** Add `href` prop to ExperienceCard so each career entry links to `/experience` (or an anchor on it).

**Requirements:** R7

**Dependencies:** U4

**Files:**

- Modify: `components/sections/ExperienceCard.tsx`

**Approach:**

- Pass `href="/experience"` (or `/about#career`) to the Card primitive
- Benmore/Harvard/BU entries on `/about#career` link to `/experience` directly
- Existing disclosure expand/collapse still works (stop propagation on the Disclosure trigger)

**Patterns to follow:** Updated `Card` from U4

**Test scenarios:**

- Happy path: clicking the card navigates to `/experience`
- Edge case: clicking the "Show more" disclosure button expands bullets without navigating

**Verification:** All ExperienceCards on `/about` are clickable links; disclosure still expands inline.

---

- U6. **Add Second Brain timeline section to Writing page**

**Goal:** Append a "Second Brain" section to WritingIndexClient below the posts grid, rendering all 6 knowledge domains as a timeline-style list, each linking to `/knowledge/[domain]`.

**Requirements:** R1, R8

**Dependencies:** None (KNOWLEDGE_DOMAINS already exported from `lib/data.ts`)

**Files:**

- Modify: `app/writing/WritingIndexClient.tsx`
- Modify: `app/writing/page.tsx` (pass domain article counts as prop)
- Modify: `lib/content.ts` (ensure `getAllKnowledgePosts()` is callable server-side from writing page)

**Approach:**

- In `app/writing/page.tsx` (server component): call `getAllKnowledgePosts()`, compute per-domain counts, pass `domainCounts: Record<string, number>` prop to `WritingIndexClient`
- In `WritingIndexClient`: add `<section id="second-brain">` after the posts grid
- Timeline row: horizontal layout — colored dot, domain name (bold), article count badge (teal mono), description (muted), arrow
- Each row is a `<Link href={/knowledge/${domain.slug}}>` wrapping a styled `<li>`
- Add `#second-brain` anchor for the redirect from `/knowledge`

**Patterns to follow:**

- `app/knowledge/page.tsx` — domain rendering and article count logic
- `components/sections/TimelineItem.tsx` — horizontal row with dot, label, meta

**Test scenarios:**

- Happy path: all 6 domains render with correct article counts
- Happy path: clicking a domain row navigates to `/knowledge/[domain]`
- Edge case: domain with 0 articles shows "0 articles" (no crash)
- Integration: `npm run build` passes with the server-side prop threading

**Verification:** Section visible below writing posts with `id="second-brain"`; article counts match actual MDX files; links work.

---

- U7. **Redirect `/knowledge` → `/writing#second-brain`**

**Goal:** The standalone knowledge index page redirects to the Second Brain section on Writing, preserving the user's intent while consolidating the surface.

**Requirements:** R2

**Dependencies:** U6

**Files:**

- Modify: `app/knowledge/page.tsx`

**Approach:**

- Replace the entire page content with `redirect('/writing#second-brain')` (Next.js `next/navigation` redirect)
- OG image and metadata at `app/knowledge/opengraph-image.tsx` can remain or be removed — keep to avoid broken OG link previews from prior social shares

**Test scenarios:**

- Happy path: visiting `/knowledge` redirects to `/writing#second-brain`
- Happy path: `/knowledge/ai` and `/knowledge/ai/some-post` still render their own content unchanged

**Verification:** `curl -I http://localhost:3000/knowledge` returns 307/308; `/knowledge/ai` still renders.

---

- U8. **Nav restructure + route accessibility**

**Goal:** Replace Knowledge in primary nav with Experience; ensure all built routes are discoverable; update sitemap.

**Requirements:** R5, R6, R8

**Dependencies:** U3, U7

**Files:**

- Modify: `lib/site.ts` — NAV_LINKS, SECONDARY_LINKS
- Modify: `app/sitemap.ts` — verify all routes enumerated
- Modify: `components/layout/Nav.tsx` (if it renders secondary links) — check current implementation

**Approach:**

- `NAV_LINKS`: replace `{ href: '/knowledge', label: 'Knowledge' }` with `{ href: '/experience', label: 'Experience' }`
- `SECONDARY_LINKS`: add `{ href: '/knowledge', label: 'Knowledge Hub' }` so it's still in footer
- Verify `/learnings`, `/stack`, `/architecture`, `/credentials`, `/docs` are all in `SECONDARY_LINKS` (currently: learnings ✓, credentials ✓, stack ✓, architecture ✓, docs ✓)
- `app/sitemap.ts`: verify `/experience` is listed; add if missing

**Test scenarios:**

- Happy path: nav renders "Experience" link; clicking navigates to `/experience`
- Happy path: "Knowledge" appears in footer secondary links
- Integration: sitemap.xml includes `/experience`, `/writing`, `/knowledge`

**Verification:** Nav shows Experience; footer shows Knowledge; sitemap.xml lists all routes.

---

- U9. **Foundry Public-Launch Plan (Benmore repo)**

**Goal:** Produce a standalone plan document for making the Benmore Foundry CLI/tool publicly launchable.

**Requirements:** R9

**Dependencies:** None

**Files:**

- Create: `docs/plans/2026-05-02-002-feat-foundry-public-launch-plan.md`

**Target repo:** `../benmorewebsite/` (the Django benmore_website repo)

**Approach:**

- Read the benmore_website CLAUDE.md, README.md, CHANGELOG.md and sitemap to understand what "Foundry" is
- The Foundry CLI is referenced in lib/data.ts as an internal tool: "Built Benmore Foundry CLI for orchestrating SMB AI consulting engagements"
- Determine if Foundry is part of the Django benmore_website repo or a separate CLI repo
- Plan covers: open-source license choice, README/docs for public consumption, stripping internal credentials/configs, GitHub repo setup, landing page integration with benmore_website, launch announcement

**Patterns to follow:** CONTRIBUTING.md and CHANGELOG.md in benmore_website repo

**Test scenarios:**

- Test expectation: none — this is a plan document, not executable code

**Verification:** Plan document written to disk; covers license, docs, credential scrubbing, repo setup, and launch announcement sections.

---

## System-Wide Impact

- **Interaction graph:** Removing `/knowledge` index affects: sitemap, nav, any internal `<Link href="/knowledge">` references. Search for `href="/knowledge"` before deploy.
- **Error propagation:** The `redirect()` in U7 is a server-side permanent redirect — no client-side error handling needed.
- **State lifecycle risks:** `WritingIndexClient` is a `'use client'` component; passing `domainCounts` as a serialized prop from the server parent is safe (plain `Record<string, number>`).
- **API surface parity:** OG images at `/knowledge/opengraph-image.tsx` should be kept so existing social shares don't break.
- **Integration coverage:** `npm run build` is the integration gate — static analysis catches broken imports and type errors.
- **Unchanged invariants:** `/knowledge/[domain]` and `/knowledge/[domain]/[slug]` routes are completely untouched.

---

## Risks & Dependencies

| Risk                                                                                                                           | Mitigation                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `ExperienceStoryNode` uses `Disclosure` (client component) — may force the whole experience page to be `'use client'`          | Extract disclosure toggle to a thin wrapper; keep page as server component |
| Hardcoded story copy for Benmore/Harvard/BU may not match user's voice                                                         | Draft copy, mark clearly as TODO for user review before merge              |
| `WritingIndexClient` is `'use client'` — prop-threading `domainCounts` from server parent is straightforward but adds coupling | Simple `Record<string,number>` prop; low risk                              |
| Existing social shares of `/knowledge` may break                                                                               | Keep OG image route; redirect only the HTML page                           |
| `/experience` OG image uses old redirect title                                                                                 | Update `app/experience/opengraph-image.tsx` in U3                          |

---

## Documentation / Operational Notes

- CHANGELOG.md: add entry for revamp under a new `## [next]` heading
- SEO: after deploy, verify `/writing` and `/experience` appear in Google Search Console
- The O-1 visa context means `/experience` SEO is load-bearing — JSON-LD for each institution should include `Organization` + `Role` markup

---

## Sources & References

- Writing page: `app/writing/WritingIndexClient.tsx`
- Knowledge hub: `app/knowledge/page.tsx`
- Experience redirect: `app/experience/page.tsx`
- Experience data: `lib/data.ts:EXPERIENCE`
- Knowledge domains: `lib/data.ts:KNOWLEDGE_DOMAINS`
- Timeline component: `components/sections/TimelineItem.tsx`
- Card primitive: `components/ui/Card.tsx`
- Nav links: `lib/site.ts:NAV_LINKS`
- Benmore website: `../benmorewebsite/` (Django; CLAUDE.md, README.md, urls.py reviewed)
