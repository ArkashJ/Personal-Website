# Personal Website Revamp — Design Spec
**Date:** 2026-04-26  
**Status:** Approved  
**Live site:** https://www.arkashj.com  
**Repo:** /Users/arkashjain/Desktop/work/Personal-Website

---

## 1. Problem Statement

The current site (Next.js 13, Pages Router, no TypeScript, 3 pages) is completely outdated — bio still says "junior at BU," Harvard and Benmore are missing entirely, no SEO infrastructure, fixed 1500px width, zero tests. 

Two goals drive this rebuild:
1. **O-1 visa** — Google must index Arkash as an extraordinary individual. The site is the canonical evidence hub linking to every public proof point (papers, GitHub, Substack, LinkedIn).
2. **Personal brand** — a modern, data-dense portfolio that reflects the actual trajectory: physicist → VC → distributed systems researcher → Harvard AI researcher → AI consultant building companies.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 App Router + TypeScript strict | RSC streaming for SEO, ISR for writing, Vercel-native |
| Styling | Tailwind CSS v4 | Utility-first, co-located, no CSS files to maintain |
| Content | MDX files in `content/` | Markdown + JSX, statically built, no CMS needed |
| Images | `next/image` everywhere | Auto WebP, lazy load, blur placeholder, LCP optimization |
| Fonts | `next/font` (Geist Sans + Geist Mono) | Zero layout shift, subsetting |
| SEO | Next.js native `sitemap.ts` + `robots.ts` | Auto-generated, dynamic slugs included |
| Structured data | Custom `JsonLd` RSC component | Person + ScholarlyArticle + Article schemas |
| Testing | Vitest (unit) + Playwright (E2E) | Content parsing, SEO helpers, key page flows |
| Linting | ESLint + Prettier + Husky + lint-staged | Pre-commit enforcement |
| CI/CD | GitHub Actions → Vercel | Lint + typecheck + test on PR; deploy on main |
| Demo assets | WebM/MP4 in `public/demos/` | ffmpeg-converted screen recordings, 10-20x smaller than GIF |

**No fake data. No placeholder content. Everything on the site must be real.**

---

## 3. Repository Structure

```
app/
├── layout.tsx                  # Root: Nav, Footer, Person JSON-LD on every page
├── page.tsx                    # Homepage
├── not-found.tsx               # Custom 404
├── error.tsx                   # Error boundary
├── sitemap.ts                  # Auto-generated: all static + dynamic routes
├── robots.ts                   # Allow all crawlers, points to sitemap
├── about/
│   └── page.tsx                # Life changelog timeline
├── experience/
│   └── page.tsx                # Work history
├── research/
│   └── page.tsx                # Papers + SpatialDINO + PyTorch contribution
├── projects/
│   └── page.tsx                # Project cards grid
├── work/
│   └── page.tsx                # CLIs, Claude Code skills, tool demos with GIFs
├── writing/
│   ├── page.tsx                # Writing index with tag filters
│   └── [slug]/
│       └── page.tsx            # Individual MDX post
└── knowledge/
    ├── page.tsx                # Hub: 6 domain cards + article counts
    └── [domain]/
        ├── page.tsx            # Domain hub: article list + intro
        └── [slug]/
            └── page.tsx        # Individual deep dive (MDX)

content/
├── writing/
│   └── *.mdx                   # Curated posts (manually ported from alpha — alpha stays private)
└── knowledge/
    ├── ai/
    │   ├── index.mdx
    │   ├── spatialdino-lessons.mdx
    │   ├── hardware-stack-deep-dive.mdx
    │   └── *.mdx
    ├── finance/
    │   ├── index.mdx
    │   ├── investments.mdx      # Trade log + thesis tracker
    │   ├── aggregation-theory.mdx
    │   └── *.mdx
    ├── physics/
    │   ├── supercritical-fluids-paper.mdx
    │   ├── nuclear-reactor-efficiency.mdx
    │   ├── why-i-left-physics.mdx
    │   └── *.mdx
    ├── distributed-systems/
    │   └── *.mdx               # Flink, RocksDB, Raft, MapReduce, compression
    ├── math/
    │   └── *.mdx               # Optimizers, convergence proofs, 3B1B-style intuition
    └── software/
        └── *.mdx               # Stack evolution, Claude Code, tools

components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Tag.tsx
│   └── StatBadge.tsx           # Neon cyan number display
├── layout/
│   ├── Nav.tsx
│   └── Footer.tsx
├── seo/
│   ├── JsonLd.tsx              # Generic JSON-LD RSC wrapper
│   └── OgMeta.tsx
└── sections/
    ├── Hero.tsx
    ├── LifeChangelog.tsx       # Vertical timeline with avatar, status badges
    ├── PaperCard.tsx
    ├── ProjectCard.tsx
    ├── WorkCard.tsx            # Demo card with video/GIF
    ├── ThesisTracker.tsx       # Investment thesis cards
    ├── TradeLog.tsx            # Public trade history table
    └── KnowledgeCard.tsx

lib/
├── content.ts                  # MDX reading, frontmatter parsing, slug generation
├── structured-data.ts          # JSON-LD schema factory functions
└── metadata.ts                 # Per-page metadata factory

public/
├── demos/
│   └── [tool-name]/
│       ├── demo.webm           # ffmpeg-converted screen recording
│       └── demo.mp4            # Safari fallback
└── og/
    └── *.png                   # Per-page Open Graph images

CLAUDE.md
README.md
CHANGELOG.md
```

