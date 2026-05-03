export type HighlightCategory = 'Read' | 'Watched' | 'Built' | 'Shipped' | 'Learned' | 'Met'

export type Highlight = {
  date: string
  category: HighlightCategory
  headline: string
  link?: string
  tags?: string[]
  priority: 1 | 2 | 3 | 4 | 5
  weekSlug?: string
  archive?: boolean
}

export const HIGHLIGHTS: Highlight[] = [
  {
    date: '2026-05-02',
    category: 'Shipped',
    headline: '71 Claude Code skills published at /skills with public copy-ready endpoints',
    link: '/skills',
    tags: ['Benmore', 'Skills', 'Open Source'],
    priority: 5,
    weekSlug: '2026-W18',
  },
  {
    date: '2026-05-01',
    category: 'Built',
    headline: 'Foundry CLI v0.4 — engagement scaffolder with Stripe + Kong presets',
    link: 'https://github.com/Benmore-Studio',
    tags: ['Benmore', 'CLI'],
    priority: 4,
    weekSlug: '2026-W18',
  },
  {
    date: '2026-04-30',
    category: 'Shipped',
    headline: 'Cattle Logic ranch onboarding flow live for Texas pilot',
    tags: ['Benmore', 'Cattle Logic', 'FDE'],
    priority: 5,
    weekSlug: '2026-W18',
  },
  {
    date: '2026-04-29',
    category: 'Read',
    headline: 'Andreessen on agentic infrastructure as the next platform shift',
    link: 'https://a16z.com',
    tags: ['AI', 'Reading'],
    priority: 3,
    weekSlug: '2026-W18',
  },
  {
    date: '2026-04-28',
    category: 'Watched',
    headline: 'Karpathy: state of LLM training infrastructure in 2026',
    link: 'https://www.youtube.com/@AndrejKarpathy',
    tags: ['AI', 'Infra'],
    priority: 4,
    weekSlug: '2026-W18',
  },
  {
    date: '2026-04-28',
    category: 'Met',
    headline: 'Ranch ops team in Amarillo — first in-person Cattle Logic walkthrough',
    tags: ['Benmore', 'Cattle Logic'],
    priority: 4,
    weekSlug: '2026-W18',
  },
  {
    date: '2026-04-27',
    category: 'Learned',
    headline: 'CME futures roll mechanics + how feedlots actually hedge corn basis',
    tags: ['Finance', 'Cattle Logic'],
    priority: 3,
    weekSlug: '2026-W18',
  },
  {
    date: '2026-04-26',
    category: 'Built',
    headline: 'Image consolidation pass on arkashj.com — single /images tree',
    link: '/architecture',
    tags: ['Site'],
    priority: 2,
    weekSlug: '2026-W18',
  },
]

const today = () => new Date()

const withinDays = (dateStr: string, days: number) => {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return false
  const now = today()
  if (d > now) return false
  const diffDays = (now.getTime() - d.getTime()) / 86400000
  return diffDays <= days
}

const sortNewestFirst = (a: Highlight, b: Highlight) => (a.date < b.date ? 1 : -1)

const active = (h: Highlight) => !h.archive

export function recentHighlights(days = 30): Highlight[] {
  return HIGHLIGHTS.filter(active)
    .filter((h) => withinDays(h.date, days))
    .sort(sortNewestFirst)
}

export function topHighlights(n = 4, days = 30): Highlight[] {
  return recentHighlights(days)
    .filter((h) => h.priority >= 4)
    .slice(0, n)
}

export function highlightsByCategory(category: HighlightCategory): Highlight[] {
  return HIGHLIGHTS.filter(active)
    .filter((h) => h.category === category)
    .sort(sortNewestFirst)
}
