'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/site'

const Nav = () => {
  const pathname = usePathname()
  return (
    <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-mono text-lg font-bold text-white hover:text-primary">
          arkash.jain
        </Link>
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {NAV_LINKS.filter((l) => l.href !== '/').map((link) => {
            const active = pathname === link.href || pathname?.startsWith(`${link.href}/`)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-mono transition-colors ${
                    active ? 'text-accent' : 'text-muted hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
