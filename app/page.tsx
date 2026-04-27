import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import SectionHeader from '@/components/sections/SectionHeader'
import PaperCard from '@/components/sections/PaperCard'
import ProjectCard from '@/components/sections/ProjectCard'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import TechBadge from '@/components/ui/TechBadge'
import SocialLinks from '@/components/ui/SocialLinks'
import { PAPERS, PROJECTS, WORK_TOOLS, KNOWLEDGE_DOMAINS, TIMELINE } from '@/lib/data'
import { COURSES } from '@/lib/coursework'
import { STU_STREET_EPISODES, FEATURED_VIDEOS, REVIEWS } from '@/lib/media'
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
  const featuredWork = WORK_TOOLS.slice(0, 3)
  const latestWriting = writing.slice(0, 3)
  const latestTimeline = TIMELINE.filter((t) => t.featured)
    .slice()
    .reverse()
    .slice(0, 6)
  const featuredCourses = COURSES.slice(0, 6)

  return (
    <div>
      <Hero />

      {/* Two-up: arc summary + recent posts */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <SectionHeader
              eyebrow="The Arc"
              title="Physics → VC → Distributed Systems → Harvard AI → Building"
              href="/about"
              hrefLabel="Read full story →"
            />
            <Card>
              <p className="text-muted leading-relaxed">
                I came to Boston from India in 2020. NSF UROP scholar in chemical physics, two
                stints at Battery Ventures, distributed-systems research at BU, then Harvard&apos;s
                Kirchhausen Lab to build SpatialDINO. Now Head of FDE at Benmore.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-5 pt-4 border-t border-border">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                    Papers
                  </p>
                  <p className="text-2xl font-bold text-text mt-1">3</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                    Classes Deep-Dived
                  </p>
                  <p className="text-2xl font-bold text-text mt-1">{COURSES.length}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                    Repos
                  </p>
                  <p className="text-2xl font-bold text-text mt-1">25+</p>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <SectionHeader eyebrow="Now" title="Currently" />
            <Card glow className="h-full">
              <Badge variant="cyan">● Current</Badge>
              <h3 className="text-base font-bold text-text mt-3 mb-1.5">Head of FDE · Benmore</h3>
              <p className="text-muted text-xs leading-relaxed mb-3">
                Forward-deployed engineering across SMB AI engagements.
              </p>
              {latestWriting[0] && (
                <div className="pt-3 border-t border-border">
                  <Badge variant="teal" className="mb-2">
                    Latest writing
                  </Badge>
                  <Link
                    href={`/writing/${latestWriting[0].slug}`}
                    className="block text-sm font-medium text-text hover:text-primary transition-colors"
                  >
                    {latestWriting[0].title} →
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

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

      {/* Tools + Knowledge — two-up */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Work & Tools"
              title="What I ship every day"
              href="/experience"
            />
            <div className="grid gap-3">
              {featuredWork.map((w) => (
                <Card key={w.name} glow>
                  <h3 className="text-base font-bold text-text mb-1.5">{w.name}</h3>
                  <p className="text-muted text-xs leading-relaxed mb-2">{w.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {w.tech.map((t) => (
                      <TechBadge key={t} label={t} />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Knowledge" title="Second brain, in public" href="/knowledge" />
            <div className="flex flex-wrap gap-2">
              {KNOWLEDGE_DOMAINS.map((d) => (
                <Link
                  key={d.slug}
                  href={`/knowledge/${d.slug}`}
                  className="px-4 py-2 rounded-full bg-surface border border-border hover:border-primary hover:text-primary hover:-translate-y-0.5 text-sm font-mono transition-all duration-200"
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media preview grid */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Media"
          title="Podcasts, talks, reviews"
          href="/media"
          hrefLabel="All media →"
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            ...FEATURED_VIDEOS.slice(0, 1).map((v) => ({
              kind: 'Talk',
              label: 'Benmore Talk',
              title: v.title,
              href: '/media',
            })),
            ...STU_STREET_EPISODES.filter((e) => e.youtubeId)
              .slice(0, 2)
              .map((e) => ({
                kind: 'Podcast',
                label: `STU STREET · Ep ${e.number}`,
                title: e.title,
                href: '/media',
              })),
            {
              kind: 'Reviews',
              label: 'Trustpilot',
              title: `${REVIEWS.length} verified client reviews`,
              href: '/media',
            },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="block group">
              <Card glow className="h-full">
                <Badge variant={item.kind === 'Reviews' ? 'green' : 'teal'} className="mb-2">
                  {item.kind === 'Reviews' ? '★ Verified' : item.kind}
                </Badge>
                <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2">
                  {item.label}
                </p>
                <h3 className="text-sm font-bold text-text leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Connect / social profiles */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Connect"
          title="Find me everywhere."
          italicAccent="Same person, every platform."
          description="GitHub, LinkedIn, X, Substack, Medium, Google Scholar, ORCID, BU + Harvard profiles, BioRxiv, PubMed."
        />
        <SocialLinks />
      </section>

      {/* Writing */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <SectionHeader eyebrow="Writing" title="Recent posts" href="/writing" />
        <div className="grid gap-4 md:grid-cols-3">
          {latestWriting.map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`} className="block group">
              <Card glow className="h-full">
                <p className="text-muted text-xs font-mono mb-2">{post.date}</p>
                <h3 className="text-base font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted text-xs mb-3 leading-relaxed">{post.description}</p>
                <div className="flex flex-wrap gap-1">
                  {(post.tags || []).map((t) => (
                    <Badge key={t} variant="teal">
                      {t}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
