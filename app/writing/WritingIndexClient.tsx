'use client'

import { useState } from 'react'
import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { WritingMeta } from '@/lib/content'
import { KNOWLEDGE_DOMAINS } from '@/lib/data'

type Props = {
  posts: WritingMeta[]
  domainCounts: Record<string, number>
}

export default function WritingIndexClient({ posts, domainCounts }: Props) {
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

      {/* Tag filter */}
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

      {/* Writing posts grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((post) => (
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
