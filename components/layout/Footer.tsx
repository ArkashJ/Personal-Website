import Link from 'next/link'
import { Mail, ExternalLink, Briefcase, GraduationCap } from 'lucide-react'
import { SITE, NAV_LINKS, SECONDARY_LINKS } from '@/lib/site'
import BenmoreBadge from '@/components/ui/BenmoreBadge'

// simple-icons CDN brand marks (same trick as TechBadge); fall through to
// lucide for things without a registered brand (email).
type IconSpec =
  | { kind: 'simple'; slug: string }
  | { kind: 'lucide'; Component: React.ComponentType<{ size?: number }> }

const SOCIALS: { href: string; label: string; icon: IconSpec }[] = [
  { href: SITE.social.github, label: 'GitHub', icon: { kind: 'simple', slug: 'github' } },
  {
    href: SITE.social.linkedin,
    label: 'LinkedIn',
    icon: { kind: 'lucide', Component: Briefcase },
  },
  { href: SITE.social.twitter, label: 'X', icon: { kind: 'simple', slug: 'x' } },
  { href: SITE.social.substack, label: 'Substack', icon: { kind: 'simple', slug: 'substack' } },
  { href: SITE.social.medium, label: 'Medium', icon: { kind: 'simple', slug: 'medium' } },
  {
    href: SITE.social.harvard,
    label: 'Harvard',
    icon: { kind: 'lucide', Component: GraduationCap },
  },
  {
    href: SITE.social.scholar,
    label: 'Scholar',
    icon: { kind: 'simple', slug: 'googlescholar' },
  },
  { href: SITE.social.orcid, label: 'ORCID', icon: { kind: 'simple', slug: 'orcid' } },
  { href: `mailto:${SITE.email}`, label: 'Email', icon: { kind: 'lucide', Component: Mail } },
]

const SocialIcon = ({ spec }: { spec: IconSpec }) => {
  if (spec.kind === 'lucide') {
    const Icon = spec.Component
    return <Icon size={16} />
  }
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={`https://cdn.simpleicons.org/${spec.slug}`}
      alt=""
      width={16}
      height={16}
      loading="lazy"
      className="opacity-90 group-hover:opacity-100 transition-opacity"
    />
  )
}

const Footer = () => (
  <footer className="border-t border-border mt-24 bg-surface">
    <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-12">
      <div className="md:col-span-4">
        <h3 className="font-mono text-text font-bold mb-2 tracking-tight">{SITE.name}</h3>
        <p className="text-muted text-sm leading-relaxed mb-3">
          {SITE.jobTitle} at{' '}
          <a
            href="https://benmore.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-primary inline-flex items-center gap-1.5 transition-colors duration-150"
          >
            <BenmoreBadge size={14} />
            <span>{SITE.worksFor}</span>
          </a>
          .
        </p>
        <p className="text-subtle text-xs leading-relaxed">{SITE.description}</p>
      </div>

      <div className="md:col-span-4">
        <h4 className="font-mono text-primary text-[10px] mb-3 uppercase tracking-widest">Pages</h4>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          {[...NAV_LINKS, ...SECONDARY_LINKS].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-muted hover:text-primary transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-4">
        <h4 className="font-mono text-primary text-[10px] mb-3 uppercase tracking-widest">
          Elsewhere
        </h4>
        <ul className="grid grid-cols-3 gap-2">
          {SOCIALS.map(({ href, label, icon }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="me me-author noopener noreferrer"
                aria-label={label}
                title={label}
                className="group flex flex-col items-center justify-center gap-1 px-2 py-3 bg-elevated border border-border hover:border-primary hover:-translate-y-0.5 transition-all duration-200"
              >
                <SocialIcon spec={icon} />
                <span className="font-mono text-[9px] text-subtle group-hover:text-primary uppercase tracking-widest leading-tight text-center">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-[10px] text-subtle mt-3">
          <a href={`mailto:${SITE.email}`} className="hover:text-primary">
            {SITE.email}
          </a>
        </p>
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
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>Next.js · Vercel</span>
          <Link href="/architecture" className="hover:text-primary inline-flex items-center gap-1">
            /architecture <ExternalLink size={9} />
          </Link>
          <a href="/humans.txt" className="hover:text-primary inline-flex items-center gap-1">
            humans.txt <ExternalLink size={9} />
          </a>
        </span>
      </div>
    </div>
  </footer>
)

export default Footer
