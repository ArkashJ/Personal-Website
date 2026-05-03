import 'server-only'
import fs from 'fs'
import path from 'path'
import type { GitCommit } from './git-commit'

const CACHE_PATH = path.join(process.cwd(), 'content', '_generated', 'git-changelog.json')

let cached: GitCommit[] | null = null

export function getGitChangelog(): GitCommit[] {
  if (cached) return cached
  try {
    const raw = fs.readFileSync(CACHE_PATH, 'utf8')
    cached = JSON.parse(raw) as GitCommit[]
  } catch {
    cached = []
  }
  return cached
}

export function getCommitsForWeek(weekStart: string, weekEnd: string): GitCommit[] {
  const start = `${weekStart}T00:00:00`
  const end = `${weekEnd}T23:59:59`
  return getGitChangelog().filter((c) => c.date >= start && c.date <= end)
}
