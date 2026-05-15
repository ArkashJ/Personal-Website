import type { EnrichedWeeklyItem, WeeklyItem, WeeklyItemKind, RailKey } from './weekly-types'

const YOUTUBE_RE = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/

function youtubeIdFromUrl(url: string): string | null {
  const m = url.match(YOUTUBE_RE)
  return m ? m[1] : null
}

// Real branded favicons fetched from each publisher (apple-touch-icon or
// favicon.ico). Add a new entry here and drop the icon file at the listed
// path; scripts/fetch-icons.ts will pull a fresh copy on demand.
const LOCAL_ICON_MAP: Record<string, string> = {
  bloomberg: '/assets/weekly/icons/bloomberg.ico',
  semianalysis: '/assets/weekly/icons/semianalysis.png',
  stratechery: '/assets/weekly/icons/stratechery.png',
  tbpn: '/assets/weekly/icons/tbpn.png',
}

function localIconFor(source?: string, href?: string): string | undefined {
  const key = (source ?? '').toLowerCase().replace(/\s+/g, '')
  if (key && LOCAL_ICON_MAP[key]) return LOCAL_ICON_MAP[key]
  if (href) {
    try {
      const host = new URL(href).hostname.replace(/^www\./, '')
      const first = host.split('.')[0]
      if (LOCAL_ICON_MAP[first]) return LOCAL_ICON_MAP[first]
      // also match e.g. "newsletter.semianalysis.com" → "semianalysis"
      for (const slug of Object.keys(LOCAL_ICON_MAP)) {
        if (host.includes(slug)) return LOCAL_ICON_MAP[slug]
      }
    } catch {
      // malformed href — skip
    }
  }
  return undefined
}

// Returns a simpleicons.org slug for known sources. Returning undefined means
// "no logo" — render the rail item without a leading icon.
function simpleIconSlugFor(
  source: string | undefined,
  kind: string | undefined,
  href?: string
): string | undefined {
  if (!source && !kind && !href) return undefined
  const s = (source ?? '').toLowerCase()
  const h = (href ?? '').toLowerCase()
  // Fast-path well-known platforms.
  if (s.includes('youtube') || kind === 'youtube') return 'youtube'
  if (s.includes('substack') || h.includes('substack.com')) return 'substack'
  if (s.includes('medium') || h.includes('medium.com')) return 'medium'
  if (s.includes('github') || kind === 'repo' || h.includes('github.com')) return 'github'
  if (s.includes('linkedin') || h.includes('linkedin.com')) return 'linkedin'
  if (
    s.includes('twitter') ||
    s.includes('x.com') ||
    kind === 'tweet' ||
    h.includes('x.com') ||
    h.includes('twitter.com')
  )
    return 'x'
  if (s.includes('arxiv') || kind === 'paper' || h.includes('arxiv.org')) return 'arxiv'
  if (s.includes('spotify') || h.includes('spotify.com')) return 'spotify'
  if (s.includes('apple podcast') || h.includes('podcasts.apple.com')) return 'applepodcasts'
  if (s.includes('overcast') || h.includes('overcast.fm')) return 'overcast'
  if (s.includes('latent space') || s.includes('podcast') || kind === 'podcast') {
    return 'rss'
  }
  return undefined
}

export type ResolvedItem = {
  id?: string
  rail?: RailKey
  text: string
  href?: string
  anchor?: string
  image?: string
  source?: string
  kind?: WeeklyItemKind
  notes?: string
  bullets?: string[]
  tags?: string[]
  date?: string
  // Markdown body to render inside the modal when no `anchor:` section is
  // available. Falls back to `notes` for rich rail items, or to the raw
  // string text for pure-string items.
  bodyMarkdown?: string
}

// Normalizes a rail entry into a renderable object, deriving thumbnails and
// source logos when the author didn't supply them.
export function resolveItem(item: WeeklyItem): ResolvedItem {
  if (typeof item === 'string') {
    return { text: item, bodyMarkdown: item }
  }
  let { image, source } = item
  const { text, href, anchor, kind, notes, bullets } = item

  if (!image && href) {
    const yt = youtubeIdFromUrl(href)
    if (yt) {
      image = `https://i.ytimg.com/vi/${yt}/mqdefault.jpg`
      if (!source) source = 'YouTube'
    }
  }

  if (!image) {
    const local = localIconFor(source, href)
    if (local) {
      image = local
    } else {
      const slug = simpleIconSlugFor(source, kind, href)
      if (slug) {
        image = `https://cdn.simpleicons.org/${slug}/9aa0a6`
      } else if (href) {
        // Fall back to the site's own favicon for any unrecognised source.
        try {
          const origin = new URL(href).origin
          image = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=64`
        } catch {
          // malformed href — skip
        }
      }
    }
  }

  // Modal body falls back to notes when no anchor is provided. When neither
  // exists, the modal will render a generic CTA + fallback line in the UI.
  const bodyMarkdown = anchor ? undefined : notes

  return { text, href, anchor, image, source, kind, notes, bullets, bodyMarkdown }
}

// Same as resolveItem but for the EnrichedWeeklyItem shape produced by
// getAllItems(). Carries id, rail, and tags through so the grid + filter UI
// can reference them.
export function resolveEnriched(item: EnrichedWeeklyItem): ResolvedItem {
  const base = resolveItem({
    text: item.text,
    href: item.href,
    anchor: item.anchor,
    image: item.image,
    source: item.source,
    kind: item.kind,
    notes: item.notes,
  })
  return {
    ...base,
    id: item.id,
    rail: item.rail,
    tags: item.tags,
    date: item.date,
    bullets: item.bullets,
    bodyMarkdown: base.bodyMarkdown ?? (item.anchor ? undefined : item.text),
  }
}
