'use client'

import { useEffect, useCallback } from 'react'
import type { Project, WorkTool } from '@/lib/data'

type ProjectLike = Project | WorkTool

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

export default function ProjectDetailModal({
  project,
  onClose,
}: {
  project: ProjectLike | null
  onClose: () => void
}) {
  const close = useCallback(() => onClose(), [onClose])

  useEffect(() => {
    if (!project) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [project, close])

  if (!project) return null

  const year = 'year' in project ? project.year : undefined
  const highlights = project.highlights ?? []
  const commands = project.commands ?? []
  const isExternal = project.href ? /^https?:\/\//.test(project.href) : false

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="fixed inset-x-4 top-[5vh] bottom-[5vh] z-50 max-w-2xl mx-auto flex flex-col border border-border bg-background shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start gap-3 p-5 border-b border-border flex-shrink-0">
          <div className="min-w-0 flex-1">
            <h2
              id="project-modal-title"
              className="text-base font-semibold text-text leading-snug tracking-tight"
            >
              {project.name}
            </h2>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              {year && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  {year}
                </span>
              )}
              {project.href && (
                <a
                  href={project.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="font-mono text-[10px] uppercase tracking-wider text-primary hover:text-accent flex items-center gap-1 transition-colors"
                >
                  View on GitHub <ExternalLinkIcon />
                </a>
              )}
            </div>
          </div>
          <button
            onClick={close}
            className="flex-shrink-0 text-subtle hover:text-text transition-colors p-1 -mr-1 -mt-1"
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
        <div className="overflow-y-auto flex-1 p-5 space-y-5">
          {project.description && (
            <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          )}

          {highlights.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                Highlights
              </p>
              <ul className="space-y-1.5 list-disc list-outside ml-4 marker:text-primary/50">
                {highlights.map((h) => (
                  <li key={h} className="text-sm text-muted leading-relaxed">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {commands.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                Run it
              </p>
              <div className="space-y-1">
                {commands.map((c) => (
                  <pre
                    key={c}
                    className="font-mono text-[11px] text-primary/90 bg-surface border border-border px-2.5 py-1.5 overflow-x-auto"
                  >
                    <code>$ {c}</code>
                  </pre>
                ))}
              </div>
            </div>
          )}

          {project.tech.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                Tech
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 border border-border text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.href && (
            <div className="pt-2">
              <a
                href={project.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:text-accent border border-primary/60 hover:border-accent px-3 py-2 transition-colors"
              >
                View on GitHub <ExternalLinkIcon />
              </a>
            </div>
          )}

          {!project.href && (
            <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
              Internal / private
            </p>
          )}
        </div>
      </div>
    </>
  )
}
