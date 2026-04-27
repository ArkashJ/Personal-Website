'use client'

import { useState } from 'react'
import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { WritingMeta } from '@/lib/content'

export default function WritingIndexClient({ posts }: { posts: WritingMeta[] }) {
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || []))).sort()
  const [filter, setFilter] = useState<string | null>(null)
  const visible = filter ? posts.filter((p) => (p.tags || []).includes(filter)) : posts

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <SectionHeader
        eyebrow="Writing"
        title="Essays, notes, theses."
        italicAccent="What I'm learning, in public."
        description="Curated long-form on AI, finance, distributed systems, and the bridge between them."
        asH1
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
        {allTags.map((t) => (
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
        {visible.map((post) => (
          <Link key={post.slug} href={`/writing/${post.slug}`}>
            <Card glow className="h-full cursor-pointer">
              <p className="text-muted text-xs font-mono mb-2">{post.date}</p>
              <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
              <p className="text-muted text-sm mb-4">{post.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {(post.tags || []).map((t) => (
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
