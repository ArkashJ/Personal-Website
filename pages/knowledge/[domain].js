import { useRouter } from 'next/router'
import Link from 'next/link'
import Card from '../../components/ui/Card'
import SectionHeader from '../../components/sections/SectionHeader'
import { KNOWLEDGE_DOMAINS } from '../../lib/data'

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
    <div className="px-6 py-16 max-w-4xl mx-auto">
      <Link href="/knowledge" className="text-primary hover:text-accent font-mono text-sm">
        ← Knowledge
      </Link>
      <SectionHeader eyebrow={domain.slug} title={domain.name} description={domain.description} />
      <Card>
        <p className="text-muted text-sm">
          Articles for <span className="text-primary font-mono">{domain.name}</span> are being
          ported from the alpha repo. Check back soon.
        </p>
      </Card>
    </div>
  )
}
