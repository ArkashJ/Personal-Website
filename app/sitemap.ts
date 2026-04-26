import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { getAllWritingPosts, getAllKnowledgePosts } from '@/lib/content'

const STATIC: {
  path: string
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
}[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/research', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/experience', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/work', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/writing', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/knowledge', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/architecture', priority: 0.5, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()
  const writing = getAllWritingPosts().map((p) => ({
    url: `${SITE.url}/writing/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : today,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  const knowledge = getAllKnowledgePosts()
    .filter((p) => p.slug !== 'index')
    .map((p) => ({
      url: `${SITE.url}/knowledge/${p.domain}/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : today,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  const knowledgeDomains = Array.from(new Set(getAllKnowledgePosts().map((p) => p.domain))).map(
    (d) => ({
      url: `${SITE.url}/knowledge/${d}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  )

  return [
    ...STATIC.map((r) => ({
      url: `${SITE.url}${r.path}`,
      lastModified: today,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...knowledgeDomains,
    ...writing,
    ...knowledge,
  ]
}
