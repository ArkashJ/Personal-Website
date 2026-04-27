import Card from '@/components/ui/Card'
import Disclosure from '@/components/ui/Disclosure'
import InstitutionLogo, { hasLogo } from '@/components/ui/InstitutionLogo'
import type { ExperienceEntry } from '@/lib/data'

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-2">
    <span className="text-primary mt-1">›</span>
    <span>{children}</span>
  </li>
)

const ExperienceCard = ({ org, role, dates, location, bullets }: ExperienceEntry) => {
  const PREVIEW = 2
  const visible = bullets.slice(0, PREVIEW)
  const hidden = bullets.slice(PREVIEW)

  return (
    <Card glow>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
        <div className="flex items-start gap-3">
          {hasLogo(org) && (
            <span className="flex-shrink-0 mt-1 inline-flex items-center justify-center w-8 h-8 bg-elevated border border-border">
              <InstitutionLogo org={org} size={20} className="object-contain" />
            </span>
          )}
          <div>
            <h3 className="text-xl font-bold text-text">{role}</h3>
            <p className="text-primary font-mono text-sm">{org}</p>
          </div>
        </div>
        <div className="text-muted text-xs font-mono whitespace-nowrap">
          <div>{dates}</div>
          {location && <div>{location}</div>}
        </div>
      </div>
      {bullets.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-muted text-sm">
          {visible.map((b, i) => (
            <Bullet key={i}>{b}</Bullet>
          ))}
        </ul>
      )}
      {hidden.length > 0 && (
        <Disclosure collapsedLabel={`Show ${hidden.length} more`} expandedLabel="Show less">
          <ul className="space-y-1.5 text-muted text-sm">
            {hidden.map((b, i) => (
              <Bullet key={i}>{b}</Bullet>
            ))}
          </ul>
        </Disclosure>
      )}
    </Card>
  )
}

export default ExperienceCard
