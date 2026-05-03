import { getAllItems, type WeeklyLogMeta } from '@/lib/weekly-types'

type Props = {
  meta: WeeklyLogMeta
  filterDate?: string
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDay(iso: string): string {
  const [, m, d] = iso.split('-')
  const mi = parseInt(m, 10) - 1
  return `${MONTHS[mi] ?? m} ${parseInt(d, 10)}`
}

export default function WeeklyBullets({ meta, filterDate }: Props) {
  const items = getAllItems(meta).filter((it) => {
    if (filterDate && it.date !== filterDate) return false
    return Boolean(it.bullets && it.bullets.length > 0)
  })
  if (items.length === 0) return null

  const totalPoints = items.reduce((acc, it) => acc + (it.bullets?.length ?? 0), 0)

  return (
    <section className="mb-10 border-t border-b border-border py-6">
      <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
          TL;DR · the week in {totalPoints} point{totalPoints === 1 ? '' : 's'}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
          {items.length} item{items.length === 1 ? '' : 's'}
          {filterDate ? ` · ${formatDay(filterDate)}` : ''}
        </p>
      </div>
      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.id}>
            <div className="flex items-baseline gap-2 mb-2 flex-wrap">
              {item.date && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary/80">
                  {formatDay(item.date)}
                </span>
              )}
              {item.source && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  {item.source}
                </span>
              )}
              <p className="text-sm font-semibold text-text leading-snug">{item.text}</p>
            </div>
            <ul className="list-disc list-outside ml-5 space-y-1">
              {(item.bullets ?? []).map((b, i) => (
                <li key={i} className="text-sm text-muted leading-relaxed">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
