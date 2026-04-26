import Link from 'next/link'
import Card from '../../../components/ui/Card'
import SectionHeader from '../../../components/sections/SectionHeader'
import ThesisTracker from '../../../components/sections/ThesisTracker'
import TradeLog from '../../../components/sections/TradeLog'
import Meta from '../../../components/Meta'
import { KNOWLEDGE_DOMAINS } from '../../../lib/data'
import { THESES, TRADES } from '../../../lib/finance'
import { getAllKnowledgePosts, getKnowledgeDomains } from '../../../lib/content'

export default function KnowledgeDomain({ domain, posts }) {
  if (!domain) {
    return (
      <div className="px-6 py-16 max-w-3xl mx-auto">
        <Card>
          <h1 className="text-2xl font-bold text-white mb-2">Domain not found</h1>
          <Link href="/knowledge" className="text-primary hover:text-accent font-mono">
            ← Back to knowledge
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <Meta
        title={`${domain.name} — Knowledge`}
        description={domain.description}
        path={`/knowledge/${domain.slug}`}
      />

      <Link href="/knowledge" className="text-primary hover:text-accent font-mono text-sm">
        ← Knowledge
      </Link>
      <SectionHeader eyebrow={domain.slug} title={domain.name} description={domain.description} />

      {posts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Articles</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((p) => (
              <Link key={p.slug} href={`/knowledge/${domain.slug}/${p.slug}`}>
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

      {domain.slug === 'finance' && (
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

      {posts.length === 0 && domain.slug !== 'finance' && (
        <Card>
          <p className="text-muted text-sm">
            Articles for <span className="text-primary font-mono">{domain.name}</span> are being
            written. Check back soon.
          </p>
        </Card>
      )}
    </div>
  )
}

export async function getStaticPaths() {
  const fileDomains = getKnowledgeDomains()
  const allSlugs = new Set([...KNOWLEDGE_DOMAINS.map((d) => d.slug), ...fileDomains])
  return {
    paths: Array.from(allSlugs).map((slug) => ({ params: { domain: slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const domain = KNOWLEDGE_DOMAINS.find((d) => d.slug === params.domain) || null
  const posts = getAllKnowledgePosts(params.domain).filter((p) => p.slug !== 'index')
  return { props: { domain, posts } }
}
