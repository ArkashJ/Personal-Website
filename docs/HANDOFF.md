# HANDOFF — arkashj.com

> Last updated: 2026-04-26
> Owner: Arkash Jain (`arkash@benmore.tech`)
> Repo: `Personal-Website` · Live: https://www.arkashj.com

This document is the single source of truth for working on the site. Read this before touching `CLAUDE.md`, `README.md`, or any plan in `docs/superpowers/`.

---

## 1. Project goal

The site is two things at once, and both must stay true:

1. **A personal portfolio** for Arkash Jain — AI researcher (Harvard Kirchhausen Lab, four published papers including SpatialDINO) turned forward deployed engineer (Head of FDE at Benmore Technologies).
2. **A deliberate O-1 visa evidence hub.** Every claim of extraordinary ability — papers, GitHub contributions, talks, press, awards, current employer — must have a canonical, crawlable URL on this site that points to authoritative external proof. USCIS adjudicators, recruiters, and search engines should all land on the same evidence trail.

Design and SEO decisions are made through that lens. If a page can't be defended as either portfolio surface or evidence anchor, it doesn't ship.

---

## 2. Current state at a glance

|              |                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Live URL     | https://www.arkashj.com (custom domain)                                                                                          |
| Preview URLs | Vercel auto-generates per branch                                                                                                 |
| Stack        | Next.js **15** App Router · React **19** · TypeScript strict · Tailwind **v3** · MDX (`next-mdx-remote/rsc`) · Geist Sans + Mono |
| Routes       | ~50 (static + dynamic MDX + per-route OG image endpoints)                                                                        |
| Deploy       | Vercel auto-deploys `main` via GitHub integration                                                                                |
| Tests        | None configured (build + lint gate only)                                                                                         |
| License      | Apache 2.0                                                                                                                       |

Tagged `v1.0.0` is the legacy Pages Router snapshot. Everything since is the v2 App Router rebuild — see `CHANGELOG.md` for the full ship log.

---

## 3. Repo layout

```
Personal-Website/
├── app/            # Next.js App Router. One folder per route. Each route owns its page.tsx + opengraph-image.tsx.
├── components/     # React components (UI primitives, sections, embeds, layout, SEO, MdxContent).
├── lib/            # Pure data + helpers — no React. Single source of truth for content arrays.
├── content/        # MDX files: writing posts and knowledge articles, picked up by content.ts at build time.
├── docs/           # Specs, plans, architecture diagrams, this handoff.
├── public/         # Static assets — images, favicon.svg. Imported directly, not via next/image.
└── types/          # Shared TypeScript types.
```

Top-level config: `next.config.js`, `tailwind.config.js`, `tsconfig.json`, `vercel.json`, `.eslintrc.json`, `.prettierrc`.

### `app/` — routes

`/` `/about` `/research` `/experience` `/projects` `/work` `/writing` `/writing/[slug]` `/media` `/knowledge` `/knowledge/[domain]` `/knowledge/[domain]/[slug]` `/architecture` `/VC` (redirect) `/Volunteering` (redirect). Each route folder also contains `opengraph-image.tsx` that calls `lib/og.tsx` for a dynamic PNG.

### `components/`

```
ui/         Button, Card, Badge, StatBadge — design system primitives
sections/   Hero, PaperCard, ProjectCard, ExperienceCard, ThesisTracker, TradeLog, etc.
layout/     Nav, Footer
embeds/     Tweet, YouTube, LinkedInPost, Substack, Gist (+ index.ts barrel)
seo/        JsonLd factories (Person, Article, ScholarlyArticle)
architecture/  ASCII flow renderers for /architecture
MdxContent.tsx  themed MDXRemote wrapper used by all MDX routes
```

### `lib/` — data layer (no CMS)

| File                 | Owns                                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `site.ts`            | `SITE` constants, `NAV_LINKS`                                                                                          |
| `data.ts`            | `PAPERS`, `EXPERIENCE`, `PROJECTS`, `WORK_TOOLS`, `TIMELINE`, `KNOWLEDGE_DOMAINS`                                      |
| `media.ts`           | Podcasts, Medium, Substack, press entries                                                                              |
| `finance.ts`         | `THESES`, `TRADES` for `/knowledge/finance`                                                                            |
| `learnings.ts`       | Knowledge highlights                                                                                                   |
| `stack.ts`           | Tech stack metadata                                                                                                    |
| `coursework.ts`      | BU + Harvard course entries                                                                                            |
| `docs.ts`            | Loaders for `docs/*.md` rendered at `/docs`                                                                            |
| `content.ts`         | MDX loaders: `getAllWritingPosts`, `getWritingPost`, `getAllKnowledgePosts`, `getKnowledgePost`, `getKnowledgeDomains` |
| `metadata.ts`        | Per-page Next.js `Metadata` factories                                                                                  |
| `og.tsx`             | Dynamic OG image renderer (Edge runtime, satori)                                                                       |
| `structured-data.ts` | JSON-LD payload builders                                                                                               |

