import Link from 'next/link'
import { notFound } from 'next/navigation'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import MdxContent from '@/components/MdxContent'
import { buildMetadata } from '@/lib/metadata'
import {
  getAllWeeklyLogs,
  getWeeklyLog,
  type ChangelogEntry,
  type WeeklyLogMeta,
} from '@/lib/weekly'
import { WeeklyRails } from './WeeklyRails'

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

function Changelog({ entries }: { entries?: ChangelogEntry[] }) {
  if (!entries || entries.length === 0) return null
  const sorted = [...entries].sort((a, b) => (a.date < b.date ? 1 : -1))
  return (
    <section className="mt-12 border-t border-border pt-8">
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4">
        Changelog · live
      </p>
      <ol className="space-y-3">
        {sorted.map((e, i) => (
          <li key={`${e.date}-${i}`} className="flex gap-4 text-sm">
            <time className="font-mono text-[11px] text-subtle whitespace-nowrap pt-0.5 w-24 flex-shrink-0">
              {e.date}
            </time>
            <p className="text-muted leading-relaxed">
              {e.href ? (
                <a
                  href={e.href}
                  target={e.href.startsWith('http') ? '_blank' : undefined}
                  rel={e.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="text-text hover:text-primary transition-colors"
                >
                  {e.note}
                </a>
              ) : (
                e.note
              )}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default async function WeeklyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getWeeklyLog(slug)
  if (!post) return notFound()
  const meta: WeeklyLogMeta = post.meta
  const sections = extractSections(post.source)

  return (
    <article className="px-6 py-16 max-w-3xl mx-auto">
      <Link href="/weekly" className="text-primary hover:text-accent font-mono text-sm">
        ← Weekly
      </Link>

      <p className="font-mono text-[11px] uppercase tracking-widest text-primary mt-6">
        {meta.slug}
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-text mt-2 mb-3">{meta.title}</h1>
      <p className="text-muted text-sm font-mono mb-2">
        {meta.weekStart} → {meta.weekEnd}
      </p>
      {meta.tags && meta.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {meta.tags.map((t) => (
            <Badge key={t} variant="teal">
              {t}
            </Badge>
          ))}
        </div>
      )}
      {meta.description && (
        <p className="text-muted text-lg leading-relaxed mb-8">{meta.description}</p>
      )}

      {/* Client component: rails grid + modal */}
      <WeeklyRails meta={meta} sections={sections} />

      {/* Prose body — linear reading and SEO */}
      {post.source ? (
        <div className="prose-custom">
          <MdxContent source={post.source} />
        </div>
      ) : (
        <Card>
          <p className="text-muted text-sm">Notes coming soon.</p>
        </Card>
      )}

      <Changelog entries={meta.changelog} />
    </article>
  )
}
