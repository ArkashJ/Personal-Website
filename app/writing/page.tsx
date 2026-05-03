import { getAllWritingPosts } from '@/lib/content'
import WritingIndexClient from './WritingIndexClient'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { LEARNINGS } from '@/lib/learnings'

export const metadata = buildMetadata({
  title: 'Writing — Essays + Learnings',
  description:
    'Long-form essays on AI, forward-deployed engineering, distributed systems, finance, math, and physics — plus a running log of lessons learned the hard way. One searchable index.',
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
