'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import TagBadge from '@/components/ui/TagBadge'
import type { WritingMeta } from '@/lib/content'

type Props = {
  posts: WritingMeta[]
}

function matches(query: string, ...fields: (string | string[] | undefined)[]): boolean {
  const q = query.toLowerCase()
  return fields.some((f) => {
    if (!f) return false
    if (Array.isArray(f)) return f.some((s) => s.toLowerCase().includes(q))
    return f.toLowerCase().includes(q)
  })
}

export default function WritingIndexClient({ posts }: Props) {
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || []))).sort()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<string | null>(null)

  const q = query.trim()

  const visiblePosts = useMemo(() => {
    let result = posts
    if (filter) result = result.filter((p) => (p.tags || []).includes(filter))
    if (q) result = result.filter((p) => matches(q, p.title, p.description, p.tags))
    return result
  }, [posts, filter, q])

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <SectionHeader
        eyebrow="Writing"
        title="Essays, notes, lessons."
        italicAccent="What I'm learning, in public."
        description="Curated long-form on AI, finance, distributed systems, and forward-deployed engineering — sorted newest first."
        asH1
      />

      <p className="font-mono text-[11px] uppercase tracking-widest text-subtle mt-8 mb-3">
        Essays · {posts.length}
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        <input
          type="text"
          placeholder="Search essays by title, tag…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-10 py-2.5 bg-surface border border-border text-text placeholder:text-muted text-sm font-mono focus:outline-none focus:border-primary/60 transition-[border-color] duration-150"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`px-3 py-1 rounded-full text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
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
              type="button"
              onClick={() => setFilter(filter === t ? null : t)}
              className={`px-3 py-1 rounded-full text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
                filter === t
                  ? 'bg-primary text-bg border-primary'
                  : 'border-border text-muted hover:border-primary hover:text-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Essays grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {visiblePosts.map((post) => (
          <Link key={post.slug} href={`/writing/${post.slug}`}>
            <Card glow className="h-full cursor-pointer">
              <p className="text-muted text-xs font-mono mb-2">{post.date}</p>
              <h3 className="text-lg font-bold text-text mb-2">{post.title}</h3>
              <p className="text-muted text-sm mb-4">{post.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {(post.tags || []).map((t) => (
                  <TagBadge key={t} name={t} variant="teal" />
                ))}
              </div>
            </Card>
          </Link>
        ))}
        {visiblePosts.length === 0 && (
          <p className="text-muted text-sm py-8 col-span-2 text-center">
            No essays match your search.
          </p>
        )}
      </div>
    </div>
  )
}
