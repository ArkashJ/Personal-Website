import { renderOg, ogSize, ogContentType } from '@/lib/og'
import { getAllKnowledgePosts, getKnowledgePost } from '@/lib/content'
import { KNOWLEDGE_DOMAINS } from '@/lib/data'

export const runtime = 'nodejs'
export const alt = 'Knowledge — Arkash Jain'
export const size = ogSize
export const contentType = ogContentType

export async function generateStaticParams() {
  return getAllKnowledgePosts()
    .filter((p) => p.slug !== 'index')
    .map((p) => ({ domain: p.domain, slug: p.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>
}) {
  const { domain, slug } = await params
  const post = await getKnowledgePost(domain, slug)
  const dom = KNOWLEDGE_DOMAINS.find((d) => d.slug === domain)
  return renderOg({
    eyebrow: dom?.name || domain,
    title: post?.meta.title || 'Knowledge',
    subtitle: post?.meta.description,
  })
}
