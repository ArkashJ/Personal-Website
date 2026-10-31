import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { getAllWritingPosts } from '@/lib/content'
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
  { path: '/changelog', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/info', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/stack', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/media', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/architecture', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/coursework', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/credentials', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/ai-hardware-stack', priority: 0.7, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const writing = getAllWritingPosts().map((p) => ({
    url: `${SITE.url}/writing/${p.slug}`,
    ...(p.date ? { lastModified: new Date(p.date) } : {}),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  const timelineEntries = TIMELINE.filter((t) => t.slug).map((t) => ({
    url: `${SITE.url}/about/timeline/${t.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const courses = COURSES.map((c) => ({
    url: `${SITE.url}/coursework/${c.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const courseSubs = allCourseSubPages().map(({ courseSlug, sub }) => ({
    url: `${SITE.url}/coursework/${courseSlug}/${sub.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  const skills = getAllSkills().map((s) => ({
    url: `${SITE.url}/skills/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const weekly = getAllWeeklyLogs().map((w) => ({
    url: `${SITE.url}/weekly/${w.slug}`,
    ...(w.weekEnd ? { lastModified: new Date(w.weekEnd) } : {}),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const projects = getAllProjects().map((p) => ({
    url: `${SITE.url}/projects/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...STATIC.map((r) => ({
      url: `${SITE.url}${r.path}`,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...writing,
    ...timelineEntries,
    ...courses,
    ...courseSubs,
    ...skills,
    ...weekly,
    ...projects,
  ]
}
