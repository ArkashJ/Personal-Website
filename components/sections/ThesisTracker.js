import Card from '../ui/Card'
import Badge from '../ui/Badge'

const STATUS_VARIANT = { Active: 'cyan', Watching: 'teal', Closed: 'default' }

const ThesisTracker = ({ theses }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {theses.map((t) => (
      <Card key={t.title} glow>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-white font-bold">{t.title}</h3>
          <Badge variant={STATUS_VARIANT[t.status] || 'default'}>{t.status}</Badge>
        </div>
        <p className="text-muted text-sm leading-relaxed">{t.note}</p>
      </Card>
    ))}
  </div>
)

export default ThesisTracker
