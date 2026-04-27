import Card from '@/components/ui/Card'
import type { ExperienceEntry } from '@/lib/data'

const ExperienceCard = ({ org, role, dates, location, bullets }: ExperienceEntry) => (
  <Card glow>
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
      <div>
        <h3 className="text-xl font-bold text-text">{role}</h3>
        <p className="text-primary font-mono text-sm">{org}</p>
      </div>
      <div className="text-muted text-xs font-mono whitespace-nowrap">
        <div>{dates}</div>
        {location && <div>{location}</div>}
      </div>
    </div>
    {bullets.length > 0 && (
      <ul className="mt-4 space-y-1.5 text-muted text-sm">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-primary mt-1">›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    )}
  </Card>
)

export default ExperienceCard
