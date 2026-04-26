# arkashj.com

> Personal website + canonical knowledge hub + O-1 visa evidence hub for **[Arkash Jain](https://www.arkashj.com)** — AI researcher (Harvard), forward-deployed engineer at Benmore, four published papers including SpatialDINO, building the operating system for American cattle ranches.

[![License](https://img.shields.io/badge/license-Apache_2.0-5EEAD4.svg?style=flat-square&labelColor=0A1628)](./LICENSE)
[![Version](https://img.shields.io/badge/version-2.2.0-F4A66A.svg?style=flat-square&labelColor=0A1628)](./CHANGELOG.md)
[![Status](https://img.shields.io/badge/status-live-34D399.svg?style=flat-square&labelColor=0A1628)](https://www.arkashj.com)
[![CI](https://img.shields.io/github/actions/workflow/status/ArkashJ/Personal-Website/ci.yml?branch=main&style=flat-square&labelColor=0A1628&label=CI)](https://github.com/ArkashJ/Personal-Website/actions/workflows/ci.yml)

[![Next.js](https://img.shields.io/badge/Next.js-15.5-000?style=flat-square&logo=next.js&logoColor=white&labelColor=0A1628)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white&labelColor=0A1628)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white&labelColor=0A1628)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0A1628)](https://tailwindcss.com)
[![MDX](https://img.shields.io/badge/MDX-RSC-1B1F24?style=flat-square&logo=mdx&logoColor=white&labelColor=0A1628)](https://mdxjs.com)
[![Vercel](https://img.shields.io/badge/Vercel-deployed-000?style=flat-square&logo=vercel&logoColor=white&labelColor=0A1628)](https://vercel.com)

[![ESLint](https://img.shields.io/badge/ESLint-passing-4B32C3?style=flat-square&logo=eslint&logoColor=white&labelColor=0A1628)](https://eslint.org)
[![Prettier](https://img.shields.io/badge/Prettier-formatted-F7B93E?style=flat-square&logo=prettier&logoColor=black&labelColor=0A1628)](https://prettier.io)
[![Husky](https://img.shields.io/badge/Husky-pre--commit-242938?style=flat-square&labelColor=0A1628)](https://typicode.github.io/husky/)
[![Geist](https://img.shields.io/badge/font-Geist-000?style=flat-square&logo=vercel&logoColor=white&labelColor=0A1628)](https://vercel.com/font)

---

## Quickstart

```bash
git clone https://github.com/ArkashJ/Personal-Website.git
cd Personal-Website
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build && npm run start
```

## Stack

| Layer      | Technology                                                            |
| ---------- | --------------------------------------------------------------------- |
| Framework  | Next.js 15.5 (App Router) + React 19                                  |
| Language   | TypeScript strict                                                     |
| Styling    | Tailwind CSS 3 + CSS variables for dark/light theme                   |
| Fonts      | Geist Sans + Geist Mono via `next/font`                               |
| Content    | MDX rendered via `next-mdx-remote/rsc`                                |
| Embeds     | Tweet · YouTube · LinkedIn · Substack · Gist (in MDX)                 |
| Theme      | `next-themes` with `data-theme` attribute, sun/moon toggle            |
| Icons      | `lucide-react`                                                        |
| SEO        | Native `app/sitemap.ts` + `app/robots.ts` + per-page OG via `next/og` |
| JSON-LD    | Person · Article · ScholarlyArticle schemas                           |
| Deployment | Vercel (auto-deploy from `main` via GitHub integration)               |
| CI         | GitHub Actions (lint + format check + build on every PR / push)       |

## Pages

```
/                — Hero · Arc · Now · Research · Work · Projects · Knowledge · Writing
/about           — Life Changelog (17 milestones, major/minor visual hierarchy)
/research        — 4 published papers + ML stack + PyTorch contribution
/experience      — 8 reverse-chrono work entries
/projects        — 13 real projects with GitHub links
/work            — 4 internal CLIs (Foundry, RTK, Compound Skills, Excalidraw)
/writing         — Tagged essay index + /[slug] MDX articles
/media           — STU STREET podcast YouTube embeds + Medium + Substack + press
/stack           — uses.tech-style page (36 entries × 7 categories)
/learnings       — 12+ hard-won lessons, reverse chronological
/knowledge       — 6 domains; /[domain]/[slug] MDX deep dives
/architecture    — 6 React/SVG diagrams
/sitemap.xml     — All static + dynamic MDX routes
/robots.txt      — Allow-all + sitemap pointer
```

## Common Commands

```bash
npm run dev               # Dev server
npm run build             # Production build (must pass before push)
npm run lint              # ESLint
npm run lint:fix          # ESLint --fix
npm run format            # Prettier write
npm run format:check      # Prettier check (CI uses this)

vercel deploy --prod --yes  # Manual production deploy

# Branch flow
git checkout -b feat/short-name
git add -A && git commit -m "feat(scope): one-line"
git push -u origin feat/short-name
gh pr create --base main --head feat/short-name --title "..." --body "..."
gh pr merge --squash --delete-branch
```

## Adding Content

| Surface                                      | How                                                                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| New writing post                             | Add MDX to `content/writing/*.mdx` with frontmatter (`title`, `date`, `tags`, `description`). Picked up automatically. |
| New knowledge article                        | `content/knowledge/[domain]/*.mdx`. New domain = new folder + entry in `KNOWLEDGE_DOMAINS` in `lib/data.ts`.           |
| New paper / experience / project / work tool | Edit array in `lib/data.ts`.                                                                                           |
| New podcast / Medium / Substack / press      | Edit `lib/media.ts`.                                                                                                   |
| New thesis / trade                           | `lib/finance.ts`.                                                                                                      |
| New stack entry                              | `lib/stack.ts`.                                                                                                        |
| New learning                                 | `lib/learnings.ts`.                                                                                                    |
| New nav link                                 | Add to `NAV_LINKS` in `lib/site.ts`.                                                                                   |

### Embedding social posts in MDX

```mdx
<Tweet id="1234567890" />
<YouTube id="dQw4w9WgXcQ" />
<LinkedInPost urn="7165432109876543210" />
<Substack publication="arkash" slug="some-post" />
<Gist user="ArkashJ" id="abc123def456" />
```

Components live in `components/embeds/`, wired via `components/MdxContent.tsx`.

## ffmpeg Demo Recipes

```bash
# Screen recording → WebM (primary)
ffmpeg -i recording.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -an -vf "scale=1200:-2" public/demos/[name]/demo.webm

# MP4 fallback (Safari)
ffmpeg -i recording.mov -c:v libx264 -crf 23 -an -vf "scale=1200:-2" public/demos/[name]/demo.mp4

# GIF (GitHub READMEs only)
ffmpeg -i recording.mov -vf "fps=12,scale=900:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" output.gif
```

## Documentation

- 📘 **[HANDOFF.md](./docs/HANDOFF.md)** — full project orientation: how the site works, where to look for what
- 📋 **[TODO.md](./docs/TODO.md)** — open work, prioritized; common commands cheatsheet
- 📜 **[CHANGELOG.md](./CHANGELOG.md)** — every release, every change
- 🎨 **[design spec](./docs/superpowers/specs/2026-04-26-personal-website-revamp-design.md)** — original v2 design intent
- 🏗️ **[architecture](https://www.arkashj.com/architecture)** — 6 live React/SVG diagrams of the running stack
- 🌐 **/docs** route — same docs rendered as a polished in-site reading experience

## Custom Domain

This repo claims `https://www.arkashj.com` everywhere (sitemap, JSON-LD, OG images). To make that real:

```bash
vercel domains add arkashj.com
# Vercel prints DNS records — add at your registrar:
#   arkashj.com         A     76.76.21.21
#   www.arkashj.com     CNAME cname.vercel-dns.com
# SSL provisions automatically.
```

Until that's done the site lives at the latest `vercel.app` deploy URL (run `vercel ls` to see).

## License

[Apache 2.0](./LICENSE) © 2026 Arkash Jain — see LICENSE for full text.
