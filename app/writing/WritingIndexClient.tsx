'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { WritingMeta, KnowledgeMeta } from '@/lib/content'
import { KNOWLEDGE_DOMAINS } from '@/lib/data'

type Props = {
  posts: WritingMeta[]
  knowledgePosts: KnowledgeMeta[]
  domainCounts: Record<string, number>
}

function matches(query: string, ...fields: (string | string[] | undefined)[]): boolean {
  const q = query.toLowerCase()
  return fields.some((f) => {
    if (!f) return false
    if (Array.isArray(f)) return f.some((s) => s.toLowerCase().includes(q))
    return f.toLowerCase().includes(q)
  })
}

export default function WritingIndexClient({ posts, knowledgePosts, domainCounts }: Props) {
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

  const visibleDomains = useMemo(() => {
    if (!q) return KNOWLEDGE_DOMAINS
    return KNOWLEDGE_DOMAINS.filter((d) => matches(q, d.name, d.description))
  }, [q])

  const visibleKnowledgeArticles = useMemo(() => {
    if (!q) return []
    return knowledgePosts.filter((p) => matches(q, p.title, p.description, p.domain))
  }, [knowledgePosts, q])

  const hasResults =
    visiblePosts.length > 0 || visibleDomains.length > 0 || visibleKnowledgeArticles.length > 0
  const totalResults = visiblePosts.length + visibleDomains.length + visibleKnowledgeArticles.length

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <SectionHeader
        eyebrow="Writing"
        title="Essays, notes, theses."
        italicAccent="What I'm learning, in public."
        description="Curated long-form on AI, finance, distributed systems, and the bridge between them."
        asH1
      />

      {/* Search */}
      <div className="relative mt-6 mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        <input
          type="text"
          placeholder="Search essays, topics, knowledge domains…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-10 py-2.5 bg-surface border border-border text-text placeholder:text-muted text-sm font-mono focus:outline-none focus:border-primary/60 transition-[border-color] duration-150"
        />
        {q && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Tag filter */}
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

      {/* Result count */}
      {q && (
        <p className="text-xs font-mono text-muted mb-5">
          {hasResults
            ? `${totalResults} result${totalResults === 1 ? '' : 's'} for "${q}"`
            : `No results for "${q}"`}
        </p>
      )}

      {/* Writing posts grid */}
      {visiblePosts.length > 0 && (
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
        </div>
      )}

      {/* Article matches from knowledge */}
      {visibleKnowledgeArticles.length > 0 && (
        <div className="mt-10">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
            ● Knowledge Articles
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {visibleKnowledgeArticles.map((a) => (
              <Link key={`${a.domain}/${a.slug}`} href={`/knowledge/${a.domain}/${a.slug}`}>
                <Card glow className="h-full cursor-pointer">
                  <p className="text-muted text-xs font-mono mb-2">{a.domain}</p>
                  <h3 className="text-base font-bold text-text mb-1">{a.title}</h3>
                  <p className="text-muted text-sm">{a.description}</p>
                </Card>
              </Link>
            ))}
          </div>
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
          {visibleDomains.map((d) => {
            const count = domainCounts[d.slug] || 0
            return (
              <li key={d.slug}>
                <Link
                  href={`/knowledge/${d.slug}`}
                  className="group flex items-center gap-4 py-4 hover:bg-surface/50 -mx-2 px-2 transition-[background-color] duration-150"
                >
                  <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-text font-semibold group-hover:text-primary transition-colors duration-150">
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

        {q && visibleDomains.length === 0 && (
          <p className="text-sm text-muted py-4">No domains match your search.</p>
        )}
      </section>
    </div>
  )
}
