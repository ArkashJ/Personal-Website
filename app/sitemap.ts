import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { getAllWritingPosts, getAllKnowledgePosts } from '@/lib/content'
import { getAllDocs } from '@/lib/docs'
import { TIMELINE } from '@/lib/data'
import { COURSES, allCourseSubPages } from '@/lib/coursework'
import { getAllSkills } from '@/lib/skills'
import { getAllWeeklyLogs } from '@/lib/weekly'
import { getAllProjects } from '@/lib/projects'

const STATIC: {
  path: string
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
}[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/research', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/skills', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/writing', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/weekly', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/knowledge', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/learnings', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/stack', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/media', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/docs', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/architecture', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/coursework', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/credentials', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/ai-hardware-stack', priority: 0.7, changeFrequency: 'monthly' },
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

  const timelineEntries = TIMELINE.filter((t) => t.slug).map((t) => ({
    url: `${SITE.url}/about/timeline/${t.slug}`,
    lastModified: today,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const docs = getAllDocs().map((d) => ({
    url: `${SITE.url}/docs/${d.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  const courses = COURSES.map((c) => ({
    url: `${SITE.url}/coursework/${c.slug}`,
    lastModified: today,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const courseSubs = allCourseSubPages().map(({ courseSlug, sub }) => ({
    url: `${SITE.url}/coursework/${courseSlug}/${sub.slug}`,
    lastModified: today,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  const skills = getAllSkills().map((s) => ({
    url: `${SITE.url}/skills/${s.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const weekly = getAllWeeklyLogs().map((w) => ({
    url: `${SITE.url}/weekly/${w.slug}`,
    lastModified: w.weekEnd ? new Date(w.weekEnd) : today,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const projects = getAllProjects().map((p) => ({
    url: `${SITE.url}/projects/${p.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

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
    ...timelineEntries,
    ...docs,
    ...courses,
    ...courseSubs,
    ...skills,
    ...weekly,
    ...projects,
  ]
}
