import 'server-only'
import fs from 'fs'
import path from 'path'

const README_DIR = path.join(process.cwd(), 'content', 'projects')

const cache = new Map<string, string | null>()

export function getReadme(slug: string): string | null {
  if (cache.has(slug)) return cache.get(slug) ?? null
  // Defensive: only allow simple slug characters so we never escape the dir.
  if (!/^[a-z0-9-]+$/.test(slug)) {
    cache.set(slug, null)
    return null
  }
  const filePath = path.join(README_DIR, `${slug}.md`)
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    cache.set(slug, raw)
    return raw
  } catch {
    cache.set(slug, null)
    return null
  }
}
