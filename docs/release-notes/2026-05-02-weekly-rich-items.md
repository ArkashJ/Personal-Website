# 2026-05-02 — Weekly logs grow up, mobile gets cleaner

Three small things ship together.

## 1. The skills "Copy for LLM" button works in Safari now

The button rendered red "Copy failed" for anyone on Safari and for some Chromium users with strict clipboard policies. The pattern was:

```ts
const res = await fetch('/skills/audit-trail/raw')
const text = await res.text()
await navigator.clipboard.writeText(text) // ← throws NotAllowedError
```

Safari treats the `await fetch(...)` as breaking the user-activation gesture, so the clipboard write that follows isn't recognized as user-initiated.

The fix is the spec-blessed pattern for async clipboard writes — pass a `Promise<Blob>` to `ClipboardItem` and the browser keeps the gesture alive while the fetch resolves:

```ts
new ClipboardItem({
  'text/plain': fetch(url).then(async (r) => new Blob([await r.text()], { type: 'text/plain' })),
})
```

Lives in `lib/copy-skill.ts`, used by both the `/skills` index and `/skills/[slug]` detail buttons. Falls back to `writeText` for older browsers without `ClipboardItem`. Errors log to console.

## 2. Weekly rails are linked, illustrated, and source-attributed

Each rail entry on a `/weekly/<slug>` page used to be a plain string. Now each can be a string OR a rich object:

```yaml
watched:
  - text: 'Karpathy — state of LLM infra (2026)'
    href: 'https://www.youtube.com/watch?v=zjkBMFhNj_g'
    kind: 'youtube'
  - text: 'Latent Space pod — context engineering vs prompt engineering'
    href: 'https://www.latent.space/p/context-engineering'
    source: 'Latent Space'
    kind: 'podcast'
```

`lib/weekly-render.ts` derives the visuals so authoring stays terse:

- YouTube URLs (`youtube.com/watch?v=…`, `youtu.be/…`, `youtube.com/shorts/…`) → `https://i.ytimg.com/vi/<id>/mqdefault.jpg` thumbnail, source auto-set to "YouTube".
- Known `source`/`kind` values → SimpleIcons logo from `cdn.simpleicons.org`. Covers YouTube, GitHub, Substack, Medium, LinkedIn, X, arXiv, Spotify, Apple Podcasts, Overcast, Latent Space (RSS fallback).
- Anything else falls through gracefully — no logo, just text + source label.

Rails render as link cards: thumbnail or 16×16 logo + linked title + source label in muted mono caps. External links open in a new tab.

## 3. Latest weekly log surfaces on the home page

A new "This week" section sits directly under the hero — title, week range, six-category counts grid (Read · Watched · Built · Shipped · Learned · Met), tags, click-through to the full log. Wired via `getLatestWeeklyLog()` in `lib/weekly.ts`.

## 4. `/skills` is mobile-clean

The three-column "How to use these skills" grid contained `<pre>` blocks with unbreakable shell commands. CSS Grid items default to `min-width: auto` (= `min-content`); on a 390px viewport each cell expanded to 565px and forced horizontal page scroll, even though the inner `<pre>` had `overflow-x-auto`.

Added `min-w-0` to the three grid children. Cells now shrink below intrinsic min-content and the inner `overflow-x-auto` engages. Audited every public route at iPhone width with a Playwright probe — every other route was already clean.

## How to author a new weekly log

```bash
content/weekly/2026-W19.mdx
```

```yaml
---
title: 'A short, specific headline'
weekStart: '2026-05-04'
weekEnd: '2026-05-10'
description: 'One-sentence what-happened.'
tags: ['Benmore', 'Cattle Logic']
watched:
  - text: 'Some YouTube video'
    href: 'https://www.youtube.com/watch?v=…' # thumbnail auto-resolved
read:
  - text: 'A blog post'
    href: 'https://example.com/post'
    source: 'Substack' # logo auto-resolved
shipped:
  - text: 'Some PR'
    href: 'https://github.com/owner/repo/pull/N'
    source: 'GitHub'
met:
  - 'Plain-string entry, no link, no logo'
---
```

Save the file. The home page picks it up automatically as "This week", `/weekly` lists it, and `/weekly/2026-W19` renders the full detail page.