---

## 4. How to add content

Everything is either a TypeScript array in `lib/` or an MDX file under `content/`. No CMS, no DB, no admin UI.

| You want to add…                                | Edit                                                                                                                                                         |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A new writing post                              | New file: `content/writing/<slug>.mdx` with frontmatter (`title`, `date`, `tags`, `description`). Picked up automatically by `getAllWritingPosts` + sitemap. |
| A new knowledge article                         | New file: `content/knowledge/<domain>/<slug>.mdx` with frontmatter.                                                                                          |
| A brand-new knowledge domain                    | (1) Create directory `content/knowledge/<domain>/` with at least an `index.mdx`. (2) Add an entry to `KNOWLEDGE_DOMAINS` in `lib/data.ts`.                   |
| A new paper                                     | Append to `PAPERS` in `lib/data.ts`. JSON-LD on `/research` regenerates automatically.                                                                       |
| A new work experience                           | Append to `EXPERIENCE` in `lib/data.ts`.                                                                                                                     |
| A new project                                   | Append to `PROJECTS` in `lib/data.ts`.                                                                                                                       |
| A new internal tool / CLI                       | Append to `WORK_TOOLS` in `lib/data.ts`.                                                                                                                     |
| A new podcast / Medium / Substack / press entry | Edit `lib/media.ts`.                                                                                                                                         |
| A new investment thesis or trade                | Edit `lib/finance.ts`.                                                                                                                                       |
| A new nav link                                  | Append to `NAV_LINKS` in `lib/site.ts`.                                                                                                                      |
| A new top-level route                           | Create `app/<route>/page.tsx` and `app/<route>/opengraph-image.tsx`. Add to `app/sitemap.ts` if not auto-enumerated.                                         |

Frontmatter contract for MDX:

```yaml
---
title: 'Why FDE'
date: 2026-04-12
tags: [fde, careers]
description: 'One-line summary used in OG + meta description.'
---
```

---

## 5. Embeds

All rich embeds are RSC components that work inside MDX. They live in `components/embeds/` and are wired into `MdxContent.tsx` via the components map (or imported directly in MDX).

```mdx
<Tweet id="1234567890" />
<YouTube id="dQw4w9WgXcQ" />
<LinkedInPost urn="urn:li:share:1234567890" />
<Substack publication="arkash" slug="why-fde" />
<Gist user="ArkashJ" id="abc123def456" />
```

`Tweet` uses `react-tweet` (already in `package.json`). The others are thin iframe wrappers — no extra deps.

---

## 6. Design system

### Color tokens (Tailwind theme — `tailwind.config.js`)

| Token           | Hex                  | Use                    |
| --------------- | -------------------- | ---------------------- |
| `bg`            | `#0A0A0A`            | Page background        |
| `surface`       | `#111111`            | Cards                  |
| `elevated`      | `#171717`            | Hovered / raised cards |
| `border`        | `#262626`            | Default borders        |
| `border-strong` | `#404040`            | Emphasized borders     |
| `text`          | `#FAFAFA`            | Body text              |
| `muted`         | `#A1A1AA`            | Secondary text         |
| `subtle`        | `#71717A`            | Captions / labels      |
| `primary`       | `#5EEAD4` (teal-300) | Links, accents         |
| `accent`        | `#22D3EE` (cyan-400) | Stats, highlights      |
| `success`       | `#34D399` (emerald)  | Status badges          |

### Typography

- Body: **Geist Sans** (`var(--font-geist-sans)`)
- Mono / labels: **Geist Mono** (`var(--font-geist-mono)`)

Both loaded in `app/layout.tsx` via `geist` package.

### Sharp edges

`borderRadius` is overridden so `rounded`, `rounded-md`, `rounded-lg`, `rounded-sm` all map to `0`. Only `rounded-xl` (2px) and `rounded-full` exist. This is intentional — do not add ad-hoc radii.

### Infinite grid background

Defined in `tailwind.config.js` as `bg-grid` + `bg-[length:64px_64px]`. Applied subtly in `app/globals.css`.

### Primitives

`components/ui/`: `Button`, `Card`, `Badge`, `StatBadge`. Use these instead of raw markup. Sections in `components/sections/` compose them.

---

## 7. SEO infrastructure

The site is engineered to be the canonical answer for "Arkash Jain" across both classical search and AI answer engines.

