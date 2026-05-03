import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CopyForLlm from '@/components/ui/CopyForLlm'
import { buildMetadata } from '@/lib/metadata'
import { getAllWeeklyLogs, getWeeklyLog } from '@/lib/weekly'
import { getAllItems } from '@/lib/weekly-types'

import { WeeklyGrid } from '../WeeklyGrid'

export const dynamicParams = false

export async function generateStaticParams() {
  const params: { slug: string; date: string }[] = []
  for (const log of getAllWeeklyLogs()) {
    const dates = new Set<string>()
    for (const item of getAllItems(log)) if (item.date) dates.add(item.date)
    for (const date of dates) params.push({ slug: log.slug, date })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; date: string }>
}) {
  const { slug, date } = await params
  const post = await getWeeklyLog(slug)
  if (!post) return {}
  return buildMetadata({
    title: `${post.meta.title} — ${date}`,
    description: post.meta.description ?? `Weekly log for ${slug} on ${date}.`,
    path: `/weekly/${slug}/${date}`,
  })
}

function extractSections(source: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const parts = source.split(/<div id="([^"]+)"><\/div>/)
  for (let i = 1; i < parts.length; i += 2) {
    const id = parts[i]
    let content = parts[i + 1] ?? ''
    content = content.replace(/\n---\s*$/, '').trim()
    sections[id] = content
  }
  return sections
}

export default async function WeeklyDayPage({
  params,
}: {
  params: Promise<{ slug: string; date: string }>
}) {
  const { slug, date } = await params
  const post = await getWeeklyLog(slug)
  if (!post) return notFound()
  const meta = post.meta
  const sections = extractSections(post.source)
  // Confirm the date actually has items in this week.
  const hasItems = getAllItems(meta).some((it) => it.date === date)
  if (!hasItems) return notFound()

  return (
    <article className="px-6 py-16 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-3">
        <Link href={`/weekly/${slug}`} className="text-primary hover:text-accent font-mono text-sm">
          ← {slug}
        </Link>
        <CopyForLlm rawUrl={`/weekly/${slug}/raw`} />
      </div>

      <p className="font-mono text-[11px] uppercase tracking-widest text-primary mt-6">
        {slug} · {date}
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-text mt-2 mb-3">{meta.title}</h1>
      <p className="text-muted text-sm font-mono mb-6">
        Day view · {meta.weekStart} → {meta.weekEnd}
      </p>
      {meta.description && (
        <p className="text-muted text-lg leading-relaxed mb-8">{meta.description}</p>
      )}

      <Suspense fallback={<div className="h-32" />}>
        <WeeklyGrid meta={meta} sections={sections} initialDate={date} />
      </Suspense>
    </article>
  )
}
