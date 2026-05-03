export type FeaturedBanner = {
  id: string
  headline: string
  body?: string
  href?: string
  ctaLabel?: string
  expires?: string
  priority: number
}

export const BANNERS: FeaturedBanner[] = [
  {
    id: 'w19-claude-tooling-2026-05-04',
    headline: 'May 4',
    body: 'New stack picks: RTK token-killer (35.9% saved · 17.9M tokens), context-mode (98% MCP context reduction), Compound Engineering v3.4.1 — all green.',
    href: '/weekly/2026-W19/2026-05-04',
    ctaLabel: 'See findings',
    expires: '2026-06-15',
    priority: 8,
  },
  {
    id: 'skills-public-2026-05',
    headline: 'New',
    body: '71 Claude Code skills now public on /skills',
    href: '/skills',
    ctaLabel: 'Browse',
    expires: '2026-06-15',
    priority: 5,
  },
]

export function activeBanner(): FeaturedBanner | null {
  const now = new Date()
  const candidates = BANNERS.filter((b) => {
    if (!b.expires) return true
    const exp = new Date(b.expires)
    return Number.isNaN(exp.getTime()) ? true : exp >= now
  })
  if (candidates.length === 0) return null
  return candidates.slice().sort((a, b) => b.priority - a.priority)[0]
}
