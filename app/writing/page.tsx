import { getAllWritingPosts } from '@/lib/content'
import WritingIndexClient from './WritingIndexClient'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Writing — AI Hardware, Finance, Distributed Systems',
  description:
    'Essays and notes on AI hardware, forward-deployed engineering, distributed systems, and finance.',
  path: '/writing',
})

export default function WritingPage() {
  const posts = getAllWritingPosts()
  return <WritingIndexClient posts={posts} />
}
