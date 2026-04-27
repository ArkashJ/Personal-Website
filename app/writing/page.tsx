import { getAllWritingPosts } from '@/lib/content'
import WritingIndexClient from './WritingIndexClient'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Writing — AI Hardware, Finance, Distributed Systems',
  description:
    'Essays and notes on AI hardware, forward-deployed engineering, distributed systems, and finance.',
  path: '/writing',
  keywords: ['essays', 'AI hardware', 'forward deployed', 'finance', 'distributed systems'],
})

export default function WritingPage() {
  const posts = getAllWritingPosts()
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/writing' },
        ])}
      />
      <WritingIndexClient posts={posts} />
    </>
  )
}
