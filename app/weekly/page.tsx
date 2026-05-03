import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { getAllItems, getAllWeeklyLogs } from '@/lib/weekly'
import { tagsByFrequency } from '@/lib/tags'
import TagFzf from '@/components/weekly/TagFzf'
import WeekCard from '@/components/weekly/WeekCard'

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

  const itemsByLog = new Map(logs.map((log) => [log.slug, getAllItems(log)]))
  const allItems = Array.from(itemsByLog.values()).flat()
  const topTags = tagsByFrequency(allItems, (item) => item.tags).slice(0, TOP_TAG_COUNT)

  const filteredLogs = activeTag
    ? logs.filter((log) => itemsByLog.get(log.slug)!.some((item) => item.tags.includes(activeTag)))
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
              const items = itemsByLog.get(log.slug)!
              const datesSet = new Set<string>()
              for (const it of items) if (it.date) datesSet.add(it.date)
              const dates = Array.from(datesSet).sort()
              return <WeekCard key={log.slug} log={log} itemCount={items.length} dates={dates} />
            })}
          </div>
        )}
      </div>
    </>
  )
}
