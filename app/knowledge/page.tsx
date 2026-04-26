import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import { KNOWLEDGE_DOMAINS } from '@/lib/data'
import { getAllKnowledgePosts } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Knowledge — Second Brain · AI, Finance, Physics, Math',
  description:
    'Notes and essays organized by domain: AI, Finance, Distributed Systems, Math, Physics, Software.',
  path: '/knowledge',
})

export default function KnowledgeHub() {
  const posts = getAllKnowledgePosts().filter((p) => p.slug !== 'index')
  const counts = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.domain] = (acc[p.domain] || 0) + 1
    return acc
  }, {})

  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Knowledge"
        title="Second brain, in public"
        description="Domains I think about. Each domain links to deep dives, notes, and worked examples."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {KNOWLEDGE_DOMAINS.map((d) => {
          const count = counts[d.slug] || 0
          return (
            <Link key={d.slug} href={`/knowledge/${d.slug}`}>
              <Card glow className="h-full cursor-pointer">
                <h3 className="text-2xl font-bold text-white mb-2">{d.name}</h3>
                <p className="text-muted text-sm mb-4 leading-relaxed">{d.description}</p>
                <p className="font-mono text-xs text-primary">
                  {count} article{count === 1 ? '' : 's'} →
                </p>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
