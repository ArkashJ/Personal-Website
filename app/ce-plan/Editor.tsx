'use client'

import { useState, useEffect, useCallback } from 'react'
import { publishPost } from './actions'

// ---------------------------------------------------------------------------
// Minimal markdown → HTML (client-side only, no external dep)
// ---------------------------------------------------------------------------
function mdToHtml(md: string): string {
  return md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-6 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="font-mono bg-surface px-1 rounded text-sm">$1</code>')
    .replace(/^\- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/\n\n/g, '</p><p class="mb-2">')
    .replace(/^(?!<[h1-6li])(.+)$/gm, '<p class="mb-2">$1</p>')
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const today = new Date().toISOString().split('T')[0]

export default function Editor() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [date, setDate] = useState(today)
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [existingPosts, setExistingPosts] = useState<string[]>([])
  const [status, setStatus] = useState<{
    type: 'idle' | 'saving' | 'success' | 'error'
    msg?: string
  }>({ type: 'idle' })

  // Auto-derive slug from title unless user has manually edited it
  useEffect(() => {
    if (!slugManuallyEdited) {
      setSlug(slugify(title))
    }
  }, [title, slugManuallyEdited])

  // Fetch existing posts list
  useEffect(() => {
    fetch('/api/ce-plan/posts')
      .then((r) => r.json())
      .then((data) => setExistingPosts(data.posts ?? []))
      .catch(() => setExistingPosts([]))
  }, [status])

  const handlePublish = useCallback(async () => {
    if (!slug || !title || !content) {
      setStatus({ type: 'error', msg: 'title, slug, and content are required' })
      return
    }
    setStatus({ type: 'saving' })
    try {
      const result = await publishPost({ slug, title, description, tags, date, content })
      setStatus({ type: 'success', msg: `published → ${result.path}` })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'unknown error'
      setStatus({ type: 'error', msg: message })
    }
  }, [slug, title, description, tags, date, content])

  const preview = mdToHtml(content)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header bar */}
      <div className="border-b border-border bg-surface px-6 py-3 flex items-center justify-between">
        <span className="font-mono text-xs text-muted uppercase tracking-widest">
          ce-plan / markdown editor
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
            onClick={handlePublish}
            disabled={status.type === 'saving'}
            className="px-4 py-1.5 bg-primary text-bg font-mono text-xs hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            publish
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden max-w-[1600px] w-full mx-auto">
        {/* Sidebar — existing posts */}
        <aside className="w-52 shrink-0 border-r border-border bg-surface overflow-y-auto hidden lg:block">
          <div className="px-4 py-3 border-b border-border">
            <span className="font-mono text-xs text-muted uppercase tracking-widest">
              existing posts
            </span>
          </div>
          <ul className="py-2">
            {existingPosts.length === 0 && (
              <li className="px-4 py-2 text-xs text-muted font-mono">none found</li>
            )}
            {existingPosts.map((post) => (
              <li key={post}>
                <a
                  href={`/writing/${post.replace(/\.mdx$/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-1.5 text-xs font-mono text-muted hover:text-text hover:bg-bg transition-colors truncate"
                  title={post}
                >
                  {post.replace(/\.mdx$/, '')}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main editor area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Frontmatter fields */}
          <div className="border-b border-border bg-surface px-6 py-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
              <label className="font-mono text-xs text-muted uppercase tracking-widest">
                title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                className="bg-bg border border-border px-3 py-1.5 text-sm text-text font-mono focus:outline-none focus:border-primary placeholder:text-muted/50"
              />
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
              <label className="font-mono text-xs text-muted uppercase tracking-widest">
                description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description"
                className="bg-bg border border-border px-3 py-1.5 text-sm text-text font-mono focus:outline-none focus:border-primary placeholder:text-muted/50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-muted uppercase tracking-widest">
                tags (csv)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="ai, ml, tools"
                className="bg-bg border border-border px-3 py-1.5 text-sm text-text font-mono focus:outline-none focus:border-primary placeholder:text-muted/50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-muted uppercase tracking-widest">date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-bg border border-border px-3 py-1.5 text-sm text-text font-mono focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-muted uppercase tracking-widest">slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value)
                  setSlugManuallyEdited(true)
                }}
                placeholder="auto-derived"
                className="bg-bg border border-border px-3 py-1.5 text-sm text-text font-mono focus:outline-none focus:border-primary placeholder:text-muted/50"
              />
            </div>
          </div>

          {/* Split pane */}
          <div className="flex flex-1 overflow-hidden">
            {/* Write pane */}
            <div className="flex flex-col flex-1 border-r border-border">
              <div className="px-4 py-2 border-b border-border bg-surface">
                <span className="font-mono text-xs text-muted uppercase tracking-widest">
                  write
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing markdown..."
                spellCheck
                className="flex-1 resize-none bg-bg text-text font-mono text-sm px-6 py-4 focus:outline-none placeholder:text-muted/40 leading-relaxed"
              />
            </div>

            {/* Preview pane */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="px-4 py-2 border-b border-border bg-surface">
                <span className="font-mono text-xs text-muted uppercase tracking-widest">
                  preview
                </span>
              </div>
              <div
                className="flex-1 overflow-y-auto px-6 py-4 text-text text-sm leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: preview || '<p class="text-muted/50">Nothing to preview yet.</p>',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