---

## 4. Pages

### 4.1 Homepage `/`

The SEO anchor. Every page is reachable in one hop from here (crawl depth = 1).

**Section flow:**
1. **Hero** — Name, role, 4 stat badges (neon cyan), two CTAs
   - Stats: `4 Papers Published` · `Harvard + BU` · `887% Revenue Growth` · `3D SSL Pioneer`
   - CTAs: `View My Work →` + `Read My Writing →`
2. **The arc** — 3-sentence origin story + `Read full story →` → `/about`
3. **Now** — Two cards: current Benmore role + latest writing post
4. **Research** — 4 paper cards with journal badges + BioArxiv links
5. **Work & Tools** — 3 featured `/work` cards (with GIF demos)
6. **Projects** — 4-card grid + `View all →` → `/projects`
7. **Knowledge domains** — 6 pill links: AI · Finance · Distributed Systems · Math · Physics · Software
8. **Writing** — Latest 3 posts with topic tags + `Read all →` → `/writing`
9. **Footer** — all page links + GitHub + LinkedIn + Substack + email

### 4.2 `/about` — Life Changelog

Vertical timeline component matching the reference design (dark-themed). Each milestone card contains:
- Arkash's photo as avatar (left, on the timeline)
- Title + category pill + date
- 2-3 sentence description
- Status badge: `Published` (teal) · `Completed` (slate-blue) · `Current` (neon cyan, pulsing) · `Live` (green)
- Teal progress bar at bottom

**Milestones (chronological, all real):**

| Title | Category | Date | Status |
|---|---|---|---|
| Arrived in the US from India | Life | Sep 2020 | Completed |
| UROP Scholar — 1 of 5 freshmen, entire university | Award | 2021 | Completed |
| Battery Ventures — Sourcing Intern | VC | Dec 2021 | Completed |
| Battery Ventures — Diligence Intern | VC | May 2022 | Completed |
| First Paper: Supercritical Fluids (Chemical Physics) | Publication | Nov 2022 | Published |
| BCH + ZeroSync Engineering Internships | Engineering | 2023 | Completed |
| Distributed Systems Research at BU | Research | 2023 | Completed |
| Marvin Freedman Scholar — 1 of 6, Math dept. | Award | 2024 | Completed |
| BA/MS BU — Magna Cum Laude | Education | May 2024 | Completed |
| Harvard Kirchhausen Lab | Research | May 2024 | Completed |
| SpatialDINO beats Nobel laureate's approach | Research | 2025 | Completed |
| SpatialDINO — BioArxiv | Publication | 2025 | Published |
| Journal of Cell Biology (×2 papers) | Publication | Aug 2025 | Published |
| Joined Benmore — Employee #2 | Work | Aug 2025 | Completed |
| $150k total → $150k every 15 days | Milestone | 2025–2026 | Completed |
| Cattle Logic Launched | Product | 2026 | Live |
| Head of FDE, Benmore | Work | Apr 2026 | Current |

