---
title: 'feat: LLM Copy Improvements + Benmore-Meridian Skills Public Release'
type: feat
status: active
date: 2026-05-02
---

# feat: LLM Copy Improvements + Benmore-Meridian Skills Public Release

## Summary

Two related public-signal improvements. First, overhaul `llms.txt` and `llms-full.txt` so AI assistants cite Arkash accurately and completely — adding structured skills/tools context, knowledge-domain article listings, and a dedicated `/llm` route that serves clean markdown for crawlers. Second, make the Benmore-Meridian skills repo public on GitHub — filtering out the three internal-only skills (`benmore-api`, `pcs/*`, `using-bm`) and adding a skills landing page on arkashj.com.

---

## Problem Frame

**LLM copy:** The current `llms.txt` is correct but shallow — it misses individual knowledge articles, the bm CLI / skills as a project, and lacks structured frontmatter that AI crawlers (Perplexity, Claude.ai, ChatGPT browse) consume most reliably. There is no `/llm` HTML page that surfaces Arkash's work to AI-powered search without JavaScript.

**Skills public release:** The Benmore-Meridian repo (`github.com/Benmore-Studio/Benmore-Meridian`) has 76 skills and the `bm` CLI, currently under MIT license but with `private: true`. Three skill folders contain internal Benmore API references (`benmore-api/`, `pcs/*`, `using-bm/`) and must stay private or be scrubbed. The remaining ~70 skills are generic and publishable. A public repo creates a linkable O-1 evidence artifact and an open-source signal for Arkash's personal site.

---

## Requirements

- R1. `llms.txt` contains factual, structured, up-to-date copy that AI systems can cite without hallucinating details.
- R2. `llms-full.txt` is regenerated programmatically from real content (MDX frontmatter + descriptions) instead of being hand-maintained.
- R3. A `/llm` route at `arkashj.com/llm` serves clean, no-JS markdown optimized for AI crawlers.
- R4. The `sitemap.xml` and `robots.txt` reference the new `/llm` route appropriately.
- R5. The Benmore-Meridian GitHub repo is set to public with internal skills excluded.
- R6. `arkashj.com/work` (or `/projects`) links to the public skills repo and mentions `bm` as a tool.
- R7. No internal Benmore API keys, client names, or PCS-specific patterns appear in the public skills repo.

---

## Scope Boundaries

- This plan does not redesign the skills themselves — content of individual skill SKILL.md files is out of scope.
- The `bm` Python CLI (in `Benmore-Meridian/bm/`) can be mentioned and linked but is not being separately open-sourced with its own PyPI package in this plan.
- The `/docs` route on arkashj.com is unchanged.
- No new MDX writing posts or knowledge articles are written in this plan.

### Deferred to Follow-Up Work

- Auto-regenerating `llms-full.txt` on every Vercel deploy via a build script (post-ship cleanup).
- Adding `<link rel="alternate" type="text/plain" href="/llms.txt">` to the HTML `<head>` (small — can be done in the same PR).
- A proper `bm` PyPI package / separate repo for the CLI.

---

## Context & Research

### Relevant Code and Patterns

- `public/llms.txt` — current 94-line LLM file (correct bio, publications, site map)
- `public/llms-full.txt` — 411-line full version including embedded essay excerpts
- `app/sitemap.ts` — enumerate routes; `/llm` needs to be added here
- `app/robots.ts` — allow `/llm` for all crawlers
- `lib/content.ts` — `getAllWritingPosts()`, `getAllKnowledgePosts()` return typed metadata usable for auto-generating LLM files
- `lib/data.ts` — `WORK_TOOLS` has the bm/skills entry; `PROJECTS` will gain the public skills link
- `components/sections/SectionHeader.tsx` — standard page header used on `/work`, `/writing`
- `/app/work/page.tsx` — existing internal tools page

### Institutional Learnings

- None in `docs/solutions/` specifically about LLM copy or skills publishing.

### External References

