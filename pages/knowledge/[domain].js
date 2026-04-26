import { useRouter } from 'next/router'
import Link from 'next/link'
import Card from '../../components/ui/Card'
import SectionHeader from '../../components/sections/SectionHeader'
import ThesisTracker from '../../components/sections/ThesisTracker'
import TradeLog from '../../components/sections/TradeLog'
import { KNOWLEDGE_DOMAINS } from '../../lib/data'
import { THESES, TRADES } from '../../lib/finance'

export default function KnowledgeDomain() {
  const router = useRouter()
  const domain = KNOWLEDGE_DOMAINS.find((d) => d.slug === router.query.domain)

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
      <Link href="/knowledge" className="text-primary hover:text-accent font-mono text-sm">
        ← Knowledge
      </Link>
      <SectionHeader eyebrow={domain.slug} title={domain.name} description={domain.description} />

      {domain.slug === 'finance' ? (
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
      ) : (
        <Card>
          <p className="text-muted text-sm">
            Articles for <span className="text-primary font-mono">{domain.name}</span> are being
            ported from the alpha repo. Check back soon.
          </p>
        </Card>
      )}
    </div>
  )
}
