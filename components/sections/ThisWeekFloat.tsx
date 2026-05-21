import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { getAllWeeklyLogs, getAllItems } from '@/lib/weekly'

function formatDateRange(weekStart: string, weekEnd: string) {
  // Parse YYYY-MM-DD as local-time to avoid UTC-shift off-by-one.
  const fmt = (d: string) => {
    const m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (!m) return d
    const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
  return `${fmt(weekStart)} → ${fmt(weekEnd)}`
}

export default function ThisWeekFloat() {
  const [latest] = getAllWeeklyLogs()
  if (!latest) return null

  const items = getAllItems(latest)
  const itemCount = items.length
  const topTags = latest.tags?.slice(0, 4) ?? []
  const previewItems = items.slice(0, 3)

  return (
    <section className="relative px-6 py-12 max-w-5xl mx-auto">
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15 blur-xl opacity-70" />

        <Link
          href={`/weekly/${latest.slug}`}
          className="group relative block bg-surface border border-border-strong shadow-[0_25px_60px_-20px_rgba(0,0,0,0.55),0_8px_22px_-12px_rgba(94,234,212,0.18)] transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.65),0_10px_28px_-10px_rgba(94,234,212,0.28)]"
        >
          <div className="absolute -top-3 left-6 inline-flex items-center gap-2 bg-bg border border-primary/60 px-3 py-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
              This week in repo
            </span>
          </div>

          <div className="p-6 md:p-8 pt-7 md:pt-9">
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {latest.slug}
              </span>
              <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                {formatDateRange(latest.weekStart, latest.weekEnd)}
              </span>
            </div>

            <h3 className="text-lg md:text-2xl font-bold text-text leading-tight group-hover:text-primary transition-colors duration-150 mb-3">
              {latest.title}
            </h3>

            {latest.description && (
              <p className="text-muted text-sm md:text-[15px] leading-relaxed line-clamp-2 mb-5">
                {latest.description}
              </p>
            )}

            {previewItems.length > 0 && (
              <ul className="grid gap-1.5 mb-5">
                {previewItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-2 text-sm text-muted line-clamp-1"
                  >
                    <span
                      className="font-mono text-[9px] uppercase tracking-widest text-primary/80 mt-1 w-14 shrink-0"
                      aria-hidden
                    >
                      {item.rail}
                    </span>
                    <span className="truncate">{item.text}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center gap-3 flex-wrap pt-3 border-t border-border">
              {itemCount > 0 && (
                <span className="font-mono text-[10px] text-subtle uppercase tracking-wider">
                  {itemCount} item{itemCount === 1 ? '' : 's'}
                </span>
              )}
              {topTags.map((tag) => (
                <Badge key={tag} variant="teal">
                  {tag}
                </Badge>
              ))}
              {(latest.tags?.length ?? 0) > 4 && (
                <span className="font-mono text-[10px] text-subtle">
                  +{(latest.tags?.length ?? 0) - 4} more
                </span>
              )}
              <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-primary group-hover:text-accent transition-colors">
                Read the log →
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
