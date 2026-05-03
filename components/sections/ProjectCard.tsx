import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { Project } from '@/lib/data'

const ProjectCard = ({ name, description, tech, href, year, highlights, commands }: Project) => (
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
    {highlights && highlights.length > 0 && (
      <ul className="text-muted text-xs mb-4 space-y-1 list-disc list-inside marker:text-primary/50">
        {highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    )}
    {commands && commands.length > 0 && (
      <div className="mb-4 space-y-1">
        {commands.map((c) => (
          <pre
            key={c}
            className="font-mono text-[11px] text-primary/90 bg-surface/60 border border-border px-2 py-1 overflow-x-auto"
          >
            <code>$ {c}</code>
          </pre>
        ))}
      </div>
    )}
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
