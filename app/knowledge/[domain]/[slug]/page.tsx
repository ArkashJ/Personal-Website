import Link from 'next/link'
import { notFound } from 'next/navigation'
import MdxContent from '@/components/MdxContent'
import JsonLd from '@/components/seo/JsonLd'
import { articleSchema } from '@/lib/structured-data'
import { KNOWLEDGE_DOMAINS } from '@/lib/data'
import { getAllKnowledgePosts, getKnowledgePost } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllKnowledgePosts()
    .filter((p) => p.slug !== 'index')
    .map((p) => ({ domain: p.domain, slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>
}) {
  const { domain, slug } = await params
  const post = await getKnowledgePost(domain, slug)
  if (!post) return {}
  return buildMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/knowledge/${domain}/${slug}`,
  })
}

export default async function KnowledgeArticle({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>
}) {
  const { domain, slug } = await params
  const post = await getKnowledgePost(domain, slug)
  if (!post) return notFound()
  const dom = KNOWLEDGE_DOMAINS.find((x) => x.slug === domain)
  const domainName = dom ? dom.name : domain

  return (
    <article className="px-6 py-16 max-w-3xl mx-auto">
      <JsonLd
        data={articleSchema({
          title: post.meta.title,
          description: post.meta.description,
          date: post.meta.date,
          slug: `/knowledge/${domain}/${slug}`,
        })}
      />

      <Link
        href={`/knowledge/${domain}`}
        className="text-primary hover:text-accent font-mono text-sm"
      >
        ← {domainName}
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-text mt-6 mb-3">{post.meta.title}</h1>
      <p className="text-muted text-sm font-mono mb-8">{post.meta.date}</p>

      {post.meta.description && (
        <p className="text-muted text-lg leading-relaxed mb-8">{post.meta.description}</p>
      )}

      {post.source && (
        <div className="prose-custom">
          <MdxContent source={post.source} />
        </div>
      )}
    </article>
  )
}
