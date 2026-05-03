import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import GitHubActivity from '@/components/sections/GitHubActivity'
import SectionHeader from '@/components/sections/SectionHeader'
import PaperCard from '@/components/sections/PaperCard'
import ProjectCard from '@/components/sections/ProjectCard'
import RollingLog from '@/components/sections/RollingLog'
import FeaturedBanner from '@/components/sections/FeaturedBanner'
import Card from '@/components/ui/Card'
import TechBadge from '@/components/ui/TechBadge'
import { PAPERS, PROJECTS } from '@/lib/data'
import { COURSES } from '@/lib/coursework'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  path: '/',
  keywords: [
    'Arkash Jain',
    'AI researcher',
    'forward deployed engineer',
    'SpatialDINO',
    'Harvard',
    'Benmore',
  ],
})

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1)

  const featuredProjects = PROJECTS.slice(0, 4)
  const featuredCourses = COURSES.slice(0, 6)

  return (
    <div>
      <Hero />

      {/* Rolling log — paginated weekly updates (replaces single "This Week" card) */}
      <section className="px-6 py-4 max-w-6xl mx-auto">
        <div className="mb-4">
          <FeaturedBanner />
        </div>
      </section>
      <RollingLog page={page} />

      {/* GitHub — live activity widgets, snapshot, top languages */}
      <GitHubActivity />

      {/* Arc summary */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="The Arc"
          title="Physics → VC → Distributed Systems → Harvard AI → Building"
          href="/about"
          hrefLabel="Read full story →"
        />
        <Card>
          <p className="text-muted leading-relaxed">
            I came to Boston from India in 2020. NSF UROP scholar in chemical physics, two stints at
            Battery Ventures, distributed-systems research at BU, then Harvard&apos;s Kirchhausen
            Lab to build SpatialDINO. Now Head of FDE at Benmore.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-5 pt-4 border-t border-border">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Papers</p>
              <p className="text-2xl font-bold text-text mt-1">3</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                Classes Deep-Dived
              </p>
              <p className="text-2xl font-bold text-text mt-1">{COURSES.length}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Repos</p>
              <p className="text-2xl font-bold text-text mt-1">25+</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Research */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <SectionHeader eyebrow="Research" title="3 published papers" href="/research" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PAPERS.map((p) => (
            <PaperCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* Coursework strip */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Coursework"
          title="BU CS, Math & PL — by class"
          href="/coursework"
          hrefLabel="All coursework →"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((c) => (
            <Link key={c.slug} href={`/coursework/${c.slug}`} className="block group">
              <Card glow className="h-full">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
                    {c.code}
                  </span>
                  <span className="font-mono text-[10px] text-subtle">{c.semester}</span>
                </div>
                <h3 className="text-sm font-bold text-text leading-tight mb-2 group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {c.tech.slice(0, 3).map((t) => (
                    <TechBadge key={t} label={t} />
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <SectionHeader eyebrow="Projects" title="Selected work" href="/projects" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>
      </section>
    </div>
  )
}