### 4.3 `/experience`

Work history cards. Each card: org logo, role title, dates, 3-5 bullet points. Ordered reverse-chronological.

**Entries:**
- Benmore Technologies — Forward Deployed Strategist & Engineer (Aug 2025–present)
- Harvard Medical School — ML Researcher (May 2024–Aug 2025)
- ZeroSync — SWE Intern (May–Aug 2023)
- Boston Children's Hospital — SWE Intern (Jan–May 2023)
- Boston University — TA + Distributed Systems Researcher (2021–2024)
- Battery Ventures — Analyst Diligence Extern (May–Aug 2022)
- Battery Ventures — Analyst Sourcing Extern (Dec 2021–Apr 2022)
- BU Chemistry/NSF UROP — Undergraduate Research (Jan–Aug 2021)

### 4.4 `/research`

Hero section: SpatialDINO featured prominently (largest card, animated). Below: 4 paper cards + infrastructure sidebar.

**Paper cards:**
1. SpatialDINO — BioArxiv 2025 (first author) — link to biorxiv.org
2. Close-Up of vesicular ER Exit Sites — Journal of Cell Biology, Aug 2025
3. UNET for Semi-Supervised Segmentation — Journal of Cell Biology, Aug 2025
4. Ultrafast 2DIR comparison... — Journal of Chemical Physics, Nov 2022

**Infrastructure section** (the O-1 differentiator):
- Full ML stack: Infiniband/RDMA → RAID → NVMe → NVLink → DGX nodes → bf16 → FSDP
- PyTorch open source contribution: Issue #144779 (Infiniband RDZV backend) — link to GitHub

**Each paper gets `ScholarlyArticle` JSON-LD structured data.**

### 4.5 `/projects`

Grid of real project cards. Each: name, description, tech stack tags, GitHub link, demo link if available.

**Projects:**
- Cattle Logic — OS for American cattle ranches (Benmore, 2026). Offline-first, CME-integrated.
- SpatialDINO — 3D SSL vision transformer (Harvard, 2025)
- Benmore Foundry CLI — orchestration layer for SMB AI consulting
- MapReduce implementation
- Dynamic Checkpointing in Apache Flink (thesis)
- OCaml Interpreter
- Spotify → YouTube transfer tool
- STU STREET Podcast Website
- ALS Resource Tool (BCH)

### 4.6 `/work` — Tools & CLIs

Separate from projects. Demonstrates craft and operational tools. Each card has an animated demo (`<video autoPlay muted loop playsInline>` with WebM + MP4 source).

**Entries:**
- Benmore Foundry CLI — internal orchestration layer
- RTK (Rust Token Killer) — token-optimized Claude Code CLI proxy
- Claude Code skills built — compound-engineering, etc.
- Excalidraw workflow demos — client discovery flows

**ffmpeg commands documented in `CLAUDE.md`:**
```bash
# WebM (primary — best size/quality)
ffmpeg -i recording.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -an -vf "scale=1200:-2" public/demos/[name]/demo.webm
# MP4 fallback (Safari)
ffmpeg -i recording.mov -c:v libx264 -crf 23 -an -vf "scale=1200:-2" public/demos/[name]/demo.mp4
# GIF (GitHub READMEs only)
ffmpeg -i recording.mov -vf "fps=12,scale=900:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" output.gif
```

### 4.7 `/writing`

Index: cards sorted by date, tag filters across top (AI · Finance · Distributed Systems · Hardware · Geopolitics · Venture).

