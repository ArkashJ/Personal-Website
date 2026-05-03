'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { KNOWLEDGE_DOMAINS } from '@/lib/data'
import type { WritingMeta } from '@/lib/content'
import type { Learning } from '@/lib/learnings'

type Props = {
  posts: WritingMeta[]
  learnings: Learning[]
  domainCounts: Record<string, number>
}

type Tab = 'essays' | 'learnings'

function matches(query: string, ...fields: (string | string[] | undefined)[]): boolean {
  const q = query.toLowerCase()
  return fields.some((f) => {
    if (!f) return false
    if (Array.isArray(f)) return f.some((s) => s.toLowerCase().includes(q))
    return f.toLowerCase().includes(q)
  })
}

export default function WritingIndexClient({ posts, learnings, domainCounts }: Props) {
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || []))).sort()
  const [tab, setTab] = useState<Tab>('essays')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<string | null>(null)

  const q = query.trim()

  const visiblePosts = useMemo(() => {
    let result = posts
    if (filter) result = result.filter((p) => (p.tags || []).includes(filter))
    if (q) result = result.filter((p) => matches(q, p.title, p.description, p.tags))
    return result
  }, [posts, filter, q])

  const visibleLearnings = useMemo(() => {
    if (!q) return learnings
    return learnings.filter((l) => matches(q, l.title, l.lesson, l.category, String(l.year)))
  }, [learnings, q])

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <SectionHeader
        eyebrow="Writing & Learnings"
        title="Essays, notes, lessons."
        italicAccent="What I'm learning, in public."
        description="Curated long-form on AI, finance, distributed systems, and forward-deployed engineering — plus a running log of lessons that cost me something."
        asH1
      />

      {/* Tab switcher */}
      <div className="flex border-b border-border mt-8 mb-4">
        <button
          type="button"
          onClick={() => setTab('essays')}
          className={`px-4 py-2 -mb-px font-mono text-xs uppercase tracking-widest border-b-2 transition-[color,border-color] duration-150 ${
            tab === 'essays'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-text'
          }`}
        >
          Essays ({posts.length})
        </button>
        <button
          type="button"
          onClick={() => setTab('learnings')}
          className={`px-4 py-2 -mb-px font-mono text-xs uppercase tracking-widest border-b-2 transition-[color,border-color] duration-150 ${
            tab === 'learnings'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-text'
          }`}
        >
          Learnings ({learnings.length})
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        <input
          type="text"
          placeholder={tab === 'essays' ? 'Search essays by title, tag…' : 'Search learnings…'}
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

      {/* Tag filter — only on essays tab */}
      {tab === 'essays' && allTags.length > 0 && (
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
      {tab === 'essays' && (
        <div className="grid gap-6 md:grid-cols-2">
          {visiblePosts.map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`}>
              <Card glow className="h-full cursor-pointer">
                <p className="text-muted text-xs font-mono mb-2">{post.date}</p>
                <h3 className="text-lg font-bold text-text mb-2">{post.title}</h3>
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
          {visiblePosts.length === 0 && (
            <p className="text-muted text-sm py-8 col-span-2 text-center">
              No essays match your search.
            </p>
          )}
        </div>
      )}

      {/* Learnings list */}
      {tab === 'learnings' && (
        <div className="grid gap-4">
          {visibleLearnings.map((l) => (
            <Card key={l.title} glow>
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="font-mono text-[11px] text-subtle uppercase tracking-widest">
                  {l.year}
                </span>
                <Badge variant="teal">{l.category}</Badge>
              </div>
              <h3 className="text-lg font-bold text-text tracking-tight mb-2">{l.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{l.lesson}</p>
            </Card>
          ))}
          {visibleLearnings.length === 0 && (
            <p className="text-muted text-sm py-8 text-center">No learnings match your search.</p>
          )}
        </div>
      )}
      {/* Second Brain — knowledge domains */}
      <section id="second-brain" className="mt-20 pt-12 border-t border-border">
        <div className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">
            ● Second Brain
          </p>
          <h2 className="text-2xl font-bold text-text">
            Six domains. <span className="italic font-normal text-muted">In public.</span>
          </h2>
          <p className="text-muted text-sm mt-2 max-w-xl">
            Notes, deep dives, and worked examples organized by domain. Everything I&apos;m thinking
            through — made linkable.
          </p>
        </div>

        <ol className="divide-y divide-border">
          {KNOWLEDGE_DOMAINS.map((d) => {
            const count = domainCounts[d.slug] || 0
            return (
              <li key={d.slug}>
                <Link
                  href={`/knowledge/${d.slug}`}
                  className="group flex items-center gap-4 py-4 hover:bg-surface/50 -mx-2 px-2 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-text font-semibold group-hover:text-primary transition-colors">
                      {d.name}
                    </span>
                    <span className="text-muted text-sm ml-3 hidden sm:inline">
                      {d.description}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-primary shrink-0">
                    {count} article{count === 1 ? '' : 's'} →
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
