import Link from 'next/link'
import { notFound } from 'next/navigation'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import MdxContent from '@/components/MdxContent'
import JsonLd from '@/components/seo/JsonLd'
import { articleSchema } from '@/lib/structured-data'
import { getAllWritingPosts, getWritingPost } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllWritingPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getWritingPost(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/writing/${slug}`,
  })
}

export default async function WritingPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getWritingPost(slug)
  if (!post) return notFound()

  return (
    <article className="px-6 py-16 max-w-3xl mx-auto">
      <JsonLd
        data={articleSchema({
          title: post.meta.title,
          description: post.meta.description,
          date: post.meta.date,
          slug: `/writing/${post.meta.slug}`,
        })}
      />

      <Link href="/writing" className="text-primary hover:text-accent font-mono text-sm">
        ← Writing
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-3">{post.meta.title}</h1>
      <p className="text-muted text-sm font-mono mb-2">{post.meta.date}</p>
      <div className="flex flex-wrap gap-1.5 mb-8">
        {(post.meta.tags || []).map((t) => (
          <Badge key={t} variant="teal">
            {t}
          </Badge>
        ))}
      </div>

      <p className="text-muted text-lg leading-relaxed mb-8">{post.meta.description}</p>

      {post.source ? (
        <div className="prose-custom">
          <MdxContent source={post.source} />
        </div>
      ) : (
        <Card>
          <p className="text-muted text-sm">Full essay coming soon.</p>
        </Card>
      )}
    </article>
  )
}
