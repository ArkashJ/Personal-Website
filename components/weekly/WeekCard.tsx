'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Card from '@/components/ui/Card'
import type { WeeklyLogMeta } from '@/lib/weekly-types'

type Props = {
  log: WeeklyLogMeta
  itemCount: number
  dates: string[]
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDay(iso: string): string {
  const [, m, d] = iso.split('-')
  const mi = parseInt(m, 10) - 1
  return `${MONTHS[mi] ?? m} ${parseInt(d, 10)}`
}

export default function WeekCard({ log, itemCount, dates }: Props) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <Card glow>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
          {log.slug}
        </span>
        <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
          {log.weekStart} → {log.weekEnd}
        </span>
      </div>
      <Link href={`/weekly/${log.slug}`} className="block group">
        <h2 className="text-lg font-bold text-text leading-tight group-hover:text-primary transition-colors duration-150">
          {log.title}
        </h2>
        {log.description && (
          <p className="text-muted text-sm mt-2 leading-relaxed">{log.description}</p>
        )}
      </Link>

      <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
        <p className="font-mono text-[11px] text-subtle uppercase tracking-wider">
          {itemCount} item{itemCount === 1 ? '' : 's'}
        </p>

        {dates.length > 0 && (
          <div ref={wrapRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
              className="press inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider border border-border text-muted hover:text-primary hover:border-primary px-2.5 py-1 transition-colors"
            >
              Days · {dates.length}
              <ChevronDown size={12} className={open ? 'rotate-180 transition-transform' : ''} />
            </button>
            {open && (
              <div
                role="menu"
                className="absolute right-0 mt-1 min-w-[140px] bg-surface border border-border-strong shadow-[0_8px_28px_-12px_rgba(0,0,0,0.45)] z-20"
              >
                <ul className="flex flex-col py-1">
                  <li>
                    <Link
                      href={`/weekly/${log.slug}`}
                      role="menuitem"
                      className="block font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 text-muted hover:text-primary hover:bg-elevated/60 transition-colors"
                    >
                      Whole week
                    </Link>
                  </li>
                  {dates.map((d) => (
                    <li key={d}>
                      <Link
                        href={`/weekly/${log.slug}/${d}`}
                        role="menuitem"
                        className="block font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 text-muted hover:text-primary hover:bg-elevated/60 transition-colors"
                      >
                        {formatDay(d)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
