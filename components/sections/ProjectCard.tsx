import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { Project } from '@/lib/data'

const ProjectCard = ({ name, description, tech, href, year, highlights, commands }: Project) => {
  const hasDetails = (highlights && highlights.length > 0) || (commands && commands.length > 0)

  return (
    <Card glow className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-3 gap-2">
        <h3 className="text-base font-bold text-text tracking-tight">{name}</h3>
        {year && (
          <span className="text-subtle text-[11px] font-mono uppercase tracking-wider whitespace-nowrap">
            {year}
          </span>
        )}
      </div>

      {description && <p className="text-muted text-sm mb-4 leading-relaxed">{description}</p>}

      {hasDetails && (
        <details className="group/details mb-4">
          <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-widest text-primary hover:text-accent select-none list-none">
            <span className="group-open/details:hidden">Show details ▾</span>
            <span className="hidden group-open/details:inline">Hide details ▴</span>
          </summary>
          <div className="mt-3 space-y-3">
            {highlights && highlights.length > 0 && (
              <ul className="text-muted text-xs space-y-1 list-disc list-inside marker:text-primary/50">
                {highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            {commands && commands.length > 0 && (
              <div className="space-y-1">
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
          </div>
        </details>
      )}

      {tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      )}

      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="font-mono text-primary text-xs hover:text-accent uppercase tracking-widest"
        >
          View →
        </a>
      ) : (
        <span className="font-mono text-subtle text-xs uppercase tracking-widest">
          Internal / private
        </span>
      )}
    </Card>
  )
}

export default ProjectCard
