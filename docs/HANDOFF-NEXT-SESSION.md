# HANDOFF — Next Session

> Date written: 2026-05-02
> Author: previous Claude Code session
> Repo: `Personal-Website` · Branch: `main`
> For: the next Claude Code session, started fresh after a Claude Code restart so the Playwright MCP is loaded.

---

## A. Why you exist

The previous session shipped three real upgrades but did not have the Playwright MCP available, so nothing was visually verified. Your job is to **visually verify every affected page** using `mcp__playwright__browser_navigate`, `mcp__playwright__browser_snapshot`, and `mcp__playwright__browser_take_screenshot`. Walk the verification checklist in section C, screenshot anything that looks off, and report back. You should not be writing new features — you are doing QA on what just shipped.

The user was previously frustrated because the home page made it look like content had been deleted. An audit confirmed nothing was actually removed from `content/` — the three upgrades below address the real underlying complaints. Treat this session as the proof step.

---

## B. What shipped last session

Three parallel sub-agents landed three upgrades. Verify against `git log --oneline -10` and `git status`. The current working tree still has the changes uncommitted plus the prior committed work from `387d576` and `fbe39d4`.

### B.1 Weekly modal universalization

Every rail item on `/weekly/[slug]` is now a clickable button that opens a description modal. Modal body resolution priority: anchor section markdown (`sections[anchor]`) → item `notes` → fallback string. Closes on ESC, backdrop click, and the X button. The external-link icon is preserved next to each item for the original URL.

Files touched:

- `app/weekly/[slug]/WeeklyRails.tsx` — modal state, rail item button surfaces, body resolution.
- `lib/weekly-render.ts` — exposes resolved anchor / notes / fallback to the client.
- `content/weekly/2026-W18.mdx` — `notes:` added to every previously-bare rail item; full notes for the five podcasts (Stripe / Taiwan / METR / Dinosaurs / Ackman).

### B.2 Project detail modal

`/projects` cards now open a click-to-read modal with rich description, highlights, commands, tech badges, and a GitHub CTA. Inline `<details>` blocks were removed from the card. The inner GitHub link calls `e.stopPropagation()` so it does not also trigger the modal.

Files touched:

- `components/sections/ProjectDetailModal.tsx` — new modal component (untracked).
- `components/sections/ProjectCard.tsx` — rewritten as a button surface.
- `app/projects/ProjectsClient.tsx` — modal state wiring, open/close handlers.
- `lib/data.ts` — every `PROJECT` and `WORK_TOOL` entry enriched with rich description, highlights, and commands where appropriate. (Previously only Benmore-Meridian was rich.)

### B.3 AI hardware stack route

New `/ai-hardware-stack` route that wraps `public/ai-hardware-stack.html` (132 KB) in a same-origin iframe under the standard site chrome. Linked from `/knowledge/ai` as a "Featured deck" card. Sitemap updated.

Files touched:

- `app/ai-hardware-stack/page.tsx` — new server page (untracked).
- `app/sitemap.ts` — adds the new route.
- `app/knowledge/[domain]/page.tsx` — featured deck card on the AI domain.
- `content/knowledge/ai/ai-hardware-stack.mdx` — knowledge entry pointing at the deck.

Run `git diff --stat HEAD` to see the exact line counts; the relevant slice as of this writing:

```
app/knowledge/[domain]/page.tsx            |  20 +++
app/projects/ProjectsClient.tsx            |   6 +-
app/sitemap.ts                             |   1 +
app/weekly/[slug]/WeeklyRails.tsx          | 123 ++++++++++-------
components/sections/ProjectCard.tsx        | 116 ++++++++--------
content/knowledge/ai/ai-hardware-stack.mdx |   2 +-
content/weekly/2026-W18.mdx                |  12 +-
lib/data.ts                                | 214 ++++++++++++++++++++++++-----
lib/weekly-render.ts                       |  25 +++-
```

Plus untracked: `app/ai-hardware-stack/page.tsx`, `components/sections/ProjectDetailModal.tsx`.

---

## C. Verification checklist for next session

Use Playwright MCP for every step. Take a screenshot when something looks off; otherwise a snapshot is enough.

1. **`/`** — confirm the "This week" card renders, the weekly rail counters are gone from that card, and project descriptions are visible on the projects strip. No "missing content" feel.
2. **`/weekly`** — confirm the index renders and the latest log surfaces.
3. **`/weekly/2026-W18`**
   - Every rail item under read / watched / built / shipped / learned / met is a clickable button.
   - Clicking opens a modal with body content.
   - Modal closes on ESC, on backdrop click, and on the X button.
   - The five podcasts (Stripe, Taiwan, METR, Dinosaurs, Ackman) show their full notes.
   - Previously-bare items now show their newly-added short notes.
   - The external-link icon next to each item still navigates to the original URL.
4. **`/projects`**
   - Cards are clickable and open the project detail modal.
   - Modal shows description, highlights, commands, tech badges, GitHub CTA.
   - Pagination, tag filter, and search all still work.
   - The GitHub link inside the card opens GitHub in a new tab and does NOT also open the modal (verify `stopPropagation`).
