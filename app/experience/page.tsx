import SectionHeader from '@/components/sections/SectionHeader'
import ExperienceStoryNode from '@/components/sections/ExperienceStoryNode'
import ExperienceCard from '@/components/sections/ExperienceCard'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { EXPERIENCE } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Experience — Benmore, Harvard Medical School, Boston University',
  description:
    'Forward deployed engineer at Benmore Technologies, ML researcher at Harvard Kirchhausen Lab, distributed systems researcher and TA at Boston University.',
  path: '/experience',
  keywords: [
    'Benmore Technologies',
    'Harvard Medical School',
    'Boston University',
    'forward deployed engineer',
    'ML researcher',
    'SpatialDINO',
    'Foundry CLI',
  ],
})

const FEATURED_ORGS = [
  'Benmore Technologies',
  'Harvard Medical School - Kirchhausen Lab',
  'Boston University',
]

export default function ExperiencePage() {
  const featured = EXPERIENCE.filter((e) => FEATURED_ORGS.includes(e.org))
  const earlier = EXPERIENCE.filter((e) => !FEATURED_ORGS.includes(e.org))

  return (
    <div className="px-6 py-16 max-w-4xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Experience', path: '/experience' },
        ])}
      />

      <SectionHeader
        eyebrow="Experience"
        title="Where I've worked."
        italicAccent="Real stories, real stakes."
        description="Three institutions that shaped how I think about building. Benmore taught me delivery at speed. Harvard taught me rigor at scale. BU taught me that the fundamentals are never optional."
        asH1
      />

      {/* Featured story timeline */}
      <ol className="mt-12 stagger">
        {featured.map((e) => (
          <ExperienceStoryNode key={`${e.org}-${e.role}`} {...e} />
        ))}
      </ol>

      {/* Earlier career */}
      {earlier.length > 0 && (
        <section className="mt-16 pt-12 border-t border-border">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted mb-6">
            Earlier Career
          </h2>
          <div className="grid gap-6 reveal">
            {earlier.map((e) => (
              <ExperienceCard key={`${e.org}-${e.role}`} {...e} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-16 pt-8 border-t border-border">
        <a
          href="/about#career"
          className="font-mono text-xs text-muted hover:text-primary transition-colors"
        >
          ← Full career on About page
        </a>
      </div>
    </div>
  )
}
