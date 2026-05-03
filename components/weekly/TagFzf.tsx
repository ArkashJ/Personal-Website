'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import Badge from '@/components/ui/Badge'

type Props = {
  tags: string[]
  activeTag?: string
}

/**
 * Live-filter tag cloud. Uses a controlled input + String.includes filter
 * (cmdk is already a dep but its Command paradigm doesn't fit inline badge clouds).
 * Pressing Enter navigates to the first matching tag's filter URL.
 */
export default function TagFzf({ tags, activeTag }: Props) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const filtered = useMemo(() => {
    if (!query.trim()) return tags
    const q = query.trim().toLowerCase()
    return tags.filter((t) => t.toLowerCase().includes(q))
  }, [tags, query])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && filtered.length > 0) {
        router.push(`/weekly?tag=${encodeURIComponent(filtered[0])}`)
        setQuery('')
      }
    },
    [filtered, router]
  )

  return (
    <div className="mb-4">
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Filter tags… press Enter to navigate to first match"
          className="w-full pl-9 pr-9 py-2 bg-surface border border-border text-text placeholder:text-muted text-xs font-mono focus:outline-none focus:border-primary/60 transition-[border-color] duration-150"
          aria-label="Filter tag cloud"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
            aria-label="Clear filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <p className="text-xs font-mono text-muted py-2">No tags match &ldquo;{query}&rdquo;</p>
      )}

      {filtered.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {filtered.map((tag, i) => {
            const isActive = tag === activeTag
            const isFirstMatch = query.trim() && i === 0
            return (
              <Link
                key={tag}
                href={`/weekly?tag=${encodeURIComponent(tag)}`}
                className="transition-opacity duration-150 hover:opacity-80"
                aria-current={isActive ? 'true' : undefined}
              >
                <Badge
                  variant={isActive ? 'teal' : isFirstMatch ? 'cyan' : 'default'}
                  className="cursor-pointer"
                >
                  {tag}
                </Badge>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
