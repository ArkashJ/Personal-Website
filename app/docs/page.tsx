import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { getDocsByCategory, type DocEntry } from '@/lib/docs'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Docs — Project Documentation',
  description:
    'How arkashj.com works: handoff, open work, design spec, plans, changelog. The proper analog of API docs for a static content site.',
  path: '/docs',
  keywords: ['documentation', 'project docs', 'handoff', 'changelog'],
})

const CATEGORY_ORDER: DocEntry['category'][] = [
  'Getting Started',
  'Reference',
  'Planning',
  'Releases',
]

export default function DocsHub() {
  const byCategory = getDocsByCategory()
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Docs', path: '/docs' },
        ])}
      />
      <SectionHeader
        eyebrow="Docs"
        title="Project documentation."
        italicAccent="How this site is built."
        description="Handoff, open work, design spec, plans, changelog. (No Swagger — this is a content site, not an API. The right analog is rendered project markdown.)"
        asH1
      />

      <div className="space-y-12 mt-8">
        {CATEGORY_ORDER.filter((cat) => byCategory[cat]?.length).map((cat) => (
          <section key={cat}>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4 pb-2 border-b border-border">
              {cat}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 reveal">
              {byCategory[cat].map((d) => (
                <Link key={d.slug} href={`/docs/${d.slug}`} className="block">
                  <Card glow className="h-full">
                    <h3 className="text-text font-bold tracking-tight mb-2">{d.title}</h3>
                    <p className="font-mono text-[11px] text-subtle uppercase tracking-widest">
                      {d.path}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
