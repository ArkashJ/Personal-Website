import Link from 'next/link'
import type { ReactNode } from 'react'
import Pill from '@/components/ui/Pill'
import { buildMetadata } from '@/lib/metadata'
import {
  CiCdDiagram,
  ClientStateDiagram,
  ComponentTreeDiagram,
  ContentPipelineDiagram,
  NavigationFlowDiagram,
  SeoDiagram,
  SiteMapDiagram,
  SkillsLibraryDiagram,
} from '@/components/architecture/Diagrams'

export const metadata = buildMetadata({
  title: 'Site Architecture',
  description:
    'Architecture diagrams for arkashj.com — page structure, navigation, content pipeline, SEO, CI/CD, component hierarchy, skills library, and client state (Zustand + TanStack Query).',
  path: '/architecture',
  keywords: [
    'site architecture',
    'Next.js',
    'app router',
    'CI/CD',
    'content pipeline',
    'component tree',
    'Zustand',
    'TanStack Query',
  ],
})

type DiagramEntry = {
  index: string
  id: string
  title: string
  description: string
  component: ReactNode
  body?: ReactNode
}

const DIAGRAMS: DiagramEntry[] = [
  {
    index: '01',
    id: 'site-map',
    title: 'Site map',
    description: 'Top-level routes served by the App Router.',
    component: <SiteMapDiagram />,
  },
  {
    index: '02',
    id: 'navigation-flow',
    title: 'Navigation flow',
    description: 'Where the homepage links out — entry points to each major section.',
    component: <NavigationFlowDiagram />,
  },
  {
    index: '03',
    id: 'content-pipeline',
    title: 'Content pipeline',
    description: 'MDX files in /content are loaded, parsed, and rendered as static pages.',
    component: <ContentPipelineDiagram />,
  },
  {
    index: '04',
    id: 'seo-pipeline',
    title: 'SEO pipeline',
    description: 'Metadata, OG images, and JSON-LD layered onto every route.',
    component: <SeoDiagram />,
  },
  {
    index: '05',
    id: 'ci-cd',
    title: 'CI/CD pipeline',
    description: 'From local commit through GitHub Actions to a Vercel deploy.',
    component: <CiCdDiagram />,
  },
  {
    index: '06',
    id: 'component-hierarchy',
    title: 'Component hierarchy',
    description: 'How layout, sections, UI primitives, and embeds compose the page tree.',
    component: <ComponentTreeDiagram />,
  },
  {
    index: '07',
    id: 'client-state',
    title: 'Client state — Zustand + TanStack Query',
    description:
      'Two narrow client-state layers wrapped around a server-rendered app: Zustand for transient UI flags, TanStack Query for server-action lifecycle.',
    component: <ClientStateDiagram />,
    body: (
      <p className="text-muted text-sm leading-relaxed max-w-2xl mt-6">
        Almost the entire site is server-rendered. The two exceptions live inside the provider chain
        mounted by <code className="font-mono text-[12px]">app/layout.tsx</code>:{' '}
        <code className="font-mono text-[12px]">ClerkProvider</code> →{' '}
        <code className="font-mono text-[12px]">Providers (QueryClient)</code> →{' '}
        <code className="font-mono text-[12px]">ThemeProvider</code>. A single Zustand store (
        <code className="font-mono text-[12px]">useUiStore</code>) owns the cmdk palette, mobile
        nav, and a generic modal slot — consumed by{' '}
        <code className="font-mono text-[12px]">Nav</code> and{' '}
        <code className="font-mono text-[12px]">CommandPalette</code>. TanStack Query wraps the one
        server action that mutates from the browser: the Clerk-gated weekly editor calls{' '}
        <code className="font-mono text-[12px]">addWeeklyItem</code> through{' '}
        <code className="font-mono text-[12px]">useMutation</code>, giving the form its
        loading/error/success states without hand-rolling reducers.
      </p>
    ),
  },
  {
    index: '08',
    id: 'skills-library',
    title: 'Skills library',
    description:
      '71 Claude Code skills served from flat markdown files via /skills, /skills/[slug], /skills/[slug]/raw, and /skills.json.',
    component: <SkillsLibraryDiagram />,
  },
]

const DiagramSection = ({ entry }: { entry: DiagramEntry }) => (
  <section id={entry.id} className="scroll-mt-20 group">
    <div className="flex items-baseline gap-4 mb-4">
      <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70 shrink-0 pt-1">
        {entry.index}
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-lg md:text-xl font-sans font-semibold text-text leading-tight">
          {entry.title}
        </h2>
        <p className="text-muted text-sm mt-1 max-w-2xl">{entry.description}</p>
      </div>
      <a
        href={`#${entry.id}`}
        className="font-mono text-[10px] uppercase tracking-widest text-subtle hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        aria-label={`Anchor link for ${entry.title}`}
      >
        #
      </a>
    </div>
    <div className="border-l-2 border-border pl-4 md:pl-6 py-2">
      {entry.component}
      {entry.body}
    </div>
  </section>
)

export default function ArchitecturePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="font-mono text-primary text-xs hover:text-accent uppercase tracking-widest"
      >
        ← Home
      </Link>

      <header className="mt-8 mb-10 pb-6 border-b border-border">
        <Pill className="mb-4">Architecture</Pill>
        <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight">
          How this site is built.
        </h1>
        <p className="mt-1 text-2xl md:text-3xl font-bold leading-[1.1] tracking-tight italic text-accent">
          Eight diagrams.
        </p>
        <p className="text-muted text-sm md:text-base leading-relaxed max-w-2xl mt-4">
          Page structure, navigation, content pipeline, SEO, CI/CD, component hierarchy, the public
          skills library, and the client-state layer. The canonical reference for how arkashj.com is
          built.
        </p>
      </header>

      {/* TOC — jump to any diagram */}
      <nav
        aria-label="Diagrams"
        className="mb-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 bg-surface border border-border p-4"
      >
        {DIAGRAMS.map((d) => (
          <a
            key={d.id}
            href={`#${d.id}`}
            className="group flex items-baseline gap-2 px-2 py-1.5 hover:bg-elevated/60 transition-colors"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70 shrink-0">
              {d.index}
            </span>
            <span className="font-mono text-[11px] text-muted group-hover:text-primary transition-colors leading-snug">
              {d.title}
            </span>
          </a>
        ))}
      </nav>

      <div className="space-y-14">
        {DIAGRAMS.map((d) => (
          <DiagramSection key={d.id} entry={d} />
        ))}
      </div>
    </div>
  )
}
