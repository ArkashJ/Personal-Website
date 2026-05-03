import 'server-only'
import fs from 'fs'
import path from 'path'

export type ChangelogRelease = {
  version: string
  date: string | null
  /** Anchor-safe ID for linking: vX-Y-Z */
  id: string
  sections: Record<string, string[]>
}

let _cache: ChangelogRelease[] | null = null

function parseChangelog(raw: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = []

  // Split on level-2 headings that look like: ## [X.Y.Z] — YYYY-MM-DD — ...
  // Also handles: ## [Unreleased]
  // The separator used in this repo's CHANGELOG.md is —, not -
  const releasePattern = /^## \[([^\]]+)\](?:\s*[—-]\s*(\d{4}-\d{2}-\d{2}))?/m

  // Split source into per-release chunks
  const lines = raw.split('\n')
  const chunks: { header: string; body: string[] }[] = []
  let currentChunk: { header: string; body: string[] } | null = null

  for (const line of lines) {
    if (/^## /.test(line)) {
      if (currentChunk) chunks.push(currentChunk)
      currentChunk = { header: line, body: [] }
    } else if (currentChunk) {
      currentChunk.body.push(line)
    }
  }
  if (currentChunk) chunks.push(currentChunk)

  for (const chunk of chunks) {
    const match = releasePattern.exec(chunk.header)
    if (!match) continue

    const version = match[1].trim()
    const date = match[2] ?? null

    // anchor id: v2.5.0 → v2-5-0, Unreleased → unreleased
    const id = version.toLowerCase().replace(/\./g, '-')

    const sections: Record<string, string[]> = {}
    let currentSection: string | null = null

    for (const line of chunk.body) {
      if (/^### /.test(line)) {
        // ### Added — Short label or just ### Added
        currentSection = line
          .replace(/^### /, '')
          .split(/\s*[—–-]\s*/)[0]
          .trim()
        if (!sections[currentSection]) sections[currentSection] = []
      } else if (currentSection) {
        // Collect bullet points; skip empty lines and horizontal rules
        if (line.startsWith('- ') || line.startsWith('* ')) {
          sections[currentSection].push(line.replace(/^[-*] /, '').trim())
        }
        // Multi-line bullets (indented continuation) — append to last item
        else if (
          (line.startsWith('  ') || line.startsWith('\t')) &&
          sections[currentSection].length > 0
        ) {
          const last = sections[currentSection].length - 1
          sections[currentSection][last] += ' ' + line.trim()
        }
      }
    }

    releases.push({ version, date, id, sections })
  }

  return releases
}

export function getParsedChangelog(): ChangelogRelease[] {
  if (_cache) return _cache

  const filePath = path.join(process.cwd(), 'CHANGELOG.md')

  let raw: string
  try {
    raw = fs.readFileSync(filePath, 'utf8')
  } catch (err) {
    console.warn('[changelog-md] Could not read CHANGELOG.md:', err)
    _cache = []
    return _cache
  }

  try {
    _cache = parseChangelog(raw)
  } catch (err) {
    console.warn('[changelog-md] Failed to parse CHANGELOG.md:', err)
    _cache = []
  }

  return _cache!
}

/**
 * Find the first release whose date falls within [weekStart, weekEnd] (inclusive).
 */
export function findReleaseInWeek(weekStart: string, weekEnd: string): ChangelogRelease | null {
  const releases = getParsedChangelog()
  for (const release of releases) {
    if (!release.date) continue
    if (release.date >= weekStart && release.date <= weekEnd) return release
  }
  return null
}
