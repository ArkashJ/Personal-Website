import { useRouter } from 'next/router'
import Link from 'next/link'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import JsonLd, { articleSchema } from '../../components/seo/JsonLd'
import { WRITING } from '../../lib/data'

export default function WritingPost() {
  const router = useRouter()
  const slug = router.query.slug
  const post = WRITING.find((p) => p.slug === slug)

  if (!post) {
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
      <JsonLd data={articleSchema({ ...post, slug: `/writing/${post.slug}` })} />

      <Link href="/writing" className="text-primary hover:text-accent font-mono text-sm">
        ← Writing
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-3">{post.title}</h1>
      <p className="text-muted text-sm font-mono mb-2">{post.date}</p>
      <div className="flex flex-wrap gap-1.5 mb-8">
        {post.tags.map((t) => (
          <Badge key={t} variant="teal">
            {t}
          </Badge>
        ))}
      </div>

      <p className="text-muted text-lg leading-relaxed mb-8">{post.description}</p>

      <Card>
        <p className="text-muted text-sm">
          Full essay coming soon — these posts are being curated and ported from the alpha repo.
        </p>
      </Card>
    </article>
  )
}
