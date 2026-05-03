import SectionHeader from '@/components/sections/SectionHeader'
import ProjectsClient from './ProjectsClient'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { PROJECTS, WORK_TOOLS } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Projects — SpatialDINO, Raft, Open Source',
  description:
    'Selected projects: SpatialDINO (Harvard 3D self-supervised vision transformer), from-scratch Raft consensus in Go, NEXMARK Flink benchmark, Benmore Foundry CLI, plus open source contributions.',
  path: '/projects',
  keywords: ['SpatialDINO', 'Raft', 'Flink', 'open source', 'distributed systems', 'LLSM'],
})

export default function ProjectsPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />
      <SectionHeader
        eyebrow="Projects"
        title="Things I've built."
        italicAccent="Research code, internal tooling, open source."
        description="From SpatialDINO to a from-scratch Raft implementation. Real repos, real ship dates."
        asH1
      />
      <ProjectsClient projects={PROJECTS} workTools={WORK_TOOLS} />
    </div>
  )
}
