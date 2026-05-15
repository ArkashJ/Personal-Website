import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import MdxContent from '@/components/MdxContent'
import JsonLd from '@/components/seo/JsonLd'
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
  collectionPageSchema,
} from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { TOPICS, getTopic, type SpokeRef } from '@/lib/topics'

export const dynamicParams = false

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) return {}
  return buildMetadata({
    title: topic.h1,
    description: topic.description,
    path: `/topics/${slug}`,
    keywords: topic.keywords,
    type: 'article',
  })
}

function SpokeSection({ title, items }: { title: string; items: SpokeRef[] }) {
  if (!items || items.length === 0) return null
  return (
    <section className="mt-10">
      <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => {
          const isExternal = /^https?:\/\//.test(item.path)
          return (
            <li
              key={item.path}
              className="border-l-2 border-border pl-4 hover:border-primary transition-colors"
            >
              <a
                href={item.path}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-text font-medium hover:text-primary"
              >
                {item.label}
                {isExternal && item.source ? (
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-subtle">
                    {item.source} ↗
                  </span>
                ) : null}
              </a>
              {item.description ? (
                <p className="text-sm text-muted mt-1">{item.description}</p>
              ) : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default async function TopicHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) return notFound()

  const flatSpokes: { name: string; path: string; description?: string }[] = []
  for (const list of Object.values(topic.related)) {
    if (!list) continue
    for (const ref of list) {
      flatSpokes.push({ name: ref.label, path: ref.path, description: ref.description })
    }
  }

  return (
    <article className="px-6 py-16 max-w-3xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Topics', path: '/topics' },
          { name: topic.name, path: `/topics/${topic.slug}` },
        ])}
      />
      <JsonLd
        data={collectionPageSchema({
          title: topic.h1,
          description: topic.description,
          path: `/topics/${topic.slug}`,
          itemCount: flatSpokes.length,
        })}
      />
      <JsonLd data={faqSchema(topic.faqs)} />
      <JsonLd data={itemListSchema(`${topic.name} — related content`, flatSpokes)} />

      <Link href="/topics" className="text-primary hover:text-accent font-mono text-sm">
        ← Topics
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-text mt-6 mb-3 leading-tight">
        {topic.h1}
      </h1>
      <p className="text-muted text-base leading-relaxed mb-8">{topic.description}</p>

      <div className="prose prose-invert max-w-none">
        <MdxContent source={topic.intro} />
      </div>

      <SpokeSection title="Projects" items={topic.related.projects ?? []} />
      <SpokeSection title="Writing" items={topic.related.writing ?? []} />
      <SpokeSection title="Weekly logs" items={topic.related.weekly ?? []} />
      <SpokeSection title="Claude skills" items={topic.related.skills ?? []} />
      <SpokeSection title="External sources" items={topic.related.external ?? []} />

      <section className="mt-14 border-t border-border pt-8">
        <h2 className="text-xl font-bold text-text mb-4">Frequently asked questions</h2>
        <div className="space-y-6">
          {topic.faqs.map((faq) => (
            <details key={faq.q} className="border border-border p-4 group">
              <summary className="font-medium text-text cursor-pointer marker:text-primary list-none flex items-start gap-2">
                <span className="text-primary font-mono text-xs uppercase tracking-wider mt-1">
                  Q.
                </span>
                <span className="flex-1">{faq.q}</span>
              </summary>
              <p className="text-sm text-muted leading-relaxed mt-3 pl-7">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
          Other topics
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {TOPICS.filter((t) => t.slug !== topic.slug).map((t) => (
            <li key={t.slug}>
              <Link
                href={`/topics/${t.slug}`}
                className="block border border-border p-3 hover:border-primary transition-colors"
              >
                <div className="font-medium text-text">{t.name}</div>
                <p className="text-xs text-muted mt-1 line-clamp-2">{t.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
