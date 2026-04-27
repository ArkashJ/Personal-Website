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
}

export const hasLogo = (org?: string): boolean => Boolean(org && LOGO_MAP[org])

type Props = {
  org: string
  size?: number
  className?: string
}

const InstitutionLogo = ({ org, size = 28, className }: Props) => {
  const entry = LOGO_MAP[org]
  if (!entry) return null
  return <Image src={entry.src} alt={entry.alt} width={size} height={size} className={className} />
}

export default InstitutionLogo