5. **`/ai-hardware-stack`**
   - Iframe loads the deck.
   - Site nav and footer are present (route is wrapped in standard chrome).
   - "View raw HTML" link exists and opens `/ai-hardware-stack.html`.
   - Direct hit on `/ai-hardware-stack.html` still returns 200 (Next serves static `public/` files directly).
6. **`/knowledge/ai`** — featured deck card is at the top and links to `/ai-hardware-stack`.
7. **`/writing`** — Second Brain section (knowledge domains) restored below the tabs (commit `fbe39d4`).

---

## D. ASCII flow diagrams

### D.1 Weekly rail click → modal open

```
┌─────────────────────────┐
│ user clicks rail item   │
│ (read/watched/built/…)  │
└────────────┬────────────┘
             │ onClick
             ▼
┌─────────────────────────────────────┐
│ WeeklyRails.openModal(resolved)     │
│  resolved = { title, anchor?,       │
│               notes?, href? }       │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ body resolution (priority order):   │
│  1. sections[resolved.anchor]       │
│  2. resolved.notes                  │
│  3. fallback string                 │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────┐    ESC / backdrop / X
│ <DetailModal> mounts    │ ──────────────────────┐
└─────────────────────────┘                       │
                                                  ▼
                                  ┌──────────────────────────┐
                                  │ close() → unmount,       │
                                  │ body scroll restored     │
                                  └──────────────────────────┘
```

### D.2 Project card click → modal open

```
┌─────────────────────────┐
│ user clicks <ProjectCard│
│ as button surface>      │
└────────────┬────────────┘
             │ onClick
             ▼
┌─────────────────────────────────────┐
│ ProjectsClient.openModal(project)   │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ <ProjectDetailModal> mounts         │
│   - description (rich)              │
│   - highlights[]                    │
│   - commands[]                      │
│   - tech[] badges                   │
│   - GitHub CTA  ─── target=_blank   │
└────────────┬────────────────────────┘
             │
             │  inner GitHub <a> uses
             │  e.stopPropagation()
             │  → click does NOT bubble
             │     up to card button
             │
             ▼  ESC / backdrop / X
┌─────────────────────────┐
│ close() → unmount       │
└─────────────────────────┘
```

### D.3 AI hardware stack route serving

```
GET /ai-hardware-stack
        │
        ▼
┌────────────────────────────────────────┐
│ app/ai-hardware-stack/page.tsx         │  (server component)
│  ├─ <SectionHeader … />                │
│  ├─ <a href="/ai-hardware-stack.html"> │
│  │    View raw HTML                    │
│  └─ <iframe                            │
│       src="/ai-hardware-stack.html"    │  same-origin
│       title="AI hardware stack" />     │
└────────────────────────────────────────┘
                 │
                 │ browser fetches iframe src
                 ▼
GET /ai-hardware-stack.html
        │
        ▼
┌────────────────────────────────────────┐
│ Next.js serves public/ai-hardware-     │
│ stack.html directly (132 KB static)    │
└────────────────────────────────────────┘

Direct hit /ai-hardware-stack.html bypasses chrome
and returns the same static file → must still 200.
```

---

## E. Known issues / build quirks

- **`app/api/ce-plan/posts/`** exists in the working tree. It is a leftover from an older session and is not part of the three upgrades above. Confirm with `ls app/api/ce-plan/posts/`. Read its contents before touching — if it is partial / unused and breaks `npm run build`, delete it and note the deletion. Do not delete blindly.
- **OpenGraph image for `/ai-hardware-stack`** — there is no `app/ai-hardware-stack/opengraph-image.tsx` yet. If `npm run build` complains about a missing OG route or fails to prerender the new page, that is the cause. Fix or note depending on severity.
- **Dev server port** — the user's dev server runs on port 3000. Use a different port (e.g. `npm run dev -- -p 3030`) for verification so you do not collide.
- **Untracked files** — `app/ai-hardware-stack/page.tsx` and `components/sections/ProjectDetailModal.tsx` are NOT yet committed. They show up under `git status` as untracked. Do not stash or delete them.

---

## F. Pre-flight commands

Run these before doing anything else, in this order:

```
git status
git log --oneline -10
npm run lint
npm run build
```

If `npm run build` fails, the most likely culprits are listed in section E. Triage in this order: (1) `app/api/ce-plan/posts/` stray files, (2) missing OG image route for `/ai-hardware-stack`, (3) anything else surfaced by the error.

---

## G. Out of scope

Do not refactor. Do not add new features. Do not modify the weekly modal, project modal, or AI hardware stack code unless visual verification turns up a real bug. The three upgrades shipped — your only deliverables are: confirm they look right on every listed URL, repair any genuine breakage, and report findings. If you find yourself reaching for `lib/data.ts` or `WeeklyRails.tsx` for "improvements," stop.
