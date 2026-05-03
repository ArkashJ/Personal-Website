export const SITE = {
  name: 'Arkash Jain',
  url: 'https://www.arkashj.com',
  title: 'Arkash Jain — AI Researcher, Forward Deployed Engineer & Builder',
  description:
    'AI researcher (Harvard Kirchhausen Lab), forward deployed engineer at Benmore Technologies, three published papers including SpatialDINO — a 3D self-supervised vision transformer for cryo-electron tomography.',
  email: 'arkash@benmore.tech',
  social: {
    github: 'https://github.com/ArkashJ',
    linkedin: 'https://www.linkedin.com/in/arkashj/',
    substack: 'https://arkash.substack.com',
    medium: 'https://medium.com/@arkjain',
    biorxiv: 'https://www.biorxiv.org/content/10.1101/2025.02.04.636474',
    scholar: 'https://scholar.google.com/scholar?q=arkash+jain',
    harvard: 'https://kirchhausen.hms.harvard.edu/people/arkash-jain-ms-bs',
    twitter: 'https://x.com/ArkashJ__',
    orcid: 'https://orcid.org/0000-0003-2692-7472',
    pubmed: 'https://pubmed.ncbi.nlm.nih.gov/?term=arkash+jain',
    bu: 'https://www.bu.edu/cs/profiles/arkash-jain/',
  },
  jobTitle: 'Forward Deployed Engineer & AI Researcher',
  worksFor: 'Benmore Technologies',
  alumniOf: ['Harvard University', 'Boston University'],
} as const

export type NavLink = { href: string; label: string }

export const NAV_LINKS: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/research', label: 'Research' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/writing', label: 'Writing' },
  { href: '/learnings', label: 'Learnings' },
  { href: '/media', label: 'Media' },
]

// Secondary pages — surfaced in footer, not primary nav
export const SECONDARY_LINKS: NavLink[] = [
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/credentials', label: 'Credentials' },
  { href: '/stack', label: 'Stack' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/coursework', label: 'Coursework' },
  { href: '/docs', label: 'Docs' },
]
