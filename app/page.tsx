import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import GitHubActivity from '@/components/sections/GitHubActivity'
import SectionHeader from '@/components/sections/SectionHeader'
import PaperCard from '@/components/sections/PaperCard'
import ProjectCard from '@/components/sections/ProjectCard'
import CurrentUpdates from '@/components/sections/CurrentUpdates'
import FeaturedBanner from '@/components/sections/FeaturedBanner'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import TechBadge from '@/components/ui/TechBadge'
import { PAPERS, PROJECTS, TIMELINE } from '@/lib/data'
import { COURSES } from '@/lib/coursework'
import { getAllWritingPosts } from '@/lib/content'
import { topHighlights } from '@/lib/highlights'
import { getLatestWeeklyLog, categoryCounts } from '@/lib/weekly'
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
  const recentWins = topHighlights(4, 30)
  const latestWeekly = getLatestWeeklyLog()
  const latestWeeklyCounts = latestWeekly ? categoryCounts(latestWeekly) : null

  return (
    <div>
      <FeaturedBanner />
      <Hero />

      {/* This week — latest weekly log surfaced on home */}
      {latestWeekly && latestWeeklyCounts && (
        <section className="px-6 py-8 max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="This week"
            title={latestWeekly.title}
            href={`/weekly/${latestWeekly.slug}`}
            hrefLabel="Read the log →"
          />
          <Link href={`/weekly/${latestWeekly.slug}`} className="block group">
            <Card glow>
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  {latestWeekly.slug}
                </span>
                <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                  {latestWeekly.weekStart} → {latestWeekly.weekEnd}
                </span>
              </div>
              {latestWeekly.description && (
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {latestWeekly.description}
                </p>
              )}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 pt-3 border-t border-border">
                {(
                  [
                    ['Read', latestWeeklyCounts.read],
                    ['Watched', latestWeeklyCounts.watched],
                    ['Built', latestWeeklyCounts.built],
                    ['Shipped', latestWeeklyCounts.shipped],
                    ['Learned', latestWeeklyCounts.learned],
                    ['Met', latestWeeklyCounts.met],
                  ] as const
                ).map(([label, count]) => (
                  <div key={label}>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                      {label}
                    </p>
                    <p className="text-xl font-bold text-text mt-0.5">{count}</p>
                  </div>
                ))}
              </div>
              {latestWeekly.tags && latestWeekly.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {latestWeekly.tags.map((t) => (
                    <Badge key={t} variant="teal">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          </Link>
        </section>
      )}

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

      {/* Recent wins — top-priority highlights from the data bank */}
      {recentWins.length > 0 && (
        <section className="px-6 py-10 max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Recent wins"
            title="The highlight reel"
            href="/weekly"
            hrefLabel="Weekly logs →"
          />
          <div className="grid gap-3 md:grid-cols-2">
            {recentWins.map((h) => {
              const isExternal = h.link?.startsWith('http')
              const inner = (
                <Card glow className="h-full">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <Badge variant="teal">{h.category}</Badge>
                    <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                      {h.date}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-text leading-snug group-hover:text-primary transition-colors duration-150">
                    {h.headline}
                    {h.link && <span className="ml-1 text-primary">→</span>}
                  </p>
                </Card>
              )
              const key = `${h.date}-${h.headline}`
              if (h.link) {
                return isExternal ? (
                  <a
                    key={key}
                    href={h.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block group"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link key={key} href={h.link} className="block group">
                    {inner}
                  </Link>
                )
              }
              return (
                <div key={key} className="block group">
                  {inner}
                </div>
              )
            })}
          </div>
        </section>
      )}

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

      {/* Skills */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Skills Library"
          title="71 agent skills"
          href="/skills"
          hrefLabel="Browse all →"
        />
        <Card glow href="/skills" className="block">
          <p className="text-muted text-sm leading-relaxed mb-3">
            Public library of agent skills used daily at Benmore — payments, design, compliance, CLI
            tooling, AI SEO. Each one is one click to copy into your LLM.
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
      </section>
    </div>
  )
}
