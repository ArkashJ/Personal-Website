import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { Project } from '@/lib/data'

const ProjectCard = ({ name, description, tech, href, year }: Project) => (
  <Card glow className="flex flex-col h-full">
    <div className="flex items-start justify-between mb-3 gap-2">
      <h3 className="text-base font-bold text-text tracking-tight">{name}</h3>
      {year && (
        <span className="text-subtle text-[11px] font-mono uppercase tracking-wider whitespace-nowrap">
          {year}
        </span>
      )}
    </div>
    <p className="text-muted text-sm mb-4 leading-relaxed flex-1">{description}</p>
    {tech.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    )}
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-primary text-xs hover:text-accent uppercase tracking-widest mt-auto"
      >
        View →
      </a>
    ) : (
      <span className="font-mono text-subtle text-xs uppercase tracking-widest mt-auto">
        Internal / private
      </span>
    )}
  </Card>
)

export default ProjectCard