Content: manually curated MDX files in `content/writing/`. Arkash selects what to port from the alpha repo (alpha stays private). Each MDX file frontmatter:
```yaml
---
title: "AI Hardware Stack Deep Dive"
date: "2026-03-09"
tags: ["AI", "Hardware", "Distributed Systems"]
description: "From TSMC N3 shortages to HBM constraints — what the silicon shortage means for frontier AI."
---
```

Individual post page gets `Article` JSON-LD.

### 4.8 `/knowledge` + `/knowledge/[domain]/[slug]`

**Hub page:** 6 domain cards with article counts, a one-line description of Arkash's relationship to each domain, and links.

**Domain pages (`/knowledge/[domain]`):**
- Header: Arkash's personal intro to the domain (3-5 sentences, opinionated)
- Article list: all MDX files in that folder, sorted by date
- Recommended resources sidebar: podcasts, newsletters, books specific to domain

**Individual pages (`/knowledge/[domain]/[slug]`):**
- Full MDX content — can be notes, essay, paper summary, worked example
- Gets `Article` JSON-LD
- Included in sitemap

**Finance domain — additional components:**

*Thesis Tracker:*
```
Aggregation Theory → SaaS Platform Consolidation    [Active]
AI Infrastructure Layer > Application Layer          [Active]
HBM Scarcity as Structural Constraint               [Active — early MU thesis]
2028: Red + Blue Coalition Against Tech             [Watching]
Private Credit Replacing Public Markets             [Watching]
```

*Trade Log* (public accountability journal, framed as personal tracking not financial advice):
- Simple table: Date · Instrument · Thesis · Outcome
- Includes LITE options trade, SPY tracking, etc.

---

## 5. SEO Architecture

### 5.1 Structured Data (JSON-LD)

**Person schema** — root `layout.tsx`, present on every page:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Arkash Jain",
  "url": "https://www.arkashj.com",
  "image": "https://www.arkashj.com/arkash.jpeg",
  "sameAs": [
    "https://www.linkedin.com/in/arkashj/",
    "https://github.com/ArkashJ",
    "https://arkash.substack.com",
    "https://www.biorxiv.org/content/10.1101/2025.02.04.636474",
    "https://scholar.google.com/citations?user=FILL_IN_DURING_IMPL"
  ],
  "jobTitle": "Forward Deployed Engineer & AI Researcher",
  "worksFor": { "@type": "Organization", "name": "Benmore Technologies" },
  "alumniOf": [
    { "@type": "EducationalOrganization", "name": "Harvard University" },
    { "@type": "EducationalOrganization", "name": "Boston University" }
  ],
  "knowsAbout": [
    "Machine Learning", "Computer Vision", "Distributed Systems",
    "Self-Supervised Learning", "3D Vision Transformers", "AI Infrastructure",
    "Venture Capital", "Forward Deployed Engineering"
  ]
}
```

**ScholarlyArticle schema** — each paper on `/research`  
**Article schema** — each `/writing/[slug]` and `/knowledge/[domain]/[slug]`

### 5.2 Sitemap (`app/sitemap.ts`)

Auto-generated. Includes:
- All static routes (15+)
- All `/writing/[slug]` pages (dynamic, from `content/writing/`)
- All `/knowledge/[domain]/[slug]` pages (dynamic, from `content/knowledge/`)
- `lastModified` from file timestamps
- `changeFrequency`: `weekly` for writing, `monthly` for research/experience, `yearly` for about
- `priority`: 1.0 homepage, 0.9 research/about, 0.8 writing index, 0.7 individual posts

### 5.3 Per-Page Metadata

Every page gets unique `title` + `description` + Open Graph + Twitter card + canonical URL.

| Page | Title |
|---|---|
| `/` | Arkash Jain — AI Researcher, Forward Deployed Engineer & Builder |
| `/about` | Arkash Jain — From Physics to Harvard AI Research to Building AI Companies |
| `/research` | Research — Arkash Jain · SpatialDINO, Cell Biology ML, 4 Published Papers |
| `/experience` | Experience — Arkash Jain · Benmore, Harvard, Battery Ventures |
| `/projects` | Projects — Arkash Jain · Cattle Logic, SpatialDINO, Open Source |
| `/work` | Tools & CLIs — Arkash Jain · Benmore Foundry, RTK, Claude Skills |
| `/writing` | Writing — Arkash Jain · AI Hardware, Finance, Distributed Systems |
| `/knowledge` | Knowledge — Arkash Jain's Second Brain · AI, Finance, Physics, Math |

### 5.4 Identity Verification (`<head>`)

```html
<link rel="me" href="https://www.linkedin.com/in/arkashj/" />
<link rel="me" href="https://github.com/ArkashJ" />
<link rel="me" href="https://arkash.substack.com" />
```

### 5.5 Google Indexing Checklist (day-1 actions, documented in CLAUDE.md)

1. Submit `https://www.arkashj.com/sitemap.xml` to Google Search Console
2. Run URL Inspection on homepage → Request Indexing
3. Add `arkashj.com` to LinkedIn profile URL field
4. Add `arkashj.com` to GitHub profile website field
5. Add `arkashj.com` to Substack profile
6. Add link to BioArxiv author profile
7. Comment on PyTorch issue #144779 with link to research page

