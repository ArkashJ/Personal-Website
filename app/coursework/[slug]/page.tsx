import Link from 'next/link'
import { notFound } from 'next/navigation'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import TechBadge from '@/components/ui/TechBadge'
import MdxContent from '@/components/MdxContent'
import JsonLd from '@/components/seo/JsonLd'
import { articleSchema, breadcrumbSchema } from '@/lib/structured-data'
import { COURSES, courseBySlug } from '@/lib/coursework'
import { getCoursePost } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'

export const dynamicParams = false

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = courseBySlug(slug)
  if (!c) return {}
  return buildMetadata({
    title: `${c.code}: ${c.title}`,
    description: c.summary,
    path: `/coursework/${slug}`,
    keywords: c.tech,
    type: 'article',
  })
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = courseBySlug(slug)
  if (!c) return notFound()

  const source = await getCoursePost(c.semesterSlug, c.slug)

  return (
    <article className="px-6 py-16 max-w-3xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Coursework', path: '/coursework' },
          { name: `${c.code}: ${c.title}`, path: `/coursework/${slug}` },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: `${c.code}: ${c.title}`,
          description: c.summary,
          date: c.semester,
          slug: `/coursework/${slug}`,
          keywords: c.tech,
        })}
      />

      <Link href="/coursework" className="text-primary hover:text-accent font-mono text-sm">
        ← Coursework
      </Link>

      <header className="mt-6 mb-8 pb-6 border-b border-border">
        <p className="font-mono text-[11px] text-subtle uppercase tracking-widest mb-2">
          {c.code} · {c.semester} · {c.university}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight leading-[1.1] mb-4">
          {c.title}
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed">{c.summary}</p>
      </header>

      {c.bullets.length > 0 && (
        <section className="mb-10">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
            ● What I built
          </h2>
          <ul className="space-y-2 list-none">
            {c.bullets.map((b, i) => (
              <li key={i} className="text-muted leading-relaxed pl-5 relative">
                <span className="absolute left-0 top-[10px] w-1.5 h-1.5 bg-primary/70 rounded-full" />
                {b}
              </li>
            ))}
          </ul>
        </section>
      )}

      {c.tech.length > 0 && (
        <section className="mb-10">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
            ● Stack
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {c.tech.map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </section>
      )}

      {c.subPages && c.subPages.length > 0 && (
        <section className="mb-10">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
            ● Deep dives
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {c.subPages.map((s) => (
              <Link key={s.slug} href={`/coursework/${c.slug}/${s.slug}`}>
                <Card glow className="h-full">
                  <h3 className="text-text font-bold tracking-tight mb-2">{s.title}</h3>
                  <p className="text-muted text-sm">{s.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {source && (
        <section className="mb-10 prose-custom">
          <MdxContent source={source} />
        </section>
      )}

      {c.papers && c.papers.length > 0 && (
        <section className="mb-10">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
            ● Papers
          </h2>
          <ul className="space-y-2">
            {c.papers.map((p) => (
              <li key={p.url}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent font-mono text-sm"
                >
                  → {p.title}
                </a>
                {p.authors && (
                  <span className="text-subtle text-xs ml-2 font-mono">
                    {p.authors} ({p.year})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {c.links && c.links.length > 0 && (
        <section className="mb-10">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
            ● Code
          </h2>
          <ul className="space-y-1.5">
            {c.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target={l.href.startsWith('/') ? undefined : '_blank'}
                  rel={l.href.startsWith('/') ? undefined : 'noopener noreferrer'}
                  className="text-primary hover:text-accent font-mono text-sm"
                >
                  → {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-subtle text-xs mt-12">
        <Badge>Note</Badge> Code excerpts illustrate concepts. Full homework solutions are not
        published.
      </p>
    </article>
  )
}
