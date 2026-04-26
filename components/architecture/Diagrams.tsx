import type { ReactNode } from 'react'

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
/* ------------------------------------------------------------------ */

const Node = ({
  children,
  tone = 'default',
  className = '',
}: {
  children: ReactNode
  tone?: 'default' | 'teal' | 'cyan' | 'muted'
  className?: string
}) => {
  const tones: Record<string, string> = {
    default: 'bg-elevated border-border text-text',
    teal: 'bg-primary/5 border-primary/40 text-primary',
    cyan: 'bg-accent/5 border-accent/40 text-accent',
    muted: 'bg-surface border-border text-muted',
  }
  return (
    <div
      className={`inline-flex items-center justify-center px-3 py-2 border font-mono text-[11px] whitespace-nowrap ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  )
}

const Connector = ({ direction = 'h' }: { direction?: 'h' | 'v' }) =>
  direction === 'h' ? (
    <div className="flex-1 h-px bg-border-strong min-w-[16px]" aria-hidden />
  ) : (
    <div className="w-px h-4 bg-border-strong mx-auto" aria-hidden />
  )

const Label = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[10px] uppercase tracking-widest text-subtle mb-3">{children}</p>
)

/* ------------------------------------------------------------------ */
/* 1. Site map                                                         */
/* ------------------------------------------------------------------ */

const PAGES = [
  '/about',
  '/research',
  '/experience',
  '/projects',
  '/work',
  '/writing',
  '/media',
  '/knowledge',
  '/architecture',
  '/stack',
  '/learnings',
]

export const SiteMapDiagram = () => (
  <div className="w-full">
    <Label>Page tree</Label>
    <div className="flex flex-col items-center">
      <Node tone="teal" className="px-6 py-3 text-sm">
        /
      </Node>
      <div className="w-px h-6 bg-border-strong" aria-hidden />
      <div className="w-full max-w-3xl h-px bg-border-strong" aria-hidden />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-border mt-0 w-full max-w-3xl border border-border">
        {PAGES.map((p) => (
          <div
            key={p}
            className="bg-surface px-3 py-3 font-mono text-[11px] text-muted hover:text-primary transition-colors"
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  </div>
)

/* ------------------------------------------------------------------ */
/* 2. Navigation flow                                                  */
/* ------------------------------------------------------------------ */

const NAV_TARGETS = [
  '/about',
  '/research',
  '/work',
  '/projects',
  '/writing',
  '/knowledge',
  '/media',
]

export const NavigationFlowDiagram = () => (
  <div className="w-full">
    <Label>Homepage sections → linked pages</Label>
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6">
      <div className="flex justify-center">
        <div className="border border-primary/40 bg-primary/5 px-5 py-4 text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">Home</p>
          <p className="font-sans text-text text-sm">Hero · Stats · CTAs</p>
        </div>
      </div>
      <div className="hidden md:flex flex-col items-center justify-center">
        <svg width="80" height="200" viewBox="0 0 80 200" aria-hidden>
          {NAV_TARGETS.map((_, i) => {
            const y = (i + 0.5) * (200 / NAV_TARGETS.length)
            return (
              <g key={i} stroke="#404040" strokeWidth="1" fill="none">
                <path d={`M 0 100 C 30 100, 50 ${y}, 80 ${y}`} />
                <circle cx="80" cy={y} r="2" fill="#5EEAD4" />
              </g>
            )
          })}
        </svg>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
        {NAV_TARGETS.map((p) => (
          <Node key={p} tone="default" className="justify-start">
            {p}
          </Node>
        ))}
      </div>
    </div>
  </div>
)

/* ------------------------------------------------------------------ */
/* 3. Content pipeline                                                 */
/* ------------------------------------------------------------------ */

export const ContentPipelineDiagram = () => {
  const cols: { title: string; items: { label: string; tone?: 'default' | 'teal' | 'cyan' }[] }[] =
    [
      {
        title: 'Source',
        items: [{ label: 'content/writing/*.mdx' }, { label: 'content/knowledge/[domain]/*.mdx' }],
      },
      {
        title: 'Loader',
        items: [
          { label: 'lib/content.ts', tone: 'teal' },
          { label: 'gray-matter + serialize', tone: 'teal' },
        ],
      },
      {
        title: 'Output',
        items: [
          { label: 'app/[route]/page.tsx', tone: 'cyan' },
          { label: 'generateStaticParams()', tone: 'cyan' },
          { label: '/sitemap.xml', tone: 'cyan' },
        ],
      },
    ]
  return (
    <div className="w-full overflow-x-auto">
      <Label>MDX → loader → static pages</Label>
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 min-w-[640px]">
        {cols.map((col, ci) => (
          <div key={col.title} className="contents">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                {col.title}
              </p>
              {col.items.map((it) => (
                <Node key={it.label} tone={it.tone}>
                  {it.label}
                </Node>
              ))}
            </div>
            {ci < cols.length - 1 && (
              <div className="flex items-center justify-center text-subtle">
                <svg width="32" height="14" viewBox="0 0 32 14" aria-hidden>
                  <line x1="0" y1="7" x2="26" y2="7" stroke="#404040" strokeWidth="1" />
                  <polyline points="22,3 30,7 22,11" stroke="#404040" strokeWidth="1" fill="none" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 4. SEO pipeline                                                     */
/* ------------------------------------------------------------------ */

export const SeoDiagram = () => (
  <div className="w-full">
    <Label>Per-page metadata layers</Label>
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] items-stretch gap-6">
      <div className="border border-border bg-surface p-4 flex flex-col justify-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
          Every page
        </p>
        <p className="font-sans text-text text-sm leading-snug">
          app/<span className="font-mono">[route]</span>/page.tsx
        </p>
      </div>
      <div className="hidden md:flex items-center justify-center text-subtle font-mono text-xs">
        →
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
        {[
          { label: 'generateMetadata()', sub: 'title · description · canonical' },
          { label: 'opengraph-image', sub: 'OG · Twitter card' },
          { label: '<JsonLd> Person', sub: 'global identity' },
          { label: 'Article JSON-LD', sub: '/writing · /knowledge' },
          { label: 'ScholarlyArticle', sub: '/research papers' },
          { label: '<link rel="me">', sub: 'identity verification' },
        ].map((row) => (
          <div key={row.label} className="bg-surface p-3">
            <p className="font-mono text-[11px] text-text">{row.label}</p>
            <p className="font-mono text-[10px] text-subtle mt-1">{row.sub}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

/* ------------------------------------------------------------------ */
/* 5. CI/CD pipeline                                                   */
/* ------------------------------------------------------------------ */

const Pill = ({
  step,
  label,
  sub,
  tone = 'default',
}: {
  step: string
  label: string
  sub?: string
  tone?: 'default' | 'teal' | 'cyan'
}) => {
  const tones: Record<string, string> = {
    default: 'border-border bg-surface',
    teal: 'border-primary/40 bg-primary/5',
    cyan: 'border-accent/40 bg-accent/5',
  }
  return (
    <div className={`border ${tones[tone]} p-3 min-w-[140px]`}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-subtle mb-1">{step}</p>
      <p className="font-mono text-[11px] text-text">{label}</p>
      {sub && <p className="font-mono text-[10px] text-muted mt-1">{sub}</p>}
    </div>
  )
}

export const CiCdDiagram = () => {
  const steps: {
    step: string
    label: string
    sub?: string
    tone?: 'default' | 'teal' | 'cyan'
  }[] = [
    { step: '01', label: 'git commit', sub: 'local' },
    { step: '02', label: 'husky pre-commit', sub: 'lint-staged · prettier', tone: 'teal' },
    { step: '03', label: 'git push', sub: 'origin' },
    { step: '04', label: 'GitHub Actions', sub: 'lint · format:check · build', tone: 'teal' },
    { step: '05', label: 'Vercel deploy', sub: 'preview / prod', tone: 'cyan' },
  ]
  return (
    <div className="w-full overflow-x-auto">
      <Label>Local → remote → deploy</Label>
      <div className="flex items-stretch gap-2 min-w-[720px]">
        {steps.map((s, i) => (
          <div key={s.step} className="contents">
            <Pill {...s} />
            {i < steps.length - 1 && (
              <div className="flex items-center justify-center text-subtle font-mono text-xs px-1">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 6. Component tree                                                   */
/* ------------------------------------------------------------------ */

type TreeNode = {
  label: string
  tone?: 'default' | 'teal' | 'cyan' | 'muted'
  children?: TreeNode[]
}

const TREE: TreeNode = {
  label: 'app/layout.tsx',
  tone: 'teal',
  children: [
    { label: '<Nav>', children: [{ label: 'sticky · active-route highlight', tone: 'muted' }] },
    { label: '<main>{children}</main>' },
    { label: '<Footer>', children: [{ label: 'site map · social', tone: 'muted' }] },
    { label: '<JsonLd> Person', tone: 'cyan' },
  ],
}

const SECTIONS: TreeNode = {
  label: 'components/sections/',
  tone: 'teal',
  children: [
    { label: '<Hero>' },
    { label: '<PaperCard>' },
    { label: '<ProjectCard>' },
    { label: '<ExperienceCard>' },
    { label: '<TimelineItem>' },
    { label: '<ThesisTracker>' },
    { label: '<TradeLog>' },
  ],
}

const UI: TreeNode = {
  label: 'components/ui/',
  tone: 'teal',
  children: [
    { label: '<Button>' },
    { label: '<Card>' },
    { label: '<Badge>' },
    { label: '<StatBadge>' },
  ],
}

const EMBEDS: TreeNode = {
  label: 'components/embeds/',
  tone: 'teal',
  children: [{ label: '<MdxContent>' }, { label: '<JsonLd>' }, { label: 'react-tweet' }],
}

const TreeBranch = ({
  node,
  depth = 0,
  last = true,
}: {
  node: TreeNode
  depth?: number
  last?: boolean
}) => {
  const toneText: Record<string, string> = {
    default: 'text-text',
    teal: 'text-primary',
    cyan: 'text-accent',
    muted: 'text-subtle',
  }
  const tone = node.tone ?? 'default'
  return (
    <div>
      <div className="flex items-start font-mono text-[12px]">
        <span className="text-subtle whitespace-pre">
          {depth === 0 ? '' : '  '.repeat(depth - 1) + (last ? '└─ ' : '├─ ')}
        </span>
        <span className={toneText[tone]}>{node.label}</span>
      </div>
      {node.children?.map((c, i) => (
        <TreeBranch
          key={c.label}
          node={c}
          depth={depth + 1}
          last={i === (node.children?.length ?? 0) - 1}
        />
      ))}
    </div>
  )
}

export const ComponentTreeDiagram = () => (
  <div className="w-full">
    <Label>Layout · sections · UI · embeds</Label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
      {[TREE, SECTIONS, UI, EMBEDS].map((root) => (
        <div key={root.label} className="bg-surface p-4">
          <TreeBranch node={root} />
        </div>
      ))}
    </div>
  </div>
)
