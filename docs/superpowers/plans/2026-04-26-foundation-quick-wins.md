# Foundation & Quick Wins Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Productionize arkashj.com with licensing, tooling, CI/CD, security headers, and architecture documentation before the v2 rebuild begins.

**Architecture:** All tasks target the existing Next.js 13 Pages Router codebase. No framework migration — this establishes the foundation (toolchain, docs, CI/CD, `/architecture` page) that the v2 rebuild will inherit verbatim.

**Tech Stack:** Next.js 13, React 18, Tailwind CSS, ESLint, Prettier, Husky, lint-staged, GitHub Actions, Vercel CLI

---

## ASCII Architecture Flows

These diagrams are the canonical reference for the site. They live in `docs/architecture/` and are rendered on the public `/architecture` page.

### Flow 1 — Site Architecture Overview

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                          arkashj.com  (v2 target)                           ║
║                      Next.js 15 · TypeScript · Tailwind                     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   ┌─────────────────────────────────────────────────────────────────────┐   ║
║   │                        app/layout.tsx                                │   ║
║   │                                                                      │   ║
║   │   ┌──────────────┐   ┌──────────────────────┐   ┌───────────────┐  │   ║
║   │   │     <Nav>    │   │  <Person JSON-LD>     │   │   <Footer>   │  │   ║
║   │   │  sticky top  │   │  (every page)         │   │  all links   │  │   ║
║   │   └──────────────┘   └──────────────────────┘   └───────────────┘  │   ║
║   └──────────────────────────────────┬──────────────────────────────────┘   ║
║                                      │ {children}                           ║
║          ┌───────────────────────────┼───────────────────────────┐          ║
║          │                           │                           │          ║
║   ┌──────▼──────┐  ┌─────────┐  ┌───▼─────┐  ┌──────────┐  ┌──▼──────┐   ║
║   │      /      │  │ /about  │  │/research│  │/experience│  │/projects│   ║
║   │    Hero     │  │Timeline │  │ Papers  │  │  Cards   │  │  Grid   │   ║
║   │    Stats    │  │Changelog│  │PyTorch  │  │          │  │         │   ║
║   └─────────────┘  └─────────┘  └─────────┘  └──────────┘  └─────────┘   ║
║                                                                              ║
║   ┌─────────┐  ┌──────────────────┐  ┌──────────────────────────────────┐  ║
║   │  /work  │  │    /writing      │  │          /knowledge               │  ║
║   │  CLIs   │  │  ┌────────────┐  │  │  ┌───┐ ┌───────┐ ┌────────────┐ │  ║
║   │  Skills │  │  │   index    │  │  │  │ AI│ │Finance│ │Dist.Systems│ │  ║
║   │  GIFs   │  │  └─────┬──────┘  │  │  └───┘ └───────┘ └────────────┘ │  ║
║   └─────────┘  │  ┌─────▼──────┐  │  │  ┌────┐ ┌───────┐ ┌──────────┐ │  ║
║                │  │[slug]/page │  │  │  │Math│ │Physics│ │ Software │ │  ║
║                │  │ MDX + JSON-LD│ │  │  └────┘ └───────┘ └──────────┘ │  ║
║                │  └────────────┘  │  └──────────────────────────────────┘  ║
║                └──────────────────┘                                         ║
║                                                                              ║
║   ┌──────────────────┐   ┌──────────────────────────────────────────────┐  ║
║   │  /architecture   │   │              SEO Infrastructure               │  ║
║   │  ASCII flows     │   │  sitemap.ts · robots.ts · JSON-LD · OG tags  │  ║
║   │  public page     │   └──────────────────────────────────────────────┘  ║
║   └──────────────────┘                                                       ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### Flow 2 — Page Navigation Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              / (Homepage)                                    │
│  ┌────────┐ ┌──────┐ ┌─────────────┐ ┌──────────┐ ┌────────┐ ┌─────────┐ │
│  │  Hero  │ │ Arc  │ │    Now      │ │ Research │ │  Work  │ │Projects │ │
│  │ Stats  │ │Story │ │(Benmore+post│ │  Papers  │ │  CLIs  │ │  Grid   │ │
│  │  CTAs  │ │      │ │            )│ │  PyTorch │ │  GIFs  │ │         │ │
│  └───┬────┘ └──┬───┘ └──────┬──────┘ └────┬─────┘ └───┬────┘ └────┬────┘ │
└──────┼──────────┼────────────┼─────────────┼───────────┼───────────┼──────┘
       │          │            │             │           │           │
       │          ▼            ▼             ▼           ▼           ▼
       │       /about      /writing       /research    /work     /projects
       │
       ▼
  ┌────────────────────────────────────────────────────────────┐
  │  ┌──────────────┐ ┌──────────────────────────────────────┐ │
  │  │  Knowledge   │ │              Writing                  │ │
  │  │  Domains     │ │                                       │ │
  │  │  ┌─────────┐ │ │  /writing ──► /writing/[slug]         │ │
  │  │  │   AI    │ │ │               Article JSON-LD         │ │
  │  │  │ Finance │ │ │               OG image                │ │
  │  │  │  Dist.  │ │ └──────────────────────────────────────┘ │
  │  │  │ Systems │ │                                           │
  │  │  │  Math   │ │                                           │
  │  │  │ Physics │ │                                           │
  │  │  │Software │ │                                           │
  │  │  └────┬────┘ │                                           │
  │  └───────┼──────┘                                           │
  └──────────┼──────────────────────────────────────────────────┘
             │
  /knowledge/[domain] ──► /knowledge/[domain]/[slug]
       Domain hub              Article JSON-LD
       Article list            Full MDX content
