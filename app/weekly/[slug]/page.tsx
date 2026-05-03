import Image from 'next/image'
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
  type WeeklyItem,
  type WeeklyLogMeta,
} from '@/lib/weekly'
import { resolveItem } from '@/lib/weekly-render'

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

type RailKey = 'read' | 'watched' | 'built' | 'shipped' | 'learned' | 'met'

const RAILS: { key: RailKey; label: string }[] = [
  { key: 'read', label: 'Read' },
  { key: 'watched', label: 'Watched' },
  { key: 'built', label: 'Built' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'learned', label: 'Learned' },
  { key: 'met', label: 'Met' },
]

function RailItemBody({ resolved }: { resolved: ReturnType<typeof resolveItem> }) {
  const { text, image, source } = resolved
  const isYouTubeThumb = image?.includes('ytimg.com')
  return (
    <div className="flex items-start gap-3">
      {image &&
        (isYouTubeThumb ? (
          <Image
            src={image}
            alt=""
            width={64}
            height={36}
            className="flex-shrink-0 mt-0.5 border border-border object-cover"
            unoptimized
          />
        ) : (
          <Image
            src={image}
            alt=""
            width={16}
            height={16}
            className="flex-shrink-0 mt-1"
            unoptimized
          />
        ))}
      <div className="min-w-0">
        <p className="text-sm text-text leading-snug">{text}</p>
        {source && (
          <p className="font-mono text-[10px] uppercase tracking-wider text-subtle mt-0.5">
            {source}
          </p>
        )}
      </div>
    </div>
  )
}

function Rail({ label, items }: { label: string; items?: WeeklyItem[] }) {
  if (!items || items.length === 0) return null
  return (
    <div className="border border-border bg-surface p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">{label}</p>
      <ul className="space-y-3">
        {items.map((item, i) => {
          const resolved = resolveItem(item)
          const key = (typeof item === 'string' ? item : item.text) + i
          if (resolved.href) {
            const external = resolved.href.startsWith('http')
            return (
              <li key={key}>
                <a
                  href={resolved.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="block group hover:text-primary transition-colors duration-150"
                >
                  <RailItemBody resolved={resolved} />
                </a>
              </li>
            )
          }
          return (
            <li key={key}>
              <RailItemBody resolved={resolved} />
            </li>
          )
        })}
      </ul>
    </div>
  )
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

      <div className="grid gap-3 md:grid-cols-2 mb-10">
        {RAILS.map((r) => (
          <Rail key={r.key} label={r.label} items={meta[r.key]} />
        ))}
      </div>

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