- [llmstxt.org](https://llmstxt.org) — community standard: one `# Title`, short bio, then `## Section` with links
- Anthropic citations prefer factual, source-linked claims over narrative prose
- Perplexity and Bing Copilot crawl plain-text endpoints at `/llms.txt` and `/sitemap.xml`

---

## Key Technical Decisions

- **`/llm` route as Next.js static page:** Render as a server component that calls `getAllWritingPosts()` + `getAllKnowledgePosts()` and returns plain text via `Response` (similar to how `sitemap.ts` works). This keeps content in sync with actual MDX without manual updates. Alternatively, a dedicated `.txt` file under `public/` works but requires manual sync — prefer the programmatic route.
- **Exclude skills via `.gitignore` in a fork vs. delete from repo:** Since `benmore-api/`, `pcs/*`, and `using-bm/` reference the internal Benmore API, they should remain in the private Benmore-Meridian repo but be excluded from a new public fork, OR the Benmore-Meridian main branch gets a "public" tag with those folders removed. Simplest path: open the existing repo, remove the three folders via git rm, commit, then set visibility public. The internal skills live in a separate internal branch or stay accessible via git history for internal use only.
- **`llms.txt` hand-maintained vs generated:** `llms.txt` (short version) stays hand-maintained since it changes rarely. `llms-full.txt` is high-value if generated from real content — implementation can use a build script that runs `getAllWritingPosts()` and writes to `public/llms-full.txt` at build time. For this plan, a static rewrite is acceptable as an interim step.

---

## Open Questions

### Resolved During Planning

- **Which skills to exclude?** `benmore-api/`, `pcs/` (folder with 7 sub-skills), `using-bm/` (references `BM_API_KEY` and internal Benmore API). All others (~67 skills) are generic and publishable.
- **Where to link skills on arkashj.com?** Update the `WORK_TOOLS` entry for "Compound Engineering Skills" in `lib/data.ts` to add an `href` pointing to the public GitHub repo. Optionally add a "bm CLI" entry to `PROJECTS`.

### Deferred to Implementation

- Exact list of files in `pcs/*` that reference client names — confirm via `grep` before the git rm commit.
- Whether `llms-full.txt` generation should be a Next.js route handler or a separate `scripts/generate-llms.ts` Node script run as a prebuild step.

---

## Implementation Units

- U1. **Audit and remove internal skills from Benmore-Meridian**

**Goal:** Ensure no internal Benmore API keys, client references, or PCS-specific patterns exist in what will become the public repo.

**Requirements:** R5, R7

**Dependencies:** None

**Files (Benmore-Meridian repo — repo-relative):**

- Modify: `.gitignore` (or use `git rm -r --cached`)
- Delete: `skills/benmore-api/`
- Delete: `skills/pcs/` (7 sub-skills)
- Delete: `skills/using-bm/`
- Modify: `README.md` (remove references to internal skills, BM_API_KEY, Benmore API)
- Modify: `SKILLS_INVENTORY.md` (remove the 9 deleted skills from the list)

**Approach:**

- Run `grep -r "BM_API_KEY\|benmore_api\|BEN-\|client_id\|client_name" skills/` to find any leaked references before committing
- `git rm -r skills/benmore-api skills/pcs skills/using-bm`
- Audit `README.md` for any sections that assume internal Benmore toolchain is available to the reader
- Update skill count from 76 → ~67 everywhere it appears

**Test scenarios:**

- Happy path: `git grep "BM_API_KEY"` returns no results after the commit
- Happy path: `git grep "pcs-add-endpoint\|pcs-migration"` returns no results in skill files
- Edge case: SKILLS_INVENTORY.md count matches actual folder count

**Verification:**

- `git grep` for known-internal strings returns nothing
- `ls skills/ | wc -l` matches the updated count in README.md

---

- U2. **Set Benmore-Meridian repo to public + add GitHub topics**

**Goal:** Change repo visibility to public and make it discoverable.

**Requirements:** R5

**Dependencies:** U1

**Files (GitHub UI or `gh` CLI — not filesystem):**

- `gh repo edit Benmore-Studio/Benmore-Meridian --visibility public`

**Approach:**

- Use `gh repo edit --visibility public --description "76 Claude Code skills + bm CLI for forward-deployed engineers"`
- Add topics: `claude-code`, `ai-agents`, `skills`, `cli`, `forward-deployed-engineering`
- Confirm the repo README renders correctly on the public GitHub page

**Test scenarios:**

- Happy path: `gh repo view Benmore-Studio/Benmore-Meridian --json visibility` returns `"public"`
- Happy path: GitHub repo page is accessible without authentication

**Verification:**

- Repo is publicly browsable at `github.com/Benmore-Studio/Benmore-Meridian`

---

- U3. **Update arkashj.com to link to public skills repo**

**Goal:** Surface the skills repo and `bm` CLI as linkable projects on the personal site.

**Requirements:** R6

**Dependencies:** U2

**Files:**

- Modify: `lib/data.ts` — update `WORK_TOOLS` "Compound Engineering Skills" entry to add `href: 'https://github.com/Benmore-Studio/Benmore-Meridian'`; add a new `PROJECTS` entry for `bm` CLI
- Modify: `app/work/page.tsx` — verify link renders (the page uses `WORK_TOOLS`)

**Approach:**

- `WORK_TOOLS` entries don't currently have an `href` field — check the `WorkTool` type in `lib/data.ts` and add `href?: string` if absent
- Add `bm` as a `PROJECTS` entry: `{ name: 'bm — Benmore Skill Manager', year: '2025', description: '76 Claude Code skills + CLI for forward-deployed engineers. 60-90% token savings via RTK hooks.', tech: ['Python', 'Claude Code', 'uv'], href: 'https://github.com/Benmore-Studio/Benmore-Meridian' }`
- The `ProjectCard` component already handles `href` with an external link

**Test scenarios:**

- Happy path: `/work` page shows "Compound Engineering Skills" with a live GitHub link
- Happy path: `/projects` page shows the `bm` entry with a View → link

**Verification:**

- Both pages render without TypeScript errors
- Links resolve to the correct GitHub URL

---

- U4. **Rewrite `public/llms.txt` with structured copy**

**Goal:** Produce a clean, AI-crawler-optimized `llms.txt` following the llmstxt.org convention with current, accurate content.

**Requirements:** R1

**Dependencies:** None

**Files:**

- Modify: `public/llms.txt`

**Approach:**

- Follow llmstxt.org format: `# Name`, short bio, `## Publications` with canonical URLs, `## Projects` with descriptions, `## Writing` with article list + links, `## Knowledge` with domain list + article count, `## Contact`
- Add the skills repo link under `## Tools & Open Source` once U2/U3 are done
- Keep it under 150 lines — crawlers truncate long plain-text files
- Use factual declarative sentences; avoid marketing language that AI systems might hallucinate differently

**Test scenarios:**

- Happy path: File parses cleanly as markdown (no broken links, no placeholder text)
- Edge case: All publication URLs are live and return 200

**Verification:**

- `curl https://arkashj.com/llms.txt` returns the new content after deploy
- No broken links (spot check 5 URLs)

---

- U5. **Add `/llm` server route returning programmatic plain-text**

**Goal:** Create a Next.js route at `/llm` that generates clean AI-readable markdown from live site content, avoiding manual sync with MDX files.

**Requirements:** R2, R3

**Dependencies:** None

**Files:**

- Create: `app/llm/route.ts` — Next.js Route Handler returning `text/plain`

**Approach:**

- Route Handler pattern (not a page): `export async function GET() { return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }) }`
- Import `getAllWritingPosts()`, `getAllKnowledgePosts()` to build the writing + knowledge sections dynamically
- Import `PAPERS`, `PROJECTS`, `KNOWLEDGE_DOMAINS` from `lib/data.ts`
- Sections: bio (static), publications, projects, writing (title + description per post), knowledge (domain + article count), contact
- This route can eventually replace `llms-full.txt` in `public/` — mark the static file as deprecated in a comment

**Test scenarios:**

- Happy path: `GET /llm` returns 200 with `Content-Type: text/plain`
- Happy path: Response includes all writing post titles
- Happy path: Response includes all knowledge domains
- Edge case: Works correctly when there are zero writing posts (graceful empty section)

**Verification:**

- `curl http://localhost:3000/llm` returns well-formed plain text with correct sections
- All writing post titles and knowledge domains appear in the output

---

- U6. **Update sitemap and robots for `/llm`**

**Goal:** Ensure `/llm` is crawlable by AI and search bots.

**Requirements:** R4

**Dependencies:** U5

**Files:**

- Modify: `app/sitemap.ts` — add `/llm` as a static route
- Modify: `app/robots.ts` — confirm `Allow: /llm` is covered (it likely already is under global allow-all)

**Approach:**

- Add `{ url: \`${siteUrl}/llm\`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 }` to the sitemap entries
- Robots.txt currently allows all — no change needed unless explicit AI-bot rules are added later

**Test scenarios:**

- Happy path: `GET /sitemap.xml` includes `/llm` entry
- Happy path: `GET /robots.txt` does not block `/llm`

**Verification:**

- `/llm` appears in sitemap output
- `robots.txt` has no Disallow matching `/llm`

---

## System-Wide Impact

- **Interaction graph:** The new `/llm` route imports from `lib/content.ts` and `lib/data.ts` — same data sources as other server pages. No new dependencies introduced.
- **Error propagation:** If `getAllWritingPosts()` throws (e.g., missing `content/writing/` directory), the `/llm` route should handle gracefully with an empty section rather than a 500.
- **State lifecycle risks:** `public/llms.txt` is static and served by Vercel CDN — changes take effect on next deploy.
- **API surface parity:** `/llms.txt` (static) and `/llm` (dynamic route) serve similar content. They are intentionally different: `llms.txt` follows the community convention for AI crawlers that look for the file by name; `/llm` is a dynamic, always-fresh version.
- **Unchanged invariants:** `/robots.txt`, `/sitemap.xml`, and `/llms-full.txt` behavior is unchanged except the sitemap gaining one new entry.

---

## Risks & Dependencies

| Risk                                                                     | Mitigation                                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Internal client names in `pcs/*` skills get committed to the public repo | Run `git grep` for known-internal strings before `git push --no-verify` on the public repo  |
| Benmore-Meridian has external contributors who pushed after the audit    | Re-run the grep after pulling latest before setting visibility public                       |
| `llms.txt` content goes stale faster than `/llm` route                   | Consider a build script that overwrites `llms.txt` from `app/llm/route.ts` output during CI |
| `/llm` route adds build-time latency                                     | Route is statically generated at build time (no dynamic data) — impact is negligible        |

---

## Sources & References

- Current LLM files: `public/llms.txt`, `public/llms-full.txt`
- Benmore-Meridian: `../benmore/Benmore-Meridian/`
- llmstxt.org standard: https://llmstxt.org
- Skills inventory: `../benmore/Benmore-Meridian/SKILLS_INVENTORY.md`
