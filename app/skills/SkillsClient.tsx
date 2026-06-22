'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Search, X, Copy, Check, ExternalLink, Star } from 'lucide-react'
import type { SkillMeta } from '@/lib/skills'
import { copySkillRawToClipboard } from '@/lib/copy-skill'
import { useFavoritesStore } from '@/lib/favorites-store'

type Props = {
  skills: SkillMeta[]
  categories: { name: string; count: number }[]
}

export default function SkillsClient({ skills, categories }: Props) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // Favorites are read from localStorage on the client only — gate the UI behind
  // `mounted` so the server render (no favorites) matches the first client paint.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const favorites = useFavoritesStore((s) => s.favorites)
  const toggleFavorite = useFavoritesStore((s) => s.toggle)
  const favoriteSet = useMemo(() => new Set(favorites), [favorites])

  const q = query.trim().toLowerCase()

  const visible = useMemo(() => {
    let result = skills
    if (mounted && showFavoritesOnly) result = result.filter((s) => favoriteSet.has(s.slug))
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
  }, [skills, q, activeCategory, mounted, showFavoritesOnly, favoriteSet])

  async function handleCopy(slug: string) {
    try {
      await copySkillRawToClipboard(slug)
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug((s) => (s === slug ? null : s)), 1800)
    } catch (err) {
      console.error('[skills] copy failed', err)
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
        <button
          type="button"
          onClick={() => setShowFavoritesOnly((v) => !v)}
          aria-pressed={showFavoritesOnly}
          className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
            showFavoritesOnly
              ? 'bg-primary text-bg border-primary'
              : 'border-border text-muted hover:border-primary hover:text-primary'
          }`}
        >
          <Star className="w-3 h-3" fill={showFavoritesOnly ? 'currentColor' : 'none'} />
          Favorites ({mounted ? favorites.length : 0})
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
      {(q || activeCategory || (mounted && showFavoritesOnly)) && (
        <p className="text-xs font-mono text-muted mb-5">
          {visible.length} skill{visible.length === 1 ? '' : 's'}
          {mounted && showFavoritesOnly ? ' · ★ favorites' : ''}
          {q ? ` for "${q}"` : ''}
          {activeCategory ? ` · ${activeCategory}` : ''}
        </p>
      )}

      {/* Skills list */}
      <div className="grid gap-3">
        {visible.map((s) => {
          const copied = copiedSlug === s.slug
          const errored = copiedSlug === 'error:' + s.slug
          const fav = mounted && favoriteSet.has(s.slug)
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
                <button
                  type="button"
                  onClick={() => toggleFavorite(s.slug)}
                  aria-pressed={fav}
                  aria-label={
                    fav ? `Remove ${s.name} from favorites` : `Save ${s.name} to favorites`
                  }
                  title={fav ? 'Remove from favorites' : 'Save to favorites'}
                  className={`shrink-0 -mt-1 -mr-1 p-1.5 transition-colors duration-150 ${
                    fav ? 'text-accent' : 'text-subtle hover:text-primary'
                  }`}
                >
                  <Star
                    className="w-4 h-4"
                    fill={fav ? 'currentColor' : 'none'}
                    strokeWidth={1.75}
                  />
                </button>
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
                      <Copy className="w-3 h-3" /> Copy for LLM
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
                  title="Plain-text endpoint — for LLM crawlers + curl"
                >
                  raw .md →
                </a>
              </div>
            </article>
          )
        })}
        {visible.length === 0 && (
          <p className="text-muted text-sm py-8 text-center">
            {mounted && showFavoritesOnly && favorites.length === 0
              ? 'No favorites yet — tap the ☆ on any skill to save it here.'
              : 'No skills match your search.'}
          </p>
        )}
      </div>
    </>
  )
}
