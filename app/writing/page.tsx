import { getAllWritingPosts } from '@/lib/content'
import WritingIndexClient from './WritingIndexClient'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { LEARNINGS } from '@/lib/learnings'

export const metadata = buildMetadata({
  title: 'Writing & Learnings — Essays + Hard-Won Lessons',
  description:
    'Long-form essays on AI, forward-deployed engineering, distributed systems, and finance — plus a running log of lessons learned the hard way.',
  path: '/writing',
  keywords: [
    'essays',
    'learnings',
    'AI hardware',
    'forward deployed',
    'finance',
    'distributed systems',
  ],
})

export default function WritingPage() {
  const posts = getAllWritingPosts()
  const learnings = [...LEARNINGS].sort((a, b) => b.year - a.year)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/writing' },
        ])}
      />
      <WritingIndexClient posts={posts} learnings={learnings} />
    </>
  )
}
