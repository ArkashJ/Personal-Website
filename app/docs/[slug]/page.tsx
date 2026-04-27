import Link from 'next/link'
import { notFound } from 'next/navigation'
import DocsSidebar from '@/components/docs/DocsSidebar'
import MarkdownView from '@/components/docs/MarkdownView'
import JsonLd from '@/components/seo/JsonLd'
import { articleSchema, breadcrumbSchema } from '@/lib/structured-data'
import { getAllDocs, getDoc, getDocsByCategory } from '@/lib/docs'
import { buildMetadata } from '@/lib/metadata'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllDocs().map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) return {}
  return buildMetadata({
    title: `${doc.title} — Docs`,
    description: `Project documentation: ${doc.title}`,
    path: `/docs/${doc.slug}`,
  })
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) return notFound()
  const byCategory = getDocsByCategory()

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Docs', path: '/docs' },
          { name: doc.title, path: `/docs/${doc.slug}` },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: doc.title,
          description: `Project documentation: ${doc.title}`,
          date: new Date().toISOString().slice(0, 10),
          slug: `/docs/${doc.slug}`,
        })}
      />
      <Link
        href="/docs"
        className="font-mono text-primary text-xs hover:text-accent uppercase tracking-widest"
      >
        ← All Docs
      </Link>

      <div className="grid lg:grid-cols-[220px_1fr] gap-12 mt-8">
        <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pb-6">
          <DocsSidebar byCategory={byCategory} activeSlug={slug} />
        </aside>

        <main className="min-w-0">
          <div className="mb-6 pb-4 border-b border-border">
            <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">
              {doc.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight">{doc.title}</h1>
            <p className="font-mono text-xs text-subtle mt-2">{doc.path}</p>
          </div>

          <MarkdownView source={doc.source} />
        </main>
      </div>
    </div>
  )
}
