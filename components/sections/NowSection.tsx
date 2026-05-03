import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { TIMELINE, PROJECTS } from '@/lib/data'
import { getAllWritingPosts } from '@/lib/content'
import { MEDIUM_ARTICLES } from '@/lib/media'
import { projectSlug } from '@/lib/projects'

const formatDate = (iso: string) => {
  const d = new Date(iso.length === 7 ? `${iso}-01` : iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ---------- Rail: Milestones ----------
function MilestonesRail() {
  // Most recent 3 featured timeline entries
  const milestones = TIMELINE.filter((t) => t.featured)
    .slice()
    .reverse()
    .slice(0, 6)

  return (
    <div id="now-milestones" className="scroll-mt-20">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
          Milestones
        </span>
        <Link
          href="/about"
          className="font-mono text-[10px] uppercase tracking-widest text-subtle hover:text-primary transition-colors"
        >
          View all →
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 scroll-pl-6 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent">
        {milestones.map((t) => (
          <Link
            key={t.title}
            href={t.slug ? `/about/timeline/${t.slug}` : '/about'}
            className="block group snap-start shrink-0 w-72 sm:w-80"
          >
            <Card glow className="h-full">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <Badge variant="teal">{t.category}</Badge>
                <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                  {t.date}
                </span>
              </div>
              <h4 className="text-sm font-bold text-text leading-snug group-hover:text-primary transition-colors">
                {t.title}
              </h4>
              {t.description && (
                <p className="text-muted text-xs leading-relaxed mt-1 line-clamp-2">
                  {t.description}
                </p>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ---------- Rail: Writing ----------
function WritingRail() {
  const posts = getAllWritingPosts().slice(0, 6)

  return (
    <div id="now-writing" className="scroll-mt-20">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
          Writing
        </span>
        <Link
          href="/writing"
          className="font-mono text-[10px] uppercase tracking-widest text-subtle hover:text-primary transition-colors"
        >
          View all →
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 scroll-pl-6 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent">
        {posts.map((w) => (
          <Link
            key={w.slug}
            href={`/writing/${w.slug}`}
            className="block group snap-start shrink-0 w-72 sm:w-80"
          >
            <Card glow className="h-full">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="teal">Writing</Badge>
                <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                  {formatDate(w.date)}
                </span>
              </div>
              <h4 className="text-sm font-bold text-text leading-snug group-hover:text-primary transition-colors mb-1">
                {w.title}
              </h4>
              {w.description && (
                <p className="text-muted text-xs leading-relaxed line-clamp-2">{w.description}</p>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ---------- Rail: Media ----------
function MediaRail() {
  const articles = MEDIUM_ARTICLES.slice(0, 6)

  return (
    <div id="now-media" className="scroll-mt-20">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Media</span>
        <Link
          href="/media"
          className="font-mono text-[10px] uppercase tracking-widest text-subtle hover:text-primary transition-colors"
        >
          View all →
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 scroll-pl-6 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent">
        {articles.map((m) => (
          <a
            key={m.url}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group snap-start shrink-0 w-72 sm:w-80"
          >
            <Card glow className="h-full">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="cyan">{m.source}</Badge>
                {m.date && (
                  <span className="font-mono text-[10px] text-subtle whitespace-nowrap">
                    {formatDate(m.date)}
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-text leading-snug group-hover:text-primary transition-colors mb-1">
                {m.title}
                <span className="ml-1 text-subtle">↗</span>
              </h4>
              {m.description && (
                <p className="text-muted text-xs leading-relaxed line-clamp-2">{m.description}</p>
              )}
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}

// ---------- Rail: Projects ----------
function ProjectsRail() {
  const projects = PROJECTS.slice(0, 6)

  return (
    <div id="now-projects" className="scroll-mt-20">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
          Projects
        </span>
        <Link
          href="/projects"
          className="font-mono text-[10px] uppercase tracking-widest text-subtle hover:text-primary transition-colors"
        >
          View all →
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 scroll-pl-6 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent">
        {projects.map((p) => (
          <Link
            key={p.name}
            href={`/projects/${p.slug ?? projectSlug(p.name)}`}
            className="block group snap-start shrink-0 w-72 sm:w-80"
          >
            <Card glow className="h-full">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <Badge variant="default">{p.year}</Badge>
                {p.tech.length > 0 && (
                  <span className="font-mono text-[10px] text-subtle">{p.tech[0]}</span>
                )}
              </div>
              <h4 className="text-sm font-bold text-text leading-snug group-hover:text-primary transition-colors mb-1">
                {p.name}
              </h4>
              <p className="text-muted text-xs leading-relaxed line-clamp-2">{p.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ---------- In-section anchor nav ----------
const RAILS = [
  { id: 'now-milestones', label: 'Milestones' },
  { id: 'now-writing', label: 'Writing' },
  { id: 'now-media', label: 'Media' },
  { id: 'now-projects', label: 'Projects' },
]

export default function NowSection() {
  return (
    <section className="px-6 py-10 max-w-6xl mx-auto">
      <SectionHeader eyebrow="Now" title="What I'm doing" italicAccent="this month." />

      {/* Anchor nav */}
      <nav className="flex flex-wrap gap-x-6 gap-y-1 mb-10 -mt-4" aria-label="Section rails">
        {RAILS.map((r) => (
          <a
            key={r.id}
            href={`#${r.id}`}
            className="font-mono text-[10px] uppercase tracking-widest text-subtle hover:text-primary transition-colors"
          >
            {r.label}
          </a>
        ))}
      </nav>

      <div className="space-y-12">
        <MilestonesRail />
        <WritingRail />
        <MediaRail />
        <ProjectsRail />
      </div>
    </section>
  )
}
