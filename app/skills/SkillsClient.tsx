'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X, Copy, Check, ExternalLink } from 'lucide-react'
import type { SkillMeta } from '@/lib/skills'

type Props = {
  skills: SkillMeta[]
  categories: { name: string; count: number }[]
}

export default function SkillsClient({ skills, categories }: Props) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const q = query.trim().toLowerCase()

  const visible = useMemo(() => {
    let result = skills
    if (activeCategory) result = result.filter((s) => s.category === activeCategory)
    if (q) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.slug.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      )
    }
    return result
  }, [skills, q, activeCategory])

  async function handleCopy(slug: string) {
    try {
      const res = await fetch(`/skills/${slug}/raw`)
      if (!res.ok) throw new Error('failed')
      const text = await res.text()
      await navigator.clipboard.writeText(text)
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug((s) => (s === slug ? null : s)), 1800)
    } catch {
      setCopiedSlug('error:' + slug)
      setTimeout(() => setCopiedSlug(null), 1800)
    }
  }

  return (
    <>
      {/* Search */}
      <div className="relative mt-6 mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        <input
          type="text"
          placeholder="Search skills by name, category, or what they do…"
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

      {/* Category pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
            !activeCategory
              ? 'bg-primary text-bg border-primary'
              : 'border-border text-muted hover:border-primary hover:text-primary'
          }`}
        >
          All ({skills.length})
        </button>
        {categories.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setActiveCategory(activeCategory === c.name ? null : c.name)}
            className={`px-3 py-1 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
              activeCategory === c.name
                ? 'bg-primary text-bg border-primary'
                : 'border-border text-muted hover:border-primary hover:text-primary'
            }`}
          >
            {c.name} ({c.count})
          </button>
        ))}
      </div>

      {/* Result count */}
      {(q || activeCategory) && (
        <p className="text-xs font-mono text-muted mb-5">
          {visible.length} skill{visible.length === 1 ? '' : 's'}
          {q ? ` for "${q}"` : ''}
          {activeCategory ? ` · ${activeCategory}` : ''}
        </p>
      )}

      {/* Skills list */}
      <div className="grid gap-3">
        {visible.map((s) => {
          const copied = copiedSlug === s.slug
          const errored = copiedSlug === 'error:' + s.slug
          return (
            <article
              key={s.slug}
              className="group bg-surface border border-border p-4 hover:border-border-strong transition-[border-color] duration-150"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap mb-1.5">
                    <Link
                      href={`/skills/${s.slug}`}
                      className="font-mono text-sm font-semibold text-text hover:text-primary transition-colors duration-150"
                    >
                      {s.name}
                    </Link>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                      {s.category}
                    </span>
                    <span className="text-[10px] font-mono text-subtle ml-auto whitespace-nowrap">
                      {s.lineCount} lines
                    </span>
                  </div>
                  <p className="text-muted text-xs leading-relaxed line-clamp-2">{s.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => handleCopy(s.slug)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono border transition-[color,border-color,background-color] duration-150 ${
                    copied
                      ? 'bg-primary text-bg border-primary'
                      : errored
                        ? 'border-red-400 text-red-400'
                        : 'border-border text-muted hover:border-primary hover:text-primary'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" /> Copied for LLM
                    </>
                  ) : errored ? (
                    <>
                      <X className="w-3 h-3" /> Copy failed
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy SKILL.md
                    </>
                  )}
                </button>
                <Link
                  href={`/skills/${s.slug}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono border border-border text-muted hover:border-primary hover:text-primary transition-[color,border-color] duration-150"
                >
                  <ExternalLink className="w-3 h-3" /> View
                </Link>
                <a
                  href={`/skills/${s.slug}/raw`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[10px] font-mono text-subtle hover:text-primary transition-colors duration-150"
                >
                  /skills/{s.slug}/raw →
                </a>
              </div>
            </article>
          )
        })}
        {visible.length === 0 && (
          <p className="text-muted text-sm py-8 text-center">No skills match your search.</p>
        )}
      </div>
    </>
  )
}
