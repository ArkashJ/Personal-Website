import { renderOg, ogSize, ogContentType } from '@/lib/og'
import { KNOWLEDGE_DOMAINS } from '@/lib/data'
import { getKnowledgeDomains } from '@/lib/content'

export const runtime = 'nodejs'
export const alt = 'Knowledge Domain — Arkash Jain'
export const size = ogSize
export const contentType = ogContentType

export async function generateStaticParams() {
  const fileDomains = getKnowledgeDomains()
  const allSlugs = new Set<string>([...KNOWLEDGE_DOMAINS.map((d) => d.slug), ...fileDomains])
  return Array.from(allSlugs).map((slug) => ({ domain: slug }))
}

export default async function Image({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params
  const dom = KNOWLEDGE_DOMAINS.find((d) => d.slug === domain)
  return renderOg({
    eyebrow: 'Knowledge',
    title: dom?.name || domain,
    subtitle: dom?.description,
  })
}
