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
    src: '/images/logos/battery-ventures.svg',
    alt: 'Battery Ventures logo',
  },
  Benmore: {
    src: '/images/logos/benmore.png',
    alt: 'Benmore Technologies logo',
  },
  ZeroSync: {
    src: '/images/logos/zerosync.png',
    alt: 'ZeroSync logo',
  },
}

// Aliases map alternate org strings → canonical LOGO_MAP key.
const MONOGRAM_ALIASES: Record<string, string> = {
  'Benmore Technologies': 'Benmore',
  Benmore: 'Benmore',
  'Battery Ventures': 'Battery Ventures',
  ZeroSync: 'ZeroSync',
  'Harvard Medical School - Kirchhausen Lab': 'Harvard',
  'BU Chemistry / NSF UROP': 'NSF',
}

const monogram = (org: string): string => {
  const cleaned = org.replace(/[^a-zA-Z\s]/g, ' ').trim()
  const words = cleaned.split(/\s+/).filter((w) => w.length > 0)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

export const hasLogo = (org?: string): boolean => {
  if (!org) return false
  if (LOGO_MAP[org]) return true
  if (MONOGRAM_ALIASES[org] && LOGO_MAP[MONOGRAM_ALIASES[org]]) return true
  // Render monogram for any non-empty org
  return true
}

type Props = {
  org: string
  size?: number
  className?: string
}

const InstitutionLogo = ({ org, size = 28, className }: Props) => {
  const aliasKey = MONOGRAM_ALIASES[org]
  const entry = LOGO_MAP[org] || (aliasKey ? LOGO_MAP[aliasKey] : undefined)
  if (entry) {
    return (
      <Image src={entry.src} alt={entry.alt} width={size} height={size} className={className} />
    )
  }
  // Monogram fallback
  return (
    <span
      role="img"
      aria-label={`${org} monogram`}
      className={`flex items-center justify-center bg-elevated text-primary font-mono font-bold ${className ?? ''}`}
      style={{ width: size, height: size, fontSize: Math.max(8, Math.floor(size * 0.42)) }}
    >
      {monogram(org)}
    </span>
  )
}

export default InstitutionLogo
