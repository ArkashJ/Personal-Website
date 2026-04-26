// ASCII diagrams kept as-is from the v1 implementation.
// See docs/architecture/site-architecture.md for the canonical source.

export const FLOW_1 = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                          arkashj.com  (v2 target)                           ║
║                      Next.js 15 · TypeScript · Tailwind                     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   app/layout.tsx                                                             ║
║     └─ <Nav>  <Person JSON-LD>  <Footer>                                     ║
║                                                                              ║
║   /  /about  /research  /experience  /projects  /work  /writing  /knowledge  ║
║                                                                              ║
║   /writing/[slug]  /knowledge/[domain]  /knowledge/[domain]/[slug]           ║
║                                                                              ║
║   /architecture   sitemap.ts · robots.ts · JSON-LD on every page             ║
╚══════════════════════════════════════════════════════════════════════════════╝
`.trim()

export const FLOW_2 = `
/ (Homepage)
├─ Hero · Stats · CTAs
├─ Arc → /about
├─ Now → /writing
├─ Research → /research
├─ Work → /work
├─ Projects → /projects
├─ Knowledge pills → /knowledge
└─ Recent posts → /writing

/knowledge → /knowledge/[domain] → /knowledge/[domain]/[slug]
/writing  → /writing/[slug]
`.trim()

export const FLOW_3 = `
content/writing/*.mdx              content/knowledge/[domain]/*.mdx
       │                                       │
       └────────── lib/content.ts (gray-matter + serialize) ──────────┘
                                  │
                         App Router pages
                         (generateStaticParams + generateMetadata)
                                  │
                       app/sitemap.ts (dynamic routes)
`.trim()

export const FLOW_4 = `
Every page
  ├─ generateMetadata() → <head> title + OG + canonical
  ├─ <link rel="me"> → identity verification (LinkedIn, GitHub, Substack)
  └─ <JsonLd>
       /                  → Person
       /research          → ScholarlyArticle (×4 papers)
       /writing/[slug]    → Article
       /knowledge/...     → Article

app/sitemap.ts → static + dynamic MDX routes
app/robots.ts  → allow all + sitemap pointer
`.trim()

export const FLOW_5 = `
git commit
  └─► .husky/pre-commit
        └─► lint-staged (eslint --fix + prettier)
              └─► commit created
                    └─► git push
                          ├─ Pull Request → CI: lint + format + build
                          └─ Push to main → Vercel deploy
`.trim()

export const FLOW_6 = `
app/layout.tsx
├── <Nav>          (sticky, active-route highlight)
├── <main>{children}</main>
└── <Footer>       (site map, social, /architecture link)

components/ui/
├── <Button>    primary | ghost | outline
├── <Card>      glow on hover
├── <Badge>     default | teal | cyan | green
└── <StatBadge> neon cyan, font-mono

components/sections/
├── <Hero>          stats + CTAs
├── <PaperCard>     journal · authors · abstract · link
├── <ProjectCard>   year · tech stack · github
├── <ExperienceCard> org · role · dates · bullets
├── <TimelineItem>  Life Changelog entry
├── <ThesisTracker> investment thesis cards
└── <TradeLog>      public trade table

components/MdxContent.tsx — themed MDX renderer
components/seo/JsonLd.tsx  — structured-data injector
`.trim()
