import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { getAllWeeklyLogs, getAllItems } from '@/lib/weekly'

const PAGE_SIZE = 5

function formatDateRange(weekStart: string, weekEnd: string) {
  const fmt = (d: string) => {
    const date = new Date(d)
    if (Number.isNaN(date.getTime())) return d
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  return `${fmt(weekStart)} → ${fmt(weekEnd)}`
}

type RollingLogProps = {
  page?: number
}

export default function RollingLog({ page = 1 }: RollingLogProps) {
  const allLogs = getAllWeeklyLogs()
  const totalPages = Math.max(1, Math.ceil(allLogs.length / PAGE_SIZE))

  // Clamp page into valid range
  const safePage = Math.min(Math.max(1, page), totalPages)

  const start = (safePage - 1) * PAGE_SIZE
  const logs = allLogs.slice(start, start + PAGE_SIZE)

  const isEmpty = logs.length === 0

  return (
    <section className="px-6 py-10 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="This Week"
        title="Weekly updates"
        italicAccent="rolling log."
        href="/weekly"
        hrefLabel="All weeks →"
      />

      {isEmpty ? (
        <Card>
          <p className="text-muted text-sm mb-3">No entries on this page.</p>
          <Link
            href="/?page=1"
            className="font-mono text-[11px] uppercase tracking-widest text-primary hover:text-accent transition-colors"
          >
            ← Back to page 1
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4">
          {logs.map((log) => {
            const itemCount = getAllItems(log).length
            const topTags = log.tags?.slice(0, 3) ?? []

            return (
              <Link key={log.slug} href={`/weekly/${log.slug}`} className="block group">
                <Card glow>
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                      {log.slug}
                    </span>
                    <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                      {formatDateRange(log.weekStart, log.weekEnd)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-text leading-tight group-hover:text-primary transition-colors duration-150 mb-1">
                    {log.title}
                  </h3>
                  {log.description && (
                    <p className="text-muted text-sm leading-relaxed line-clamp-1 mb-3">
                      {log.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 flex-wrap">
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
                    {(log.tags?.length ?? 0) > 3 && (
                      <span className="font-mono text-[10px] text-subtle">
                        +{(log.tags?.length ?? 0) - 3} more
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary mt-3 group-hover:text-accent transition-colors">
                    Read the log →
                  </p>
                </Card>
              </Link>
            )
          })}
        </div>
      )}

      {/* Pagination controls — only show when there are multiple pages */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Weekly log pages">
          {/* Prev */}
          {safePage > 1 ? (
            <Link
              href={`/?page=${safePage - 1}`}
              className="font-mono text-[11px] uppercase tracking-widest text-primary hover:text-accent transition-colors px-2"
              aria-label="Previous page"
            >
              «
            </Link>
          ) : (
            <span className="font-mono text-[11px] text-subtle px-2 cursor-not-allowed">«</span>
          )}

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={`/?page=${n}`}
              className={`font-mono text-[11px] uppercase tracking-widest px-2 transition-colors ${
                n === safePage ? 'text-text font-bold' : 'text-subtle hover:text-primary'
              }`}
              aria-current={n === safePage ? 'page' : undefined}
            >
              {n}
            </Link>
          ))}

          {/* Next */}
          {safePage < totalPages ? (
            <Link
              href={`/?page=${safePage + 1}`}
              className="font-mono text-[11px] uppercase tracking-widest text-primary hover:text-accent transition-colors px-2"
              aria-label="Next page"
            >
              »
            </Link>
          ) : (
            <span className="font-mono text-[11px] text-subtle px-2 cursor-not-allowed">»</span>
          )}
        </nav>
      )}
    </section>
  )
}
