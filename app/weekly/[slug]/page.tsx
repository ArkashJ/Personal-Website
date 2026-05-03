import Link from 'next/link'
import { notFound } from 'next/navigation'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import MdxContent from '@/components/MdxContent'
import { buildMetadata } from '@/lib/metadata'
import { getAllWeeklyLogs, getWeeklyLog, type WeeklyLogMeta } from '@/lib/weekly'

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

function Rail({ label, items }: { label: string; items?: string[] }) {
  if (!items || items.length === 0) return null
  return (
    <div className="border border-border bg-surface p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">{label}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-muted leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
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
    </article>
  )
}
