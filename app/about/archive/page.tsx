import SectionHeader from '@/components/sections/SectionHeader'
import TimelineItem from '@/components/sections/TimelineItem'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { TIMELINE } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'
import myImg from '@/public/myImg.jpeg'

export const metadata = buildMetadata({
  title: 'Life Archive — Every Milestone',
  description:
    'The unfiltered Life Changelog: every milestone, every entry, in chronological order. The curated view lives at /about.',
  path: '/about/archive',
  keywords: ['life archive', 'full timeline', 'all milestones', 'changelog'],
})

export default function ArchivePage() {
  return (
    <div className="px-6 py-16 max-w-4xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
          { name: 'Archive', path: '/about/archive' },
        ])}
      />

      <a href="/about" className="text-primary hover:text-accent font-mono text-sm">
        ← Curated changelog
      </a>

      <div className="mt-6">
        <SectionHeader
          eyebrow="Archive"
          title="Every entry."
          italicAccent="The unfiltered changelog."
          description={`Every milestone — ${TIMELINE.length} entries across the full arc. The curated view lives at /about.`}
          asH1
        />
      </div>

      <ol className="mt-12 stagger">
        {TIMELINE.slice()
          .reverse()
          .map((item) => (
            <TimelineItem key={item.title} {...item} avatar={myImg} />
          ))}
      </ol>
    </div>
  )
}