- **Person JSON-LD** injected on every page via root layout (`app/layout.tsx` → `components/seo/JsonLd`).
- **Article / ScholarlyArticle JSON-LD** on every writing post and research entry.
- **`app/sitemap.ts`** enumerates static routes + every dynamic MDX file (`writing` posts, `knowledge` articles, `knowledge` domains) with per-file `lastmod`.
- **`app/robots.ts`** allows all crawlers, points at the sitemap.
- **`<link rel="me">`** on root layout to LinkedIn, GitHub, Substack, Twitter — verifies cross-platform identity for Mastodon-style relationship graph and AI provenance.
- **Per-route OG images** via `app/**/opengraph-image.tsx` calling `lib/og.tsx` (Edge runtime, satori). Title pulls from page metadata.
- **`vercel.json`** sets security headers (CSP, HSTS, frame-deny, etc.).
- **`<link rel="canonical">`** on every page via `lib/metadata.ts`.

---

## 8. Common commands

```bash
npm run dev              # http://localhost:3000
npm run build            # Production build (must pass — no ignoreDuringBuilds anymore)
npm run lint             # ESLint
npm run lint:fix         # ESLint --fix
npm run format           # Prettier write
npm run format:check     # Prettier check (CI gate)

vercel deploy            # Preview deploy
vercel deploy --prod     # Production deploy (Vercel bot also auto-deploys main)

gh pr create             # Open PR
gh pr merge --squash     # Merge
```

Pre-commit: Husky + lint-staged runs `next lint --fix --file` and `prettier --write` on staged files.

---

## 9. What's NOT done yet (open work)

- **ffmpeg demo recordings** for `/work` cards (placeholders removed; need real captures).
- **More MDX content** — most knowledge domains have 1–2 articles; goal is 5+ each.
- **Proposed pages** not yet scaffolded: `/press`, `/talks`, `/achievements`, `/collaborators`, `/open-source`, `/uses`.
- **Tailwind v4 upgrade** — deferred. v3 works; no urgency.
- **Animations / page transitions** — none currently. Consider Framer Motion or View Transitions API once content stabilizes.
- **Per-page hand-tuned OG PNGs** — currently all generated. Hero pages could benefit from custom art.

---

## 10. Planning docs (read these before big changes)

| File                                                                  | Purpose                                                     |
| --------------------------------------------------------------------- | ----------------------------------------------------------- |
| `docs/superpowers/specs/2026-04-26-personal-website-revamp-design.md` | Original v2 design spec — IA, content map, visual direction |
| `docs/superpowers/plans/2026-04-26-foundation-quick-wins.md`          | The foundation plan that landed (the bulk of v2)            |
| `docs/superpowers/notes/v2-migration.md`                              | App Router migration note                                   |
| `docs/architecture/`                                                  | ASCII flow diagrams rendered on `/architecture`             |
| `CHANGELOG.md`                                                        | What actually shipped (Keep a Changelog format)             |

---

## 11. Onboarding checklist

For someone new to the repo:

1. **Clone and install** — `git clone` then `npm install`. Node 20+.
2. **Run dev** — `npm run dev` → open http://localhost:3000. Verify the homepage loads with the grid background and teal accents.
3. **Skim the data layer** — open `lib/site.ts`, `lib/data.ts`, `lib/media.ts`. Most edits start here.
4. **Read this file end-to-end**, then `CHANGELOG.md`, then the foundation plan in `docs/superpowers/plans/`.
5. **Make a trivial content edit** — add a tag to a paper in `lib/data.ts` or fix a typo in `content/writing/why-fde.mdx`. Confirm hot reload works.
6. **Run the gates** — `npm run build && npm run lint && npm run format:check`. All three must pass before opening a PR.
7. **Open a PR to `main`** — Vercel posts a preview URL automatically. Verify your change on the preview before requesting review.
8. **Merge** — Vercel auto-deploys to production within ~60s.

---

## Quick reference — file → purpose

| File                        | What it does                                                          |
| --------------------------- | --------------------------------------------------------------------- |
| `app/layout.tsx`            | Root layout: fonts, Nav, Footer, Person JSON-LD, global metadata      |
| `app/page.tsx`              | Homepage composition                                                  |
| `app/sitemap.ts`            | Sitemap generator (static + MDX-driven)                               |
| `app/robots.ts`             | robots.txt                                                            |
| `lib/site.ts`               | `SITE` + `NAV_LINKS`                                                  |
| `lib/data.ts`               | Papers, experience, projects, work tools, timeline, knowledge domains |
| `lib/content.ts`            | MDX file loaders                                                      |
| `lib/og.tsx`                | Dynamic OG image template                                             |
| `lib/metadata.ts`           | Per-page metadata factory                                             |
| `tailwind.config.js`        | Design tokens                                                         |
| `components/MdxContent.tsx` | MDX renderer with themed components                                   |
| `components/embeds/*`       | Tweet / YouTube / LinkedIn / Substack / Gist                          |
| `components/seo/JsonLd.tsx` | Schema.org JSON-LD factories                                          |
| `vercel.json`               | Security headers + redirects                                          |

---

If something here is wrong, fix it in the same PR as the code change. This file goes stale fast otherwise.
