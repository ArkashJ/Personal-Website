import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { WeeklyLogMeta } from './weekly-types'

// Re-export everything from weekly-types so existing imports keep working.
export * from './weekly-types'

const ROOT = process.cwd()
const WEEKLY_DIR = path.join(ROOT, 'content', 'weekly')

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => !f.startsWith('_') && (f.endsWith('.mdx') || f.endsWith('.md')))
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

// Cached at module scope. Invalidated only on process restart / redeploy —
// matches lib/git-changelog.ts and lib/changelog-md.ts.
let _cache: WeeklyLogMeta[] | null = null

export function getAllWeeklyLogs(): WeeklyLogMeta[] {
  if (_cache) return _cache
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
  _cache = out.sort((a, b) => (a.weekStart < b.weekStart ? 1 : -1))
  return _cache
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

export function getLatestWeeklyLog(): WeeklyLogMeta | null {
  const all = getAllWeeklyLogs()
  return all[0] ?? null
}
