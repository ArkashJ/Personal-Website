import SectionHeader from '@/components/sections/SectionHeader'
import ProjectCard from '@/components/sections/ProjectCard'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { PROJECTS } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Projects — Cattle Logic, SpatialDINO, Open Source',
  description:
    'Selected projects: Cattle Logic (Benmore), SpatialDINO (Harvard), Benmore Foundry CLI, distributed systems work, and open source contributions.',
  path: '/projects',
  keywords: ['Cattle Logic', 'SpatialDINO', 'Raft', 'Flink', 'open source', 'distributed systems'],
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
        description="From Cattle Logic to a from-scratch Raft implementation. Real repos, real ship dates."
        asH1
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 reveal">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
    </div>
  )
}
