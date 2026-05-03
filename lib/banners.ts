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
