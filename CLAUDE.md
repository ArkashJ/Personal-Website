# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Quick facts

- **Site**: [arkashj.com](https://www.arkashj.com) — Arkash Jain's personal website + O-1 visa evidence hub.
- **Stack**: Next.js 15.5 App Router · React 19 · TypeScript strict · Tailwind CSS 3 · MDX (RSC).
- **Toolchain**: **Bun** for installs and repo scripts (`bun install`, `bun run …`, `bunx …`). Vercel and CI consume the committed **`bun.lock`** (regenerate with `bun install` after any `package.json` edit). The **Node.js 22** runtime still executes the built Next.js app on Vercel. Repo root **`bunfig.toml`** sets `trustedDependencies` so Husky’s lifecycle scripts can run; CI caches `~/.bun/install/cache` for faster installs. **`.gitignore`** excludes root **`package-lock.json`**, **`pnpm-lock.yaml`**, and **`yarn.lock`** so accidental non-Bun installs do not get committed.
- **Deployment**: Vercel (auto-deploy from `main`).
- **Lint errors are NOT ignored** during builds (was true on legacy v1; current `next.config.js` does not set `ignoreDuringBuilds`).
- **No test runner is configured.** CI runs `lint` + `format:check` + `build` only.

## Commands

```bash
bun install             # Install deps (creates/uses bun.lock — commit it)
bun run dev             # Dev server + Turbopack at http://localhost:3000
bun run build           # Production build (must pass before push)
bun run start           # Serve the built output

bun run lint            # ESLint
bun run lint:fix        # ESLint --fix
bun run format          # Prettier write
bun run format:check    # Prettier check (CI uses this)
```

A Husky pre-commit hook runs **`bunx lint-staged`** (Prettier + ESLint on staged files).

**Dependabot / manual dependency bumps:** merge the version change, then run **`bun install`** and commit the updated **`bun.lock`** — do not hand-edit the lockfile.

## Architecture

### Routing — App Router

All routes live under `app/`. Each folder is a segment; `page.tsx` renders that segment. Server components are the default; client components opt-in via `'use client'`.

| Route                                                                        | Purpose                                                                            |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `/`                                                                          | Hero · life arc · current focus · research · work · projects · knowledge · writing |
| `/about`                                                                     | Life Changelog (17 milestones, major/minor visual hierarchy)                       |
| `/about/timeline/[slug]`                                                     | Per-milestone deep dive                                                            |
| `/about/archive`                                                             | Pre-revamp legacy bio                                                              |
| `/research`                                                                  | 4 published papers + ML stack + PyTorch contribution                               |
| `/projects`                                                                  | 13 real projects with GitHub links                                                 |
| `/work`                                                                      | 4 internal CLIs (Foundry · RTK · Compound Skills · Excalidraw)                     |
| `/writing` + `/writing/[slug]` + `/writing/[slug]/raw`                       | Tagged essay index + MDX articles + plaintext for LLMs                             |
| `/weekly` + `/weekly/[slug]` + `/weekly/[slug]/raw`                          | Append-only weekly log + per-week detail + plaintext for LLMs                      |
| `/knowledge` + `/knowledge/[domain]` + `/knowledge/[domain]/[slug]` + `/raw` | 4 domains with MDX deep dives + plaintext for LLMs                                 |
| `/skills` + `/skills/[slug]` + `/skills/[slug]/raw`                          | "Claude Skills" library — public Claude Code skills, plaintext for copy            |
| `/media`                                                                     | STU STREET podcast embeds + Medium + Substack + press                              |
| `/stack`                                                                     | uses.tech-style page (36 entries × 7 categories)                                   |
| `/learnings`                                                                 | 12+ hard-won lessons, reverse chronological                                        |
| `/architecture`                                                              | 6 React/SVG diagrams of the running stack                                          |
| `/changelog`                                                                 | Parsed `CHANGELOG.md` (left) + sticky commits-and-history sidebar (right)          |
| `/admin/weekly`                                                              | Clerk-gated owner-only editor that appends to current ISO-week MDX                 |
| `/credentials`                                                               | Verifiable PDF credentials                                                         |
| `/coursework`                                                                | BU + Harvard coursework hub                                                        |
| `/docs`                                                                      | In-site rendering of `docs/*.md`                                                   |
| `/experience` · `/VC` · `/Volunteering`                                      | Server-side redirects (`/experience` → `/about#career`)                            |
| `/knowledge/<old>/...`                                                       | 308 redirects for essays moved into `/writing` (see `next.config.js`)              |
| `/sitemap.xml` · `/robots.txt` · `/manifest.webmanifest`                     | Native Next metadata routes                                                        |

### Layout & global wrappers

- `app/layout.tsx` injects: Person JSON-LD, font CSS variables (Geist Sans/Mono via `geist`), `<ThemeProvider>` (next-themes, `data-theme` attribute), `<Nav>`, `<Footer>`, `metadataBase` for OG.
- Page-level `<SectionHeader>` is the standard heading: pill eyebrow → bold title → optional italic-accent line → muted description.

### Components

```
components/
├── architecture/     # SVG diagrams for /architecture
├── docs/             # Doc-page rendering helpers
├── embeds/           # <Tweet>, <YouTube>, <LinkedInPost>, <Substack>, <Gist>
├── layout/           # <Nav>, <Footer>, <Container>, <SectionHeader>, <Pill>, <HeroDemo>
├── sections/         # Page sections (PaperCard, ProjectCard, TimelineItem, etc.)
├── seo/              # <JsonLd>
├── ui/               # Primitive UI (BackLink, CommandPalette, InstitutionLogo, etc.)
├── MdxContent.tsx    # Server-side MDX renderer (next-mdx-remote/rsc)
├── ThemeProvider.tsx # next-themes wrapper
└── ThemeToggle.tsx   # Sun/moon toggle
```

### Data layer

All structured site content is typed and lives in `lib/`. **Edit these files to add content.**

| File                     | Owns                                                                    |
| ------------------------ | ----------------------------------------------------------------------- |
| `lib/site.ts`            | `SITE` constants (URL, name) and `NAV_LINKS`                            |
| `lib/data.ts`            | Papers, experience, projects, internal tools, education, awards, links  |
| `lib/finance.ts`         | Theses + trade log                                                      |
| `lib/learnings.ts`       | Learnings cards                                                         |
| `lib/media.ts`           | Podcast episodes, Medium articles, Substack posts, press                |
| `lib/stack.ts`           | uses.tech entries                                                       |
| `lib/coursework.ts`      | BU + Harvard coursework                                                 |
| `lib/content.ts`         | MDX frontmatter loaders for `content/writing/` and `content/knowledge/` |
| `lib/docs.ts`            | Loaders for `docs/*.md` rendered at `/docs`                             |
| `lib/structured-data.ts` | Person · Article · ScholarlyArticle JSON-LD factories                   |
| `lib/metadata.ts`        | `buildMetadata()` factory typed against Next's `Metadata`               |
| `lib/og.tsx`             | Shared 1200×630 OG image renderer                                       |

### Content (MDX)

```
content/
├── writing/           # *.mdx — long-form essays
├── knowledge/[domain]/# *.mdx — knowledge deep dives
└── coursework/        # course descriptions in MDX
```

MDX files are picked up automatically via `lib/content.ts`. Frontmatter contract: `title`, `date`, `tags`, `description`. Server-side rendered via `next-mdx-remote/rsc` — no client JS overhead.

### Styling

- Tailwind CSS 3 with all colors as CSS variables (single source of truth in `app/globals.css`).
- Sharp edges (Tailwind `borderRadius` mapped to 0).
- Theme: dark + light via `next-themes`, `data-theme` attribute on `<html>`.
- Restrained animations, all honor `prefers-reduced-motion`.

### Build performance (local + CI)

- **Dev**: `bun run dev` runs `next dev --turbo` (Turbopack) after the git-changelog sync.
- **Prod bundles**: `next.config.js` sets `experimental.optimizePackageImports` for barrel-heavy packages (`lucide-react`, `cmdk`, `@clerk/nextjs`) and `productionBrowserSourceMaps: false` to shorten build time and output size.
- **Images**: `images.formats` prefers AVIF/WebP; remote hosts are allowlisted in `images.remotePatterns`.

### Web research (when facts must be current or external)

- Prefer **primary sources** (vendor docs, RFCs, GitHub releases, official pricing) over SEO blogs.
- Use **specific queries** (`<product> <version> breaking change <year>`, exact error strings) and cross-check **two independent** pages before stating numbers or dates.
- **Time-bound** answers: this repo’s “today” for copy and research defaults to **2026** when not specified; do not trust undated third-party summaries for API shapes or limits.

### Path aliases

`tsconfig.json` defines `@/*` → repo root. Always prefer `@/lib/...`, `@/components/...`, `@/public/...` over relative paths.

## Image conventions

**All site images and downloadable PDFs served as static media live under `public/assets/`** — do not add loose image/PDF files at `public/` root (favicon, crawler manifests, and verification/HTML decks excepted).

```
public/
├── favicon.svg               # Next.js favicon convention — stays at root
├── assets/
│   ├── profile.jpeg          # Author photo (used in <TimelineItem> + Person JSON-LD only — NOT the OG share image)
│   ├── logos/                # Institution SVGs (BU, Harvard, BCH, NSF)
│   ├── files/                # Verifiable PDF credentials
│   │   └── papers/           # Supplementary paper PDFs (not the primary credential PDFs)
│   ├── weekly/               # Week-log screenshots referenced from MDX
│   ├── receipts/             # Screenshots / social proof captures
│   └── legacy/               # Pre-revamp assets; do NOT add new content here
├── ai-hardware-stack.html    # Same-origin iframe deck (linked from /ai-hardware-stack + writing)
├── timeline/                 # Reserved for per-milestone hero images (currently empty)
├── llms.txt · llms-full.txt  # AI crawler guidance
├── humans.txt · robots.txt   # Crawler manifests
└── *.html · *.txt verification keys (Google · IndexNow)
```

Reference rules:

- Static assets in MDX or JSX: `/assets/<subpath>/<file>`.
- TypeScript imports for static optimization: `import x from '@/public/assets/...'`.
- Dev screenshots and exploratory captures go in `docs/screenshots/` (gitignored except docs/).

## Adding content (cheatsheet)

| Surface                                          | How                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| New writing post                                 | Add MDX to `content/writing/*.mdx` with frontmatter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| New weekly log                                   | Add MDX to `content/weekly/<YYYY>-W<NN>.mdx` (ISO week) with `title`, `weekStart`, `weekEnd` frontmatter. Each rail entry (`read`/`watched`/`built`/`shipped`/`learned`/`met`) accepts a string OR `{text, href, image?, source?, kind?}`. Multiple entries per ISO week are allowed. YouTube URLs auto-derive thumbnails; common sources (GitHub, Substack, Medium, Latent Space, X, arXiv, Spotify) auto-fetch SimpleIcons logos via `lib/weekly-render.ts`. Latest logs surface on the home page rolling-log automatically. |
| New weekly item via UI                           | Sign in at `/admin/weekly` (Clerk; allowlisted to `process.env.ADMIN_EMAIL`). Form writes to `content/weekly/<current-week>.mdx`. Local-only — Vercel filesystem is read-only; commit + push the diff to ship.                                                                                                                                                                                                                                                                                                                 |
| New highlight                                    | Append a typed entry to `HIGHLIGHTS` in `lib/highlights.ts` (`priority >= 4` surfaces on home).                                                                                                                                                                                                                                                                                                                                                                                                                                |
| New featured banner                              | Append to `BANNERS` in `lib/banners.ts`; highest `priority` and non-expired wins.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| New knowledge article                            | `content/knowledge/[domain]/*.mdx`. New domain = new folder + entry in `KNOWLEDGE_DOMAINS` (`lib/data.ts`).                                                                                                                                                                                                                                                                                                                                                                                                                    |
| New paper / experience / project / internal tool | Edit the relevant array in `lib/data.ts`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| New podcast / Medium / Substack / press          | `lib/media.ts`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| New thesis / trade                               | `lib/finance.ts`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| New stack entry                                  | `lib/stack.ts`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| New learning                                     | `lib/learnings.ts`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| New nav link                                     | `NAV_LINKS` in `lib/site.ts`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| New course                                       | `lib/coursework.ts` + optional MDX in `content/coursework/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| New verifiable credential                        | Drop PDF in `public/assets/files/` + entry in `app/credentials/page.tsx`.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Supplementary paper / journal PDF                | `public/assets/files/papers/` — link from MDX or `lib/data.ts` as `/assets/files/papers/<file>.pdf`.                                                                                                                                                                                                                                                                                                                                                                                                                           |

## SEO infrastructure

This site is the central evidence hub for Arkash's O-1 visa application — SEO is load-bearing, not decorative.

- `app/sitemap.ts` enumerates every static + dynamic MDX route.
- `app/robots.ts` allow-all + sitemap pointer.
- **LLM-copyable surfaces**: every writing, weekly, knowledge, and skills detail page exposes a sibling `/raw` route serving the underlying MDX as `text/plain; charset=utf-8` (cached 1d on the CDN). The page header includes a `<CopyForLlm rawUrl="..." />` button (uses `navigator.clipboard.write` with a Promise<Blob> to keep the user-activation gesture alive across the fetch — see `lib/copy-for-llm.ts`).
- Per-page `generateMetadata()` via `buildMetadata()` (`lib/metadata.ts`).
- Per-page JSON-LD via `lib/structured-data.ts` (Person on every page; ScholarlyArticle on research pages; Article on writing).
- Static OG for top-level routes; dynamic per-post OG for MDX routes (`opengraph-image.tsx` files).

## Common pitfalls

- The legacy `pages/` directory is gone — `.eslintrc.json` disables `no-html-link-for-pages` to reflect that.
- `app/about/archive/page.tsx` is the snapshot of the pre-revamp bio. Don't accidentally edit it as the canonical about page.
- `next.config.js` whitelists exact remote image hosts. New external image hosts require a `remotePatterns` entry.
- `bun run build` must pass before push — CI also runs it. Lint errors fail the build.

## See also

- 📋 **[CHANGELOG.md](./CHANGELOG.md)** — every release, every change.
- 📘 **[README.md](./README.md)** — full author dossier + project orientation.
- 📂 **`docs/HANDOFF.md`** — extended project orientation (where to look for what).
- 📂 **`docs/TODO.md`** — open work, prioritized.
