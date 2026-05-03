'use client'

import { useState, useCallback } from 'react'
import { addWeeklyItem } from './actions'
import type { RailKey, WeeklyItemKind } from '@/lib/weekly-types'
import { RAIL_LABEL, RAIL_ORDER, RAIL_DEFAULT_KIND } from '@/lib/weekly-types'

const RAIL_KEYS: readonly RailKey[] = RAIL_ORDER

const KIND_OPTIONS: WeeklyItemKind[] = [
  'youtube',
  'podcast',
  'article',
  'paper',
  'repo',
  'meeting',
  'tweet',
  'note',
]

function isValidUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

type Status =
  | { type: 'idle' }
  | { type: 'saving' }
  | { type: 'success'; msg: string }
  | { type: 'error'; msg: string }

export default function WeeklyItemForm() {
  const [rail, setRail] = useState<RailKey>('read')
  const [kind, setKind] = useState<WeeklyItemKind>(RAIL_DEFAULT_KIND['read'])
  const [kindOverridden, setKindOverridden] = useState(false)
  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')
  const [href, setHref] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [tags, setTags] = useState('')
  const [status, setStatus] = useState<Status>({ type: 'idle' })

  const handleRailChange = useCallback(
    (newRail: RailKey) => {
      setRail(newRail)
      if (!kindOverridden) {
        setKind(RAIL_DEFAULT_KIND[newRail])
      }
    },
    [kindOverridden]
  )

  const handleKindChange = useCallback((newKind: WeeklyItemKind) => {
    setKind(newKind)
    setKindOverridden(true)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!title.trim()) {
        setStatus({ type: 'error', msg: 'title is required' })
        return
      }
      if (!href.trim() || !isValidUrl(href.trim())) {
        setStatus({ type: 'error', msg: 'a valid href URL is required' })
        return
      }
      if (thumbnail.trim() && !isValidUrl(thumbnail.trim())) {
        setStatus({ type: 'error', msg: 'thumbnail must be a valid URL when provided' })
        return
      }

      setStatus({ type: 'saving' })

      const fd = new FormData()
      fd.set('rail', rail)
      fd.set('kind', kind)
      fd.set('title', title.trim())
      fd.set('source', source.trim())
      fd.set('href', href.trim())
      fd.set('description', description.trim())
      fd.set('thumbnail', thumbnail.trim())
      fd.set('tags', tags.trim())

      try {
        const result = await addWeeklyItem(fd)
        if (result.ok) {
          setStatus({ type: 'success', msg: `added to ${result.slug}` })
          // Reset form fields except rail/kind
          setTitle('')
          setSource('')
          setHref('')
          setDescription('')
          setThumbnail('')
          setTags('')
        } else {
          setStatus({ type: 'error', msg: result.error ?? 'unknown error' })
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'unknown error'
        setStatus({ type: 'error', msg: message })
      }
    },
    [rail, kind, title, source, href, description, thumbnail, tags]
  )

  const inputClass =
    'bg-bg border border-border px-3 py-1.5 text-sm text-text font-mono focus:outline-none focus:border-primary placeholder:text-muted/50 w-full'
  const labelClass = 'font-mono text-xs text-muted uppercase tracking-widest mb-1 block'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header bar */}
      <div className="border-b border-border bg-surface px-6 py-3 flex items-center justify-between">
        <span className="font-mono text-xs text-muted uppercase tracking-widest">
          admin / weekly log editor
        </span>
        <div className="flex items-center gap-4">
          {status.type !== 'idle' && (
            <span
              className={`font-mono text-xs ${
                status.type === 'success'
                  ? 'text-green-500'
                  : status.type === 'error'
                    ? 'text-red-500'
                    : 'text-muted'
              }`}
            >
              {status.type === 'saving' ? 'saving...' : status.msg}
            </span>
          )}
          <button
            type="submit"
            form="weekly-item-form"
            disabled={status.type === 'saving'}
            className="px-4 py-1.5 bg-primary text-bg font-mono text-xs hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            add item
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-2xl mx-auto w-full">
        <form id="weekly-item-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Rail + Kind row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Rail</label>
              <select
                value={rail}
                onChange={(e) => handleRailChange(e.target.value as RailKey)}
                className={inputClass}
              >
                {RAIL_KEYS.map((r) => (
                  <option key={r} value={r}>
                    {RAIL_LABEL[r]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Kind</label>
              <select
                value={kind}
                onChange={(e) => handleKindChange(e.target.value as WeeklyItemKind)}
                className={inputClass}
              >
                {KIND_OPTIONS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              {!kindOverridden && (
                <p className="text-muted/60 font-mono text-xs mt-1">
                  auto from rail &mdash; override allowed
                </p>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={labelClass}>
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Item title"
              required
              className={inputClass}
            />
          </div>

          {/* Source */}
          <div>
            <label className={labelClass}>Source</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g. Odd Lots, GitHub, YouTube"
              className={inputClass}
            />
          </div>

          {/* Href */}
          <div>
            <label className={labelClass}>
              URL (href) <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              value={href}
              onChange={(e) => setHref(e.target.value)}
              placeholder="https://..."
              required
              className={inputClass}
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className={labelClass}>Thumbnail URL</label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="https://... (optional)"
              className={inputClass}
            />
          </div>

          {/* Description / notes */}
          <div>
            <label className={labelClass}>Description / Notes</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Notes about this item (optional)"
              rows={4}
              className={`${inputClass} resize-y leading-relaxed`}
            />
          </div>

          {/* Tags */}
          <div>
            <label className={labelClass}>Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="ai, ml, finance"
              className={inputClass}
            />
          </div>

          {/* Mobile submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status.type === 'saving'}
              className="w-full px-4 py-2.5 bg-primary text-bg font-mono text-sm hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              {status.type === 'saving' ? 'saving...' : 'add item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
