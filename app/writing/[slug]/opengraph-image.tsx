import { renderOg, ogSize, ogContentType } from '@/lib/og'
import { getAllWritingPosts, getWritingPost } from '@/lib/content'

export const runtime = 'nodejs'
export const alt = 'Writing — Arkash Jain'
export const size = ogSize
export const contentType = ogContentType

export async function generateStaticParams() {
  return getAllWritingPosts().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getWritingPost(slug)
  return renderOg({
    eyebrow: post?.meta.tags?.[0] || 'Writing',
    title: post?.meta.title || 'Writing',
    subtitle: post?.meta.description,
  })
}
