import Image from 'next/image'

const LOGO_MAP: Record<string, { src: string; alt: string }> = {
  'Boston University': {
    src: '/images/logos/boston-university.svg',
    alt: 'Boston University seal',
  },
  Harvard: {
    src: '/images/logos/harvard.svg',
    alt: 'Harvard University coat of arms',
  },
  "Boston Children's Hospital": {
    src: '/images/logos/boston-childrens-hospital.svg',
    alt: "Boston Children's Hospital logo",
  },
  NSF: {
    src: '/images/logos/nsf.svg',
    alt: 'National Science Foundation logo',
  },
  'Battery Ventures': {
    src: '/images/logos/battery-ventures.png',
    alt: 'Battery Ventures logo',
  },
  Benmore: {
    src: '/images/logos/benmore.png',
    alt: 'Benmore Technologies logo',
  },
  ZeroSync: {
    src: '/images/logos/zerosync.svg',
    alt: 'ZeroSync logo',
  },
}

// Aliases map alternate org strings → canonical LOGO_MAP key.
const LOGO_ALIASES: Record<string, string> = {
  'Benmore Technologies': 'Benmore',
  Benmore: 'Benmore',
  'Battery Ventures': 'Battery Ventures',
  ZeroSync: 'ZeroSync',
  'Harvard Medical School - Kirchhausen Lab': 'Harvard',
  'BU Chemistry / NSF UROP': 'NSF',
}

// Returns true ONLY when there's a real LOGO_MAP entry (or an alias to one).
// Used by callers to decide whether to render the logo wrapper at all —
// no monogram fallback, no placeholder badge.
export const hasLogo = (org?: string): boolean => {
  if (!org) return false
  if (LOGO_MAP[org]) return true
  const alias = LOGO_ALIASES[org]
  return Boolean(alias && LOGO_MAP[alias])
}

type Props = {
  org: string
  size?: number
  className?: string
}

const InstitutionLogo = ({ org, size = 28, className }: Props) => {
  const aliasKey = LOGO_ALIASES[org]
  const entry = LOGO_MAP[org] || (aliasKey ? LOGO_MAP[aliasKey] : undefined)
  if (!entry) return null
  return <Image src={entry.src} alt={entry.alt} width={size} height={size} className={className} />
}

export default InstitutionLogo
