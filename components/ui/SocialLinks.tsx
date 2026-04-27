import { SITE } from '@/lib/site'

// Aggressive sameAs surface — every public profile in one list.
// Each link uses `rel="me me-author"` so identity-graph crawlers (Mastodon,
// IndieWeb, Search Generative Experience) treat them as the same person.

type Link = { href: string; label: string; sub?: string }

export const SOCIAL_LINKS: Link[] = [
  { href: SITE.social.github, label: 'GitHub', sub: '@ArkashJ' },
  { href: SITE.social.linkedin, label: 'LinkedIn', sub: 'in/arkashj' },
  { href: SITE.social.twitter, label: 'X / Twitter', sub: '@_arkash' },
  { href: SITE.social.substack, label: 'Substack', sub: 'arkash.substack.com' },
  { href: SITE.social.medium, label: 'Medium', sub: '@arkjain' },
  { href: SITE.social.harvard, label: 'Harvard Lab Page', sub: 'Kirchhausen Lab' },
  { href: SITE.social.bu, label: 'BU CS Profile', sub: 'cs.bu.edu' },
  { href: SITE.social.scholar, label: 'Google Scholar', sub: 'scholar.google.com' },
  { href: SITE.social.biorxiv, label: 'BioRxiv (SpatialDINO)', sub: '10.1101/2025.02.04.636474' },
  { href: SITE.social.pubmed, label: 'PubMed', sub: 'NCBI' },
  { href: SITE.social.orcid, label: 'ORCID', sub: '0000-0003-2692-7472' },
  { href: `mailto:${SITE.email}`, label: 'Email', sub: SITE.email },
]

type Props = {
  variant?: 'grid' | 'inline'
  className?: string
}

const SocialLinks = ({ variant = 'grid', className = '' }: Props) => {
  if (variant === 'inline') {
    return (
      <ul className={`flex flex-wrap gap-x-4 gap-y-2 ${className}`}>
        {SOCIAL_LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target={l.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="me me-author noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-primary transition-colors"
            >
              {l.label} →
            </a>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className={`grid gap-2 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {SOCIAL_LINKS.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target={l.href.startsWith('mailto:') ? undefined : '_blank'}
            rel="me me-author noopener noreferrer"
            className="block px-4 py-3 bg-surface border border-border hover:border-primary hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="block text-sm font-medium text-text">{l.label}</span>
            {l.sub && (
              <span className="block font-mono text-[11px] text-subtle mt-0.5">{l.sub}</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks
