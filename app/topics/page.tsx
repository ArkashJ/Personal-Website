import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema, itemListSchema, collectionPageSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { TOPICS } from '@/lib/topics'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title:
      'Topic hubs — Forward Deployed Engineering, AI Engineering, Pragmatic Engineering, Finance & Markets',
    description:
      'Topic hubs that cluster the writing, weekly logs, projects, and Claude skills on this site into four reading paths: Forward Deployed Engineering, AI Engineering, Pragmatic Engineering, and Finance & Markets. Each hub has an original primer, FAQ, and curated internal links.',
    path: '/topics',
    keywords: [
      'topic hubs',
      'reading paths',
      'forward deployed engineering',
      'AI engineering',
      'pragmatic engineering',
      'finance and markets',
      'matt levine',
      'claude skills',
    ],
  })
}

export default function TopicsIndexPage() {
  const items = TOPICS.map((t) => ({
    name: t.name,
    path: `/topics/${t.slug}`,
    description: t.description,
  }))

  return (
    <article className="px-6 py-16 max-w-4xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Topics', path: '/topics' },
        ])}
      />
      <JsonLd
        data={collectionPageSchema({
          title: 'Topic hubs',
          description:
            'Four reading paths through arkashj.com — forward deployed engineering, AI engineering, pragmatic engineering, and finance & markets.',
          path: '/topics',
          itemCount: TOPICS.length,
        })}
      />
      <JsonLd data={itemListSchema('arkashj.com topic hubs', items)} />

      <h1 className="text-3xl md:text-4xl font-bold text-text mb-3 leading-tight">Topic hubs</h1>
      <p className="text-muted text-base leading-relaxed mb-10 max-w-2xl">
        Four reading paths through this site. Each hub starts with a primer of original prose,
        clusters related writing, weekly logs, projects, and Claude skills, and ends with FAQ
        eligibility for Google rich results. Pick the entry point that matches what you came here
        for.
      </p>

      <ul className="space-y-6">
        {TOPICS.map((t) => (
          <li
            key={t.slug}
            className="border border-border p-6 hover:border-primary transition-colors"
          >
            <Link href={`/topics/${t.slug}`} className="block">
              <h2 className="text-xl font-bold text-text mb-2 group-hover:text-primary">
                {t.name}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-3">{t.description}</p>
              <div className="flex flex-wrap gap-2">
                {t.keywords.slice(0, 6).map((k) => (
                  <span
                    key={k}
                    className="font-mono text-[10px] uppercase tracking-wider text-subtle border border-border px-2 py-0.5"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <div className="mt-4 font-mono text-xs text-primary uppercase tracking-widest">
                Read the hub →
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
