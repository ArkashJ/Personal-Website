import Link from 'next/link'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import MdxContent from '../../components/MdxContent'
import JsonLd, { articleSchema } from '../../components/seo/JsonLd'
import Meta from '../../components/Meta'
import { getAllWritingPosts, getWritingPost } from '../../lib/content'

export default function WritingPost({ meta, mdxSource }) {
  if (!meta) {
    return (
      <div className="px-6 py-16 max-w-3xl mx-auto">
        <Card>
          <h1 className="text-2xl font-bold text-white mb-2">Post not found</h1>
          <Link href="/writing" className="text-primary hover:text-accent font-mono">
            ← Back to writing
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <article className="px-6 py-16 max-w-3xl mx-auto">
      <Meta title={meta.title} description={meta.description} path={`/writing/${meta.slug}`} />
      <JsonLd
        data={articleSchema({
          ...meta,
          slug: `/writing/${meta.slug}`,
        })}
      />

      <Link href="/writing" className="text-primary hover:text-accent font-mono text-sm">
        ← Writing
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-3">{meta.title}</h1>
      <p className="text-muted text-sm font-mono mb-2">{meta.date}</p>
      <div className="flex flex-wrap gap-1.5 mb-8">
        {(meta.tags || []).map((t) => (
          <Badge key={t} variant="teal">
            {t}
          </Badge>
        ))}
      </div>

      <p className="text-muted text-lg leading-relaxed mb-8">{meta.description}</p>

      {mdxSource && (
        <div className="prose-custom">
          <MdxContent source={mdxSource} />
        </div>
      )}
    </article>
  )
}

export async function getStaticPaths() {
  const posts = getAllWritingPosts()
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = await getWritingPost(params.slug)
  if (!post) return { notFound: true }
  return { props: { meta: post.meta, mdxSource: post.mdxSource } }
}
