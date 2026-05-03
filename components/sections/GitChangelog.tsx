'use client'

import { useMemo, useState } from 'react'
import { Search, X, Plus, Minus } from 'lucide-react'
import { tagsByFrequency } from '@/lib/tags'
import { commitGithubUrl, shortHash, type GitCommit } from '@/lib/git-commit'
import Badge from '@/components/ui/Badge'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

const TOP_TAGS = 12

function dayKey(iso: string): string {
  return iso.slice(0, 10)
}

function CommitRow({ commit }: { commit: GitCommit }) {
  const [open, setOpen] = useState(false)
  const hasBody = commit.body.trim().length > 0
  return (
    <li className="border border-border bg-surface">
      <div className="flex items-start gap-3 p-3">
        <a
          href={commitGithubUrl(commit.hash)}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] text-subtle hover:text-primary transition-colors flex-shrink-0 pt-0.5"
          title="View commit on GitHub"
        >
          {shortHash(commit.hash)}
        </a>
        {commit.type && (
          <Badge variant="teal" className="flex-shrink-0 text-[10px]">
            {commit.scopes.length > 0 ? `${commit.type}(${commit.scopes.join(',')})` : commit.type}
          </Badge>
        )}
        <button
          type="button"
          onClick={() => hasBody && setOpen((o) => !o)}
          className={`text-left text-sm text-text leading-snug flex-1 min-w-0 ${hasBody ? 'cursor-pointer hover:text-primary transition-colors' : 'cursor-default'}`}
          aria-expanded={open}
        >
          {commit.summary}
        </button>
        <a
          href={commitGithubUrl(commit.hash)}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-subtle hover:text-primary transition-colors flex-shrink-0 pt-1"
          aria-label="Open commit on GitHub"
        >
          <ExternalLinkIcon />
        </a>
      </div>
      {open && hasBody && (
        <pre className="border-t border-border p-3 text-[12px] text-muted whitespace-pre-wrap font-mono leading-relaxed">
          {commit.body}
        </pre>
      )}
    </li>
  )
}

export default function GitChangelog({
  weekCommits,
  allCommits,
}: {
  weekCommits: GitCommit[]
  allCommits: GitCommit[]
}) {
  const [scope, setScope] = useState<'week' | 'all'>('week')
  const [q, setQ] = useState('')
  const [tag, setTag] = useState<string | null>(null)
  const [showAllTags, setShowAllTags] = useState(false)

  const source = scope === 'week' ? weekCommits : allCommits

  const allTags = useMemo(() => tagsByFrequency(source, (c) => c.tags), [source])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return source.filter((c) => {
      if (tag && !c.tags.includes(tag)) return false
      if (needle) {
        const hay = [c.summary, c.body, c.type ?? '', ...c.tags].join(' ').toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
  }, [source, q, tag])

  const grouped = useMemo(() => {
    const out: { day: string; commits: GitCommit[] }[] = []
    for (const c of filtered) {
      const day = dayKey(c.date)
      const last = out[out.length - 1]
      if (last && last.day === day) last.commits.push(c)
      else out.push({ day, commits: [c] })
    }
    return out
  }, [filtered])

  const visibleTags = showAllTags ? allTags : allTags.slice(0, TOP_TAGS)
  const hiddenCount = Math.max(0, allTags.length - TOP_TAGS)
  const hasFilters = Boolean(q || tag)

  return (
    <section className="mt-12 border-t border-border pt-8">
      <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
            Repository commits
          </p>
          <h2 className="text-xl font-bold text-text mt-1">
            {scope === 'week' ? 'This week on the repo' : 'All recent commits'}
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setScope('week')}
            className={`px-3 py-1 border transition-[color,border-color,background-color] duration-150 ${
              scope === 'week'
                ? 'bg-primary text-bg border-primary'
                : 'border-border text-muted hover:border-primary hover:text-primary'
            }`}
          >
            This week
          </button>
          <button
            type="button"
            onClick={() => setScope('all')}
            className={`px-3 py-1 border transition-[color,border-color,background-color] duration-150 ${
              scope === 'all'
                ? 'bg-primary text-bg border-primary'
                : 'border-border text-muted hover:border-primary hover:text-primary'
            }`}
          >
            All time
          </button>
        </div>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        <input
          type="text"
          placeholder="Search commit subject, body, type, scope…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full pl-9 pr-10 py-2.5 bg-surface border border-border text-text placeholder:text-muted text-sm font-mono focus:outline-none focus:border-primary/60 transition-[border-color] duration-150"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors duration-150"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          <button
            type="button"
            onClick={() => setTag(null)}
            className={`px-3 py-1 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
              !tag
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
              onClick={() => setTag(tag === t ? null : t)}
              className={`px-3 py-1 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
                tag === t
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
      )}

      <div className="flex items-center justify-between text-xs font-mono text-muted mb-4">
        <span>
          {filtered.length} commit{filtered.length === 1 ? '' : 's'}
          {q ? ` · "${q}"` : ''}
          {tag ? ` · #${tag}` : ''}
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQ('')
              setTag(null)
            }}
            className="text-primary hover:text-accent transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {grouped.length > 0 ? (
        <div className="space-y-6">
          {grouped.map((g) => (
            <div key={g.day}>
              <p className="font-mono text-[10px] uppercase tracking-wider text-subtle mb-2">
                {g.day} · {g.commits.length} commit{g.commits.length === 1 ? '' : 's'}
              </p>
              <ul className="space-y-2">
                {g.commits.map((c) => (
                  <CommitRow key={c.hash} commit={c} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">
          {scope === 'week'
            ? 'No commits land in this week with the current filters.'
            : 'No commits match the current filters.'}
        </p>
      )}
    </section>
  )
}
