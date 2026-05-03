# Changelog

All notable changes to **arkashj.com** are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · Versions: [SemVer](https://semver.org/spec/v2.0.0.html).

---

## [2.6.0] — 2026-05-03 — Site overhaul: branded share image, /experience removed, home rolling-log, /changelog page, Clerk-gated weekly admin, LLM-copyable everywhere, /knowledge collapsed into /writing

### Added — Round 2 (post-merge user followups)

- **NowSection moved to the top of `/`** (right under Hero) and converted to horizontal-scrollable rails (`overflow-x-auto snap-x snap-mandatory`, 6 items per rail instead of 3, fixed-width snap cards `w-72 sm:w-80`).
- **`/knowledge/*` collapsed entirely into `/writing/`.** All 9 remaining articles (`ai/{ai-hardware-stack,fsdp-vs-tensor-parallel,spatialdino-lessons}`, `distributed-systems/{flink-checkpointing,merkle-tree-rust-poc,raft-in-five-minutes,rocksdb-write-amplification}`, `math/{convergence-intuition,optimizers}`) moved into `content/writing/` with `originalDomain` frontmatter. `app/knowledge/` deleted. `lib/content.ts` `getKnowledgeDomains/getAllKnowledgePosts/getKnowledgePost` deleted. `lib/data.ts` `KNOWLEDGE_DOMAINS` deleted. The `Second Brain` block on `/writing` removed — single searchable index now.
- **308 redirects** added in `next.config.js` for every `/knowledge/<domain>/<slug>` → `/writing/<slug>`, plus catch-alls `/knowledge` → `/writing` and `/knowledge/:domain` → `/writing`.

### Changed — Round 2

- `/about` no longer renders the "Tools & CLIs" section — `WORK_TOOLS` was duplicated context with `/projects` + `/work`. Section + subnav anchor + import all removed.
- `/weekly/[slug]` no longer renders the long-form MDX prose body below the item grid. Detail-on-demand: full content stays accessible via the per-item modal and the `/weekly/[slug]/raw` endpoint (LLM-copyable).
- `/skills` nav label → **Claude Skills** (`lib/site.ts` `NAV_LINKS`).
- `/weekly` index header dropped the "one entry per ISO week" subtitle — multiple entries per week are explicitly allowed.

### Build — Round 2

- Vercel env: `ADMIN_EMAIL=arkashjain17@gmail.com` set on Production + Development via `vercel env add` (CLI v50.37.3). `vercel env pull .env.local --environment=development` populates the local file. `.env.local` added to `.gitignore`.
- `app/sitemap.ts` no longer enumerates knowledge URLs; adds `/changelog`.
- `components/architecture/Diagrams.tsx` source rail updated.

### Original release (initial commit)

### Added — Home rolling log + merged Now section

- `components/sections/RollingLog.tsx` — paginated date-stamped feed of weekly logs (5/page via `?page=N`, server component, fully indexable). Replaces the single "This Week" card.
- `components/sections/NowSection.tsx` — unifies the old "Now" + "This Week" sections into one block with four anchor-linked rails: Milestones / Writing / Media / Projects. `components/sections/CurrentUpdates.tsx` removed.

### Added — `/changelog` route + commits-and-history sidebar

- `app/changelog/page.tsx` — new top-level route. Two-column desktop layout: parsed `CHANGELOG.md` left (⅔), `<CommitsSidebar />` right (⅓, sticky).
- `lib/changelog-md.ts` — Keep-a-Changelog 1.1.0 parser (handles em-dash separators, long descriptive section labels), module-level cache.
- `components/sections/CommitsSidebar.tsx` — type-grouped accordion (`feat`/`fix` open by default), 20 commits per group, deep-links to GitHub commit + to `/weekly/<slug>` when commit date overlaps a published week.
- `app/weekly/[slug]/page.tsx` now renders a "Released in CHANGELOG: vX.Y.Z →" badge when a release date falls inside the week.

### Added — `/admin/weekly` editor (Clerk-gated, server-action MDX append)

- `app/admin/weekly/{page,ClerkAuthGate,WeeklyItemForm,actions}.tsx` mirroring the `/ce-plan` pattern.
- Server action `addWeeklyItem(formData)` checks `auth().sessionClaims.email` (fallback `currentUser()`) against `process.env.ADMIN_EMAIL` allowlist; parses + appends to `content/weekly/<current-iso-week>.mdx` via `gray-matter`; revalidates `/`, `/weekly`, and `/weekly/<slug>`.
- Auto-creates the current ISO-week MDX file from a template if missing.
- Wraps `fs.writeFileSync` in try/catch — surfaces a friendly "filesystem read-only" message on Vercel prod (admin is local-only by design; commit the diff to ship).
- `lib/weekly-dates.ts` — extracted ISO-week math (`getIsoWeek`, `isoWeekSlug`, `weekToRange`).

### Added — Weekly clickable + fzf tag index on `/weekly`

- `components/weekly/TagFzf.tsx` — client component with debounced filter over the top-30 tags by frequency. Press Enter on first match navigates to `/weekly?tag=<slug>`.
- `app/weekly/page.tsx` reads `searchParams.tag` and filters cards. Active tag shows an "× clear filter" affordance.

### Added — LLM-copyable everywhere

- `app/writing/[slug]/raw/route.ts`, `app/weekly/[slug]/raw/route.ts`, `app/knowledge/[domain]/[slug]/raw/route.ts` — each emits the underlying MDX (frontmatter + body) as `text/plain; charset=utf-8`, cached `s-maxage=86400`. Mirrors the existing `/skills/<slug>/raw` pattern.
- `components/ui/CopyForLlm.tsx` + `lib/copy-for-llm.ts` — generic Safari-safe Clipboard-API button. Wired into the back-link header of every writing, weekly, and knowledge detail page.

### Added — Bidirectional CHANGELOG ↔ weekly

- See `lib/changelog-md.ts#findReleaseInWeek` and the badge wiring in `app/weekly/[slug]/page.tsx`.

### Changed — Default share image is now branded, not the headshot

- `lib/metadata.ts#buildMetadata` no longer defaults `openGraph.images` / `twitter.images` to `/images/profile.jpeg`. Next.js's file-convention `app/opengraph-image.tsx` (which renders the branded card via `lib/og.tsx#renderOg`) is now the source of truth for OG/Twitter cards on every route.
- `lib/structured-data.ts#personSchema` still uses `profile.jpeg` for `Person.image` (correct per schema.org).
- Existing per-route OG renderers (e.g. `app/writing/[slug]/opengraph-image.tsx`) are unaffected.

### Changed — Weekly subtitle, item cards, filter bar

- `/weekly` index header dropped the "one entry per ISO week." italic accent — multiple entries per week are now allowed.
- `app/weekly/[slug]/WeeklyGrid.tsx` `ItemCard` no longer renders the body-text paragraph below the title. Click still opens the full-body modal.
- The filter bar (search + kind + tag pills) is no longer sticky — sits in flow.

### Changed — Skills nav label

- `lib/site.ts` `NAV_LINKS`: `Skills → Claude Skills` to make the surface readable at-a-glance from the navbar.

### Changed — Essay-shaped knowledge articles moved to `/writing`

- Moved (with `originalDomain` frontmatter + 308 redirects in `next.config.js`):
  - `physics/why-i-left-physics`, `physics/supercritical-fluids-paper`
  - `finance/aggregation-theory`
  - `software/claude-code-as-an-os`, `software/why-typescript-strict`
- `lib/data.ts` `KNOWLEDGE_DOMAINS` no longer lists `physics` or `software` (vacated). `finance` retained for its index + thesis/trade sections.

### Removed — `/experience` page

- `app/experience/page.tsx` deleted. Removed from `lib/site.ts` `NAV_LINKS`, `app/sitemap.ts`, `components/architecture/Diagrams.tsx`. CommandPalette + Footer auto-synced.
- 308 redirect `/experience → /about#career` added in `next.config.js`. `/about#career` is the canonical career history.

### Refactored — Cross-cutting deduplication (post-overhaul `/ce-simplify-code` pass)

- `lib/weekly.ts#getAllWeeklyLogs` now caches at module scope (eliminates ~3 redundant FS scans per `/weekly` + `/changelog` render).
- `app/weekly/page.tsx` memoizes `getAllItems()` per log into a `Map<slug, items>` (was called 3× per log).
- `components/ui/ExternalLinkIcon.tsx` extracted; replaces inline copies in `CommitsSidebar` + `GitChangelog`.
- `lib/git-commit.ts` exports `CommitType` union + adds `'weekly'` to `KNOWN_TYPES`; `CommitsSidebar` imports instead of redeclaring.
- `lib/weekly-types.ts` now exports `RAIL_ORDER` + `RAIL_DEFAULT_KIND`; admin form imports instead of redeclaring.
- `app/admin/weekly/actions.ts` replaces TOCTOU `existsSync→read` with `try/read/catch ENOENT`; adds `instanceof Error` guard before `ErrnoException` casts; drops redundant `sessionClaims['email']` fallback.

### Build

- `package.json` 2.5.0 → 2.6.0.
- New routes generated: `/changelog`, `/admin/weekly`, `/writing/<slug>/raw`, `/weekly/<slug>/raw`, `/knowledge/<domain>/<slug>/raw`.
- Vercel env: `ADMIN_EMAIL=arkashjain17@gmail.com` set on Production + Development.
- Recommended git tag: `v2.6.0`.

---

## [2.5.0] — 2026-05-02 — Weekly grid, cached git changelog, per-project pages, polished modals

### Added — Flat weekly item grid (drops the 6-rail bucket UX)

- `app/weekly/[slug]/WeeklyGrid.tsx` (renamed from `WeeklyRails.tsx`): one unified grid of cards (3-col lg / 2-col md / 1 mobile). Each card shows title, source, kind badge (Video / Podcast / Article / Repo / Meeting / Note), and a 3-line notes preview. Click opens the existing `<DetailModal>` (anchor section markdown -> notes -> fallback CTA).
- Sticky filter bar above the grid: search input (matches title/source/notes/tags), kind facet chips, and frequency-ranked tag pills (top 8 + "+N more"). All three filters serialize into `?q=&tag=&kind=` for shareable URLs via the new `useUrlState` helper (`lib/url-state.ts`).
- Per-item tag derivation: log-level `tags:` propagate to every item; an item's own `tags:` adds to the pool; `kind` and `source` auto-tag too. Pure-string `learned` items auto-promote to `{ text, kind: 'note' }`.
- Card stagger entry animation (30 ms cap at 12 cards) via new `.weekly-card-enter` keyframes; `prefers-reduced-motion` falls back to opacity-only.
- Tag wall removed from the page header on both `/weekly` and `/weekly/[slug]`. Tags now render as a footer "Tags · N" section beneath the prose, with the in-grid pills as the canonical filter surface.
- Removed four placeholder mock entries from `content/weekly/2026-W18.mdx` (Andreessen, Tyler Cowen, Karpathy, Latent Space). Only real consumed items remain.

### Added — Cached git changelog under the grid

- `scripts/sync-git-changelog.mjs` generator: reads `git log --no-merges -n 200`, parses conventional-commit `type(scope): subject` (and multi-scope `feat(weekly,projects):`) tolerantly, falls back gracefully on non-conventional messages, drops trivial `.` WIP commits, and writes `content/_generated/git-changelog.json`. Wired as `predev` and `prebuild` hooks in `package.json`. Vercel build has `git`; runtime doesn't — JSON is committed.
- `lib/git-changelog.ts` (server-only loader, `'server-only'` guarded) + `lib/git-commit.ts` (client-safe types + `commitGithubUrl`/`shortHash`). Splitting prevents `fs` from leaking into the client bundle.
- `components/sections/GitChangelog.tsx`: filterable client component grouped by day. Type/scope tag pills (top 12 + expand), search across subject/body/type/scope, "This week / All time" scope toggle, click-to-expand commit body, link-out to GitHub commit.

### Added — Per-project detail pages

- `app/projects/[slug]/page.tsx` (new dynamic route) and `lib/projects.ts` loader. Mirrors the `/writing/[slug]` pattern: header (name + year + kind + GitHub CTA), full description, highlights bullets, run-it command blocks, tech badges, GitHub CTA card.
- Slug derivation in `lib/projects.ts:projectSlug()`: kebab-case, parens-stripped (so `Benmore-Meridian (bm CLI)` -> `benmore-meridian`); collisions between `PROJECTS` and `WORK_TOOLS` get a `-tool` suffix.
- `components/sections/ProjectCard.tsx` click ALWAYS keeps the user on-site. Card body navigates to `/projects/<slug>`; the only off-site path is the explicit "GitHub →" footer link.
- `app/sitemap.ts` enumerates every `/projects/<slug>` URL.
- New `scripts/sync-project-readmes.mjs` + `lib/projects-readme.ts`: at build time, `gh api repos/<owner>/<repo>/readme` snapshots are written to `content/projects/<slug>.md` and rendered at the bottom of each project page via `<MdxContent>`.

### Added — Lifted helpers reusable across surfaces

- `lib/tags.ts:tagsByFrequency()` — generic frequency rank used by weekly grid and git changelog.
- `lib/url-state.ts:useUrlState()` — small `useSearchParams`/`router.replace` wrapper for shareable filter URLs.
- `lib/weekly-types.ts` — pure types + helpers (no `fs`) so client components can import without dragging the server-only loader into the bundle.

### Changed — Weekly modal sized for substance

- `max-w-lg` → `max-w-3xl`, `max-h-[78vh]` → `max-h-[82vh]`. `bg-background` → `bg-surface`.
- Body-portaled via `createPortal(…, document.body)` to escape an ancestor `transform` that scoped `position: fixed` away from the viewport.
- Entry/exit animation: `scale(0.96) + translateY(8px) + opacity` over 220 ms with `cubic-bezier(0.23, 1, 0.32, 1)`; exit 160 ms; `motion-reduce` collapses to opacity-only. Per Emil Kowalski's design-engineering framework.

### Build

- `package.json` 2.4.1 → 2.5.0. New `predev` + `prebuild` scripts run the changelog + readme sync. New `sync:changelog` and `sync:readmes` for manual rerun.
- `server-only` added to dependencies.
- Recommended git tag: `v2.5.0`.

### Docs

- `docs/release-notes/2026-05-02-weekly-grid-and-changelog.md`: full release notes.
- README routes table refreshed.

---

## [2.4.2] — 2026-05-02 — Weekly log modal reader, full podcast notes, expanded tags

### Added — Click-to-read modal on weekly rail items

- `app/weekly/[slug]/WeeklyRails.tsx` (new client component): rail items with a frontmatter `anchor:` field now open a scrollable detail modal instead of jumping to a page anchor. Modal features: semi-transparent backdrop, max-w-2xl × 85vh scrollable container, thumbnail + title + watch/listen link in header, full section notes rendered via `react-markdown` + `remark-gfm`, closes on X button / backdrop click / ESC key, body scroll locked while open.
- `app/weekly/[slug]/page.tsx`: server-side `extractSections()` splits the MDX source on `<div id="..."></div>` markers and passes per-anchor markdown strings to `WeeklyRails` as props. Prose body retained below rails for linear reading and SEO.
- `lib/weekly.ts` + `lib/weekly-render.ts`: `WeeklyItem` gains optional `anchor` field (links item to a detail section) and `notes` field (inline summary shown in the rail card).

### Added — Full podcast notes for 2026-W18

- `content/weekly/2026-W18.mdx`: 5 new watched entries with full structured notes:
  - **Stripe Sessions keynote** — AI replatforming, solopreneurs (5M Americans, $100k+), Tempo CLI stablecoin micro-payments, complement theory (data / network effects / physical moats), Solow Paradox.
  - **Odd Lots — Taiwan/China** — Eyck Freymann: Xi's political legitimacy motivation, silicon shield, KMT vs DPP, China's shock absorbers, ruble trade playbook, avalanche decoupling.
  - **Odd Lots — METR** — Joel Becker & Chris Painter: time horizon methodology, 50% success threshold, 4-month capability doubling, Baptist-and-Bootlegger dynamic.
  - **Odd Lots — Dinosaur fossils** — Salomon Aaron: Stan T-Rex $31M / Apex Stegosaurus $45M pricing reset, bone maps, pre-buy strategy, sovereign wealth fund competition.
  - **Pershing Square PSUS** — Bill Ackman: closed-end fund structure, no incentive fees, permanent capital compounding, Vantage Holdings insurance float model, 19% ROE / 24.9% 8yr track record.
- Thursday (Apr 30) deep-dive session backfilled in `learned` rail.
- Tags expanded to 35 covering: Agentic Commerce, Stablecoin Payments, Solow Paradox, Silicon Shield, TSMC Dependence, KMT vs DPP, Avalanche Decoupling, Time Horizons, Capability Doubling, Baptist-and-Bootlegger, Alternative Assets, Fossil Market, Pre-Buy Strategy, Closed-End Funds, Permanent Capital, Insurance Float, and more.

---

## [2.4.1] — 2026-05-02 — Rich weekly logs, home-page surfacing, mobile fix

### Fixed — Safari "Copy for LLM" button silently failed

- `app/skills/SkillsClient.tsx` and `app/skills/[slug]/SkillCopyButton.tsx` previously did `await fetch('/skills/<slug>/raw')` followed by `navigator.clipboard.writeText(text)`. Safari (and Chromium under strict clipboard policies) revokes the user-activation gesture across the async hop, so the clipboard write threw `NotAllowedError` and the button rendered the red "Copy failed" state.
- New `lib/copy-skill.ts` uses the spec-blessed `navigator.clipboard.write([new ClipboardItem({'text/plain': fetch(url).then(r => r.blob())})])` pattern — Safari preserves the user gesture across a `Promise<Blob>` passed to `ClipboardItem`. Falls back to `writeText` for older browsers without `ClipboardItem`. Errors now log to console for diagnosability.

### Added — Rich rail items on weekly logs

- `lib/weekly.ts` extended: each entry in `read`/`watched`/`built`/`shipped`/`learned`/`met` is now `string | { text, href?, image?, source?, kind? }`. Plain strings still work for quick logging.
- New `lib/weekly-render.ts` derives renderable items: YouTube URLs auto-resolve `https://i.ytimg.com/vi/<id>/mqdefault.jpg` thumbnails (`youtube.com/watch?v=…`, `youtu.be/…`, `youtube.com/shorts/…`); known sources (YouTube, Substack, Medium, GitHub, LinkedIn, X, arXiv, Spotify, Apple Podcasts, Overcast, Latent Space) auto-fetch monochrome SimpleIcons logos via `cdn.simpleicons.org`. Falls through cleanly when nothing matches.
- `app/weekly/[slug]/page.tsx` rails now render link cards: 64×36 thumbnail (YouTube) or 16×16 logo (SimpleIcons), linked title with hover, source label in muted mono caps. External `href`s open in new tab; internal `href`s use anchor navigation.
- `content/weekly/2026-W18.mdx` updated to use the rich format end-to-end (Karpathy YouTube → auto-thumbnail, Latent Space podcast, a16z article, GitHub repos with auto-resolved logos).

### Added — "This week" home-page section

- `app/page.tsx` now renders a "This week" card directly under the hero, surfacing the latest weekly log: title, week range, six-category counts grid (Read · Watched · Built · Shipped · Learned · Met), tags, click-through to `/weekly/<slug>`. Wired via new `getLatestWeeklyLog()` export from `lib/weekly.ts`.

### Fixed — `/skills` horizontal overflow on mobile

- The three-column "How to use these skills" grid contained `<pre>` blocks with unbreakable shell commands (`curl -fsSL "https://www.arkashj.com/skills/$s/raw"`). CSS Grid items default to `min-width: auto` = `min-content`; on a 390px viewport this expanded each cell to **565px**, forcing horizontal page scroll despite the inner `<pre>` having `overflow-x-auto`.
- Added `min-w-0` to the three grid children so they can shrink below intrinsic min-content and the inner `overflow-x-auto` can engage. iPhone 13 (390×844) viewport probe goes from `hOverflow: true` (175px excess) to clean.
- Audited all 19 public routes at iPhone width with a programmatic Playwright probe (`document.documentElement.scrollWidth` vs `innerWidth`, walking offending elements) — every other route was already responsive-clean.

### Docs

- Release note: `docs/release-notes/2026-05-02-weekly-rich-items.md`.
- `CLAUDE.md` — "Adding content" cheatsheet now documents the rich weekly-item shape and auto-derivation rules.

### Build

- `package.json` version bumped 2.4.0 → 2.4.1.
- Recommended git tag: `v2.4.1`.

---

## [2.4.0] — 2026-05-02 — Public skills library, unified search, weekly logs

### Added — Public skills library

- New `/skills` route renders all 71 Claude Code skills authored across Benmore engagements as a browsable, copy-for-LLM index.
- `content/skills/*.md` is the source of truth — flat directory of 71 skill markdown files (lessons, system prompts, scripts) loaded server-side via `lib/skills.ts` (`fs` + `gray-matter`).
- `app/skills/page.tsx` — server-rendered list, filtered by category via `<SkillsClient>` (client-only filter UI; data is server-fetched).
- `app/skills/[slug]/page.tsx` — per-skill detail page with rendered body, line count, category, and a `<SkillCopyButton>` ("Copy for LLM") that streams the raw markdown to clipboard.
- `app/skills/[slug]/raw/route.ts` — plain-text endpoint at `/skills/<slug>/raw` returning the raw markdown with `text/plain; charset=utf-8`. Unauthenticated, cacheable, designed to be `curl`-able and pasteable into any LLM.
- `app/skills.json/route.ts` — JSON index of all skills (slug, name, description, category, lineCount) for programmatic discovery and crawler hints.
- `lib/skills.ts` — single loader. Categorization via regex rules (Payments, Python Backend, Frontend & Apps, Compliance & Security, SEO & AI, Design Engineering, Product & Discovery, Workflow & Ops, Tooling & Integrations, Misc).
- LLM install instructions surfaced on each skill page; references to the public `skills.sh` install script (replaces per-skill GitHub link).
- Page-tour screenshots committed under `docs/screenshots/final/` (01–09 covering home, about, experience, projects, research, writing, learnings, skill-detail, media).
- `app/sitemap.ts` enumerates `/skills` + every `/skills/[slug]` route.
- `public/llms.txt` updated to advertise `/skills.json` and `/skills/<slug>/raw` endpoints to AI crawlers.
- Benmore badge (`components/ui/BenmoreBadge.tsx`) lives on `/skills` only — moved out of nav to keep main chrome neutral.

### Added — Unified search on `/writing`

- `app/writing/WritingIndexClient.tsx` rewritten to search across **essays + knowledge-domain articles** in one input. Tag filter pills run alongside the search input; results merge writing entries and knowledge entries with source-type badges.
- `/learnings` content folded into `/writing` (the standalone `/learnings` route is being retired as the primary surface).

### Added — Projects search + tag filter + pagination

- `app/projects/ProjectsClient.tsx` — search box, tag filter collapsed to **top 8 tags + "+N more" expander**, paginated grid, and `WORK_TOOLS` (internal CLIs from `/work`) folded into the same surface so Foundry / RTK / Compound Skills / Excalidraw appear next to public projects.
- `app/projects/page.tsx` slimmed to a server shell that delegates to the client component.

### Added — Home page rewiring

- Skills card on the homepage promoting `/skills` (replaces the prior Knowledge two-up).
- "Recent wins" rail and Featured-banner support for surfacing the latest highlight.
- "Second brain" section removed from home and from `/writing` (folded into the unified search experience).

### Added — `/weekly` running logs

- New `/weekly` route renders ISO-week running logs sourced from `content/weekly/` (MDX) and `lib/weekly.ts` (typed loader).
- `lib/highlights.ts` — typed data bank for "highlights of the week"; consumed by the home Recent Wins rail and `/weekly`.
- Plan: `docs/plans/2026-05-02-004-feat-weekly-logs-and-data-bank-plan.md`.

### Changed — Navigation

- `lib/site.ts` `NAV_LINKS` updated: `/skills` and `/writing` (with merged learnings) added/promoted; `/knowledge` demoted to secondary.
- Benmore badge removed from `<Nav>`; only renders on `/skills`.

### Changed — Timeline avatars

- `components/sections/TimelineItem.tsx` — avatars bumped to **36 px**, monogram fallback when no logo is available, `bg-elevated` background, consistent ring treatment across major and minor entries.

### Docs

- New plans:
  - `docs/plans/2026-05-02-003-feat-llm-copy-and-skills-public-plan.md` — design + rollout for the public skills library and "Copy for LLM" affordances.
  - `docs/plans/2026-05-02-004-feat-weekly-logs-and-data-bank-plan.md` — `/weekly` route + highlights data bank.
- Release note: `docs/release-notes/2026-05-02-skills-library.md`.

### Build

- `package.json` version bumped 2.3.0 → 2.4.0.
- Recommended git tag: `v2.4.0`.

---

## [2.3.0] — 2026-04-27 — Asset consolidation, mobile, Trustpilot, GitHub live charts

### Added — Live GitHub activity section on the homepage

- New `components/sections/GitHubActivity.tsx` rendering:
  - Live 12-month contribution heatmap (`ghchart.rshah.org`) — horizontal-scrollable inside an `overflow-x-auto` wrapper on mobile
  - Live stats card, current streak, top languages (`github-readme-stats.vercel.app`, `streak-stats.demolab.com`) themed to the Metior-Pro palette (mint primary `#5EEAD4`, warm-tan accent `#F4A66A`)
  - Personal commit-tracker snapshot from `public/images/receipts/github-activity.png` plus structured snapshot table (30d, 7d, active days, raw lines, adjusted output)
- Wired into `app/page.tsx` between Projects and Tools+Knowledge sections.

### Added — Real Trustpilot screenshots on `/media`

- `Review` type extended with `reviewer`, `date`, `excerpt`, `image`.
- 5 reviewers (Jim Watkins, Jack Frisbie, Daniel Adewumi, Brad Pierce, Allan Bell) shown as image-cards with `<Image>` (`fill`, `aspect-[4/3]`, `object-top`); each card links to the live Trustpilot page.
- Remaining 5 reviews kept as compact link list under `+ N more verified reviews`.
- Replaces the synthetic "Verified Benmore engagement" placeholder boxes flagged in design feedback.
- Receipts folder renamed `public/images/reciepts/` → `public/images/receipts/`; macOS-screenshot filenames (with NARROW NO-BREAK SPACE) renamed to clean kebab-case.

### Added — Cover-letter response doc

- `docs/cover-letters/2026-04-keith-liston-o1-response.md` — point-by-point evidence inventory mapping to all 8 USCIS O-1A criteria. Private working draft (folder excluded from `lib/docs.ts` so it is not served by the website).

### Changed — Hero stat box

- Replaced `887% Revenue Growth` stat with `6+ Years Tech Experience` per design feedback (the work-history claim was misleading on a public landing surface).

### Changed — Real X / Twitter handle

- `lib/site.ts`: `https://x.com/_arkash` → `https://x.com/ArkashJ__` (the prior handle 404'd).

### Changed — Mobile responsiveness

- Added `min-w-0` to grid items in the STU STREET disclosure list, the link-only Trustpilot list, the Medium articles list, and the Press list. Without `min-w-0`, CSS Grid items default to `min-width: auto` and refuse to truncate, which was producing **343 px of horizontal overflow** on `/media` at a 375 px viewport.
- Verified via Playwright at iPhone 13 Pro width (375 × 812): all 13 public routes (`/`, `/about`, `/research`, `/experience`, `/projects`, `/work`, `/writing`, `/knowledge`, `/coursework`, `/credentials`, `/stack`, `/learnings`, `/architecture`) report `documentWidth ≤ viewportWidth`.

### Changed — GitHub profile README (separate repo)

- `ArkashJ/ArkashJ`: rewrote profile README to reflect the current Benmore role, 4 published papers, real social handles, and live `github-readme-stats` widgets. Old README still claimed "Currently I'm building a UNet architecture for Image Segmentation" — that work was published months ago.

### Changed — Image consolidation

- All site images consolidated under `public/images/`:
  - `public/myImg.jpeg` → `public/images/profile.jpeg`
  - `public/logos/*.svg` → `public/images/logos/*.svg`
  - `public/files/*.pdf` → `public/images/files/*.pdf`
  - 37 unused legacy logos/JPGs at `public/` root → `public/images/legacy/`
- Updated all source references:
  - `app/about/page.tsx`, `app/about/archive/page.tsx` — profile import path
  - `lib/structured-data.ts`, `lib/metadata.ts` — Person JSON-LD + OG fallback URLs
  - `components/ui/InstitutionLogo.tsx` — institution logo URLs
  - `app/credentials/page.tsx`, `lib/data.ts` — verifiable credential PDF URLs
- 58 dev/walkthrough screenshots at repo root → `docs/screenshots/`
- `public/` root now contains only: `favicon.svg`, `images/`, `timeline/`, `llms*.txt`, `humans.txt`, `robots.txt`, and verification keys (Google, IndexNow)
- `.gitignore`: added `!public/**/*.png` exception so consolidated images at `public/images/legacy/` are tracked.

### Changed — Documentation

- **`CLAUDE.md`** rewritten end-to-end. Old version still described the legacy Next 13 Pages Router site with three pages and "lint errors are ignored". New version reflects the App Router + TypeScript-strict architecture, the actual route table, the `lib/` data layer, the MDX content tree, and the new image conventions.
- **`README.md`** rewritten as a comprehensive author dossier — full life timeline, credentials, publications, knowledge domains, internal tools, repo tree, stack, links, badges. Goes well beyond a project-only README to consolidate the website's content into a single Markdown reference.

### Build

- Production build passes after the move. `npm run lint` clean (4 pre-existing warnings unrelated to this change). `npm run format:check` passes.
- `package.json` version bumped 1.0.0 → 2.3.0 to align with CHANGELOG.

---

## [2.3.0-prev] — 2026-04-26 — Initial 2.3 draft (superseded)

### Changed — Single image location

- All site images consolidated under `public/images/`:
  - `public/myImg.jpeg` → `public/images/profile.jpeg`
  - `public/logos/*.svg` → `public/images/logos/*.svg`
  - `public/files/*.pdf` → `public/images/files/*.pdf`
  - 37 unused legacy logos/JPGs at `public/` root → `public/images/legacy/`
- Updated all source references:
  - `app/about/page.tsx`, `app/about/archive/page.tsx` — profile import path
  - `lib/structured-data.ts`, `lib/metadata.ts` — Person JSON-LD + OG fallback URLs
  - `components/ui/InstitutionLogo.tsx` — institution logo URLs
  - `app/credentials/page.tsx`, `lib/data.ts` — verifiable credential PDF URLs
- 58 dev/walkthrough screenshots at repo root → `docs/screenshots/`
- `public/` root now contains only: `favicon.svg`, `images/`, `timeline/`, `llms*.txt`, `humans.txt`, `robots.txt`, and verification keys (Google, IndexNow)

### Changed — Documentation

- **`CLAUDE.md`** rewritten end-to-end. Old version still described the legacy Next 13 Pages Router site with three pages and "lint errors are ignored". New version reflects the App Router + TypeScript-strict architecture, the actual route table, the `lib/` data layer, the MDX content tree, and the new image conventions.
- **`README.md`** rewritten as a comprehensive author dossier — full life timeline, credentials, publications, knowledge domains, internal tools, repo tree, stack, links, badges. Goes well beyond a project-only README to consolidate the website's content into a single Markdown reference.

### Build

- Production build passes after the move. No code-level behavior changes.

---

## [2.2.0] — 2026-04-26

### Added — Metior-Pro inspired visual identity

- New navy palette: `bg #0A1628`, `surface #0E1B30`, `elevated #14233A`, `border #1C2D48`
- Mint primary `#5EEAD4` + warm-tan italic accent `#F4A66A`
- Sharp edges throughout (Tailwind `borderRadius` mapped to 0)
- Full-coverage faint grid background (replaced radial-masked grid)
- Secondary 256px grid layer with subtle teal tint
- Geist Sans + Geist Mono via `geist` package, wired through CSS variables
- Theme system: dark + light via `next-themes` with `data-theme` attribute
- Sun/moon ThemeToggle in nav (lucide-react icons), works on mobile + desktop
- All Tailwind colors are now CSS variables — single source of truth in `globals.css`

### Added — Hero overhaul

- Two-column layout: copy + animated career-arc demo card on the right
- Pill eyebrow with pulsing teal dot
- Italic warm-tan display callout ("Build, ship, compound.")
- Tag pill row beneath CTAs
- New `<Pill>` and `<HeroDemo>` components

### Added — Consistent page headers

- `SectionHeader` rebuilt: Pill eyebrow → bold title → optional italic-accent line → muted description
- Applied across all 11 pages (`/about`, `/research`, `/experience`, `/projects`, `/work`, `/writing`, `/knowledge`, `/media`, `/stack`, `/learnings`, `/architecture`)

### Added — Animations (restrained)

- Page entrance fade-up (320ms ease-out) on every `<main>` child
- `.stagger` utility (40ms incremental delays for grid children)
- `.dot-pulse` keyframe for live status dots
- Card hover-lift with mint glow
- All animations honor `prefers-reduced-motion`

### Added — Life Changelog visual hierarchy

- Major milestones (Published / Current / Live) get spotlight treatment
- Larger title, primary border, gradient bottom rule, ring-shadow on node
- Routine "Completed" entries quieter
- Reverse-chronological order

### Added — `/stack`, `/learnings`, `/media`, `/architecture`

- `/stack` — uses.tech-style page, 36 entries × 7 categories
- `/learnings` — 12 lessons cards, reverse chronological
- `/media` — STU STREET podcast YouTube embeds (4 episodes), Medium articles (7), Substack posts (3), press
- `/architecture` — 6 React/SVG diagrams (replaced ASCII)
- All wired into NAV_LINKS

### Added — Real public links

- BioRxiv: SpatialDINO + ER Exit Sites FIB-SEM
- Journal of Cell Biology (DOI URLs)
- Journal of Chemical Physics 2022 (full title + DOI)
- Harvard Kirchhausen Lab profile page
- Medium @arkjain (7 distributed-systems posts)
- STU STREET podcast (Spotify, Apple, 4 YouTube episode IDs)
- 6 real GitHub repos surfaced as projects (Raft, CloudComputing, NEXMARK, Implicit-SGD, CS411, Spotify)

### Added — MDX embeds

- `<Tweet>`, `<YouTube>`, `<LinkedInPost>`, `<Substack>`, `<Gist>` components in `components/embeds/`
- Wired via `components/MdxContent.tsx` (server-side via `next-mdx-remote/rsc`)
- react-tweet themed to navy palette via CSS vars

### Added — Documentation

- `docs/HANDOFF.md` — comprehensive 1900-word project orientation
- `docs/TODO.md` — open work + cheatsheet
- This CHANGELOG fully refreshed

### Changed

- `app/work/page.tsx` — removed all 4 "Demo coming" placeholder strings
- `components/sections/PaperCard.tsx` — link always present (URL or "Link forthcoming")
- `components/sections/ProjectCard.tsx` — link always present (URL or "Internal / private")
- `app/knowledge/[domain]/page.tsx` — grid adapts to single-article (no empty column)
- `app/architecture/page.tsx` — dropped redundant `bg-bg` wrapper, added Pill eyebrow
- `components/Meta.js` → integrated into root `app/layout.tsx`
- Active nav link uses primary teal (was reserved-cyan); fixes color rule violation flagged by audit

### Removed

- 10 stale feature branches (post-merge cleanup)
- `pages/` directory (entirely; App Router replaces it)
- `components/MdxContent.js` and other legacy `.js` duplicates
- `app/architecture/flows.ts` + `components/architecture/AsciiDiagram.tsx` (unused after diagram replacement)

---

## [2.1.0] — 2026-04-26 — App Router + TypeScript migration

### Added

- **Next.js 13 → 15.5**, **React 18 → 19**, plain JS → TypeScript strict
- **Pages Router → App Router** (`app/` directory, server components default)
- `app/layout.tsx` with Person JSON-LD, Nav, Footer, OG metadataBase
- All page routes converted: `/`, `/about`, `/research`, `/experience`, `/projects`, `/work`, `/writing`, `/writing/[slug]`, `/knowledge`, `/knowledge/[domain]`, `/knowledge/[domain]/[slug]`, `/architecture`, `/404`
- `app/sitemap.ts` (native MetadataRoute, dynamic MDX routes)
- `app/robots.ts` (native MetadataRoute)
- `app/VC` + `app/Volunteering` — server-side redirects
- MDX migrated to `next-mdx-remote/rsc` (server component, zero client JS)
- `lib/site.ts`, `lib/data.ts`, `lib/finance.ts`, `lib/content.ts` — all typed
- `lib/structured-data.ts` (Person/Article/ScholarlyArticle factories)
- `lib/metadata.ts` `buildMetadata()` factory typed against `next/Metadata`
- `tsconfig.json` strict mode + `@/*` path aliases
- `types/css.d.ts` for CSS side-effect imports
- `.eslintrc.json` disables `no-html-link-for-pages` (no `pages/` dir)

### Added — Dynamic OG images

- `lib/og.tsx` shared `renderOg()` template (1200×630)
- Static OG for `/`, `/about`, `/research`, `/experience`, `/projects`, `/work`, `/writing`, `/knowledge`, `/architecture`
- Dynamic per-post OG for `/writing/[slug]`, `/knowledge/[domain]`, `/knowledge/[domain]/[slug]`

### Added — More MDX content

- 7 additional articles: o1-visa-evidence-hub, FDE feedback loop, Raft in 5 minutes, RocksDB write amplification, convergence intuition, why TypeScript strict, FSDP vs tensor parallel

---

## [1.1.0] — 2026-04-26 — V2 site overhaul on legacy stack

### Added

- Design system, all 8 new pages, SEO infra (JsonLd, sitemap, robots), Finance Thesis Tracker + Trade Log, MDX content pipeline, /media page, dynamic OG images, real paper URLs

(Largely superseded by 2.x — kept here for historical traceability.)

---

## [1.0.0] — 2026-04-26 — Foundation

### Added

- Apache 2.0 LICENSE
- Production tooling: Prettier, ESLint (stricter), Husky, lint-staged, EditorConfig
- `vercel.json` with security headers + caching
- Dependabot config (security scanning, no auto-PRs)
- GitHub Actions CI (lint + format:check + build)
- Comprehensive README with shields.io badges
- ASCII architecture flows in `docs/architecture/`
- Public `/architecture` page
- `v1.0.0` git tag marking legacy snapshot

### Changed

- `next.config.js`: security headers, removed `ignoreDuringBuilds`
- `package.json`: renamed `arkashj-com`, added dev scripts

### Legacy (pre-1.0.0)

- Next.js 13 Pages Router, 3 pages: `/`, `/VC`, `/Volunteering`
- No TypeScript, no tests, no SEO, fixed 1500px width
- Outdated bio (still said "junior at BU")

---

## Roadmap

See [`docs/TODO.md`](./docs/TODO.md) for prioritized open work. Highlights:

- **P0** — Connect custom domain `arkashj.com` to Vercel · ffmpeg demo recordings for `/work` · Submit sitemap to Google Search Console
- **P1** — `/press`, `/talks`, `/achievements`, `/coursework`, `/collaborators`, `/teaching`, `/open-source` surfaces
- **P2** — Light-mode contrast audit · RSS for `/writing` · cmd+k search · resume PDF
