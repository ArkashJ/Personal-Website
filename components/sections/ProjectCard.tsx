'use client'

import Badge from '@/components/ui/Badge'
import type { Project, WorkTool } from '@/lib/data'

const splitFirstTwoSentences = (text: string) => {
  const matches = text.match(/[^.!?]+[.!?]+(\s+|$)/g)
  if (!matches || matches.length <= 2) return text
  return matches.slice(0, 2).join('').trim()
}

type Props = (Project | WorkTool) & {
  onOpen?: () => void
}

const cardClasses =
  'group relative w-full text-left bg-surface border border-border p-6 flex flex-col h-full transition-[transform,border-color,box-shadow] duration-200 ease-out hover:border-primary/60 hover:-translate-y-1 hover:shadow-[0_0_40px_-12px_rgba(94,234,212,0.22)] cursor-pointer focus:outline-none focus-visible:border-primary'

const ProjectCard = (props: Props) => {
  const { name, description, tech, href, onOpen } = props
  const year = 'year' in props ? props.year : undefined
  const head = description ? splitFirstTwoSentences(description) : ''
  const isExternal = href ? /^https?:\/\//.test(href) : false

  // When no onOpen handler is supplied (e.g. embed on home page), fall back to
  // navigating to the GitHub href on card click — matches legacy behavior.
  const handleClick = () => {
    if (onOpen) {
      onOpen()
      return
    }
    if (href && typeof window !== 'undefined') {
      if (isExternal) window.open(href, '_blank', 'noopener,noreferrer')
      else window.location.href = href
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      data-project-card
      aria-label={onOpen ? `Open ${name} details` : `Open ${name}`}
      className={cardClasses}
    >
      <div className="flex items-start justify-between mb-3 gap-2 w-full">
        <h3 className="text-base font-bold text-text tracking-tight">{name}</h3>
        {year && (
          <span className="text-subtle text-[11px] font-mono uppercase tracking-wider whitespace-nowrap">
            {year}
          </span>
        )}
      </div>

      {head && <p className="text-muted text-sm mb-4 leading-relaxed">{head}</p>}

      {tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-primary text-xs uppercase tracking-widest group-hover:text-accent transition-colors">
          {onOpen ? 'Open details →' : 'View →'}
        </span>
        {onOpen && href ? (
          <a
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            onClick={(e) => e.stopPropagation()}
            className="font-mono text-subtle text-xs uppercase tracking-widest hover:text-primary transition-colors"
          >
            GitHub →
          </a>
        ) : !onOpen && !href ? (
          <span className="font-mono text-subtle text-xs uppercase tracking-widest">
            Internal / private
          </span>
        ) : null}
      </div>
    </button>
  )
}

export default ProjectCard