```

### Flow 3 — Content Pipeline (MDX → Pages)

```
  content/writing/*.mdx              content/knowledge/[domain]/*.mdx
  ┌─────────────────────┐            ┌─────────────────────────────┐
  │ ---                 │            │ ---                          │
  │ title: "..."        │            │ title: "..."                 │
  │ date: "2026-03-09"  │            │ domain: "ai"                 │
  │ tags: ["AI","HW"]   │            │ description: "..."           │
  │ description: "..."  │            │ resources: [{label, url}]    │
  │ ---                 │            │ ---                          │
  │                     │            │                              │
  │ # MDX content here  │            │ # Deep dive content here     │
  └──────────┬──────────┘            └──────────────┬──────────────┘
             │                                       │
             └───────────────┬───────────────────────┘
                             │
                    lib/content.ts
                    ┌────────────────────────────────────────┐
                    │  getAllWritingPosts()                   │
                    │    → reads content/writing/*.mdx        │
                    │    → parses frontmatter                 │
                    │    → returns PostMeta[]                 │
                    │                                         │
                    │  getWritingPost(slug)                   │
                    │    → reads single file                  │
                    │    → returns { meta, content }          │
                    │                                         │
                    │  getAllKnowledgePosts(domain?)          │
                    │    → reads content/knowledge/**/*.mdx   │
                    │    → returns KnowledgeMeta[]            │
                    │                                         │
                    │  getKnowledgePost(domain, slug)         │
                    │    → returns { meta, content }          │
                    └────────────┬───────────────────────────┘
                                 │
             ┌───────────────────┼───────────────────────┐
             │                   │                       │
             ▼                   ▼                       ▼
    /writing/page.tsx   /writing/[slug]      /knowledge/[domain]/[slug]
    Post index          Article + JSON-LD    Article + JSON-LD
    Tag filters         OG meta              Domain breadcrumb
             │
             └──────────────────────────────────────────────┐
                                                            │
                             app/sitemap.ts                 │
                    ┌──────────────────────────────┐        │
                    │  Static routes (15+)          │        │
                    │  + getAllWritingPosts()        │◄───────┘
                    │  + getAllKnowledgePosts()      │
                    │  → /sitemap.xml               │
                    └──────────────────────────────┘
