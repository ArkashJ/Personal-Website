import SectionHeader from '@/components/sections/SectionHeader'
import TimelineItem from '@/components/sections/TimelineItem'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { TIMELINE } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'
import myImg from '@/public/myImg.jpeg'

export const metadata = buildMetadata({
  title: 'About — From Physics to Harvard AI to Building AI Companies',
  description:
    'Life changelog: physics → VC → distributed systems → Harvard AI research → forward-deployed engineering at Benmore.',
  path: '/about',
  keywords: [
    'life story',
    'Chandigarh',
    'Boston University',
    'JEE Advanced',
    'Harvard',
    'timeline',
  ],
})

export default function AboutPage() {
  return (
    <div className="px-6 py-16 max-w-4xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <SectionHeader
        eyebrow="About"
        title="Life Changelog."
        italicAccent="In order. Real dates."
        description="Every meaningful milestone — arrival in the US, first paper, Harvard, Benmore. The full arc."
        asH1
      />
      <ol className="mt-12 stagger">
        {TIMELINE.filter((t) => t.featured)
          .slice()
          .reverse()
          .map((item) => (
            <TimelineItem key={item.title} {...item} avatar={myImg} />
          ))}
      </ol>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-muted text-sm">
          Showing {TIMELINE.filter((t) => t.featured).length} curated milestones.{' '}
          <a
            href="/about/archive"
            className="text-primary hover:text-accent font-mono inline-block ml-1"
          >
            See the full archive ({TIMELINE.length}) →
          </a>
        </p>
      </div>
    </div>
  )
}
