'use client'

import { useState, useMemo } from 'react'
import { Search, X, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react'
import ProjectCard from '@/components/sections/ProjectCard'
import type { Project, WorkTool } from '@/lib/data'

type Item = Project | WorkTool

const PAGE_SIZE = 9

type Props = {
  projects: Project[]
  workTools: WorkTool[]
}

export default function ProjectsClient({ projects, workTools }: Props) {
  const allItems: Item[] = useMemo(() => [...projects, ...workTools], [projects, workTools])
  const tagsByFrequency = useMemo(() => {
    const counts = allItems
      .flatMap((p) => p.tech || [])
      .reduce<Record<string, number>>((acc, t) => {
        acc[t] = (acc[t] || 0) + 1
        return acc
      }, {})
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag)
  }, [allItems])

  const TOP_TAGS = 8
  const [query, setQuery] = useState('')
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [showAllTags, setShowAllTags] = useState(false)
  const visibleTags = showAllTags ? tagsByFrequency : tagsByFrequency.slice(0, TOP_TAGS)
  const hiddenCount = tagsByFrequency.length - TOP_TAGS

  const q = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    let result = allItems
    if (tagFilter) result = result.filter((p) => p.tech.includes(tagFilter))
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [allItems, q, tagFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function applyFilter(tag: string | null) {
    setTagFilter(tag)
    setPage(1)
  }

  function applySearch(val: string) {
    setQuery(val)
    setPage(1)
  }

  return (
    <>
      {/* Search */}
      <div className="relative mt-6 mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        <input
          type="text"
          placeholder="Search projects by name, tech, description…"
          value={query}
          onChange={(e) => applySearch(e.target.value)}
          className="w-full pl-9 pr-10 py-2.5 bg-surface border border-border text-text placeholder:text-muted text-sm font-mono focus:outline-none focus:border-primary/60 transition-[border-color] duration-150"
        />
        {q && (
          <button
            type="button"
            onClick={() => applySearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Tag filter pills — top tags by frequency, expand for the rest */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          type="button"
          onClick={() => applyFilter(null)}
          className={`px-3 py-1 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
            !tagFilter
              ? 'bg-primary text-bg border-primary'
              : 'border-border text-muted hover:border-primary hover:text-primary'
          }`}
        >
          All
        </button>
        {visibleTags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => applyFilter(tagFilter === t ? null : t)}
            className={`px-3 py-1 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
              tagFilter === t
                ? 'bg-primary text-bg border-primary'
                : 'border-border text-muted hover:border-primary hover:text-primary'
            }`}
          >
            {t}
          </button>
        ))}
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setShowAllTags((s) => !s)}
            className="flex items-center gap-1 px-3 py-1 text-xs font-mono border border-border text-muted hover:border-primary hover:text-primary transition-[color,border-color] duration-150"
          >
            {showAllTags ? (
              <>
                <Minus className="w-3 h-3" /> Less
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" /> {hiddenCount} more
              </>
            )}
          </button>
        )}
      </div>

      {/* Result count */}
      {(q || tagFilter) && (
        <p className="text-xs font-mono text-muted mb-5">
          {filtered.length} result{filtered.length === 1 ? '' : 's'}
          {q ? ` for "${q}"` : ''}
          {tagFilter ? ` · ${tagFilter}` : ''}
        </p>
      )}

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 reveal">
        {paginated.map((p) => (
          <ProjectCard key={p.name} {...(p as Project)} />
        ))}
        {paginated.length === 0 && (
          <p className="text-muted text-sm col-span-3 py-8">No projects match your search.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 border border-border text-muted hover:text-text hover:border-border-strong disabled:opacity-30 disabled:cursor-not-allowed transition-[color,border-color] duration-150"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`w-8 h-8 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
                n === page
                  ? 'bg-primary text-bg border-primary'
                  : 'border-border text-muted hover:border-primary hover:text-primary'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 border border-border text-muted hover:text-text hover:border-border-strong disabled:opacity-30 disabled:cursor-not-allowed transition-[color,border-color] duration-150"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  )
}
