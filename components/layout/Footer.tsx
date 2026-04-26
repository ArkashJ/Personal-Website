import Link from 'next/link'
import { SITE, NAV_LINKS } from '@/lib/site'

const Footer = () => (
  <footer className="border-t border-border mt-24 bg-surface/30">
    <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
      <div>
        <h3 className="font-mono text-white font-bold mb-3">{SITE.name}</h3>
        <p className="text-muted text-sm">
          {SITE.jobTitle} at {SITE.worksFor}.
        </p>
      </div>
      <div>
        <h4 className="font-mono text-primary text-sm mb-3 uppercase tracking-wider">Pages</h4>
        <ul className="space-y-1.5 text-sm">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-muted hover:text-primary">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-mono text-primary text-sm mb-3 uppercase tracking-wider">Elsewhere</h4>
        <ul className="space-y-1.5 text-sm">
          <li>
            <a href={SITE.social.github} className="text-muted hover:text-primary">
              GitHub
            </a>
          </li>
          <li>
            <a href={SITE.social.linkedin} className="text-muted hover:text-primary">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={SITE.social.substack} className="text-muted hover:text-primary">
              Substack
            </a>
          </li>
          <li>
            <a href={`mailto:${SITE.email}`} className="text-muted hover:text-primary">
              {SITE.email}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 text-center text-xs text-muted font-mono">
        Built with Next.js · Deployed on Vercel ·{' '}
        <Link href="/architecture" className="hover:text-primary">
          /architecture
        </Link>
      </div>
    </div>
  </footer>
)

export default Footer
