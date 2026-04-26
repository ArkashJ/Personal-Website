import Card from '../ui/Card'
import Badge from '../ui/Badge'

const PaperCard = ({ title, journal, date, authors, abstract, url, featured = false }) => (
  <Card glow className={featured ? 'border-primary/40' : ''}>
    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
      <Badge variant={featured ? 'cyan' : 'teal'}>{journal}</Badge>
      <span className="text-muted text-xs font-mono">{date}</span>
    </div>
    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{title}</h3>
    {authors && <p className="text-muted text-sm mb-3">{authors}</p>}
    {abstract && <p className="text-muted text-sm leading-relaxed mb-4">{abstract}</p>}
    {url && (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-primary text-sm hover:text-accent inline-flex items-center gap-1"
      >
        Read paper →
      </a>
    )}
  </Card>
)

export default PaperCard
