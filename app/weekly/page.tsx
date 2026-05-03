import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { getAllWeeklyLogs, categoryCounts } from '@/lib/weekly'

export const metadata = buildMetadata({
  title: 'Weekly Logs — what I read, watched, built, and shipped',
  description:
    'A running, append-only weekly log of what I read, watched, learned, built, and shipped — one entry per ISO week.',
  path: '/weekly',
  keywords: ['weekly log', 'now page', 'changelog', 'arkash jain'],
})

export default function WeeklyIndexPage() {
  const logs = getAllWeeklyLogs()

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

        {logs.length === 0 ? (
          <Card>
            <p className="text-muted text-sm">First log lands this Monday.</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {logs.map((log) => {
              const counts = categoryCounts(log)
              const summary = [
                counts.read && `${counts.read} read`,
                counts.watched && `${counts.watched} watched`,
                counts.built && `${counts.built} built`,
                counts.shipped && `${counts.shipped} shipped`,
                counts.learned && `${counts.learned} learned`,
                counts.met && `${counts.met} met`,
              ]
                .filter(Boolean)
                .join(' · ')

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
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {log.tags.map((t) => (
                          <Badge key={t} variant="teal">
                            {t}
                          </Badge>
                        ))}
                      </div>
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