```

### Flow 4 — SEO Pipeline

```
  ┌──────────────────────────────────────────────────────────────────────┐
  │                         Every Page                                   │
  │                                                                      │
  │  generateMetadata() ──► <head>                                       │
  │  ┌────────────────────────────────────────────────────────────┐     │
  │  │  <title>Arkash Jain — [page-specific suffix]</title>        │     │
  │  │  <meta name="description" content="[unique per page]" />    │     │
  │  │  <meta property="og:title" content="..." />                 │     │
  │  │  <meta property="og:description" content="..." />           │     │
  │  │  <meta property="og:image" content="/og/[page].png" />      │     │
  │  │  <meta property="og:url" content="https://arkashj.com/..." />│    │
  │  │  <meta name="twitter:card" content="summary_large_image" /> │     │
  │  │  <link rel="canonical" href="https://arkashj.com/..." />    │     │
  │  │  <link rel="me" href="https://linkedin.com/in/arkashj/" />  │     │
  │  │  <link rel="me" href="https://github.com/ArkashJ" />        │     │
  │  │  <link rel="me" href="https://arkash.substack.com" />       │     │
  │  └────────────────────────────────────────────────────────────┘     │
  │                                                                      │
  │  <JsonLd> (RSC, zero JS to client)                                   │
  │  ┌────────────────────────────────────────────────────────────┐     │
  │  │  /             → @type: Person                              │     │
  │  │  /research     → @type: ScholarlyArticle (×4 papers)       │     │
  │  │  /writing/slug → @type: Article                            │     │
  │  │  /knowledge/*  → @type: Article                            │     │
  │  └────────────────────────────────────────────────────────────┘     │
  └──────────────────────────────────────────────────────────────────────┘

  app/sitemap.ts                         app/robots.ts
  ┌──────────────────────────────┐       ┌──────────────────────────┐
  │  /                    1.0    │       │  User-agent: *           │
  │  /about               0.9   │       │  Allow: /                │
  │  /research            0.9   │       │  Sitemap:                │
  │  /experience          0.8   │       │  https://arkashj.com/    │
  │  /projects            0.8   │       │  sitemap.xml             │
  │  /work                0.8   │       └──────────────────────────┘
  │  /writing             0.8   │
  │  /writing/[slug] ×N   0.7   │       Google Search Console
  │  /knowledge           0.7   │       ┌──────────────────────────┐
  │  /knowledge/[domain]  0.7   │       │  1. Add property         │
  │  /knowledge/[d]/[s]   0.6   │       │  2. Submit sitemap URL   │
  │  /architecture        0.5   │       │  3. Request indexing on  │
  └──────────────────────────────┘       │     homepage             │
                                         └──────────────────────────┘
```

### Flow 5 — CI/CD Pipeline

```
  Developer
     │
     ├─ writes code
     │
     ├─ git add <files>
     │
     └─ git commit
              │
              └─► .husky/pre-commit
                       │
                       ├─► lint-staged
                       │      ├─ ESLint --fix  (*.ts, *.tsx, *.js, *.jsx)
                       │      ├─ Prettier      (*.ts, *.tsx, *.js, *.jsx,
                       │      │                 *.json, *.md, *.mdx)
                       │      └─ [BLOCKED] if lint errors remain after fix
                       │
                       └─► [PASS] → commit created
                                        │
                                        └─► git push → GitHub
                                                  │
                           ┌──────────────────────┤
                           │                      │
                    Pull Request              Push to main
                           │                      │
                    ci.yml runs           Vercel webhook
                    ┌──────────────┐      ┌──────────────────┐
                    │ 1. pnpm i    │      │ next build       │
                    │ 2. tsc       │      │ Static pages →   │
                    │ 3. eslint    │      │   SSG            │
                    │ 4. vitest    │      │ Dynamic routes → │
                    │ 5. [PASS/   │      │   ISR            │
                    │    BLOCK PR]│      │ Deploy to Edge   │
                    └──────────────┘      └──────────────────┘
```

### Flow 6 — Component Hierarchy

```
  app/layout.tsx
  ├── <Nav>
  │    ├── Logo  "arkash.jain"  ──────────────────────────► /
  │    └── Links
  │         ├── Home      ──────────────────────────────► /
  │         ├── About     ──────────────────────────────► /about
  │         ├── Research  ──────────────────────────────► /research
  │         ├── Work      ──────────────────────────────► /work
  │         ├── Writing   ──────────────────────────────► /writing
  │         └── Knowledge ──────────────────────────────► /knowledge
  │
  ├── {page content}
  │    │
  │    └── components/sections/
  │         ├── <Hero>
  │         │    ├── <StatBadge> "4 Papers"         text-accent font-mono
  │         │    ├── <StatBadge> "Harvard + BU"     text-accent font-mono
  │         │    ├── <StatBadge> "887% Growth"      text-accent font-mono
  │         │    ├── <StatBadge> "3D SSL Pioneer"   text-accent font-mono
  │         │    ├── <Button variant="primary">View My Work</Button>
  │         │    └── <Button variant="ghost">Read My Writing</Button>
  │         │
  │         ├── <LifeChangelog>
  │         │    └── <TimelineItem> ×17
  │         │         ├── <img> avatar (myImg.jpeg)
  │         │         ├── title  (font-bold text-white)
  │         │         ├── <Badge> category   (bg-surface text-muted)
  │         │         ├── date               (text-muted text-sm)
  │         │         ├── description        (text-muted)
  │         │         ├── <StatusBadge>      (Published|Completed|Current|Live)
  │         │         └── progress bar       (bg-primary h-0.5)
  │         │
  │         ├── <PaperCard>
  │         │    ├── title + journal badge
  │         │    ├── authors line
  │         │    ├── abstract excerpt
  │         │    └── <a href={biorxivUrl}> External link
  │         │
  │         ├── <WorkCard>
  │         │    ├── title + tech stack badges
  │         │    ├── description
  │         │    └── <video autoPlay muted loop playsInline>
  │         │         ├── <source src="/demos/x/demo.webm" type="video/webm">
  │         │         └── <source src="/demos/x/demo.mp4"  type="video/mp4">
  │         │
  │         ├── <ThesisTracker>
  │         │    └── <ThesisCard> ×N
  │         │         ├── thesis statement
  │         │         ├── domain tag
  │         │         └── status: Active | Watching | Closed
  │         │
  │         └── <TradeLog>
  │              └── <table>
  │                   └── rows: date · instrument · thesis · outcome
  │
  └── <Footer>
       ├── Page links (all routes)
       ├── Social: GitHub · LinkedIn · Substack · Email
       └── "Built with Next.js · Deployed on Vercel"


  components/ui/  (shared primitives)
  ├── <Button>    variant: "primary" | "ghost" | "outline"
  ├── <Card>      className?: string  (optional teal glow on hover)
  ├── <Badge>     children, variant?: "default" | "teal" | "cyan"
  ├── <Tag>       label: string  (topic tag, writing posts)
  └── <StatBadge> value: string  (neon cyan, font-mono)
```

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `LICENSE` | Apache 2.0 full text |
| Modify | `package.json` | version → `1.0.0`, add scripts, add dev deps |
| Rewrite | `README.md` | Shields.io badges, setup, architecture link |
| Create | `CHANGELOG.md` | Keep-a-Changelog format, v1.0.0 entry |
| Create | `.github/dependabot.yml` | Security alerts only, `open-pull-requests-limit: 0` |
| Create | `.github/workflows/ci.yml` | Lint + typecheck + test on PR |
| Create | `.prettierrc` | Formatting rules |
| Create | `.prettierignore` | Exclude generated files |
| Create | `.editorconfig` | Cross-editor consistency |
| Modify | `.eslintrc.json` | Stricter rules, Prettier integration |
| Modify | `next.config.js` | Security headers, remove `ignoreDuringBuilds` |
| Create | `vercel.json` | Vercel config (headers, rewrites) |
| Create | `.husky/pre-commit` | lint-staged hook |
| Create | `docs/architecture/site-architecture.md` | All 6 ASCII flows saved as reference |
| Create | `pages/architecture.js` | Public `/architecture` page rendering ASCII flows |
| Create | `components/architecture/AsciiDiagram.js` | Styled pre block component |

---

## Task 1 — Apache 2.0 License + version tag

**Files:**
- Create: `LICENSE`
- Modify: `package.json`

- [ ] **Create `LICENSE`**

```
                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship made available under
      the License, as indicated by a copyright notice that is included in
      or attached with the work (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean, as submitted to the Licensor for inclusion
      in the Work by the copyright owner or by an individual or Legal Entity
      authorized to submit on behalf of the copyright owner. For the purposes
      of this definition, "submit" means any form of electronic, verbal, or
      written communication sent to the Licensor or its representatives,
      including but not limited to communication on electronic mailing lists,
      source code control systems, and issue tracking systems that are managed
      by, or on behalf of, the Licensor for the purpose of recording and
      discussing modifications to the Work, but excluding communication that
      is conspicuously marked or designated in writing by the copyright owner
      as "Not a Contribution."

      "Contributor" shall mean Licensor and any Legal Entity on behalf of
      whom a Contribution has been received by the Licensor and included
      within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent contributions
      Licensable by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by the combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a cross-claim
      or counterclaim in a lawsuit) alleging that the Work or any such
      Contribution constitutes direct or contributory patent infringement,
      then any patent and other intellectual property licenses granted to You
      under this License for that Work shall terminate as of the date such
      litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or Derivative
          Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, You must include a readable copy of the
          attribution notices contained within such NOTICE file, in
          at least one of the following places: within a NOTICE text
          file distributed as part of the Derivative Works; within
          the Source form or documentation, if provided along with the
          Derivative Works; or, within a display generated by the
          Derivative Works, if and wherever such third-party notices
          normally appear. The contents of the NOTICE file are for
          informational purposes only and do not modify the License.
          You may add Your own attribution notices within Derivative
          Works that You distribute, alongside or in addition to the
          NOTICE text from the Work, provided that such additional
          attribution notices cannot be construed as modifying the License.

      You may add Your own license statement for Your modifications and
      may provide additional grant of rights to use, reproduce, modify,
      prepare Derivative Works of, convert to and fro, or otherwise
      modify the Work.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or reproducing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or exemplary damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (even if such Contributor has been advised of the possibility
      of such damages), even if such Contributor has been advised of the
      possibility of such damages.

   9. Accepting Warranty or Liability. While redistributing the Work or
      Derivative Works thereof, You may choose to offer, and charge a fee
      for, acceptance of support, warranty, indemnity, or other liability
      obligations and/or rights consistent with this License. However, in
      accepting such obligations, You may offer such conditions only on
      Your own behalf and on behalf of each Contributor, separately from
      any other Contributor, and only if You agree to indemnify, defend,
      and hold each Contributor harmless for any liability incurred by, or
      claims asserted against, such Contributor by reason of your accepting
      any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   Copyright 2026 Arkash Jain

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0
```

- [ ] **Bump version and add scripts in `package.json`**

Replace the existing `package.json` with:

```json
{
  "name": "arkashj-com",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "prepare": "husky"
  },
  "dependencies": {
    "@next/font": "13.1.1",
    "next": "13.1.1",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.13",
    "eslint": "8.30.0",
    "eslint-config-next": "13.1.1",
    "eslint-config-prettier": "^9.1.0",
    "husky": "^9.1.7",
    "lint-staged": "^15.2.10",
    "postcss": "^8.4.20",
    "prettier": "^3.3.3",
    "tailwindcss": "^3.2.4"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "next lint --fix --file",
      "prettier --write"
    ],
    "*.{json,md,mdx,css}": [
      "prettier --write"
    ]
  }
}
```

- [ ] **Install new deps**

```bash
npm install
```

Expected: installs `prettier`, `eslint-config-prettier`, `husky`, `lint-staged` into `node_modules/`.

- [ ] **Tag the legacy site**

```bash
git add LICENSE package.json
git commit -m "chore: Apache 2.0 license, bump to v1.0.0"
git tag -a v1.0.0 -m "v1.0.0 — legacy site snapshot before v2 rebuild"
```

---

## Task 2 — README.md with badges and icons

**Files:**
- Rewrite: `README.md`

- [ ] **Rewrite `README.md`**

```markdown
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

| Layer | Technology |
|---|---|
| Framework | Next.js 13 (Pages Router) → v2: App Router |
| Language | JavaScript → v2: TypeScript strict |
| Styling | Tailwind CSS |
| Content | MDX files in `content/` |
| Deployment | Vercel |
| CI | GitHub Actions |

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
```

- [ ] **Commit**

```bash
git add README.md
git commit -m "docs: rewrite README with badges, stack table, ffmpeg recipes"
```

---

## Task 3 — CHANGELOG.md

**Files:**
- Create: `CHANGELOG.md`

- [ ] **Create `CHANGELOG.md`**

```markdown
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
```

- [ ] **Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: add CHANGELOG.md with v1.0.0 entry and v2.0.0 roadmap"
```

---

## Task 4 — Dependabot (security scanning, no auto-PRs)

**Files:**
- Create: `.github/dependabot.yml`

- [ ] **Create `.github/dependabot.yml`**

```bash
mkdir -p .github
```

```yaml
# .github/dependabot.yml
#
# Configures dependency scanning for security alerts.
# open-pull-requests-limit: 0 disables automatic version-update PRs.
#
# NOTE: Dependabot *security update* PRs (separate from version updates)
# are controlled in GitHub Settings → Security & analysis →
# "Dependabot security updates". Disable that toggle to stop all auto-PRs.

version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "America/Chicago"
    open-pull-requests-limit: 0
    labels:
      - "dependencies"
    commit-message:
      prefix: "chore(deps)"
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-patch"]

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 0
```

- [ ] **Commit**

```bash
git add .github/dependabot.yml
git commit -m "chore: add dependabot config (security scanning, no auto-PRs)"
```

---

## Task 5 — Prettier + EditorConfig

**Files:**
- Create: `.prettierrc`
- Create: `.prettierignore`
- Create: `.editorconfig`

- [ ] **Create `.prettierrc`**

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": []
}
```

- [ ] **Create `.prettierignore`**

```
node_modules/
.next/
out/
public/
*.lock
package-lock.json
docs/architecture/*.md
```

Note: `docs/architecture/*.md` is excluded because Prettier reformats ASCII box-drawing characters destructively.

- [ ] **Create `.editorconfig`**

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.{png,jpg,jpeg,gif,ico,webm,mp4}]
end_of_line = unset
```

- [ ] **Run Prettier across the codebase**

```bash
npx prettier --write "**/*.{js,jsx,json,css,md}" --ignore-path .prettierignore
```

Expected: several files reformatted. Review diff — no logic should change, only formatting.

- [ ] **Commit**

```bash
git add .prettierrc .prettierignore .editorconfig
git add -u
git commit -m "style: add Prettier and EditorConfig, format existing files"
```

---

## Task 6 — ESLint (stricter + Prettier integration)

**Files:**
- Modify: `.eslintrc.json`

- [ ] **Replace `.eslintrc.json`**

```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error",
    "eqeqeq": ["error", "always"],
    "react/self-closing-comp": "warn",
    "react/jsx-no-useless-fragment": "warn"
  }
}
```

The `"prettier"` extend disables ESLint formatting rules that conflict with Prettier.

- [ ] **Run lint to verify no new errors**

```bash
npm run lint
```

Expected: warnings only (no-console, no-unused-vars on existing code), zero errors.

- [ ] **Commit**

```bash
git add .eslintrc.json
git commit -m "chore: tighten ESLint rules, add Prettier integration"
```

---

## Task 7 — Husky + lint-staged pre-commit hook

**Files:**
- Modify: `package.json` (already has lint-staged config from Task 1)
- Create: `.husky/pre-commit`

- [ ] **Initialize Husky**

```bash
npx husky init
```

Expected: creates `.husky/pre-commit` with `npm test` content.

- [ ] **Replace `.husky/pre-commit` content**

```bash
npx lint-staged
```

The file should contain exactly one line: `npx lint-staged`

- [ ] **Test the hook works**

```bash
# Make a trivial change
echo "" >> README.md
git add README.md
git commit -m "test: verify pre-commit hook fires"
```

Expected: lint-staged runs, Prettier formats `README.md`, commit succeeds.

- [ ] **Revert the trivial change**

```bash
git revert HEAD --no-edit
```

---

## Task 8 — `next.config.js` security headers + remove ignoreDuringBuilds

**Files:**
- Modify: `next.config.js`

- [ ] **Replace `next.config.js`**

```js
/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',        value: 'on' },
  { key: 'X-Frame-Options',               value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',        value: 'nosniff' },
  { key: 'Referrer-Policy',               value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',            value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
```

Note: `ignoreDuringBuilds` is intentionally removed — lint errors should block production builds.

- [ ] **Verify build still works**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. Zero errors (warnings are OK for now).

- [ ] **Commit**

```bash
git add next.config.js
git commit -m "chore: security headers, remove ignoreDuringBuilds, enable avif/webp"
```

---

## Task 9 — Vercel CLI + `vercel.json`

**Files:**
- Create: `vercel.json`

- [ ] **Install Vercel CLI globally (if not already installed)**

```bash
npm i -g vercel
vercel --version
```

Expected output: `Vercel CLI X.Y.Z`

- [ ] **Create `vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options",         "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options",  "value": "nosniff" },
        { "key": "Referrer-Policy",         "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/demos/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

- [ ] **Verify Vercel can read the config**

```bash
vercel inspect --confirm 2>/dev/null || echo "Run 'vercel link' first to connect to project"
```

- [ ] **Commit**

```bash
git add vercel.json
git commit -m "chore: add vercel.json with caching and security header config"
```

---

## Task 10 — GitHub Actions CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Create `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  ci:
    name: Lint & Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Check formatting
        run: npm run format:check

      - name: Build
        run: npm run build
```

- [ ] **Commit and push to trigger the workflow**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add GitHub Actions workflow for lint, format check, and build"
git push
```

- [ ] **Verify workflow passes**

Go to `https://github.com/ArkashJ/Personal-Website/actions` — the `CI` workflow should show green on the latest push.

---

## Task 11 — ASCII architecture docs

**Files:**
- Create: `docs/architecture/site-architecture.md`

- [ ] **Create `docs/architecture/site-architecture.md`**

Copy all 6 ASCII flow diagrams from the top of this plan document into `docs/architecture/site-architecture.md` with this header:

```markdown
# arkashj.com — Site Architecture

ASCII flow diagrams for the full website architecture.
Live at: https://www.arkashj.com/architecture

---

[paste Flow 1 through Flow 6 here verbatim]
```

- [ ] **Commit**

```bash
git add docs/architecture/site-architecture.md
git commit -m "docs: add ASCII architecture flows to docs/architecture/"
```

---

## Task 12 — Public `/architecture` page

**Files:**
- Create: `components/architecture/AsciiDiagram.js`
- Create: `pages/architecture.js`

- [ ] **Create `components/architecture/AsciiDiagram.js`**

```jsx
const AsciiDiagram = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-xl font-mono font-bold text-[#30ACA6] mb-4 border-b border-[#2E3656] pb-2">
      {title}
    </h2>
    <pre
      className="
        bg-[#0d1117] text-[#00FFC8] font-mono text-xs leading-relaxed
        overflow-x-auto p-6 rounded-lg border border-[#2E3656]
        whitespace-pre
      "
    >
      {children}
    </pre>
  </section>
)

export default AsciiDiagram
```

- [ ] **Create `pages/architecture.js`**

```jsx
import Head from 'next/head'
import AsciiDiagram from '../components/architecture/AsciiDiagram'

const FLOW_1 = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                          arkashj.com  (v2 target)                           ║
║                      Next.js 15 · TypeScript · Tailwind                     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   ┌─────────────────────────────────────────────────────────────────────┐   ║
║   │                        app/layout.tsx                                │   ║
║   │                                                                      │   ║
║   │   ┌──────────────┐   ┌──────────────────────┐   ┌───────────────┐  │   ║
║   │   │     <Nav>    │   │  <Person JSON-LD>     │   │   <Footer>   │  │   ║
║   │   │  sticky top  │   │  (every page)         │   │  all links   │  │   ║
║   │   └──────────────┘   └──────────────────────┘   └───────────────┘  │   ║
║   └──────────────────────────────────┬──────────────────────────────────┘   ║
║                                      │ {children}                           ║
║          ┌───────────────────────────┼───────────────────────────┐          ║
║          │                           │                           │          ║
║   ┌──────▼──────┐  ┌─────────┐  ┌───▼─────┐  ┌──────────┐  ┌──▼──────┐   ║
║   │      /      │  │ /about  │  │/research│  │/experience│  │/projects│   ║
║   │    Hero     │  │Timeline │  │ Papers  │  │  Cards   │  │  Grid   │   ║
║   │    Stats    │  │Changelog│  │PyTorch  │  │          │  │         │   ║
║   └─────────────┘  └─────────┘  └─────────┘  └──────────┘  └─────────┘   ║
║                                                                              ║
║   ┌─────────┐  ┌──────────────────┐  ┌──────────────────────────────────┐  ║
║   │  /work  │  │    /writing      │  │          /knowledge               │  ║
║   │  CLIs   │  │  ┌────────────┐  │  │  ┌───┐ ┌───────┐ ┌────────────┐ │  ║
║   │  Skills │  │  │   index    │  │  │  │ AI│ │Finance│ │Dist.Systems│ │  ║
║   │  GIFs   │  │  └─────┬──────┘  │  │  └───┘ └───────┘ └────────────┘ │  ║
║   └─────────┘  │  ┌─────▼──────┐  │  │  ┌────┐ ┌───────┐ ┌──────────┐ │  ║
║                │  │[slug]/page │  │  │  │Math│ │Physics│ │ Software │ │  ║
║                │  │MDX+JSON-LD │  │  │  └────┘ └───────┘ └──────────┘ │  ║
║                │  └────────────┘  │  └──────────────────────────────────┘  ║
║                └──────────────────┘                                         ║
║                                                                              ║
║   ┌──────────────────┐   ┌──────────────────────────────────────────────┐  ║
║   │  /architecture   │   │              SEO Infrastructure               │  ║
║   │  ASCII flows     │   │  sitemap.ts · robots.ts · JSON-LD · OG tags  │  ║
║   │  (this page)     │   └──────────────────────────────────────────────┘  ║
║   └──────────────────┘                                                       ║
╚══════════════════════════════════════════════════════════════════════════════╝
`.trim()

const FLOW_2 = `
┌─────────────────────────────────────────────────────────────────────────────┐
│                              / (Homepage)                                    │
│  ┌────────┐ ┌──────┐ ┌─────────────┐ ┌──────────┐ ┌────────┐ ┌─────────┐ │
│  │  Hero  │ │ Arc  │ │    Now      │ │ Research │ │  Work  │ │Projects │ │
│  │ Stats  │ │Story │ │(Benmore+post│ │  Papers  │ │  CLIs  │ │  Grid   │ │
│  │  CTAs  │ │      │ │            )│ │  PyTorch │ │  GIFs  │ │         │ │
│  └───┬────┘ └──┬───┘ └──────┬──────┘ └────┬─────┘ └───┬────┘ └────┬────┘ │
└──────┼──────────┼────────────┼─────────────┼───────────┼───────────┼──────┘
       │          │            │             │           │           │
       │          ▼            ▼             ▼           ▼           ▼
       │       /about      /writing       /research    /work     /projects
       │
       ▼
  ┌────────────────────────────────────────────────────────────┐
  │  ┌──────────────┐ ┌──────────────────────────────────────┐ │
  │  │  Knowledge   │ │              Writing                  │ │
  │  │  Domains     │ │                                       │ │
  │  │  ┌─────────┐ │ │  /writing ──► /writing/[slug]         │ │
  │  │  │   AI    │ │ │               Article JSON-LD         │ │
  │  │  │ Finance │ │ │               OG image                │ │
  │  │  │  Dist.  │ │ └──────────────────────────────────────┘ │
  │  │  │ Systems │ │                                           │
  │  │  │  Math   │ │                                           │
  │  │  │ Physics │ │                                           │
  │  │  │Software │ │                                           │
  │  │  └────┬────┘ │                                           │
  │  └───────┼──────┘                                           │
  └──────────┼──────────────────────────────────────────────────┘
             │
  /knowledge/[domain] ──► /knowledge/[domain]/[slug]
       Domain hub              Article JSON-LD
       Article list            Full MDX content
`.trim()

const FLOW_3 = `
  content/writing/*.mdx              content/knowledge/[domain]/*.mdx
  ┌─────────────────────┐            ┌─────────────────────────────┐
  │ ---                 │            │ ---                          │
  │ title: "..."        │            │ title: "..."                 │
  │ date: "2026-03-09"  │            │ domain: "ai"                 │
  │ tags: ["AI","HW"]   │            │ description: "..."           │
  │ description: "..."  │            │ resources: [{label, url}]    │
  │ ---                 │            │ ---                          │
  │                     │            │                              │
  │ # MDX content here  │            │ # Deep dive content here     │
  └──────────┬──────────┘            └──────────────┬──────────────┘
             │                                       │
             └───────────────┬───────────────────────┘
                             │
                    lib/content.ts
                    ┌────────────────────────────────────────┐
                    │  getAllWritingPosts()                   │
                    │    → reads content/writing/*.mdx        │
                    │    → parses frontmatter                 │
                    │    → returns PostMeta[]                 │
                    │                                         │
                    │  getWritingPost(slug)                   │
                    │    → reads single file                  │
                    │    → returns { meta, content }          │
                    │                                         │
                    │  getAllKnowledgePosts(domain?)          │
                    │    → reads content/knowledge/**/*.mdx   │
                    │    → returns KnowledgeMeta[]            │
                    │                                         │
                    │  getKnowledgePost(domain, slug)         │
                    │    → returns { meta, content }          │
                    └────────────┬───────────────────────────┘
                                 │
             ┌───────────────────┼───────────────────────┐
             │                   │                       │
             ▼                   ▼                       ▼
    /writing/page.tsx   /writing/[slug]      /knowledge/[domain]/[slug]
    Post index          Article + JSON-LD    Article + JSON-LD
    Tag filters         OG meta              Domain breadcrumb
             │
             └──────────────────────────────────────────────┐
                                                            │
                             app/sitemap.ts                 │
                    ┌──────────────────────────────┐        │
                    │  Static routes (15+)          │        │
                    │  + getAllWritingPosts()        │◄───────┘
                    │  + getAllKnowledgePosts()      │
                    │  → /sitemap.xml               │
                    └──────────────────────────────┘
`.trim()

const FLOW_4 = `
  ┌──────────────────────────────────────────────────────────────────────┐
  │                         Every Page                                   │
  │                                                                      │
  │  generateMetadata() ──► <head>                                       │
  │  ┌────────────────────────────────────────────────────────────┐     │
  │  │  <title>Arkash Jain — [page-specific suffix]</title>        │     │
  │  │  <meta name="description" content="[unique per page]" />    │     │
  │  │  <meta property="og:title"       content="..." />           │     │
  │  │  <meta property="og:description" content="..." />           │     │
  │  │  <meta property="og:image"       content="/og/[page].png" />│     │
  │  │  <meta property="og:url"         content="https://..." />   │     │
  │  │  <meta name="twitter:card" content="summary_large_image" /> │     │
  │  │  <link rel="canonical" href="https://arkashj.com/..." />    │     │
  │  │  <link rel="me" href="https://linkedin.com/in/arkashj/" />  │     │
  │  │  <link rel="me" href="https://github.com/ArkashJ" />        │     │
  │  │  <link rel="me" href="https://arkash.substack.com" />       │     │
  │  └────────────────────────────────────────────────────────────┘     │
  │                                                                      │
  │  <JsonLd> (RSC, zero JS to client)                                   │
  │  ┌────────────────────────────────────────────────────────────┐     │
  │  │  /             → @type: Person                              │     │
  │  │  /research     → @type: ScholarlyArticle (×4 papers)       │     │
  │  │  /writing/slug → @type: Article                            │     │
  │  │  /knowledge/*  → @type: Article                            │     │
  │  └────────────────────────────────────────────────────────────┘     │
  └──────────────────────────────────────────────────────────────────────┘

  app/sitemap.ts                         app/robots.ts
  ┌──────────────────────────────┐       ┌──────────────────────────┐
  │  /                    1.0    │       │  User-agent: *           │
  │  /about               0.9   │       │  Allow: /                │
  │  /research            0.9   │       │  Sitemap:                │
  │  /experience          0.8   │       │  https://arkashj.com/    │
  │  /projects            0.8   │       │  sitemap.xml             │
  │  /work                0.8   │       └──────────────────────────┘
  │  /writing             0.8   │
  │  /writing/[slug] ×N   0.7   │
  │  /knowledge/          0.7   │
  │  /knowledge/[d]       0.7   │
  │  /knowledge/[d]/[s]   0.6   │
  │  /architecture        0.5   │
  └──────────────────────────────┘
`.trim()

const FLOW_5 = `
  Developer
     │
     ├─ writes code
     │
     ├─ git add <files>
     │
     └─ git commit
              │
              └─► .husky/pre-commit
                       │
                       └─► lint-staged
                              ├─ ESLint --fix  (*.ts, *.tsx, *.js, *.jsx)
                              ├─ Prettier      (*.ts, *.tsx, *.js, *.jsx,
                              │                 *.json, *.md, *.mdx)
                              └─ [BLOCKED] if lint errors remain after fix
                                                │
                                          [PASS] → commit created
                                                        │
                                                        └─► git push → GitHub
                                                                  │
                                         ┌────────────────────────┤
                                         │                        │
                                  Pull Request              Push to main
                                         │                        │
                                  ci.yml runs           Vercel webhook
                                  ┌──────────────┐      ┌──────────────────┐
                                  │ 1. npm ci    │      │ next build       │
                                  │ 2. eslint    │      │ Static → SSG     │
                                  │ 3. prettier  │      │ Dynamic → ISR    │
                                  │ 4. build     │      │ Deploy to Edge   │
                                  │ 5. [PASS/   │      └──────────────────┘
                                  │    BLOCK PR]│
                                  └──────────────┘
`.trim()

const FLOW_6 = `
  app/layout.tsx
  ├── <Nav>
  │    ├── Logo  "arkash.jain"  ──────────────────────────► /
  │    └── Links
  │         ├── Home      ──────────────────────────────► /
  │         ├── About     ──────────────────────────────► /about
  │         ├── Research  ──────────────────────────────► /research
  │         ├── Work      ──────────────────────────────► /work
  │         ├── Writing   ──────────────────────────────► /writing
  │         └── Knowledge ──────────────────────────────► /knowledge
  │
  └── components/ui/
       ├── <Button>    variant: "primary" | "ghost" | "outline"
       ├── <Card>      optional teal glow on hover
       ├── <Badge>     variant: "default" | "teal" | "cyan"
       ├── <Tag>       topic label for writing posts
       └── <StatBadge> neon cyan · font-mono · large number display

  components/sections/
  ├── <Hero>          stats + CTAs
  ├── <LifeChangelog> vertical timeline · avatar · status badges
  ├── <PaperCard>     title · journal · authors · abstract · link
  ├── <ProjectCard>   name · tech stack · github link
  ├── <WorkCard>      name · <video webm+mp4> · description
  ├── <ThesisTracker> thesis statement · status: Active|Watching|Closed
  └── <TradeLog>      date · instrument · thesis · outcome
`.trim()

export default function Architecture() {
  return (
    <div className="min-h-screen bg-[#1E2340] text-white">
      <Head>
        <title>Site Architecture — Arkash Jain</title>
        <meta
          name="description"
          content="ASCII architecture flows for arkashj.com — page structure, navigation, content pipeline, SEO, CI/CD, and component hierarchy."
        />
      </Head>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-mono text-white mb-3">
            Site Architecture
          </h1>
          <p className="text-[#8892B0] text-lg">
            ASCII flow diagrams for{' '}
            <a
              href="https://www.arkashj.com"
              className="text-[#30ACA6] hover:underline"
            >
              arkashj.com
            </a>{' '}
            · v2 target stack
          </p>
          <p className="text-[#8892B0] text-sm mt-1">
            Source:{' '}
            <code className="text-[#00FFC8] text-xs">
              docs/architecture/site-architecture.md
            </code>
          </p>
        </div>

        <AsciiDiagram title="Flow 1 — Site Architecture Overview">
          {FLOW_1}
        </AsciiDiagram>

        <AsciiDiagram title="Flow 2 — Page Navigation Flow">
          {FLOW_2}
        </AsciiDiagram>

        <AsciiDiagram title="Flow 3 — Content Pipeline (MDX → Pages)">
          {FLOW_3}
        </AsciiDiagram>

        <AsciiDiagram title="Flow 4 — SEO Pipeline">
          {FLOW_4}
        </AsciiDiagram>

        <AsciiDiagram title="Flow 5 — CI/CD Pipeline">
          {FLOW_5}
        </AsciiDiagram>

        <AsciiDiagram title="Flow 6 — Component Hierarchy">
          {FLOW_6}
        </AsciiDiagram>
      </div>
    </div>
  )
}
```

- [ ] **Start dev server and verify the page renders**

```bash
npm run dev
# open http://localhost:3000/architecture
```

Expected: dark page with teal headers, neon cyan ASCII art in monospace terminal blocks. All 6 diagrams visible and horizontally scrollable on narrow viewports.

- [ ] **Commit**

```bash
git add components/architecture/AsciiDiagram.js pages/architecture.js
git commit -m "feat: add public /architecture page with 6 ASCII flow diagrams"
```

---

## Task 13 — Final tag and push

- [ ] **Push all commits**

```bash
git push
git push --tags
```

- [ ] **Verify CI passes on GitHub**

Visit `https://github.com/ArkashJ/Personal-Website/actions` — all jobs green.

- [ ] **Deploy preview**

```bash
vercel
```

Expected: preview URL printed. Open it and verify `/architecture` is live.

- [ ] **Tag the foundation release**

```bash
git tag -a v1.1.0 -m "v1.1.0 — production foundation: tooling, CI, architecture page"
git push --tags
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Apache 2.0 License | Task 1 |
| Version + git tags | Task 1 + Task 13 |
| README with icons/badges | Task 2 |
| ffmpeg recipes documented | Task 2 (README) |
| CHANGELOG.md | Task 3 |
| Dependabot (no auto-PRs) | Task 4 |
| Prettier | Task 5 |
| EditorConfig | Task 5 |
| ESLint (stricter) | Task 6 |
| Husky + lint-staged | Task 7 |
| next.config.js security headers | Task 8 |
| Vercel CLI + vercel.json | Task 9 |
| GitHub Actions CI | Task 10 |
| Thorough ASCII flows | Task 11 (docs) + plan header |
| Public /architecture page | Task 12 |

**Placeholder scan:** None found.

**Type consistency:** No TypeScript in this plan (still on JS). All component props are implicit. No cross-task type mismatches.
