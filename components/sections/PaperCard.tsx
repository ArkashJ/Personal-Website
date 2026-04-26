import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { Paper } from '@/lib/data'

const PaperCard = ({ title, journal, date, authors, abstract, url, featured = false }: Paper) => (
  <Card glow className={`flex flex-col ${featured ? 'border-primary/40' : ''}`}>
    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
      <Badge variant={featured ? 'cyan' : 'teal'}>{journal}</Badge>
      <span className="text-subtle text-[11px] font-mono uppercase tracking-wider">{date}</span>
    </div>
    <h3 className="text-lg md:text-xl font-bold text-text mb-2 leading-snug tracking-tight">
      {title}
    </h3>
    {authors && <p className="text-muted text-xs mb-3 font-mono">{authors}</p>}
    {abstract && <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{abstract}</p>}
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-primary text-xs hover:text-accent inline-flex items-center gap-1 uppercase tracking-widest mt-auto"
      >
        Read paper →
      </a>
    ) : (
      <span className="font-mono text-subtle text-xs uppercase tracking-widest mt-auto">
        Link forthcoming
      </span>
    )}
  </Card>
)

export default PaperCard
