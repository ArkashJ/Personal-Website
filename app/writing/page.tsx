import { getAllWritingPosts, getAllKnowledgePosts } from '@/lib/content'
import WritingIndexClient from './WritingIndexClient'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { LEARNINGS } from '@/lib/learnings'

export const metadata = buildMetadata({
  title: 'Writing & Second Brain — Essays, Learnings, Knowledge Domains',
  description:
    'Long-form essays on AI, forward-deployed engineering, distributed systems, and finance — plus a running log of lessons learned the hard way, and six knowledge domains explored in public.',
  path: '/writing',
  keywords: [
    'essays',
    'learnings',
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
  const learnings = [...LEARNINGS].sort((a, b) => b.year - a.year)
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
      <WritingIndexClient posts={posts} learnings={learnings} domainCounts={domainCounts} />
    </>
  )
}
