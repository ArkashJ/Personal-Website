import SectionHeader from '@/components/sections/SectionHeader'
import ProjectCard from '@/components/sections/ProjectCard'
import { PROJECTS } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Projects — Cattle Logic, SpatialDINO, Open Source',
  description:
    'Selected projects: Cattle Logic (Benmore), SpatialDINO (Harvard), Benmore Foundry CLI, distributed systems work, and open source contributions.',
  path: '/projects',
})

export default function ProjectsPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Projects"
        title="Things I've built."
        italicAccent="Research code, internal tooling, open source."
        description="From Cattle Logic to a from-scratch Raft implementation. Real repos, real ship dates."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
    </div>
  )
}
