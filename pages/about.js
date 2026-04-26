import SectionHeader from '../components/sections/SectionHeader'
import TimelineItem from '../components/sections/TimelineItem'
import { TIMELINE } from '../lib/data'
import myImg from '../public/myImg.jpeg'

export default function About() {
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

About.meta = {
  title: 'About — From Physics to Harvard AI to Building AI Companies',
  path: '/about',
  description:
    'Life changelog: physics → VC → distributed systems → Harvard AI research → forward-deployed engineering at Benmore.',
}
