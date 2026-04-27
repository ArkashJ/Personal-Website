import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { LEARNINGS } from '@/lib/learnings'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Learnings — Lessons The Hard Way',
  description:
    'A running log of things I have learned the hard way across engineering, research, career, and life.',
  path: '/learnings',
  keywords: ['lessons', 'learnings', 'engineering', 'career', 'hard lessons'],
})

export default function LearningsPage() {
  const sorted = [...LEARNINGS].sort((a, b) => b.year - a.year)

  return (
    <div className="px-6 py-16 max-w-4xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Learnings', path: '/learnings' },
        ])}
      />
      <SectionHeader
        eyebrow="Learnings"
        title="Lessons learned the hard way."
        italicAccent="No platitudes."
        description="A running log of things that cost me something. Reverse chronological."
        asH1
      />

      <div className="grid gap-4 mt-8 reveal">
        {sorted.map((l) => (
          <Card key={l.title} glow>
            <div className="flex items-start justify-between gap-4 mb-3">
              <span className="font-mono text-[11px] text-subtle uppercase tracking-widest">
                {l.year}
              </span>
              <Badge variant="teal">{l.category}</Badge>
            </div>
            <h3 className="text-lg font-bold text-text tracking-tight mb-2">{l.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{l.lesson}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
