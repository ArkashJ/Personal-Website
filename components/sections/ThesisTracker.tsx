import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { Thesis } from '@/lib/finance'

const STATUS_VARIANT: Record<Thesis['status'], 'cyan' | 'teal' | 'default'> = {
  Active: 'cyan',
  Watching: 'teal',
  Closed: 'default',
}

const ThesisTracker = ({ theses }: { theses: Thesis[] }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {theses.map((t) => (
      <Card key={t.title} glow>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-white font-bold">{t.title}</h3>
          <Badge variant={STATUS_VARIANT[t.status]}>{t.status}</Badge>
        </div>
        <p className="text-muted text-sm leading-relaxed">{t.note}</p>
      </Card>
    ))}
  </div>
)

export default ThesisTracker
