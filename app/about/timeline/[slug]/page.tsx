import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge from '@/components/ui/Badge'
import TechBadge from '@/components/ui/TechBadge'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema, articleSchema } from '@/lib/structured-data'
import { TIMELINE } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'

export const dynamicParams = false

export function generateStaticParams() {
  return TIMELINE.filter((t) => t.slug).map((t) => ({ slug: t.slug as string }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = TIMELINE.find((t) => t.slug === slug)
  if (!entry) return {}
  return buildMetadata({
    title: entry.title,
    description: entry.description,
    path: `/about/timeline/${slug}`,
    keywords: entry.tech,
    type: 'article',
  })
}

export default async function TimelineDeepDive({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = TIMELINE.find((t) => t.slug === slug)
  if (!entry) return notFound()

  return (
    <article className="px-6 py-16 max-w-3xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
          { name: entry.title, path: `/about/timeline/${slug}` },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: entry.title,
          description: entry.description,
          date: entry.date,
          slug: `/about/timeline/${slug}`,
          keywords: entry.tech,
        })}
      />

      <Link href="/about" className="text-primary hover:text-accent font-mono text-sm">
        ← Life Changelog
      </Link>

      <header className="mt-6 mb-8 pb-6 border-b border-border">
        <p className="font-mono text-[11px] text-subtle uppercase tracking-widest mb-2">
          {entry.date}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight leading-[1.1] mb-4">
          {entry.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          <Badge>{entry.category}</Badge>
          <Badge variant="teal">{entry.status}</Badge>
        </div>
      </header>

      <p className="text-muted text-base md:text-lg leading-relaxed mb-8">{entry.description}</p>

      {entry.bullets && entry.bullets.length > 0 && (
        <section className="mb-10">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
            ● What I shipped
          </h2>
          <ul className="space-y-2 list-none">
            {entry.bullets.map((b, i) => (
              <li key={i} className="text-muted leading-relaxed pl-5 relative">
                <span className="absolute left-0 top-[10px] w-1.5 h-1.5 bg-primary/70 rounded-full" />
                {b}
              </li>
            ))}
          </ul>
        </section>
      )}

      {entry.tech && entry.tech.length > 0 && (
        <section className="mb-10">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
            ● Stack
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {entry.tech.map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </section>
      )}

      {entry.links && entry.links.length > 0 && (
        <section className="mb-10">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
            ● Links
          </h2>
          <ul className="space-y-1.5">
            {entry.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith('/') ? undefined : '_blank'}
                  rel={link.href.startsWith('/') ? undefined : 'noopener noreferrer'}
                  className="text-primary hover:text-accent font-mono text-sm"
                >
                  → {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
