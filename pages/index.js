import Hero from '../components/sections/Hero'
import SectionHeader from '../components/sections/SectionHeader'
import PaperCard from '../components/sections/PaperCard'
import ProjectCard from '../components/sections/ProjectCard'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { PAPERS, PROJECTS, WORK_TOOLS, KNOWLEDGE_DOMAINS } from '../lib/data'
import { getAllWritingPosts } from '../lib/content'
import Link from 'next/link'

export default function Home({ writing }) {
  const featuredProjects = PROJECTS.slice(0, 4)
  const featuredWork = WORK_TOOLS.slice(0, 3)
  const latestWriting = writing.slice(0, 3)

  return (
    <div>
      <Hero />

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="The Arc"
          title="Physics → VC → Distributed Systems → Harvard AI → Building"
          href="/about"
          hrefLabel="Read full story →"
        />
        <Card>
          <p className="text-muted leading-relaxed">
            I came to Boston from India in 2020. I was an NSF UROP scholar in chemical physics, did
            two stints at Battery Ventures, researched distributed systems at BU, joined
            Harvard&apos;s Kirchhausen Lab to build SpatialDINO — and now I&apos;m Head of FDE at
            Benmore, building Cattle Logic and helping SMBs compound through AI.
          </p>
        </Card>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <SectionHeader eyebrow="Now" title="What I’m doing right now" />
        <div className="grid gap-6 md:grid-cols-2">
          <Card glow>
            <Badge variant="cyan">● Current</Badge>
            <h3 className="text-xl font-bold text-white mt-3 mb-2">Head of FDE at Benmore</h3>
            <p className="text-muted text-sm">
              Leading forward deployed engineering across SMB AI engagements. Cattle Logic shipping
              to ranches across the Midwest.
            </p>
          </Card>
          <Card glow>
            <Badge variant="teal">Latest writing</Badge>
            <h3 className="text-xl font-bold text-white mt-3 mb-2">{latestWriting[0].title}</h3>
            <p className="text-muted text-sm">{latestWriting[0].description}</p>
          </Card>
        </div>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <SectionHeader eyebrow="Research" title="4 published papers" href="/research" />
        <div className="grid gap-6 md:grid-cols-2">
          {PAPERS.map((p) => (
            <PaperCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Work & Tools"
          title="Things I’ve built that I use every day"
          href="/work"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featuredWork.map((w) => (
            <Card key={w.name} glow>
              <h3 className="text-lg font-bold text-white mb-2">{w.name}</h3>
              <p className="text-muted text-sm mb-3">{w.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {w.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <SectionHeader eyebrow="Projects" title="Selected work" href="/projects" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <SectionHeader eyebrow="Knowledge" title="My second brain, in public" href="/knowledge" />
        <div className="flex flex-wrap gap-3">
          {KNOWLEDGE_DOMAINS.map((d) => (
            <Link
              key={d.slug}
              href={`/knowledge/${d.slug}`}
              className="px-4 py-2 rounded-full bg-surface border border-border hover:border-primary hover:text-primary text-sm font-mono transition-colors"
            >
              {d.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <SectionHeader eyebrow="Writing" title="Recent posts" href="/writing" />
        <div className="grid gap-6 md:grid-cols-3">
          {latestWriting.map((post) => (
            <Card key={post.slug} glow>
              <p className="text-muted text-xs font-mono mb-2">{post.date}</p>
              <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
              <p className="text-muted text-sm mb-3">{post.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <Badge key={t} variant="teal">
                    {t}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export async function getStaticProps() {
  return { props: { writing: getAllWritingPosts() } }
}

Home.meta = {
  path: '/',
}
