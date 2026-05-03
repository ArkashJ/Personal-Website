import 'server-only'
import { PROJECTS, WORK_TOOLS, type Project, type WorkTool } from './data'

export type ProjectLike = (Project | WorkTool) & {
  kind: 'project' | 'work-tool'
  slug: string
}

export function projectSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.+?\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64)
}

export function getAllProjects(): ProjectLike[] {
  const out: ProjectLike[] = []
  const seen = new Set<string>()
  for (const p of PROJECTS) {
    const slug = p.slug ?? projectSlug(p.name)
    if (seen.has(slug)) continue
    seen.add(slug)
    out.push({ ...p, kind: 'project', slug })
  }
  for (const w of WORK_TOOLS) {
    const slug = w.slug ?? projectSlug(w.name)
    if (seen.has(slug)) {
      // Disambiguate work-tool entries that collide with a project of the
      // same name (e.g. "Benmore Foundry CLI" appears in both arrays).
      out.push({ ...w, kind: 'work-tool', slug: `${slug}-tool` })
      seen.add(`${slug}-tool`)
      continue
    }
    seen.add(slug)
    out.push({ ...w, kind: 'work-tool', slug })
  }
  return out
}

export function getProjectBySlug(slug: string): ProjectLike | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null
}
