import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import BackLink from '@/components/ui/BackLink'
import InstitutionLogo from '@/components/ui/InstitutionLogo'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Credentials — Degrees, Harvard ID, Awards',
  description:
    'Verifiable credentials: BA Math + CS, MS Computer Science (Boston University, Magna Cum Laude), Harvard University ID, NSF UROP scholar, Marvin Freedman Math Scholar.',
  path: '/credentials',
  keywords: [
    'BA Mathematics',
    'MS Computer Science',
    'Boston University degree',
    'Magna Cum Laude',
    'Harvard University ID',
    'UROP Scholar',
    'Marvin Freedman Scholar',
  ],
})

type Credential = {
  title: string
  issuer: string
  org: 'Boston University' | 'Harvard' | 'NSF'
  date: string
  fileUrl?: string
  description: string
  badges?: string[]
}

const CREDENTIALS: Credential[] = [
  {
    title: 'Bachelor of Arts',
    issuer: 'Mathematics & Computer Science',
    org: 'Boston University',
    date: 'May 2024',
    fileUrl: '/files/arkash-jain-bachelor-of-arts-mathematics-cs.pdf',
    description: 'Magna Cum Laude. Math + CS dual major.',
    badges: ['Magna Cum Laude', 'Dual Major'],
  },
  {
    title: 'Master of Science',
    issuer: 'Computer Science',
    org: 'Boston University',
    date: 'May 2024',
    fileUrl: '/files/arkash-jain-master-of-science-computer-science.pdf',
    description: 'Distributed systems thesis: dynamic checkpointing for Apache Flink.',
    badges: ['BA/MS accelerated', 'Thesis: Flink'],
  },
  {
    title: 'University ID',
    issuer: 'Harvard University',
    org: 'Harvard',
    date: 'May 2024 – Aug 2025',
    fileUrl: '/files/arkash-jain-harvard-university-id.pdf',
    description: 'ML researcher at Harvard Medical School — Kirchhausen Lab.',
    badges: ['Kirchhausen Lab', 'cryo-ET', 'SpatialDINO'],
  },
  {
    title: 'NSF UROP Scholar',
    issuer: 'National Science Foundation × BU',
    org: 'NSF',
    date: '2021',
    description:
      '1 of 5 freshmen selected university-wide. Funded the supercritical-fluids research that became my first paper.',
    badges: ['1 of 5 freshmen', 'NSF-funded'],
  },
  {
    title: 'Marvin Freedman Mathematics Scholar',
    issuer: 'BU Mathematics Department',
    org: 'Boston University',
    date: '2024',
    description: 'Top 6 mathematics undergraduate award.',
    badges: ['1 of 6'],
  },
]

const CredentialCard = ({ c }: { c: Credential }) => (
  <Card glow className="h-full flex flex-col">
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-elevated border border-border">
          <InstitutionLogo org={c.org} size={28} className="object-contain" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[10px] text-primary uppercase tracking-widest">{c.org}</p>
          <h3 className="text-base font-bold text-text leading-tight">{c.title}</h3>
          <p className="text-muted text-xs mt-0.5">{c.issuer}</p>
        </div>
      </div>
      <span className="font-mono text-[10px] text-subtle uppercase tracking-widest whitespace-nowrap pt-1">
        {c.date}
      </span>
    </div>
    <p className="text-muted text-sm leading-relaxed mb-3">{c.description}</p>
    {c.badges && c.badges.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-3">
        {c.badges.map((b) => (
          <Badge key={b}>{b}</Badge>
        ))}
      </div>
    )}
    {c.fileUrl && (
      <a
        href={c.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-primary hover:text-accent transition-colors"
      >
        View PDF →
      </a>
    )}
  </Card>
)

export default function CredentialsPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Credentials', path: '/credentials' },
        ])}
      />
      <BackLink href="/about" label="About" />
      <div className="mt-6">
        <SectionHeader
          eyebrow="Credentials"
          title="Verifiable degrees, IDs, awards."
          italicAccent="The actual paper."
          description="Boston University BA + MS, Harvard University ID, NSF + Marvin Freedman scholarships. Click any card to view the PDF."
          asH1
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8 reveal">
        {CREDENTIALS.map((c) => (
          <CredentialCard key={c.title} c={c} />
        ))}
      </div>
    </div>
  )
}
