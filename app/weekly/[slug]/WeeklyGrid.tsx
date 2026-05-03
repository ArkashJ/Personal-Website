'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Search, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  RAIL_LABEL,
  getAllItems,
  kindLabel,
  type WeeklyItemKind,
  type WeeklyLogMeta,
} from '@/lib/weekly-types'
import { resolveEnriched, type ResolvedItem } from '@/lib/weekly-render'
import { useUrlState } from '@/lib/url-state'
import Badge from '@/components/ui/Badge'

const KIND_ORDER: WeeklyItemKind[] = [
  'youtube',
  'podcast',
  'article',
  'paper',
  'repo',
  'meeting',
  'tweet',
  'note',
]

// ---------------------------------------------------------------------------
// Modal (unchanged logic; moved here so the grid can own its open/close)
// ---------------------------------------------------------------------------

const MODAL_EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'
const MODAL_ENTER_MS = 220
const MODAL_EXIT_MS = 160

type ModalState = {
  open: boolean
  resolved: ResolvedItem | null
  content: string
  hasContent: boolean
}

function ExternalLinkIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" />
      <path d="M8 1h3v3" />
      <path d="M11 1 6 6" />
    </svg>
  )
}

function DetailModal({
  modal,
  onClose,
  weekStart,
}: {
  modal: ModalState
  onClose: () => void
  weekStart: string
}) {
  const { resolved, content, hasContent } = modal
  const [entered, setEntered] = useState(false)
  const [mounted, setMounted] = useState(false)

  const requestClose = useCallback(() => {
    setEntered(false)
    window.setTimeout(onClose, MODAL_EXIT_MS)
  }, [onClose])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!resolved) return
    const raf = requestAnimationFrame(() => setEntered(true))
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
    }
    document.addEventListener('keydown', handler)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', handler)
    }
  }, [resolved, requestClose])

  if (!resolved || !mounted) return null

  const isYouTubeThumb = resolved.image?.includes('ytimg.com')

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      <div
        onClick={requestClose}
        aria-hidden="true"
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        style={{
          opacity: entered ? 1 : 0,
          transition: `opacity ${entered ? MODAL_ENTER_MS : MODAL_EXIT_MS}ms ease-out`,
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-3xl max-h-[82vh] flex flex-col border border-border bg-surface shadow-2xl will-change-transform motion-reduce:!transform-none motion-reduce:!transition-opacity"
        style={{
          transformOrigin: 'center',
          transform: entered ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(8px)',
          opacity: entered ? 1 : 0,
          transition: `transform ${entered ? MODAL_ENTER_MS : MODAL_EXIT_MS}ms ${MODAL_EASE}, opacity ${entered ? MODAL_ENTER_MS : MODAL_EXIT_MS}ms ${MODAL_EASE}`,
        }}
      >
        <div className="flex items-start gap-3 p-5 border-b border-border flex-shrink-0">
          {isYouTubeThumb && resolved.image && (
            <Image
              src={resolved.image}
              alt=""
              width={96}
              height={54}
              className="flex-shrink-0 border border-border object-cover"
              unoptimized
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold text-text leading-snug">{resolved.text}</p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              {resolved.rail && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                  {RAIL_LABEL[resolved.rail]}
                </span>
              )}
              {resolved.source && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  {resolved.source}
                </span>
              )}
              {resolved.href && (
                <a
                  href={resolved.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] uppercase tracking-wider text-primary hover:text-accent flex items-center gap-1 transition-colors"
                >
                  Watch / Listen <ExternalLinkIcon />
                </a>
              )}
            </div>
          </div>
          <button
            onClick={requestClose}
            className="flex-shrink-0 text-subtle hover:text-text active:scale-[0.92] transition-[color,transform] duration-150 p-1 -mr-1 -mt-1"
            aria-label="Close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>
        <div
          className="overflow-y-auto flex-1 p-5 prose-modal scroll-smooth"
          style={{ overscrollBehavior: 'contain' }}
        >
          {content ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="text-lg font-bold text-text mt-6 mb-2 first:mt-0">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-semibold text-text mt-4 mb-1">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-sm text-muted leading-relaxed mb-3">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside ml-4 mb-3 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside ml-4 mb-3 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-sm text-muted leading-relaxed">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-text">{children}</strong>
                ),
                em: ({ children }) => <em className="text-text">{children}</em>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:text-accent underline underline-offset-2 transition-colors"
                  >
                    {children}
                  </a>
                ),
                hr: () => <hr className="border-border my-5" />,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-primary pl-3 my-3 text-muted italic text-sm">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-surface border border-border text-accent text-xs font-mono px-1.5 py-0.5">
                    {children}
                  </code>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <p className="text-sm text-muted">
              No detailed notes for this entry yet — open the original via the link above.
            </p>
          )}
          <div className="mt-6 pt-4 border-t border-border flex items-center gap-3 flex-wrap">
            {!hasContent && resolved.href && (
              <a
                href={resolved.href}
                target={resolved.href.startsWith('http') ? '_blank' : undefined}
                rel={resolved.href.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-primary hover:text-accent transition-colors border border-border px-2.5 py-1"
              >
                Open original <ExternalLinkIcon />
              </a>
            )}
            <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
              logged · {weekStart}
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function ItemCard({
  resolved,
  index,
  onOpen,
}: {
  resolved: ResolvedItem
  index: number
  onOpen: () => void
}) {
  const isYouTubeThumb = resolved.image?.includes('ytimg.com')
  return (
    <div
      data-weekly-card
      className="relative border border-border bg-surface hover:border-primary/60 active:scale-[0.99] transition-[border-color,transform] duration-150 motion-reduce:!transform-none weekly-card-enter flex flex-col h-full"
      style={{ animationDelay: `${Math.min(index, 11) * 30}ms` }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={resolved.text}
        className="flex flex-col text-left h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {isYouTubeThumb && resolved.image && (
          <div className="relative w-full aspect-video border-b border-border bg-elevated overflow-hidden">
            <Image
              src={resolved.image}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <div className="flex items-start gap-2">
            {!isYouTubeThumb && resolved.image && (
              <Image
                src={resolved.image}
                alt=""
                width={16}
                height={16}
                className="flex-shrink-0 mt-1"
                unoptimized
              />
            )}
            <p className="text-sm text-text leading-snug font-medium line-clamp-2 flex-1 pr-16">
              {resolved.text}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {resolved.source && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                {resolved.source}
              </span>
            )}
            {resolved.rail && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-primary/70">
                · {RAIL_LABEL[resolved.rail]}
              </span>
            )}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80 mt-2">
            Click to read →
          </span>
        </div>
      </button>
      <div className="absolute top-3 right-3 flex items-center gap-2">
        {resolved.kind && (
          <Badge variant="teal" className="text-[10px]">
            {kindLabel(resolved.kind)}
          </Badge>
        )}
        {resolved.href && (
          <a
            href={resolved.href}
            target={resolved.href.startsWith('http') ? '_blank' : undefined}
            rel={resolved.href.startsWith('http') ? 'noreferrer' : undefined}
            onClick={(e) => e.stopPropagation()}
            className="text-subtle hover:text-primary transition-colors"
            title="Open original"
            aria-label={`Open ${resolved.text} in a new tab`}
          >
            <ExternalLinkIcon />
          </a>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Grid + filter bar
// ---------------------------------------------------------------------------

export function WeeklyGrid({
  meta,
  sections,
  initialDate,
}: {
  meta: WeeklyLogMeta
  sections: Record<string, string>
  initialDate?: string
}) {
  const items = useMemo(() => getAllItems(meta), [meta])
  const resolved = useMemo(() => items.map((it) => resolveEnriched(it)), [items])

  const presentKinds = useMemo(() => {
    const set = new Set<WeeklyItemKind>()
    for (const r of resolved) if (r.kind) set.add(r.kind)
    return KIND_ORDER.filter((k) => set.has(k))
  }, [resolved])

  const { values, set, reset } = useUrlState(['q', 'tag', 'kind', 'date'])

  useEffect(() => {
    if (initialDate && !values.date) set('date', initialDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDate])

  const q = values.q.trim().toLowerCase()
  const tag = values.tag
  const kind = values.kind
  const date = values.date

  const presentDates = useMemo(() => {
    const set = new Set<string>()
    for (const r of resolved) if (r.date) set.add(r.date)
    return Array.from(set).sort()
  }, [resolved])

  const filtered = useMemo(() => {
    return resolved.filter((r) => {
      if (kind && r.kind !== kind) return false
      if (tag && !(r.tags ?? []).includes(tag)) return false
      if (date && r.date !== date) return false
      if (q) {
        const hay = [r.text, r.source, r.notes, ...(r.tags ?? [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [resolved, q, tag, kind, date])

  // -------------------- modal state --------------------
  const [modal, setModal] = useState<ModalState>({
    open: false,
    resolved: null,
    content: '',
    hasContent: false,
  })

  const close = useCallback(() => setModal((m) => ({ ...m, open: false })), [])

  useEffect(() => {
    if (!modal.open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [modal.open])

  function openModal(item: ResolvedItem) {
    const fromSection = item.anchor ? (sections[item.anchor] ?? '') : ''
    const content = fromSection || item.bodyMarkdown || ''
    setModal({ open: true, resolved: item, content, hasContent: Boolean(content) })
  }

  const hasFilters = Boolean(q || tag || kind || date)

  function formatDateTab(d: string): string {
    const [, m, day] = d.split('-')
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const mi = parseInt(m, 10) - 1
    return `${monthNames[mi] ?? m} ${parseInt(day, 10)}`
  }

  return (
    <>
      {/* Filter bar */}
      <div className="-mx-6 px-6 py-3 mb-6 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search items by name, source, notes, tag…"
            value={values.q}
            onChange={(e) => set('q', e.target.value || null)}
            className="w-full pl-9 pr-10 py-2.5 bg-surface border border-border text-text placeholder:text-muted text-sm font-mono focus:outline-none focus:border-primary/60 transition-[border-color] duration-150"
          />
          {values.q && (
            <button
              type="button"
              onClick={() => set('q', null)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors duration-150"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Kind facet chips */}
        {presentKinds.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            <button
              type="button"
              onClick={() => set('kind', null)}
              className={`px-3 py-1 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
                !kind
                  ? 'bg-primary text-bg border-primary'
                  : 'border-border text-muted hover:border-primary hover:text-primary'
              }`}
            >
              All kinds
            </button>
            {presentKinds.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => set('kind', kind === k ? null : k)}
                className={`px-3 py-1 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
                  kind === k
                    ? 'bg-primary text-bg border-primary'
                    : 'border-border text-muted hover:border-primary hover:text-primary'
                }`}
              >
                {kindLabel(k)}
              </button>
            ))}
          </div>
        )}

        {/* Date facet tabs — surfaces day-by-day grouping when items carry dates */}
        {presentDates.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            <button
              type="button"
              onClick={() => set('date', null)}
              className={`px-3 py-1 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
                !date
                  ? 'bg-primary text-bg border-primary'
                  : 'border-border text-muted hover:border-primary hover:text-primary'
              }`}
            >
              All days
            </button>
            {presentDates.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => set('date', date === d ? null : d)}
                className={`px-3 py-1 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
                  date === d
                    ? 'bg-primary text-bg border-primary'
                    : 'border-border text-muted hover:border-primary hover:text-primary'
                }`}
              >
                {formatDateTab(d)}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-3 text-xs font-mono text-muted">
          <span>
            {filtered.length} item{filtered.length === 1 ? '' : 's'}
            {q ? ` · "${q}"` : ''}
            {tag ? ` · #${tag}` : ''}
            {kind ? ` · ${kindLabel(kind as WeeklyItemKind)}` : ''}
            {date ? ` · ${formatDateTab(date)}` : ''}
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="text-primary hover:text-accent transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Card grid — segmented by day when items carry dates and no date filter is active */}
      {filtered.length > 0 ? (
        presentDates.length > 0 && !date ? (
          <div className="space-y-8 mb-12">
            {(() => {
              const groups = new Map<string, ResolvedItem[]>()
              for (const item of filtered) {
                const k = item.date ?? '__undated__'
                const arr = groups.get(k) ?? []
                arr.push(item)
                groups.set(k, arr)
              }
              const keys = Array.from(groups.keys()).sort((a, b) => {
                if (a === '__undated__') return 1
                if (b === '__undated__') return -1
                return a.localeCompare(b)
              })
              return keys.map((k) => {
                const list = groups.get(k) ?? []
                return (
                  <div key={k}>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
                      {k === '__undated__' ? 'Week-wide' : formatDateTab(k)} · {list.length} item
                      {list.length === 1 ? '' : 's'}
                    </p>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {list.map((item, i) => (
                        <ItemCard
                          key={item.id}
                          resolved={item}
                          index={i}
                          onOpen={() => openModal(item)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })
            })()}
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {filtered.map((item, i) => (
              <ItemCard key={item.id} resolved={item} index={i} onOpen={() => openModal(item)} />
            ))}
          </div>
        )
      ) : (
        <div className="border border-border bg-surface p-8 mb-12 text-center">
          <p className="text-sm text-muted">No items match your filters.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-3 font-mono text-xs uppercase tracking-widest text-primary hover:text-accent transition-colors"
          >
            Reset
          </button>
        </div>
      )}

      {modal.open && modal.resolved && (
        <DetailModal modal={modal} onClose={close} weekStart={meta.weekStart} />
      )}
    </>
  )
}
