'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Settings } from 'lucide-react'

const PRIMARY = [
  { href: '/credentials', label: 'Credentials' },
  { href: '/info', label: 'Docs / Architecture' },
  { href: '/coursework', label: 'Coursework' },
]

const GearMenu = ({ size = 14 }: { size?: number }) => {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-label="Site menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="press inline-flex items-center justify-center text-muted hover:text-text bg-elevated/60 hover:bg-elevated border border-border rounded-full p-1.5 transition-colors"
      >
        <Settings size={size} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-60 bg-surface border border-border-strong shadow-[0_8px_28px_-12px_rgba(0,0,0,0.45)] rounded-xl py-2 z-50"
        >
          <ul className="flex flex-col">
            {PRIMARY.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  role="menuitem"
                  className="block font-mono text-[12px] px-3 py-2 text-muted hover:text-primary hover:bg-elevated/60 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default GearMenu
