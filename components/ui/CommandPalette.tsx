'use client'

import { Command } from 'cmdk'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { NAV_LINKS, SECONDARY_LINKS, SITE } from '@/lib/site'

type Item = { label: string; href: string; group: string; hint?: string }

const ITEMS: Item[] = [
  ...NAV_LINKS.map((l) => ({ label: l.label, href: l.href, group: 'Navigate' })),
  ...SECONDARY_LINKS.map((l) => ({ label: l.label, href: l.href, group: 'More' })),
  { label: 'Home', href: '/', group: 'Navigate' },
  { label: 'Life Changelog', href: '/about', group: 'Navigate', hint: 'Featured timeline' },
  { label: 'Full archive', href: '/about/archive', group: 'Navigate', hint: 'Every entry' },
  { label: 'Architecture', href: '/architecture', group: 'More' },
  // Coursework deep dives
  { label: 'CS 320 — OCaml Interpreter', href: '/coursework/cs320-ocaml', group: 'Coursework' },
  { label: 'CS 350 — Raft', href: '/coursework/cs350-raft', group: 'Coursework' },
  {
    label: 'CS 611 — Monsters & Heroes',
    href: '/coursework/cs611-monsters-and-heroes',
    group: 'Coursework',
  },
  {
    label: 'CS 611 — Trading System',
    href: '/coursework/cs611-trading-system',
    group: 'Coursework',
  },
  { label: 'CS 561 — PageRank', href: '/coursework/cs561-pagerank', group: 'Coursework' },
  { label: 'CS 630 — Gale-Shapley', href: '/coursework/cs630-gale-shapley', group: 'Coursework' },
  { label: 'DS 522 — SGD Variants', href: '/coursework/ds522-sgd-variants', group: 'Coursework' },
  {
    label: 'MA 582 — Mathematical Statistics',
    href: '/coursework/ma582-mathematical-statistics',
    group: 'Coursework',
  },
  // Timeline deep dives
  { label: 'SpatialDINO', href: '/about/timeline/spatialdino', group: 'Timeline' },
  {
    label: 'Harvard Kirchhausen Lab',
    href: '/about/timeline/harvard-kirchhausen',
    group: 'Timeline',
  },
  { label: 'ZeroSync (Rust)', href: '/about/timeline/zerosync-rust', group: 'Timeline' },
  { label: 'BCH ALS Tool', href: '/about/timeline/bch-als-tool', group: 'Timeline' },
  { label: 'Joined Benmore', href: '/about/timeline/benmore-fde', group: 'Timeline' },
  // External
  { label: 'GitHub @ArkashJ', href: SITE.social.github, group: 'External' },
  { label: 'LinkedIn', href: SITE.social.linkedin, group: 'External' },
  { label: 'X / Twitter', href: SITE.social.twitter, group: 'External' },
  { label: 'Substack', href: SITE.social.substack, group: 'External' },
  { label: 'Medium', href: SITE.social.medium, group: 'External' },
  { label: 'Google Scholar', href: SITE.social.scholar, group: 'External' },
  { label: 'ORCID', href: SITE.social.orcid, group: 'External' },
  { label: 'Email arkash@benmore.tech', href: `mailto:${SITE.email}`, group: 'External' },
]

const GROUPS = ['Navigate', 'Coursework', 'Timeline', 'More', 'External'] as const

const CommandPalette = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) => {
  const router = useRouter()
  const [search, setSearch] = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!open) setSearch('')
  }, [open])

  const go = (href: string) => {
    onOpenChange(false)
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      window.open(href, href.startsWith('mailto:') ? '_self' : '_blank')
    } else {
      router.push(href)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 bg-bg/80 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <Command
        label="Quick navigation"
        className="w-full max-w-xl bg-surface border border-border-strong shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">⌘K</span>
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Jump to a page, project, or paper…"
            autoFocus
            className="flex-1 bg-transparent outline-none text-text placeholder:text-subtle text-sm font-mono"
          />
          <kbd className="font-mono text-[10px] text-subtle border border-border px-1.5 py-0.5">
            ESC
          </kbd>
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="text-muted text-sm font-mono px-3 py-6 text-center">
            No matches.
          </Command.Empty>
          {GROUPS.map((g) => {
            const items = ITEMS.filter((i) => i.group === g)
            if (items.length === 0) return null
            return (
              <Command.Group
                key={g}
                heading={g}
                className="text-subtle font-mono text-[10px] uppercase tracking-widest px-2 pt-2 pb-1"
              >
                {items.map((i) => (
                  <Command.Item
                    key={`${g}-${i.href}`}
                    value={`${i.label} ${i.hint || ''} ${i.group}`}
                    onSelect={() => go(i.href)}
                    className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-sm text-sm text-text data-[selected=true]:bg-elevated data-[selected=true]:text-primary transition-colors"
                  >
                    <span>{i.label}</span>
                    <span className="font-mono text-[10px] text-subtle">
                      {i.hint || (i.href.startsWith('http') ? '↗' : i.href)}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )
          })}
        </Command.List>
        <div className="border-t border-border px-4 py-2 flex items-center gap-3 font-mono text-[10px] text-subtle">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </Command>
    </div>
  )
}

export default CommandPalette
