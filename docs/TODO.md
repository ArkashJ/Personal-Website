# arkashj.com — Open Work

> Companion to [`HANDOFF.md`](./HANDOFF.md). That doc explains *how the site works*; this one says *what's left to ship*. Updated 2026-04-26.

---

## What's already shipped (so we don't re-do it)

- ✅ Apache 2.0 license, README, CHANGELOG, Dependabot, ESLint, Prettier, Husky, lint-staged, GitHub Actions CI, Vercel deploy, security headers
- ✅ Next.js 15 App Router + React 19 + TypeScript strict + Tailwind v3 + Geist fonts
- ✅ Pages: `/`, `/about`, `/research`, `/experience`, `/projects`, `/work`, `/writing`, `/writing/[slug]`, `/knowledge`, `/knowledge/[domain]`, `/knowledge/[domain]/[slug]`, `/media`, `/stack`, `/learnings`, `/architecture`, `/404`
- ✅ Legacy redirects: `/VC` → `/experience`, `/Volunteering` → `/about`
- ✅ MDX content pipeline (next-mdx-remote/rsc) — 5 writing posts + 12 knowledge MDX files
- ✅ Embeds: Tweet, YouTube, LinkedIn, Substack, Gist (usable in MDX)
- ✅ SEO: Person JSON-LD, Article + ScholarlyArticle JSON-LD, native sitemap.ts + robots.ts, dynamic OG images per route, `<link rel="me">`
- ✅ Design system: navy palette, mint primary, warm-tan italic accent, sharp edges, infinite grid background, dark + light theme
- ✅ Animations: page entrance fade-up, stagger utility, dot-pulse, hover-lift cards
- ✅ Mobile nav (hamburger), theme toggle (sun/moon icon)
- ✅ Real public links: BioRxiv, JCB, JCP papers; Medium @arkjain; STU STREET podcast (4 YouTube embeds); Harvard lab page; PyTorch issue
- ✅ Real GitHub repos surfaced as projects (Raft, CloudComputing, NEXMARK, etc.)
- ✅ Architecture page: 6 React/SVG diagrams (replaced ASCII)
- ✅ Life Changelog with major-milestone visual emphasis
- ✅ HANDOFF.md (project orientation)

**Live**: latest production deploy at the Vercel-generated URL (check `vercel ls`). Currently deploys via Vercel GitHub integration on every push to `main`.

---

## P0 — High value, near-term

### 1. Custom domain `arkashj.com` → Vercel
The codebase claims `https://www.arkashj.com` (sitemap, JSON-LD, OG images) but the live site is on a Vercel preview URL. SEO + canonical metadata + JSON-LD will all break until the domain points at the deployment.

**Owner needs:** DNS access at the domain registrar.
**Steps:**
1. `vercel domains add arkashj.com` (or via Vercel dashboard → Project → Settings → Domains)
2. Add the `A` and/or `CNAME` records Vercel provides (typically `cname.vercel-dns.com` for `www`, `76.76.21.21` for the apex)
3. Wait for SSL provisioning (~minutes)
4. Confirm `https://www.arkashj.com` returns the latest build
5. (Optional) Add to LinkedIn, GitHub, Substack profile fields once live

**Why P0:** Everything SEO-related claims this URL. Without it the visa evidence hub is fragmented across vercel.app subdomains.

