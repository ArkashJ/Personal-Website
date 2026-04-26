# arkashj.com

[![License](https://img.shields.io/badge/License-Apache_2.0-30ACA6.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com)
[![ESLint](https://img.shields.io/badge/ESLint-passing-4B32C3?logo=eslint&logoColor=white)](https://eslint.org)
[![Prettier](https://img.shields.io/badge/Prettier-formatted-F7B93E?logo=prettier&logoColor=black)](https://prettier.io)
[![CI](https://github.com/ArkashJ/Personal-Website/actions/workflows/ci.yml/badge.svg)](https://github.com/ArkashJ/Personal-Website/actions/workflows/ci.yml)

Personal website and knowledge hub for [Arkash Jain](https://www.arkashj.com) —
AI researcher, forward deployed engineer, and builder.

→ **[Architecture map](https://www.arkashj.com/architecture)**

## Stack

| Layer      | Technology                                 |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 13 (Pages Router) → v2: App Router |
| Language   | JavaScript → v2: TypeScript strict         |
| Styling    | Tailwind CSS                               |
| Content    | MDX files in `content/`                    |
| Deployment | Vercel                                     |
| CI         | GitHub Actions                             |

## Local Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint
npm run format     # Prettier
npm run build      # Production build
```

## ffmpeg Demo Recipes

```bash
# Screen recording → WebM (primary — best size/quality)
ffmpeg -i recording.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -an -vf "scale=1200:-2" public/demos/[name]/demo.webm

# MP4 fallback (Safari)
ffmpeg -i recording.mov -c:v libx264 -crf 23 -an -vf "scale=1200:-2" public/demos/[name]/demo.mp4

# GIF (GitHub READMEs only — much larger than WebM)
ffmpeg -i recording.mov -vf "fps=12,scale=900:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" output.gif
```

## Architecture

See [docs/architecture/site-architecture.md](./docs/architecture/site-architecture.md)
for full ASCII flows, or visit [arkashj.com/architecture](https://www.arkashj.com/architecture).

## License

[Apache 2.0](./LICENSE) © 2026 Arkash Jain
