'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Square, ChevronLeft, ChevronRight } from 'lucide-react'

type Step = {
  title: string
  meta: string
  status: 'done' | 'active' | 'pending'
  href?: string
}

// Most recent first
const STEPS: Step[] = [
  { title: 'Head of FDE', meta: 'Apr 2026 · ongoing', status: 'active', href: '/experience' },
  {
    title: 'Joined Benmore — Employee #2',
    meta: 'Aug 2025 · Forward Deployed',
    status: 'done',
    href: '/experience',
  },
  {
    title: 'SpatialDINO published',
    meta: '2025 · BioRxiv · 1st author',
    status: 'done',
    href: '/research',
  },
  {
    title: 'Joined Harvard Kirchhausen Lab',
    meta: 'May 2024 · ML Researcher',
    status: 'done',
    href: '/research',
  },
  {
    title: 'Started Harvard MS',
    meta: 'Sep 2023 · Computational Science',
    status: 'done',
    href: '/about',
  },
  { title: 'Graduated BU summa cum laude', meta: 'May 2023', status: 'done', href: '/about' },
  { title: 'First paper published', meta: '2022 · ML systems', status: 'done', href: '/research' },
  {
    title: 'Started at Boston University',
    meta: 'Sep 2020 · CS + Math',
    status: 'done',
    href: '/about',
  },
]

const PAGE_SIZE = 3

const HeroDemo = () => {
  const totalPages = Math.ceil(STEPS.length / PAGE_SIZE)
  const [page, setPage] = useState(0)

  const start = page * PAGE_SIZE
  const visible = STEPS.slice(start, start + PAGE_SIZE)

  return (
    <div className="relative">
      <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="bg-surface border border-border p-6 md:p-7 shadow-[0_0_60px_-12px_rgba(94,234,212,0.08)]">
        <div className="flex items-center justify-between mb-5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-subtle">
            Project · Live · arkashj.com
          </div>
          <Link
            href="/about"
            className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-primary transition-colors"
          >
            Full timeline →
          </Link>
        </div>

        <ol className="space-y-4 min-h-[200px]">
          {visible.map((s) => {
            const isActive = s.status === 'active'
            const isDone = s.status === 'done'
            const Icon = isDone ? Check : Square
            const content = (
              <>
                <span
                  className={`flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 border transition-colors ${
                    isDone
                      ? 'bg-primary text-bg border-primary'
                      : isActive
                        ? 'border-accent text-accent'
                        : 'border-border text-subtle'
                  }`}
                >
                  <Icon size={12} strokeWidth={2.5} />
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${isDone || isActive ? 'text-text' : 'text-muted'}`}
                  >
                    {s.title}
                    {isActive && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent dot-pulse ml-2 align-middle" />
                    )}
                  </p>
                  <p className="text-xs text-subtle font-mono mt-0.5">{s.meta}</p>
                </div>
              </>
            )

            return (
              <li key={s.title}>
                {s.href ? (
                  <Link
                    href={s.href}
                    className="flex items-start gap-3 -mx-2 px-2 py-1 hover:bg-elevated transition-colors group"
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="flex items-start gap-3">{content}</div>
                )}
              </li>
            )
          })}
        </ol>

        <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
            ● Career arc · 2020 → present
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              aria-label="Previous page"
              className="inline-flex items-center justify-center w-7 h-7 border border-border text-muted hover:text-text hover:border-border-strong disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="font-mono text-xs text-muted tabular-nums">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              aria-label="Next page"
              className="inline-flex items-center justify-center w-7 h-7 border border-border text-muted hover:text-text hover:border-border-strong disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroDemo
