import Link from 'next/link'
import { notFound } from 'next/navigation'
import MdxContent from '@/components/MdxContent'
import JsonLd from '@/components/seo/JsonLd'
import { articleSchema, breadcrumbSchema } from '@/lib/structured-data'
import { courseBySlug, allCourseSubPages } from '@/lib/coursework'
import { getCourseSubPagePost } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'

export const dynamicParams = false

export function generateStaticParams() {
  return allCourseSubPages().map((x) => ({ slug: x.courseSlug, sub: x.sub.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>
}) {
  const { slug, sub } = await params
  const c = courseBySlug(slug)
  const s = c?.subPages?.find((x) => x.slug === sub)
  if (!c || !s) return {}
  return buildMetadata({
    title: `${s.title} — ${c.code}`,
    description: s.description,
    path: `/coursework/${slug}/${sub}`,
    keywords: c.tech,
    type: 'article',
  })
}

export default async function CourseSubPage({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>
}) {
  const { slug, sub } = await params
  const c = courseBySlug(slug)
  const s = c?.subPages?.find((x) => x.slug === sub)
  if (!c || !s) return notFound()

  const source = await getCourseSubPagePost(c.semesterSlug, c.slug, s.slug)

  return (
    <article className="px-6 py-16 max-w-3xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Coursework', path: '/coursework' },
          { name: c.code, path: `/coursework/${c.slug}` },
          { name: s.title, path: `/coursework/${c.slug}/${s.slug}` },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: `${s.title} — ${c.code}`,
          description: s.description,
          date: c.semester,
          slug: `/coursework/${c.slug}/${s.slug}`,
          keywords: c.tech,
        })}
      />

      <Link
        href={`/coursework/${c.slug}`}
        className="text-primary hover:text-accent font-mono text-sm"
      >
        ← {c.code}: {c.title}
      </Link>

      <header className="mt-6 mb-8 pb-6 border-b border-border">
        <p className="font-mono text-[11px] text-subtle uppercase tracking-widest mb-2">
          {c.code} · {c.semester}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight leading-[1.1] mb-4">
          {s.title}
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed">{s.description}</p>
      </header>

      {source ? (
        <div className="prose-custom">
          <MdxContent source={source} />
        </div>
      ) : (
        <p className="text-muted text-sm">Coming soon.</p>
      )}
    </article>
  )
}
