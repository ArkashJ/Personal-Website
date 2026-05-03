import { getAllWritingPosts, getAllKnowledgePosts } from '@/lib/content'
import WritingIndexClient from './WritingIndexClient'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Writing & Second Brain — AI, Finance, Distributed Systems',
  description:
    'Essays and notes on AI, forward-deployed engineering, distributed systems, and finance — plus the six knowledge domains I think about in public.',
  path: '/writing',
  keywords: [
    'essays',
    'second brain',
    'AI hardware',
    'forward deployed',
    'finance',
    'distributed systems',
    'knowledge',
  ],
})

export default function WritingPage() {
  const posts = getAllWritingPosts()
  const knowledgePosts = getAllKnowledgePosts().filter((p) => p.slug !== 'index')
  const domainCounts = knowledgePosts.reduce<Record<string, number>>((acc, p) => {
    acc[p.domain] = (acc[p.domain] || 0) + 1
    return acc
  }, {})

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/writing' },
        ])}
      />
      <WritingIndexClient
        posts={posts}
        knowledgePosts={knowledgePosts}
        domainCounts={domainCounts}
      />
    </>
  )
}
