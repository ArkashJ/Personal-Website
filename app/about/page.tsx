import SectionHeader from '@/components/sections/SectionHeader'
import TimelineItem from '@/components/sections/TimelineItem'
import { TIMELINE } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'
import myImg from '@/public/myImg.jpeg'

export const metadata = buildMetadata({
  title: 'About — From Physics to Harvard AI to Building AI Companies',
  description:
    'Life changelog: physics → VC → distributed systems → Harvard AI research → forward-deployed engineering at Benmore.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="px-6 py-16 max-w-4xl mx-auto">
      <SectionHeader
        eyebrow="About"
        title="Life Changelog"
        description="Every meaningful milestone, in order. Real status, real dates."
      />
      <ol className="mt-12">
        {TIMELINE.map((item) => (
          <TimelineItem key={item.title} {...item} avatar={myImg} />
        ))}
      </ol>
    </div>
  )
}
