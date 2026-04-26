'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { NAV_LINKS } from '@/lib/site'
import ThemeToggle from '@/components/ThemeToggle'

const Nav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <nav className="sticky top-0 z-50 bg-bg/85 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-base font-bold text-text hover:text-primary tracking-tight"
        >
          arkash.jain
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-5">
            {NAV_LINKS.filter((l) => l.href !== '/').map((link) => {
              const active = pathname === link.href || pathname?.startsWith(`${link.href}/`)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-mono text-[13px] transition-colors ${
                      active ? 'text-primary' : 'text-muted hover:text-text'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <span className="h-4 w-px bg-border" aria-hidden />
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
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
        <div className="md:hidden border-t border-border bg-bg">
          <ul className="px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.filter((l) => l.href !== '/').map((link) => {
              const active = pathname === link.href || pathname?.startsWith(`${link.href}/`)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block font-mono text-sm py-1 ${
                      active ? 'text-primary' : 'text-muted hover:text-text'
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
  )
}

export default Nav