### 2. Submit sitemap to Google Search Console
- Verify the (custom) domain in [Search Console](https://search.google.com/search-console)
- Submit `https://www.arkashj.com/sitemap.xml`
- Run URL Inspection → Request Indexing on `/`, `/about`, `/research`
- Add the same to Bing Webmaster Tools

### 3. ffmpeg demo recordings for `/work`
The Work page lists 4 internal tools (Foundry CLI, RTK, Compound Engineering Skills, Excalidraw flows) but has no visuals. The README has the ffmpeg recipes already.

**Steps:**
1. Screen-record each tool (~30–60s loop showing the value)
2. Convert to WebM + MP4:
   ```bash
   ffmpeg -i recording.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -an -vf "scale=1200:-2" public/demos/foundry/demo.webm
   ffmpeg -i recording.mov -c:v libx264 -crf 23 -an -vf "scale=1200:-2" public/demos/foundry/demo.mp4
   ```
3. Add a `<video autoPlay muted loop playsInline>` block per work card with both sources
4. Commit `public/demos/<tool>/demo.{webm,mp4}` and the markup change

### 4. Fill content gaps the audit flagged

Specific MDX articles that round out the body of work (suggested in the content scaffolding plan):

| Title | Where | Why |
|---|---|---|
| `spatialdino-the-architecture-decisions.mdx` | `content/knowledge/ai/` | Anchor for the SpatialDINO paper, explains technical choices |
| `beating-betzig-with-24-gpus.mdx` | `content/writing/` | Visa-grade story: small team beats Nobel laureate's pipeline |
| `pytorch-144779-the-infiniband-fix.mdx` | `content/knowledge/distributed-systems/` | Walkthrough of the open-source contribution |
| `dynamic-checkpointing-flink-thesis.mdx` | `content/knowledge/distributed-systems/` | Thesis summary |
| `from-supercritical-fluids-to-vision-transformers.mdx` | `content/writing/` | The arc story — about-page anchor |
| `benmore-150k-to-150k-every-15-days.mdx` | `content/writing/` | Forward-deployed unit economics deep dive |
| `hbm-scarcity-the-structural-trade.mdx` | `content/writing/` | Long-form Micron thesis |
| `aggregation-theory-applied-to-ai-dev-tools.mdx` | `content/writing/` | Stratechery framework on Cursor / Claude Code |
| `teaching-cs411-what-300-students-taught-me.mdx` | `content/writing/` | Teaching/leadership angle |
| `tools-that-make-me-10x-the-claude-code-stack.mdx` | `content/writing/` | Companion to /stack |

---

## P1 — High value, larger scope

### 5. New surfaces still missing (visa hub completeness)
The site's stated O-1 goal calls for these surfaces. Each is a single typed array + page. The data model proposal lives in `docs/superpowers/specs/2026-04-26-personal-website-revamp-design.md` and the content scaffolding agent's output (in session history).

| Surface | O-1 criterion | Effort |
|---|---|---|
| `/press` | Press coverage | Trivial — extend `lib/media.ts` PRESS to its own page |
| `/talks` | Scholarly recognition + leadership | Small — add Talk type, scaffold cards |
| `/achievements` | Awards (richer than Timeline) | Small — Marvin Freedman, UROP, Magna with full citations |
| `/coursework` | Education depth | Medium — BU + Harvard transcript-style table |
| `/collaborators` | Letter-writer pipeline | Small — 5–10 cards, name + affiliation + context |
| `/teaching` | Mentorship / judging others | Trivial — TA history (CS411, CS131, EK301, MA581) |
| `/open-source` | Original contributions | Trivial — PyTorch #144779 + RTK + skills authored |

### 6. Replace `/work` placeholder with real demos
Once recordings exist (P0 #3), build a `<WorkCard>` variant that renders the video alongside copy. Currently work cards have no media at all.

### 7. Improve mobile typography
Hero stat labels still wrap awkwardly on narrow viewports (`Harvard + BU` becomes two lines). Either shrink, abbreviate, or use `clamp()`.

---

## P2 — Polish / nice-to-have

- **Light mode polish.** Theme works but accent contrast on light bg hasn't been visually audited end-to-end. Spot-check every page in light mode.
- **Tailwind v4 upgrade.** Defer until v4 is widely battle-tested; current v3 setup is fine.
- **Search.** A `cmd+k` searcher across writing + knowledge + experience would be powerful but is significant scope (consider Pagefind for static search).
- **RSS for `/writing`.** Trivial — generate `app/writing/rss.xml/route.ts` from `getAllWritingPosts()`.
- **View counts / analytics.** Plausible or Vercel Analytics; client wants privacy-respecting + cookieless.
- **Resume PDF.** Generate a printable `/resume` page or upload a static PDF to `public/resume.pdf` linked from `/about`.

---

## Known issues to be aware of

1. **Pre-existing ESLint plugin warning** during build:
   `Error while loading rule '@next/next/no-img-element' ... in app/VC/page.tsx`
   This does NOT fail the build (compile + page generation succeed). It's a known incompatibility between the ESLint plugin and the redirect-only page. Suppress with `eslint-disable` comment if it gets noisy.

2. **Geist Mono substitution warning** at build time on some content. Cosmetic; renders fine.

3. **Edge runtime on `/opengraph-image`** is reported as "disables static generation" — this is intentional; the home OG is dynamic on edge. Per-post OG images use `nodejs` runtime + `generateStaticParams` and DO prerender.

4. **Vercel CLI deploy** outputs URLs like `arkashj-XXXX-benmore-technologies.vercel.app`. The aliased canonical is `arkashj-com.vercel.app` until a custom domain is connected.

---

## Common operations cheatsheet

```bash
# Local dev
npm run dev

# Production build (must pass before push)
npm run build

# Format + lint
npm run format
npm run lint

# Deploy to Vercel production manually (Vercel bot also deploys on every main push)
vercel deploy --prod --yes

# Check deployment status
vercel ls --yes | head -5

# Add a new MDX writing post
echo '---\ntitle: "..."\ndate: "2026-MM-DD"\ntags: ["AI"]\ndescription: "..."\n---\n\nbody' > content/writing/my-post.mdx
# (then commit; sitemap + writing index pick it up automatically)

# Branch flow (preferred)
git checkout -b feat/short-name
# ...edit...
git add -A
HUSKY=0 git commit -m "feat(scope): one-line"  # HUSKY=0 only if pre-commit blocks unrelated lint warnings
git push -u origin feat/short-name
gh pr create --base main --head feat/short-name --title "..." --body "..."
gh pr merge --squash --delete-branch
git checkout main && git pull --ff-only
```

---

## Decisions deferred for later

| Decision | Why deferred | When to revisit |
|---|---|---|
| Migrate to Tailwind v4 | Utility-name churn, no user-visible value | After Tailwind v4 hits 1.0 stable + community recipes mature |
| Move to App Router-only build (drop ISR) | Currently mixes static + dynamic OG | If sitemap warm-build time becomes an issue |
| Custom search index (Pagefind / Algolia) | Site too small to matter yet | When >40 MDX articles |
| Comments on writing | Out of scope per spec | Maybe a `mailto:` "thoughts?" link instead |
| Mailing list / newsletter integration | Substack already covers this | Only if substack relationship changes |
| Internationalization | English-only is fine | Never |

---

## Where to look when stuck

| Question | File |
|---|---|
| How does the site work? | [`HANDOFF.md`](./HANDOFF.md) |
| What's the design intent? | [`superpowers/specs/2026-04-26-personal-website-revamp-design.md`](./superpowers/specs/2026-04-26-personal-website-revamp-design.md) |
| Why was the foundation built this way? | [`superpowers/plans/2026-04-26-foundation-quick-wins.md`](./superpowers/plans/2026-04-26-foundation-quick-wins.md) |
| What changed in each release? | [`../CHANGELOG.md`](../CHANGELOG.md) |
| What got cleaned up? | `git log --oneline --grep="chore\|cleanup"` |
| Architecture overview | `https://www.arkashj.com/architecture` (or `app/architecture/page.tsx`) |
