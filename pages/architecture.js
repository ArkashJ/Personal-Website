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
          <h1 className="text-4xl font-bold font-mono text-white mb-3">Site Architecture</h1>
          <p className="text-[#8892B0] text-lg">
            ASCII flow diagrams for{' '}
            <a href="https://www.arkashj.com" className="text-[#30ACA6] hover:underline">
              arkashj.com
            </a>{' '}
            · v2 target stack
          </p>
          <p className="text-[#8892B0] text-sm mt-1">
            Source:{' '}
            <code className="text-[#00FFC8] text-xs">docs/architecture/site-architecture.md</code>
          </p>
        </div>

        <AsciiDiagram title="Flow 1 — Site Architecture Overview">{FLOW_1}</AsciiDiagram>
        <AsciiDiagram title="Flow 2 — Page Navigation Flow">{FLOW_2}</AsciiDiagram>
        <AsciiDiagram title="Flow 3 — Content Pipeline (MDX → Pages)">{FLOW_3}</AsciiDiagram>
        <AsciiDiagram title="Flow 4 — SEO Pipeline">{FLOW_4}</AsciiDiagram>
        <AsciiDiagram title="Flow 5 — CI/CD Pipeline">{FLOW_5}</AsciiDiagram>
        <AsciiDiagram title="Flow 6 — Component Hierarchy">{FLOW_6}</AsciiDiagram>
      </div>
    </div>
  )
}
