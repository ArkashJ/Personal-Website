import SectionHeader from '@/components/sections/SectionHeader'
import ExperienceCard from '@/components/sections/ExperienceCard'
import { EXPERIENCE } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Experience — Benmore, Harvard, Battery Ventures',
  description:
    'Work history: Head of FDE at Benmore Technologies, ML Researcher at Harvard, ZeroSync, Boston Children’s Hospital, Boston University, Battery Ventures.',
  path: '/experience',
})

export default function ExperiencePage() {
  return (
    <div className="px-6 py-16 max-w-4xl mx-auto">
      <SectionHeader
        eyebrow="Experience"
        title="Where I’ve worked"
        description="Reverse-chronological. Real entries — Benmore, Harvard, Battery Ventures, ZeroSync, BCH, BU."
      />
      <div className="grid gap-6 mt-8">
        {EXPERIENCE.map((e) => (
          <ExperienceCard key={`${e.org}-${e.role}`} {...e} />
        ))}
      </div>
    </div>
  )
}
