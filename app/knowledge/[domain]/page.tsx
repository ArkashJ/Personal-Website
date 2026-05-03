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
  // Adapt grid to article count: single article → single column, multiple → 2-col
  const gridCols = posts.length === 1 ? 'md:grid-cols-1 max-w-2xl' : 'md:grid-cols-2'

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <Link
        href="/knowledge"
        className="font-mono text-primary text-xs hover:text-accent uppercase tracking-widest"
      >
        ← Knowledge
      </Link>
      <SectionHeader eyebrow={d.slug} title={d.name} description={d.description} />

      {d.slug === 'ai' && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text tracking-tight mb-6">Featured deck</h2>
          <Link href="/ai-hardware-stack" className="block">
            <Card glow className="h-full cursor-pointer">
              <p className="font-mono text-[11px] text-subtle uppercase tracking-widest mb-2">
                Interactive · 7 layers · Updated 2026-04-28
              </p>
              <h3 className="text-text font-bold mb-2 tracking-tight">
                The Complete AI Hardware Stack — Layer by Layer
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Self-contained interactive deck: silicon and CoWoS-L packaging up through HBM3e,
                NVLink, InfiniBand, CUDA kernels, and disaggregated prefill/decode serving.
              </p>
            </Card>
          </Link>
        </section>
      )}

      {posts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text tracking-tight mb-6">
            Articles ({posts.length})
          </h2>
          <div className={`grid gap-4 ${gridCols}`}>
            {posts.map((p) => (
              <Link key={p.slug} href={`/knowledge/${d.slug}/${p.slug}`} className="block">
                <Card glow className="h-full cursor-pointer">
                  <p className="font-mono text-[11px] text-subtle uppercase tracking-widest mb-2">
                    {p.date}
                  </p>
                  <h3 className="text-text font-bold mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{p.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {d.slug === 'finance' && (
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-bold text-text tracking-tight mb-2">Thesis Tracker</h2>
            <p className="text-muted text-sm mb-6">
              Live theses I&apos;m operating against. Updated when something materially changes.
            </p>
            <ThesisTracker theses={THESES} />
          </section>
          <section>
            <h2 className="text-xl font-bold text-text tracking-tight mb-2">Trade Log</h2>
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
            Check back soon — or browse{' '}
            <Link href="/writing" className="text-primary hover:text-accent">
              /writing
            </Link>
            .
          </p>
        </Card>
      )}
    </div>
  )
}
