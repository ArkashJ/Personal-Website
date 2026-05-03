import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { getAllItems, getAllWeeklyLogs } from '@/lib/weekly'
import { tagsByFrequency } from '@/lib/tags'
import TagFzf from '@/components/weekly/TagFzf'

export const metadata = buildMetadata({
  title: 'Weekly Logs — what I read, watched, built, and shipped',
  description:
    'A running, append-only weekly log of what I read, watched, learned, built, and shipped — one entry per ISO week.',
  path: '/weekly',
  keywords: ['weekly log', 'now page', 'changelog', 'arkash jain'],
})

const TOP_TAG_COUNT = 30

export default async function WeeklyIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag: activeTag } = await searchParams
  const logs = getAllWeeklyLogs()

  // Collect all items across all weekly logs to build the global tag frequency map
  const allItems = logs.flatMap((log) => getAllItems(log))
  const topTags = tagsByFrequency(allItems, (item) => item.tags).slice(0, TOP_TAG_COUNT)

  // Filter logs by active tag — include a log if any of its items contain the tag
  const filteredLogs = activeTag
    ? logs.filter((log) => getAllItems(log).some((item) => item.tags.includes(activeTag)))
    : logs

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Weekly', path: '/weekly' },
        ])}
      />
      <div className="px-6 py-16 max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Weekly"
          title="What I read, watched, and shipped"
          italicAccent="one entry per ISO week."
          description="Append-only running log. Higher cadence than /writing, narrower scope than /about."
          asH1
        />

        {/* Tag index */}
        {topTags.length > 0 && (
          <div className="mb-8 border border-border bg-surface p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                Browse by tag
              </span>
              {activeTag && (
                <Link
                  href="/weekly"
                  className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-primary transition-colors"
                >
                  × clear filter
                </Link>
              )}
            </div>

            {activeTag && (
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  Filtering by:
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary border border-primary/30 bg-primary/10 px-2 py-0.5">
                  {activeTag}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  — {filteredLogs.length} log{filteredLogs.length === 1 ? '' : 's'}
                </span>
              </div>
            )}

            <TagFzf tags={topTags} activeTag={activeTag} />
          </div>
        )}

        {/* Weekly log cards */}
        {filteredLogs.length === 0 ? (
          <div className="border border-border bg-surface p-8 text-center">
            <p className="text-muted text-sm">
              No weekly logs contain items tagged &ldquo;{activeTag}&rdquo;.
            </p>
            <Link
              href="/weekly"
              className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-primary hover:text-accent transition-colors"
            >
              Clear filter
            </Link>
          </div>
        ) : logs.length === 0 ? (
          <Card>
            <p className="text-muted text-sm">First log lands this Monday.</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredLogs.map((log) => {
              const total = getAllItems(log).length
              const summary = `${total} item${total === 1 ? '' : 's'}`

              return (
                <Link key={log.slug} href={`/weekly/${log.slug}`} className="block group">
                  <Card glow>
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        {log.slug}
                      </span>
                      <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                        {log.weekStart} → {log.weekEnd}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-text leading-tight group-hover:text-primary transition-colors duration-150">
                      {log.title}
                    </h2>
                    {log.description && (
                      <p className="text-muted text-sm mt-2 leading-relaxed">{log.description}</p>
                    )}
                    {summary && (
                      <p className="font-mono text-[11px] text-subtle mt-3 uppercase tracking-wider">
                        {summary}
                      </p>
                    )}
                    {log.tags && log.tags.length > 0 && (
                      <p className="font-mono text-[10px] text-subtle mt-3 uppercase tracking-wider">
                        {log.tags.length} tags · {log.tags.slice(0, 3).join(' · ')}
                        {log.tags.length > 3 ? ' …' : ''}
                      </p>
                    )}
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
