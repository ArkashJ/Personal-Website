import Link from 'next/link'
import Card from '../../../components/ui/Card'
import MdxContent from '../../../components/MdxContent'
import JsonLd, { articleSchema } from '../../../components/seo/JsonLd'
import Meta from '../../../components/Meta'
import { KNOWLEDGE_DOMAINS } from '../../../lib/data'
import { getAllKnowledgePosts, getKnowledgePost } from '../../../lib/content'

export default function KnowledgeArticle({ meta, mdxSource, domainName }) {
  if (!meta) {
    return (
      <div className="px-6 py-16 max-w-3xl mx-auto">
        <Card>
          <h1 className="text-2xl font-bold text-white mb-2">Article not found</h1>
          <Link href="/knowledge" className="text-primary hover:text-accent font-mono">
            ← Knowledge
          </Link>
        </Card>
      </div>
    )
  }

  const path = `/knowledge/${meta.domain}/${meta.slug}`
  return (
    <article className="px-6 py-16 max-w-3xl mx-auto">
      <Meta title={meta.title} description={meta.description} path={path} />
      <JsonLd data={articleSchema({ ...meta, slug: path })} />

      <Link
        href={`/knowledge/${meta.domain}`}
        className="text-primary hover:text-accent font-mono text-sm"
      >
        ← {domainName}
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-3">{meta.title}</h1>
      <p className="text-muted text-sm font-mono mb-8">{meta.date}</p>

      {meta.description && (
        <p className="text-muted text-lg leading-relaxed mb-8">{meta.description}</p>
      )}

      {mdxSource && (
        <div className="prose-custom">
          <MdxContent source={mdxSource} />
        </div>
      )}
    </article>
  )
}

export async function getStaticPaths() {
  const posts = getAllKnowledgePosts().filter((p) => p.slug !== 'index')
  return {
    paths: posts.map((p) => ({ params: { domain: p.domain, slug: p.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = await getKnowledgePost(params.domain, params.slug)
  if (!post) return { notFound: true }
  const dom = KNOWLEDGE_DOMAINS.find((d) => d.slug === params.domain)
  return {
    props: {
      meta: post.meta,
      mdxSource: post.mdxSource,
      domainName: dom ? dom.name : params.domain,
    },
  }
}
