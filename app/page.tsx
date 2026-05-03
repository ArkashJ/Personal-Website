import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import GitHubActivity from '@/components/sections/GitHubActivity'
import SectionHeader from '@/components/sections/SectionHeader'
import PaperCard from '@/components/sections/PaperCard'
import ProjectCard from '@/components/sections/ProjectCard'
import CurrentUpdates from '@/components/sections/CurrentUpdates'
import Card from '@/components/ui/Card'
import TechBadge from '@/components/ui/TechBadge'
import { PAPERS, PROJECTS, KNOWLEDGE_DOMAINS, TIMELINE } from '@/lib/data'
import { COURSES } from '@/lib/coursework'
import { getAllWritingPosts } from '@/lib/content'
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

export default function Home() {
  const writing = getAllWritingPosts()
  const featuredProjects = PROJECTS.slice(0, 4)
  const latestTimeline = TIMELINE.filter((t) => t.featured)
    .slice()
    .reverse()
    .slice(0, 6)
  const featuredCourses = COURSES.slice(0, 6)

  return (
    <div>
      <Hero />

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

      {/* Current updates — latest writing + Medium + LinkedIn embeds */}
      <CurrentUpdates writing={writing} />

      {/* Recent timeline strip — mini changelog */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Recent"
          title="Latest milestones"
          href="/about"
          hrefLabel="Full timeline →"
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {latestTimeline.map((t) => (
            <Link
              key={t.title}
              href={t.slug ? `/about/timeline/${t.slug}` : '/about'}
              className="block group"
            >
              <Card glow className="h-full">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    {t.category}
                  </span>
                  <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                    {t.date}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-text leading-tight group-hover:text-primary transition-colors">
                  {t.title}
                </h3>
              </Card>
            </Link>
          ))}
        </div>
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

      {/* Skills + Knowledge — two-up */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Skills Library"
              title="71 Claude Code skills"
              href="/skills"
              hrefLabel="Browse all →"
            />
            <Card glow href="/skills" className="block">
              <p className="text-muted text-sm leading-relaxed mb-3">
                Public library of agent skills used daily at Benmore — payments, design, compliance,
                CLI tooling, AI SEO. Each one is one click to copy into your LLM.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Payments', 'Compliance', 'Design Eng', 'AI SEO', 'CLI', 'Frontend'].map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-primary border border-primary/30 bg-primary/5"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="font-mono text-xs text-primary mt-4">View all 71 →</p>
            </Card>
          </div>
          <div>
            <SectionHeader
              eyebrow="Knowledge"
              title="Second brain, in public"
              href="/writing#second-brain"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {KNOWLEDGE_DOMAINS.map((d) => (
                <Link
                  key={d.slug}
                  href={`/knowledge/${d.slug}`}
                  className="px-4 py-2 rounded-full bg-surface border border-border hover:border-primary hover:text-primary hover:-translate-y-0.5 text-sm font-mono transition-[color,border-color,transform] duration-150"
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
