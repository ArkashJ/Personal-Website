import Link from 'next/link'
import AsciiDiagram from '@/components/architecture/AsciiDiagram'
import { buildMetadata } from '@/lib/metadata'
import { FLOW_1, FLOW_2, FLOW_3, FLOW_4, FLOW_5, FLOW_6 } from './flows'

export const metadata = buildMetadata({
  title: 'Site Architecture',
  description:
    'ASCII architecture flows for arkashj.com — page structure, navigation, content pipeline, SEO, CI/CD, and component hierarchy.',
  path: '/architecture',
})

export default function ArchitecturePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="font-mono text-primary text-xs hover:text-accent uppercase tracking-widest"
      >
        ← Home
      </Link>
      <div className="mt-8 mb-12 pb-4 border-b border-border">
        <p className="font-mono text-primary text-[11px] uppercase tracking-widest mb-2">
          Architecture
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight mb-3">
          Site Architecture
        </h1>
        <p className="text-muted text-sm leading-relaxed max-w-2xl">
          Six ASCII flow diagrams covering page structure, navigation, content pipeline, SEO, CI/CD,
          and component hierarchy. The canonical reference for how arkashj.com is built.
        </p>
      </div>

      <AsciiDiagram title="Flow 1 — Site Architecture Overview">{FLOW_1}</AsciiDiagram>
      <AsciiDiagram title="Flow 2 — Page Navigation Flow">{FLOW_2}</AsciiDiagram>
      <AsciiDiagram title="Flow 3 — Content Pipeline (MDX → Pages)">{FLOW_3}</AsciiDiagram>
      <AsciiDiagram title="Flow 4 — SEO Pipeline">{FLOW_4}</AsciiDiagram>
      <AsciiDiagram title="Flow 5 — CI/CD Pipeline">{FLOW_5}</AsciiDiagram>
      <AsciiDiagram title="Flow 6 — Component Hierarchy">{FLOW_6}</AsciiDiagram>
    </div>
  )
}
