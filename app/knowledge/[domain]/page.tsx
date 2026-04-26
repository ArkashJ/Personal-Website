import Link from 'next/link'
import { notFound } from 'next/navigation'
import Card from '@/components/ui/Card'
import SectionHeader from '@/components/sections/SectionHeader'
import ThesisTracker from '@/components/sections/ThesisTracker'
import TradeLog from '@/components/sections/TradeLog'
import { KNOWLEDGE_DOMAINS } from '@/lib/data'
import { THESES, TRADES } from '@/lib/finance'
import { getAllKnowledgePosts, getKnowledgeDomains } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'

export const dynamicParams = false

export async function generateStaticParams() {
  const fileDomains = getKnowledgeDomains()
  const allSlugs = new Set<string>([...KNOWLEDGE_DOMAINS.map((d) => d.slug), ...fileDomains])
  return Array.from(allSlugs).map((slug) => ({ domain: slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params
  const d = KNOWLEDGE_DOMAINS.find((x) => x.slug === domain)
  if (!d) return {}
  return buildMetadata({
    title: `${d.name} — Knowledge`,
    description: d.description,
    path: `/knowledge/${d.slug}`,
  })
}

export default async function KnowledgeDomainPage({
  params,
}: {
  params: Promise<{ domain: string }>
}) {
  const { domain } = await params
  const d = KNOWLEDGE_DOMAINS.find((x) => x.slug === domain)
  if (!d) return notFound()

  const posts = getAllKnowledgePosts(domain).filter((p) => p.slug !== 'index')

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <Link href="/knowledge" className="text-primary hover:text-accent font-mono text-sm">
        ← Knowledge
      </Link>
      <SectionHeader eyebrow={d.slug} title={d.name} description={d.description} />

      {posts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Articles</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((p) => (
              <Link key={p.slug} href={`/knowledge/${d.slug}/${p.slug}`}>
                <Card glow className="h-full cursor-pointer">
                  <p className="text-muted text-xs font-mono mb-2">{p.date}</p>
                  <h3 className="text-white font-bold mb-2">{p.title}</h3>
                  <p className="text-muted text-sm">{p.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {d.slug === 'finance' && (
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">Thesis Tracker</h2>
            <p className="text-muted text-sm mb-6">
              Live theses I&apos;m operating against. Updated when something materially changes.
            </p>
            <ThesisTracker theses={THESES} />
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">Trade Log</h2>
            <p className="text-muted text-sm mb-6">
              Public accountability journal. Tracks the trades, not the size.
            </p>
            <TradeLog trades={TRADES} />
          </section>
        </div>
      )}

      {posts.length === 0 && d.slug !== 'finance' && (
        <Card>
          <p className="text-muted text-sm">
            Articles for <span className="text-primary font-mono">{d.name}</span> are being written.
            Check back soon.
          </p>
        </Card>
      )}
    </div>
  )
}
