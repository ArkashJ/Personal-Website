import type { EnrichedWeeklyItem, WeeklyItem, WeeklyItemKind, RailKey } from './weekly-types'

const YOUTUBE_RE = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/

function youtubeIdFromUrl(url: string): string | null {
  const m = url.match(YOUTUBE_RE)
  return m ? m[1] : null
}

// Returns a simpleicons.org slug for known sources. Returning undefined means
// "no logo" — render the rail item without a leading icon.
function simpleIconSlugFor(
  source: string | undefined,
  kind: string | undefined
): string | undefined {
  if (!source && !kind) return undefined
  const s = (source ?? '').toLowerCase()
  // Fast-path well-known platforms.
  if (s.includes('youtube') || kind === 'youtube') return 'youtube'
  if (s.includes('substack')) return 'substack'
  if (s.includes('medium')) return 'medium'
  if (s.includes('github') || kind === 'repo') return 'github'
  if (s.includes('linkedin')) return 'linkedin'
  if (s.includes('twitter') || s.includes('x.com') || kind === 'tweet') return 'x'
  if (s.includes('arxiv') || kind === 'paper') return 'arxiv'
  if (s.includes('spotify')) return 'spotify'
  if (s.includes('apple podcast')) return 'applepodcasts'
  if (s.includes('overcast')) return 'overcast'
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
  const { text, href, anchor, kind, notes } = item

  if (!image && href) {
    const yt = youtubeIdFromUrl(href)
    if (yt) {
      image = `https://i.ytimg.com/vi/${yt}/mqdefault.jpg`
      if (!source) source = 'YouTube'
    }
  }

  if (!image) {
    const slug = simpleIconSlugFor(source, kind)
    if (slug) image = `https://cdn.simpleicons.org/${slug}/9aa0a6`
  }

  // Modal body falls back to notes when no anchor is provided. When neither
  // exists, the modal will render a generic CTA + fallback line in the UI.
  const bodyMarkdown = anchor ? undefined : notes

  return { text, href, anchor, image, source, kind, notes, bodyMarkdown }
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
    bodyMarkdown: base.bodyMarkdown ?? (item.anchor ? undefined : item.text),
  }
}
