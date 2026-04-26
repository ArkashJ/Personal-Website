import Link from 'next/link'
import type { ReactNode } from 'react'
import Pill from '@/components/ui/Pill'
import { buildMetadata } from '@/lib/metadata'
import {
  CiCdDiagram,
  ComponentTreeDiagram,
  ContentPipelineDiagram,
  NavigationFlowDiagram,
  SeoDiagram,
  SiteMapDiagram,
} from '@/components/architecture/Diagrams'

export const metadata = buildMetadata({
  title: 'Site Architecture',
  description:
    'Architecture diagrams for arkashj.com — page structure, navigation, content pipeline, SEO, CI/CD, and component hierarchy.',
  path: '/architecture',
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
      <h2 className="text-lg md:text-xl font-sans font-semibold text-text">{title}</h2>
      <p className="text-muted text-sm mt-1 max-w-2xl">{description}</p>
    </div>
    <div className="bg-surface border border-border p-6">{children}</div>
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
      <div className="mt-8 mb-12 pb-6 border-b border-border">
        <Pill className="mb-4">Architecture</Pill>
        <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight">
          How this site is built.
        </h1>
        <p className="mt-1 text-2xl md:text-3xl font-bold leading-[1.1] tracking-tight italic text-accent">
          Six diagrams.
        </p>
        <p className="text-muted text-sm md:text-base leading-relaxed max-w-2xl mt-4">
          Page structure, navigation, content pipeline, SEO, CI/CD, and component hierarchy. The
          canonical reference for how arkashj.com is built.
        </p>
      </div>

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
    </div>
  )
}
