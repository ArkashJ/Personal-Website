import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { LINKEDIN_POSTS, MEDIUM_ARTICLES } from '@/lib/media'
import type { WritingMeta } from '@/lib/content'

const formatDate = (iso: string) => {
  const d = new Date(iso.length === 7 ? `${iso}-01` : iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const CurrentUpdates = ({ writing }: { writing: WritingMeta[] }) => {
  const latestWriting = writing.slice(0, 2)
  const latestMedium = MEDIUM_ARTICLES.slice(0, 2)
  const latestLinkedIn = LINKEDIN_POSTS.slice(0, 3)

  return (
    <section className="px-6 py-10 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Now"
        title="Current updates"
        italicAccent="Latest writing, posts, and shipped work."
        href="/media"
        hrefLabel="See all media →"
      />

      {/* Writing + Medium row — link cards. */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 mb-6 reveal">
        {latestWriting.map((w) => (
          <Link
            key={w.slug}
            href={`/writing/${w.slug}`}
            className="block group press"
            aria-label={`Writing: ${w.title}`}
          >
            <Card glow className="h-full flex flex-col">
              <div className="flex items-center justify-between gap-3 mb-3">
                <Badge variant="teal">Writing</Badge>
                <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                  {formatDate(w.date)}
                </span>
              </div>
              <h3 className="text-sm font-bold text-text leading-snug mb-2 group-hover:text-primary transition-colors">
                {w.title}
              </h3>
              {w.description && (
                <p className="text-muted text-xs leading-relaxed line-clamp-3">{w.description}</p>
              )}
            </Card>
          </Link>
        ))}
        {latestMedium.map((m) => (
          <a
            key={m.url}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group press"
            aria-label={`Medium: ${m.title}`}
          >
            <Card glow className="h-full flex flex-col">
              <div className="flex items-center justify-between gap-3 mb-3">
                <Badge variant="cyan">Medium</Badge>
                <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                  {m.date && formatDate(m.date)}
                </span>
              </div>
              <h3 className="text-sm font-bold text-text leading-snug mb-2 group-hover:text-primary transition-colors">
                {m.title}
                <span className="ml-1 text-subtle">↗</span>
              </h3>
              {m.description && (
                <p className="text-muted text-xs leading-relaxed line-clamp-3">{m.description}</p>
              )}
            </Card>
          </a>
        ))}
      </div>

      {/* LinkedIn — preview cards. LinkedIn's embed iframe 404s for posts
          that haven't had "Embed this post" explicitly enabled, so render
          full cards that always work. /media shows iframe attempts. */}
      <div className="mt-2">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
            ● LinkedIn — recent posts
          </span>
          <a
            href="https://www.linkedin.com/in/arkashj/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted hover:text-primary press"
          >
            Follow on LinkedIn →
          </a>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {latestLinkedIn.map((p) => (
            <a
              key={p.urn}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group press"
              aria-label={`LinkedIn: ${p.title || 'post'}`}
            >
              <Card glow className="h-full flex flex-col">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <Badge>LinkedIn</Badge>
                  {p.date && (
                    <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                      {formatDate(p.date)}
                    </span>
                  )}
                </div>
                {p.title && (
                  <h3 className="text-sm font-bold text-text leading-snug mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                    <span className="ml-1 text-subtle">↗</span>
                  </h3>
                )}
                {p.excerpt && (
                  <p className="text-muted text-xs leading-relaxed line-clamp-4">{p.excerpt}</p>
                )}
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CurrentUpdates