---

## 6. Design System

### Colors
```css
--color-bg:        #1E2340;   /* dark slate — base */
--color-surface:   #252B47;   /* card backgrounds */
--color-border:    #2E3656;   /* subtle borders */
--color-primary:   #30ACA6;   /* teal — links, badges, timeline */
--color-accent:    #00FFC8;   /* neon cyan — numbers, stats, current badges */
--color-text:      #FFFFFF;   /* primary body text */
--color-muted:     #8892B0;   /* secondary text (richer than #666 on dark bg) */
```

### Typography
- **Headings:** Geist Sans, bold
- **Body:** Geist Sans, regular
- **Code/stats:** Geist Mono
- All via `next/font` — zero layout shift, subsetted

### Component Patterns
- **Card:** `bg-surface`, `border border-border`, `hover:border-primary`, `hover:shadow-[0_0_20px_rgba(48,172,166,0.15)]`
- **StatBadge:** `font-mono text-accent text-2xl font-bold`
- **Tag/Badge:** `bg-primary/20 text-primary border border-primary/30 rounded-full px-3 py-1 text-sm`
- **Timeline line:** `border-l-2 border-primary`
- **Status: Current:** `text-accent animate-pulse`
- **Status: Published:** `text-primary`
- **Status: Completed:** `text-muted`
- **Status: Live:** `text-green-400`

---

## 7. Production Setup

### Tooling
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "test:watch": "vitest"
  }
}
```

### Pre-commit (Husky + lint-staged)
```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,mdx}": ["prettier --write"]
}
```

### GitHub Actions
- **`ci.yml`:** On PR → `lint` + `typecheck` + `test`
- **`deploy.yml`:** On push to `main` → Vercel production deploy

### Documentation files (committed day 1)
- `CLAUDE.md` — dev commands, architecture overview, ffmpeg recipes, Google Search Console instructions
- `README.md` — project overview, local setup, deployment
- `CHANGELOG.md` — version history starting from v2.0.0 (this rebuild)

---

## 8. Content MDX Frontmatter Schemas

### Writing posts (`content/writing/*.mdx`)
```yaml
---
title: string
date: YYYY-MM-DD
tags: string[]          # maps to: AI | Finance | Distributed Systems | Hardware | Geopolitics | Venture
description: string     # used for meta description + card preview
---
```

### Knowledge articles (`content/knowledge/[domain]/*.mdx`)
```yaml
---
title: string
date: YYYY-MM-DD
domain: ai | finance | physics | math | distributed-systems | software
description: string
resources:              # optional sidebar links
  - label: string
    url: string
---
```

---

## 9. Out of Scope (this iteration)

- Dark/light mode toggle — dark only, matches design intent
- CMS or database — MDX files are the CMS
- Authentication / private pages
- Contact form backend — email link in footer is sufficient
- Internationalization
- Comments on writing posts
