# Changelog

All notable changes to arkashj.com are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] — v2.0.0

### Planned

- Full rebuild: Next.js 15 App Router + TypeScript strict + Tailwind v4
- 15+ indexed pages: `/about`, `/research`, `/experience`, `/projects`, `/work`, `/writing`, `/knowledge/*`
- Life changelog timeline on `/about`
- SpatialDINO + 4 papers on `/research`
- Alpha repo writing ported to `/writing` (MDX)
- Knowledge second brain: AI, Finance, Distributed Systems, Math, Physics, Software
- Finance: thesis tracker + trade log
- Full SEO: Person JSON-LD, sitemap.xml, robots.txt, OG tags, canonical URLs
- Public architecture map at `/architecture`
- GitHub Actions CI + Vercel preview deployments

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
