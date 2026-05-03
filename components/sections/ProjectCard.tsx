import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { Project } from '@/lib/data'

const ProjectCard = ({ name, tech, href, year }: Project) => (
  <Card glow href={href} className="flex flex-col h-full">
    <div className="flex items-start justify-between mb-3 gap-2">
      <h3 className="text-base font-bold text-text tracking-tight">{name}</h3>
      {year && (
        <span className="text-subtle text-[11px] font-mono uppercase tracking-wider whitespace-nowrap">
          {year}
        </span>
      )}
    </div>
    {tech.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
        {tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    )}
    <span className="font-mono text-primary text-xs uppercase tracking-widest">
      {href ? 'View →' : 'Internal / private'}
    </span>
  </Card>
)

export default ProjectCard
