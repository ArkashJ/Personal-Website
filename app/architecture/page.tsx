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
    <div className="min-h-screen bg-bg text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-mono text-white mb-3">Site Architecture</h1>
          <p className="text-muted text-lg">
            ASCII flow diagrams for{' '}
            <a href="https://www.arkashj.com" className="text-primary hover:underline">
              arkashj.com
            </a>
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
