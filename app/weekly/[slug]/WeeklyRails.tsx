'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { WeeklyItem, WeeklyLogMeta } from '@/lib/weekly'
import { resolveItem, type ResolvedItem } from '@/lib/weekly-render'

type RailKey = 'read' | 'watched' | 'built' | 'shipped' | 'learned' | 'met'
const RAILS: { key: RailKey; label: string }[] = [
  { key: 'read', label: 'Read' },
  { key: 'watched', label: 'Watched' },
  { key: 'built', label: 'Built' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'learned', label: 'Learned' },
  { key: 'met', label: 'Met' },
]

type ModalState = {
  open: boolean
  resolved: ResolvedItem | null
  content: string
  /** Whether `content` came from a `sections[anchor]` lookup (true) or from
   *  inline notes / pure-string text (false). Drives the fallback-line UI. */
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

function RailItemBody({ resolved }: { resolved: ResolvedItem }) {
  const { text, image, source, notes } = resolved
  const isYouTubeThumb = image?.includes('ytimg.com')
  return (
    <div className="flex items-start gap-3">
      {image &&
        (isYouTubeThumb ? (
          <Image
            src={image}
            alt=""
            width={64}
            height={36}
            className="flex-shrink-0 mt-0.5 border border-border object-cover"
            unoptimized
          />
        ) : (
          <Image
            src={image}
            alt=""
            width={16}
            height={16}
            className="flex-shrink-0 mt-1"
            unoptimized
          />
        ))}
      <div className="min-w-0">
        <p className="text-sm text-text leading-snug pr-5">{text}</p>
        {source && (
          <p className="font-mono text-[10px] uppercase tracking-wider text-subtle mt-0.5">
            {source}
          </p>
        )}
        {notes && (
          <p className="text-xs text-muted leading-relaxed mt-1.5 border-l-2 border-border pl-2">
            {notes}
          </p>
        )}
      </div>
    </div>
  )
}

const MODAL_EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'
const MODAL_ENTER_MS = 220
const MODAL_EXIT_MS = 160

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

  const requestClose = useCallback(() => {
    setEntered(false)
    window.setTimeout(onClose, MODAL_EXIT_MS)
  }, [onClose])

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

  if (!resolved) return null

  const isYouTubeThumb = resolved.image?.includes('ytimg.com')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div
        onClick={requestClose}
        aria-hidden="true"
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        style={{
          opacity: entered ? 1 : 0,
          transition: `opacity ${entered ? MODAL_ENTER_MS : MODAL_EXIT_MS}ms ease-out`,
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg max-h-[78vh] flex flex-col border border-border bg-background shadow-2xl will-change-transform motion-reduce:!transform-none motion-reduce:!transition-opacity"
        style={{
          transformOrigin: 'center',
          transform: entered ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(8px)',
          opacity: entered ? 1 : 0,
          transition: `transform ${entered ? MODAL_ENTER_MS : MODAL_EXIT_MS}ms ${MODAL_EASE}, opacity ${entered ? MODAL_ENTER_MS : MODAL_EXIT_MS}ms ${MODAL_EASE}`,
        }}
      >
        {/* Header */}
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

        {/* Scrollable body */}
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

          {/* Footer: logged date + (when no markdown body) link CTA */}
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
    </div>
  )
}

export function WeeklyRails({
  meta,
  sections,
}: {
  meta: WeeklyLogMeta
  sections: Record<string, string>
}) {
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

  function openModal(resolved: ResolvedItem) {
    // Priority: anchor section markdown → bodyMarkdown (notes / pure-string text) → empty
    const fromSection = resolved.anchor ? (sections[resolved.anchor] ?? '') : ''
    const content = fromSection || resolved.bodyMarkdown || ''
    setModal({ open: true, resolved, content, hasContent: Boolean(content) })
  }

  return (
    <>
      <div className="grid gap-3 md:grid-cols-2 mb-10">
        {RAILS.map((r) => {
          const items = meta[r.key]
          if (!items || items.length === 0) return null
          return (
            <div key={r.key} className="border border-border bg-surface p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
                {r.label}
              </p>
              <ul className="space-y-3">
                {items.map((item: WeeklyItem, i: number) => {
                  const resolved = resolveItem(item)
                  const key = (typeof item === 'string' ? item : item.text) + i

                  // Every rail item is now a button that opens the modal. The
                  // external-link icon (when href exists) is a sibling <a> so
                  // users can still jump straight to the source without going
                  // through the modal.
                  return (
                    <li key={key} className="relative">
                      <button
                        type="button"
                        onClick={() => openModal(resolved)}
                        aria-label={resolved.text}
                        className="block w-full text-left group hover:text-primary transition-colors duration-150 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <RailItemBody resolved={resolved} />
                      </button>
                      {resolved.href && (
                        <a
                          href={resolved.href}
                          target={resolved.href.startsWith('http') ? '_blank' : undefined}
                          rel={resolved.href.startsWith('http') ? 'noreferrer' : undefined}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-0.5 right-0 text-subtle hover:text-primary transition-colors p-1 -m-1"
                          title="Open original"
                          aria-label={`Open ${resolved.text} in a new tab`}
                        >
                          <ExternalLinkIcon />
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      {modal.open && modal.resolved && (
        <DetailModal modal={modal} onClose={close} weekStart={meta.weekStart} />
      )}
    </>
  )
}
