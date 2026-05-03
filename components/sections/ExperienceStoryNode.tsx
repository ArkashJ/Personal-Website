import Link from 'next/link'
import type { ReactNode } from 'react'
import InstitutionLogo, { hasLogo } from '@/components/ui/InstitutionLogo'
import Badge from '@/components/ui/Badge'
import Disclosure from '@/components/ui/Disclosure'
import type { ExperienceEntry } from '@/lib/data'

const Bullet = ({ children }: { children: ReactNode }) => (
  <li className="flex gap-2">
    <span className="text-primary mt-1">›</span>
    <span>{children}</span>
  </li>
)

const ExperienceStoryNode = ({
  org,
  role,
  dates,
  location,
  story,
  stats,
  tech,
  links,
  bullets,
}: ExperienceEntry) => {
  return (
    <li className="relative pl-14 pb-12 border-l border-border last:border-l-transparent reveal">
      {/* Timeline node */}
      <span className="absolute -left-[18px] top-5 w-9 h-9 bg-elevated border-2 border-primary shadow-[0_0_0_4px_rgba(94,234,212,0.10)] overflow-hidden flex items-center justify-center rounded-md">
        {org && hasLogo(org) ? (
          <InstitutionLogo org={org} size={28} className="object-contain p-0.5" />
        ) : (
          <span className="w-2 h-2 bg-primary rounded-full" />
        )}
      </span>

      <div className="bg-surface border border-primary/30 p-6 hover:border-primary transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-bold text-text leading-snug">{role}</h3>
            <p className="text-primary font-mono text-sm mt-0.5">{org}</p>
          </div>
          <div className="text-muted text-xs font-mono whitespace-nowrap shrink-0">
            <div>{dates}</div>
            {location && <div>{location}</div>}
          </div>
        </div>

        {/* Story */}
        {story && (
          <p className="text-muted text-sm leading-relaxed mb-5 border-l-2 border-primary/30 pl-4">
            {story}
          </p>
        )}

        {/* Stats row */}
        {stats && stats.length > 0 && (
          <dl className="flex flex-wrap gap-3 mb-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center px-3 py-2 border border-primary/20 bg-elevated min-w-[80px]"
              >
                <dt className="text-muted text-[10px] font-mono uppercase tracking-widest">
                  {s.label}
                </dt>
                <dd className="text-primary font-mono text-lg font-bold leading-tight mt-0.5">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {/* Tech badges */}
        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tech.map((t) => (
              <Badge key={t} variant="teal">
                {t}
              </Badge>
            ))}
          </div>
        )}

        {/* Disclosure for bullets */}
        {bullets && bullets.length > 0 && (
          <Disclosure collapsedLabel="Show details" expandedLabel="Hide details">
            <ul className="space-y-1.5 text-muted text-sm">
              {bullets.map((b, i) => (
                <Bullet key={i}>{b}</Bullet>
              ))}
            </ul>
          </Disclosure>
        )}

        {/* External links */}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-primary hover:text-accent transition-colors"
              >
                {l.label} →
              </Link>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}

export default ExperienceStoryNode
