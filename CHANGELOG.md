# Changelog

All notable changes to **arkashj.com** are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · Versions: [SemVer](https://semver.org/spec/v2.0.0.html).

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
