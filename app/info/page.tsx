import SectionHeader from '@/components/sections/SectionHeader'
import JsonLd from '@/components/seo/JsonLd'
import GitChangelog from '@/components/sections/GitChangelog'
import ParsedChangelogList from '@/components/sections/ParsedChangelogList'
import {
  CiCdDiagram,
  ComponentTreeDiagram,
  ContentPipelineDiagram,
  NavigationFlowDiagram,
  SeoDiagram,
  SiteMapDiagram,
  SkillsLibraryDiagram,
} from '@/components/architecture/Diagrams'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { getAllWeeklyLogs } from '@/lib/weekly'
import { getCommitsForWeek, getGitChangelog } from '@/lib/git-changelog'
import type { ReactNode } from 'react'

export const metadata = buildMetadata({
  title: 'How this site is built — Architecture, Flows, Changelog',
  description:
    'Combined info hub for arkashj.com — site architecture diagrams, data flow overview, and the engineering changelog in one place.',
  path: '/info',
  keywords: ['architecture', 'changelog', 'site flows', 'arkash jain', 'next.js', 'app router'],
})

const DiagramSection = ({
  index,
  title,
  description,
  children,
}: {
  index: string
  title: string
  description: string
  children: ReactNode
}) => (
  <section className="mb-10">
    <div className="border-b border-border pb-3 mb-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
        Diagram {index}
      </p>
      <h3 className="text-lg md:text-xl font-sans font-semibold text-text">{title}</h3>
      <p className="text-muted text-sm mt-1 max-w-2xl">{description}</p>
    </div>
    <div className="bg-surface border border-border p-6">{children}</div>
  </section>
)

export default function InfoPage() {
  const latestWeek = getAllWeeklyLogs()[0]
  const allCommits = getGitChangelog()
  const weekCommits = latestWeek ? getCommitsForWeek(latestWeek.weekStart, latestWeek.weekEnd) : []

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Info', path: '/info' },
        ])}
      />

      <div className="px-6 py-16 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Site"
          title="How this site is built"
          italicAccent="architecture · flows · changelog."
          description="One hub: the diagrams that map every route, the data flow that powers MDX → static pages, and the Keep-a-Changelog log of every release."
          asH1
        />

        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2 font-mono text-[11px]">
          <a
            href="#architecture"
            className="px-3 py-1.5 border border-border rounded-full text-muted hover:text-primary hover:border-primary press"
          >
            ● Architecture
          </a>
          <a
            href="#flows"
            className="px-3 py-1.5 border border-border rounded-full text-muted hover:text-primary hover:border-primary press"
          >
            ● Flows
          </a>
          <a
            href="#changelog"
            className="px-3 py-1.5 border border-border rounded-full text-muted hover:text-primary hover:border-primary press"
          >
            ● Changelog
          </a>
        </nav>

        <section id="architecture" className="mt-16 scroll-mt-24">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-6">
            ● Architecture
          </h2>
          <DiagramSection
            index="01"
            title="Site map"
            description="Top-level routes served by the App Router."
          >
            <SiteMapDiagram />
          </DiagramSection>
          <DiagramSection
            index="02"
            title="Navigation flow"
            description="Where the homepage links out — entry points to each major section."
          >
            <NavigationFlowDiagram />
          </DiagramSection>
          <DiagramSection
            index="03"
            title="Content pipeline"
            description="MDX files in /content are loaded, parsed, and rendered as static pages."
          >
            <ContentPipelineDiagram />
          </DiagramSection>
          <DiagramSection
            index="04"
            title="SEO pipeline"
            description="Metadata, OG images, and JSON-LD layered onto every route."
          >
            <SeoDiagram />
          </DiagramSection>
          <DiagramSection
            index="05"
            title="CI/CD pipeline"
            description="From local commit through GitHub Actions to a Vercel deploy."
          >
            <CiCdDiagram />
          </DiagramSection>
          <DiagramSection
            index="06"
            title="Component hierarchy"
            description="How layout, sections, UI primitives, and embeds compose the page tree."
          >
            <ComponentTreeDiagram />
          </DiagramSection>
          <DiagramSection
            index="07"
            title="Skills library"
            description="71 Claude Code skills served from flat markdown files via /skills, /skills/[slug], /skills/[slug]/raw, and /skills.json."
          >
            <SkillsLibraryDiagram />
          </DiagramSection>
        </section>

        <section id="flows" className="mt-20 scroll-mt-24">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-6">
            ● Flows
          </h2>
          <p className="text-muted text-sm md:text-base leading-relaxed max-w-3xl mb-6">
            High-level data flow through the site. Everything is statically rendered at build time
            on Vercel — no runtime database, no client fetching for primary content.
          </p>
          <ul className="space-y-3 text-sm md:text-base text-muted leading-relaxed max-w-3xl">
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 flex-shrink-0">→</span>
              <span>
                <strong className="text-text font-mono text-[13px]">Content (MDX)</strong> — files
                under <code className="font-mono text-[12px]">content/writing/</code>,{' '}
                <code className="font-mono text-[12px]">content/knowledge/</code>,{' '}
                <code className="font-mono text-[12px]">content/weekly/</code>, and{' '}
                <code className="font-mono text-[12px]">content/coursework/</code> are the authoring
                surface.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 flex-shrink-0">→</span>
              <span>
                <strong className="text-text font-mono text-[13px]">lib/ loaders</strong> — typed
                modules (<code className="font-mono text-[12px]">lib/content.ts</code>,{' '}
                <code className="font-mono text-[12px]">lib/weekly.ts</code>,{' '}
                <code className="font-mono text-[12px]">lib/data.ts</code>) parse frontmatter and
                expose strongly-typed records to pages.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 flex-shrink-0">→</span>
              <span>
                <strong className="text-text font-mono text-[13px]">Server components</strong>{' '}
                consume those loaders directly — no client JS for primary content. MDX is rendered
                server-side via <code className="font-mono text-[12px]">next-mdx-remote/rsc</code>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 flex-shrink-0">→</span>
              <span>
                <strong className="text-text font-mono text-[13px]">Static export</strong> — Next
                pre-renders every route at build; Vercel serves the output as edge-cached static
                HTML. Sitemap and OG images are generated at build time.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 flex-shrink-0">→</span>
              <span>
                <strong className="text-text font-mono text-[13px]">Weekly admin → MDX</strong> —
                the local weekly admin appends a new entry into{' '}
                <code className="font-mono text-[12px]">content/weekly/&lt;ISO-week&gt;.mdx</code>;
                the latest log surfaces on the home page automatically.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5 flex-shrink-0">→</span>
              <span>
                <strong className="text-text font-mono text-[13px]">
                  CHANGELOG.md → /changelog
                </strong>{' '}
                — the root <code className="font-mono text-[12px]">CHANGELOG.md</code> is parsed by{' '}
                <code className="font-mono text-[12px]">lib/changelog-md.ts</code> and rendered on{' '}
                <code className="font-mono text-[12px]">/changelog</code> and below; raw git history
                is layered on via <code className="font-mono text-[12px]">GitChangelog</code>.
              </span>
            </li>
          </ul>
        </section>

        <section id="changelog" className="mt-20 scroll-mt-24">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-6">
            ● Changelog
          </h2>
          <ParsedChangelogList />
          <GitChangelog weekCommits={weekCommits} allCommits={allCommits} />
        </section>
      </div>
    </>
  )
}
