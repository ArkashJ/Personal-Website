'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { NAV_LINKS } from '@/lib/site'
import ThemeToggle from '@/components/ThemeToggle'
import CommandPalette from '@/components/ui/CommandPalette'
import VoiceNav from '@/components/ui/VoiceNav'

const Nav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [isMac, setIsMac] = useState(true)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    setIsMac(typeof navigator !== 'undefined' && /Mac|iP/.test(navigator.platform))
  }, [])

  return (
    <>
      <div className="sticky top-0 z-50 px-3 pt-3 pb-1 bg-gradient-to-b from-bg/95 via-bg/70 to-transparent backdrop-blur-md">
        <nav className="max-w-6xl mx-auto rounded-full bg-surface/95 border border-border-strong shadow-[0_8px_28px_-12px_rgba(0,0,0,0.45)]">
          <div className="px-5 py-2.5 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="font-mono text-sm font-bold text-text hover:text-primary tracking-tight whitespace-nowrap"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2 align-middle" />
              arkash.jain
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <ul className="flex items-center">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href || pathname?.startsWith(`${link.href}/`)
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`relative font-mono text-[12px] px-3 py-1.5 rounded-full transition-all ${
                          active
                            ? 'text-primary bg-elevated'
                            : 'text-muted hover:text-text hover:bg-elevated/60'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="hidden md:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Quick navigation (Cmd+K)"
                className="press inline-flex items-center gap-2 font-mono text-[11px] text-muted hover:text-text bg-elevated/60 hover:bg-elevated border border-border px-2.5 py-1.5 rounded-full transition-colors"
              >
                <Search size={11} />
                <span>Search</span>
                <kbd className="font-mono text-[10px] text-subtle border border-border px-1 rounded">
                  {isMac ? '⌘' : 'Ctrl'}K
                </kbd>
              </button>
              <VoiceNav />
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Quick navigation"
                className="press p-2 -mr-1 text-muted"
              >
                <Search size={16} />
              </button>
              <VoiceNav />
              <ThemeToggle />
              <button
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex flex-col gap-1 p-2 -mr-2"
              >
                <span
                  className={`block h-0.5 w-5 bg-text transition-transform ${
                    open ? 'translate-y-1.5 rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-text transition-opacity ${open ? 'opacity-0' : ''}`}
                />
                <span
                  className={`block h-0.5 w-5 bg-text transition-transform ${
                    open ? '-translate-y-1.5 -rotate-45' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {open && (
            <div className="md:hidden border-t border-border rounded-b-3xl">
              <ul className="px-5 py-4 flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href || pathname?.startsWith(`${link.href}/`)
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block font-mono text-sm px-3 py-2 rounded-full ${
                          active ? 'text-primary bg-elevated' : 'text-muted hover:text-text'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </nav>
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  )
}

export default Nav
