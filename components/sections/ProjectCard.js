import Card from '../ui/Card'
import Badge from '../ui/Badge'

const ProjectCard = ({ name, description, tech = [], href, year }) => (
  <Card glow>
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-lg font-bold text-white">{name}</h3>
      {year && <span className="text-muted text-xs font-mono">{year}</span>}
    </div>
    <p className="text-muted text-sm mb-4 leading-relaxed">{description}</p>
    {tech.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    )}
    {href && (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-primary text-sm hover:text-accent"
      >
        View on GitHub →
      </a>
    )}
  </Card>
)

export default ProjectCard
