import Link from 'next/link'
import { SITE, NAV_LINKS, SECONDARY_LINKS } from '@/lib/site'

const Footer = () => (
  <footer className="border-t border-border mt-24 bg-surface">
    <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
      <div>
        <h3 className="font-mono text-text font-bold mb-3 tracking-tight">{SITE.name}</h3>
        <p className="text-muted text-sm leading-relaxed">
          {SITE.jobTitle} at {SITE.worksFor}.
        </p>
      </div>
      <div>
        <h4 className="font-mono text-primary text-[11px] mb-3 uppercase tracking-widest">Pages</h4>
        <ul className="space-y-1.5 text-sm">
          {[...NAV_LINKS, ...SECONDARY_LINKS].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-muted hover:text-text transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-mono text-primary text-[11px] mb-3 uppercase tracking-widest">
          Elsewhere
        </h4>
        <ul className="space-y-1.5 text-sm">
          <li>
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-text"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-text"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={SITE.social.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-text"
            >
              Substack
            </a>
          </li>
          <li>
            <a
              href={SITE.social.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-text"
            >
              Medium
            </a>
          </li>
          <li>
            <a
              href={SITE.social.harvard}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-text"
            >
              Harvard Lab Page
            </a>
          </li>
          <li>
            <a href={`mailto:${SITE.email}`} className="text-muted hover:text-text">
              {SITE.email}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[11px] text-subtle font-mono uppercase tracking-widest">
        <span>
          © {new Date().getFullYear()} <span itemProp="author">Arkash Jain</span> — built &amp;
          maintained by{' '}
          <a href={SITE.url} className="hover:text-primary" rel="author">
            arkashj.com
          </a>
        </span>
        <span>
          Built with Next.js · Deployed on Vercel ·{' '}
          <Link href="/architecture" className="hover:text-primary">
            /architecture
          </Link>
          ·{' '}
          <a href="/humans.txt" className="hover:text-primary">
            humans.txt
          </a>
        </span>
      </div>
    </div>
  </footer>
)

export default Footer
