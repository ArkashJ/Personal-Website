import { useState } from 'react'
import Link from 'next/link'
import SectionHeader from '../../components/sections/SectionHeader'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { WRITING } from '../../lib/data'

const ALL_TAGS = Array.from(new Set(WRITING.flatMap((p) => p.tags))).sort()

export default function WritingIndex() {
  const [filter, setFilter] = useState(null)
  const posts = filter ? WRITING.filter((p) => p.tags.includes(filter)) : WRITING

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <SectionHeader
        eyebrow="Writing"
        title="Essays, notes, and theses"
        description="Curated long-form on AI, finance, distributed systems, and what I’m learning."
      />

      <div className="flex flex-wrap gap-2 my-6">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1 rounded-full text-xs font-mono border transition-colors ${
            !filter
              ? 'bg-primary text-bg border-primary'
              : 'border-border text-muted hover:border-primary hover:text-primary'
          }`}
        >
          All
        </button>
        {ALL_TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1 rounded-full text-xs font-mono border transition-colors ${
              filter === t
                ? 'bg-primary text-bg border-primary'
                : 'border-border text-muted hover:border-primary hover:text-primary'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/writing/${post.slug}`}>
            <Card glow className="h-full cursor-pointer">
              <p className="text-muted text-xs font-mono mb-2">{post.date}</p>
              <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
              <p className="text-muted text-sm mb-4">{post.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <Badge key={t} variant="teal">
                    {t}
                  </Badge>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

WritingIndex.meta = {
  title: 'Writing — AI Hardware, Finance, Distributed Systems',
  path: '/writing',
  description:
    'Essays and notes on AI hardware, forward-deployed engineering, distributed systems, and finance.',
}
