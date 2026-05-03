import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const WEEKLY_DIR = path.join(ROOT, 'content', 'weekly')

export type WeeklyLogMeta = {
  slug: string
  title: string
  weekStart: string
  weekEnd: string
  description?: string
  tags?: string[]
  read?: string[]
  watched?: string[]
  built?: string[]
  shipped?: string[]
  learned?: string[]
  met?: string[]
}

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
}

function readMdx(filePath: string): { data: Record<string, unknown>; content: string } {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { data, content }
}

function isValidWeeklyMeta(d: Record<string, unknown>): boolean {
  return (
    typeof d.title === 'string' && typeof d.weekStart === 'string' && typeof d.weekEnd === 'string'
  )
}

export function getAllWeeklyLogs(): WeeklyLogMeta[] {
  const out: WeeklyLogMeta[] = []
  for (const file of readDir(WEEKLY_DIR)) {
    const slug = file.replace(/\.mdx?$/, '')
    const { data } = readMdx(path.join(WEEKLY_DIR, file))
    if (!isValidWeeklyMeta(data)) {
      console.warn(`[weekly] skipping ${file}: missing title/weekStart/weekEnd`)
      continue
    }
    out.push({ slug, ...(data as Omit<WeeklyLogMeta, 'slug'>) })
  }
  return out.sort((a, b) => (a.weekStart < b.weekStart ? 1 : -1))
}

export async function getWeeklyLog(
  slug: string
): Promise<{ meta: WeeklyLogMeta; source: string } | null> {
  const file = path.join(WEEKLY_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { data, content } = readMdx(file)
  if (!isValidWeeklyMeta(data)) return null
  return { meta: { slug, ...(data as Omit<WeeklyLogMeta, 'slug'>) }, source: content }
}

export function categoryCounts(meta: WeeklyLogMeta) {
  return {
    read: meta.read?.length ?? 0,
    watched: meta.watched?.length ?? 0,
    built: meta.built?.length ?? 0,
    shipped: meta.shipped?.length ?? 0,
    learned: meta.learned?.length ?? 0,
    met: meta.met?.length ?? 0,
  }
}
