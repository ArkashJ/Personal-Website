import { NextResponse } from 'next/server'
import matter from 'gray-matter'
import { getAllWritingPosts, getWritingPost } from '@/lib/content'

export function generateStaticParams() {
  return getAllWritingPosts().map((p) => ({ slug: p.slug }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getWritingPost(slug)
  if (!post) return new NextResponse('Not found', { status: 404 })
  const body = matter.stringify(post.source, post.meta as unknown as Record<string, unknown>)
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
