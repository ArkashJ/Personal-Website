import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge from '@/components/ui/Badge'
import CopyForLlm from '@/components/ui/CopyForLlm'
import { buildMetadata } from '@/lib/metadata'
import { getAllWeeklyLogs, getWeeklyLog, type WeeklyLogMeta } from '@/lib/weekly'
import { findReleaseInWeek } from '@/lib/changelog-md'
import { getCommitsForWeek } from '@/lib/git-changelog'
import { WeeklyGrid } from './WeeklyGrid'
import WeeklyBullets from '@/components/weekly/WeeklyBullets'
import WeeklyTimeline from '@/components/weekly/WeeklyTimeline'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllWeeklyLogs().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getWeeklyLog(slug)
  if (!post) return {}
  return buildMetadata({
    title: `${post.meta.title} — ${slug}`,
    description: post.meta.description ?? `Weekly log for ${slug}.`,
    path: `/weekly/${slug}`,
  })
}

// Splits MDX source on <div id="..."></div> markers and returns a map of
// anchor id → markdown content for that section.
function extractSections(source: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const parts = source.split(/<div id="([^"]+)"><\/div>/)
  for (let i = 1; i < parts.length; i += 2) {
    const id = parts[i]
    let content = parts[i + 1] ?? ''
    // Trim trailing --- separator (leads into the next section intro or closing prose)
    content = content.replace(/\n---\s*$/, '').trim()
    sections[id] = content
  }
  return sections
}

export default async function WeeklyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getWeeklyLog(slug)
  if (!post) return notFound()
  const meta: WeeklyLogMeta = post.meta
  const sections = extractSections(post.source)
  const changelogRelease = findReleaseInWeek(meta.weekStart, meta.weekEnd)

  return (
    <article className="px-6 py-16 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-3">
        <Link href="/weekly" className="text-primary hover:text-accent font-mono text-sm">
          ← Weekly
        </Link>
        <CopyForLlm rawUrl={`/weekly/${meta.slug}/raw`} />
      </div>

      <p className="font-mono text-[11px] uppercase tracking-widest text-primary mt-6">
        {meta.slug}
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-text mt-2 mb-3">{meta.title}</h1>

      {/* CHANGELOG badge — shown when a release date falls inside this week */}
      {changelogRelease && (
        <div className="mb-3">
          <Link
            href={`/changelog#${changelogRelease.id}`}
            className="inline-flex items-center gap-1.5 group"
          >
            <Badge variant="green">Released in CHANGELOG: v{changelogRelease.version}</Badge>
            <span className="font-mono text-[10px] text-subtle group-hover:text-primary transition-colors">
              →
            </span>
          </Link>
        </div>
      )}
      <p className="text-muted text-sm font-mono mb-6">
        {meta.weekStart} → {meta.weekEnd}
      </p>
      {meta.description && (
        <p className="text-muted text-lg leading-relaxed mb-8">{meta.description}</p>
      )}

      {/* Cards first — visual scan / click-through */}
      <Suspense fallback={<div className="h-32" />}>
        <WeeklyGrid meta={meta} sections={sections} />
      </Suspense>

      {/* TL;DR digest after the cards */}
      <WeeklyBullets meta={meta} />

      {/* Unified timeline: git commits + curated changelog notes */}
      <WeeklyTimeline
        changelog={meta.changelog}
        commits={getCommitsForWeek(meta.weekStart, meta.weekEnd)}
      />
    </article>
  )
}
