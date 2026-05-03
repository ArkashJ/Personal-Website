import { getAllWritingPosts } from '@/lib/content'
import WritingIndexClient from './WritingIndexClient'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Writing — Essays',
  description:
    'Long-form essays on AI, forward-deployed engineering, distributed systems, finance, math, and physics. Sorted newest first.',
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
