// Shared types + pure helpers for weekly logs. Safe to import from both
// client and server. Filesystem readers live in lib/weekly.ts (server-only).

export type WeeklyItemKind =
  | 'youtube'
  | 'podcast'
  | 'article'
  | 'paper'
  | 'repo'
  | 'meeting'
  | 'tweet'
  | 'note'

export type RailKey = 'read' | 'watched' | 'built' | 'shipped' | 'learned' | 'met'

export type WeeklyItem =
  | string
  | {
      text: string
      href?: string
      anchor?: string
      image?: string
      source?: string
      kind?: WeeklyItemKind
      notes?: string
      tags?: string[]
    }

export type EnrichedWeeklyItem = {
  id: string
  rail: RailKey
  text: string
  href?: string
  anchor?: string
  image?: string
  source?: string
  kind: WeeklyItemKind
  notes?: string
  tags: string[]
}

export type ChangelogEntry = {
  date: string
  note: string
  href?: string
}

export type WeeklyLogMeta = {
  slug: string
  title: string
  weekStart: string
  weekEnd: string
  description?: string
  tags?: string[]
  read?: WeeklyItem[]
  watched?: WeeklyItem[]
  built?: WeeklyItem[]
  shipped?: WeeklyItem[]
  learned?: WeeklyItem[]
  met?: WeeklyItem[]
  changelog?: ChangelogEntry[]
}

export const RAIL_ORDER: RailKey[] = ['read', 'watched', 'built', 'shipped', 'learned', 'met']

export const RAIL_DEFAULT_KIND: Record<RailKey, WeeklyItemKind> = {
  read: 'article',
  watched: 'youtube',
  built: 'repo',
  shipped: 'note',
  learned: 'note',
  met: 'meeting',
}

export const RAIL_LABEL: Record<RailKey, string> = {
  read: 'Read',
  watched: 'Watched',
  built: 'Built',
  shipped: 'Shipped',
  learned: 'Learned',
  met: 'Met',
}

const KIND_LABEL: Record<WeeklyItemKind, string> = {
  youtube: 'Video',
  podcast: 'Podcast',
  article: 'Article',
  paper: 'Paper',
  repo: 'Repo',
  meeting: 'Meeting',
  tweet: 'Tweet',
  note: 'Note',
}

export function kindLabel(kind: WeeklyItemKind): string {
  return KIND_LABEL[kind] ?? 'Item'
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64)
}

export function getAllItems(meta: WeeklyLogMeta): EnrichedWeeklyItem[] {
  const out: EnrichedWeeklyItem[] = []
  const inheritedTags = meta.tags ?? []
  for (const rail of RAIL_ORDER) {
    const items = meta[rail]
    if (!items) continue
    for (let i = 0; i < items.length; i++) {
      const raw = items[i]
      const obj = typeof raw === 'string' ? { text: raw } : raw
      const kind = (obj.kind ?? RAIL_DEFAULT_KIND[rail]) as WeeklyItemKind
      const itemTags = obj.tags ?? []
      const merged = Array.from(new Set([...inheritedTags, ...itemTags]))
      out.push({
        id: `${rail}-${i}-${slugify(obj.text)}`,
        rail,
        text: obj.text,
        href: obj.href,
        anchor: obj.anchor,
        image: obj.image,
        source: obj.source,
        kind,
        notes: obj.notes,
        tags: merged,
      })
    }
  }
  return out
}

export function categoryCounts(meta: WeeklyLogMeta) {
  return {
    read: meta.read?.length ?? 0,
    watched: meta.watched?.length ?? 0,
    built: meta.built?.length ?? 0,
    shipped: meta.shipped?.length ?? 0,
    learned: meta.learned?.length ?? 0,
    met: meta.met?.length ?? 0,
  }
}
