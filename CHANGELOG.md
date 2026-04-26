# Changelog

All notable changes to arkashj.com are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] — v2.0.0 (in progress)

### Added — V2 Pages & SEO Infrastructure (2026-04-26)

- **Design system** — full Tailwind theme (`bg`, `surface`, `border`, `primary` teal, `accent` neon cyan, `muted`)
- **UI primitives** — `Button`, `Card`, `Badge`, `StatBadge`
- **Section components** — `Hero`, `SectionHeader`, `PaperCard`, `ProjectCard`, `ExperienceCard`, `TimelineItem`
- **Layout overhaul** — sticky `Nav` with active-route highlighting, full `Footer` with site map + social links
- **SEO** — `JsonLd` component with `Person`, `Article`, `ScholarlyArticle` schema factories; per-page `Meta` with OG + Twitter cards + canonical URLs + `<link rel="me">`
- **Crawler infrastructure** — `pages/sitemap.xml.js` (server-rendered XML sitemap), `pages/robots.txt.js`
- **Pages**
  - `/` — full home: Hero · Arc · Now · Research · Work · Projects · Knowledge pills · Writing
  - `/about` — Life Changelog timeline (17 milestones, status badges, avatars)
  - `/research` — 4 paper cards with `ScholarlyArticle` JSON-LD + ML infrastructure breakdown + PyTorch contribution
  - `/experience` — 8 reverse-chronological work entries
  - `/projects` — 9 real projects with tech badges
  - `/work` — 4 internal tools/CLIs with demo placeholders
  - `/writing` — index with tag filters; `[slug]` post page with `Article` JSON-LD
  - `/knowledge` — 6-domain hub; `[domain]` page
  - `/404` — branded not-found page
- **Redirects** — legacy `/VC` → `/experience`, `/Volunteering` → `/about`
- **Centralized data** — `lib/data.js` (PAPERS, EXPERIENCE, PROJECTS, WORK_TOOLS, TIMELINE, KNOWLEDGE_DOMAINS, WRITING) and `lib/site.js` (SITE constants, NAV_LINKS)
- **Bio updated** — "junior at BU" → Head of FDE at Benmore, Harvard Kirchhausen Lab, 4 papers

### Added — Finance domain + favicon (2026-04-26 patch)

- **Finance knowledge page** — Thesis Tracker (5 active/watching theses) + Trade Log table (4 trades) on `/knowledge/finance`
- `lib/finance.js` — THESES + TRADES data
- `ThesisTracker` and `TradeLog` section components
- SVG favicon — teal "a" mark on dark slate, served from `/favicon.svg`
- Verified all 11 endpoints live (200 OK) via curl + Playwright screenshots

### Added — MDX content pipeline (2026-04-26 patch 2)

- `lib/content.js` — `getAllWritingPosts`, `getWritingPost`, `getAllKnowledgePosts`, `getKnowledgePost`, `getKnowledgeDomains`
- `components/MdxContent.js` — themed MDX renderer with Tailwind-styled headings, lists, blockquotes, code blocks
- `pages/writing/[slug].js` now uses `getStaticProps` + `getStaticPaths` against `content/writing/*.mdx`
- `pages/knowledge/[domain]/index.js` and `pages/knowledge/[domain]/[slug].js` for nested MDX routes
- Real content shipped:
  - `content/writing/why-fde.mdx`
  - `content/writing/sample-ai-hardware.mdx`
  - `content/writing/distributed-checkpointing.mdx`
  - `content/knowledge/ai/spatialdino-lessons.mdx`
  - `content/knowledge/ai/index.mdx`
  - `content/knowledge/distributed-systems/flink-checkpointing.mdx`
- Added `gray-matter` + `next-mdx-remote` deps
- Homepage now reads writing posts from filesystem (not stubbed `WRITING` array)

### Planned — remaining v2 work

- ffmpeg demo recordings for `/work` cards
- Per-page Open Graph PNGs in `/public/og/`
- More MDX articles across all 6 knowledge domains
- Migration to App Router + TypeScript when content stabilizes

---

## [1.0.0] — 2026-04-26

### Added

- Apache 2.0 License
- Production tooling: Prettier, ESLint (stricter), Husky, lint-staged
- `.editorconfig` for cross-editor consistency
- `vercel.json` with security headers
- Dependabot config (security scanning, no auto-PRs)
- GitHub Actions CI workflow
- Comprehensive README with shields.io badges
- ASCII architecture flows in `docs/architecture/`
- Public `/architecture` page
- `v1.0.0` git tag marking legacy site snapshot

### Changed

- `next.config.js`: security headers, removed `ignoreDuringBuilds`
- `package.json`: renamed `arkashj-com`, added dev scripts

### Legacy (pre-1.0.0)

- Next.js 13 Pages Router, 3 pages: `/`, `/VC`, `/Volunteering`
- No TypeScript, no tests, no SEO, fixed 1500px width
- Outdated bio (still said "junior at BU")
