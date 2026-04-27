import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()

export type DocEntry = {
  slug: string
  title: string
  path: string
  source: string
  category: 'Getting Started' | 'Reference' | 'Planning' | 'Releases'
}

// Hand-curated docs catalog. Order = sidebar order within each category.
const DOCS: Array<Omit<DocEntry, 'source'>> = [
  {
    slug: 'readme',
    title: 'README',
    path: 'README.md',
    category: 'Getting Started',
  },
  {
    slug: 'handoff',
    title: 'Handoff — How the Site Works',
    path: 'docs/HANDOFF.md',
    category: 'Getting Started',
  },
  {
    slug: 'todo',
    title: 'TODO — Open Work',
    path: 'docs/TODO.md',
    category: 'Getting Started',
  },
  {
    slug: 'site-architecture',
    title: 'Site Architecture (ASCII reference)',
    path: 'docs/architecture/site-architecture.md',
    category: 'Reference',
  },
  {
    slug: 'design-spec',
    title: 'V2 Design Spec',
    path: 'docs/superpowers/specs/2026-04-26-personal-website-revamp-design.md',
    category: 'Planning',
  },
  {
    slug: 'foundation-plan',
    title: 'Foundation Quick-Wins Plan',
    path: 'docs/superpowers/plans/2026-04-26-foundation-quick-wins.md',
    category: 'Planning',
  },
  {
    slug: 'changelog',
    title: 'Changelog',
    path: 'CHANGELOG.md',
    category: 'Releases',
  },
]

export const getAllDocs = (): DocEntry[] =>
  DOCS.filter((d) => fs.existsSync(path.join(ROOT, d.path))).map((d) => ({
    ...d,
    source: fs.readFileSync(path.join(ROOT, d.path), 'utf8'),
  }))

export const getDoc = (slug: string): DocEntry | null => {
  const meta = DOCS.find((d) => d.slug === slug)
  if (!meta) return null
  const fullPath = path.join(ROOT, meta.path)
  if (!fs.existsSync(fullPath)) return null
  return { ...meta, source: fs.readFileSync(fullPath, 'utf8') }
}

export const getDocsByCategory = (): Record<DocEntry['category'], DocEntry[]> => {
  const all = getAllDocs()
  return all.reduce(
    (acc, d) => {
      acc[d.category] = acc[d.category] || []
      acc[d.category].push(d)
      return acc
    },
    {} as Record<DocEntry['category'], DocEntry[]>
  )
}
