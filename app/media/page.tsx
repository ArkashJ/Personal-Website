import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { YouTubeEmbed } from '@next/third-parties/google'
import {
  STU_STREET_EPISODES,
  PODCAST_LINKS,
  MEDIUM_ARTICLES,
  SUBSTACK_POSTS,
  PRESS,
} from '@/lib/media'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Media — Podcasts, Videos, Articles, Press',
  description:
    'STU STREET podcast episodes, Medium and Substack writing, press mentions, and public videos featuring Arkash Jain.',
  path: '/media',
  keywords: ['podcasts', 'videos', 'articles', 'press', 'media'],
})

export default function MediaPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto space-y-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Media', path: '/media' },
        ])}
      />
      <SectionHeader
        eyebrow="Media"
        title="Podcasts, videos, articles, press"
        description="The public footprint — talks I've given, podcasts I've co-hosted, things people have written about my work."
        asH1
      />

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-text tracking-tight">
              STU STREET — BU Podcast (Co-host)
            </h2>
            <p className="text-muted text-sm mt-1">
              I co-hosted STU STREET on WTBU during my time at Boston University. Long-form
              interviews with founders, athletes, professors.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href={PODCAST_LINKS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:text-accent uppercase tracking-widest"
            >
              Spotify →
            </a>
            <a
              href={PODCAST_LINKS.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:text-accent uppercase tracking-widest"
            >
              Apple →
            </a>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {STU_STREET_EPISODES.map((ep) => (
            <Card key={ep.youtubeId} glow className="overflow-hidden">
              <div className="-mx-6 -mt-6 mb-4 border-b border-border">
                <YouTubeEmbed videoid={ep.youtubeId} height={260} />
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="teal">{ep.show}</Badge>
                {ep.number && <Badge>Ep {ep.number}</Badge>}
              </div>
              <h3 className="text-text font-bold mb-1">{ep.title}</h3>
              {ep.description && <p className="text-muted text-sm">{ep.description}</p>}
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-text tracking-tight">
              Medium — Distributed Systems Paper Reviews
            </h2>
            <p className="text-muted text-sm mt-1">
              Annotated paper notes from BU distributed systems research. Public reading log on
              Medium @arkjain.
            </p>
          </div>
          <a
            href="https://medium.com/@arkjain"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-primary hover:text-accent uppercase tracking-widest"
          >
            Profile →
          </a>
        </div>
        <div className="grid gap-3">
          {MEDIUM_ARTICLES.map((a) => (
            <a
              key={a.title}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 px-5 py-3 bg-surface border border-border hover:border-primary/60 transition-colors"
            >
              <div className="min-w-0">
                <h3 className="text-text font-medium truncate">{a.title}</h3>
                {a.description && <p className="text-muted text-xs truncate">{a.description}</p>}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {a.date && (
                  <span className="font-mono text-xs text-subtle uppercase tracking-wider">
                    {a.date}
                  </span>
                )}
                <Badge variant="teal">Medium</Badge>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-text tracking-tight">Substack — Weekly Notes</h2>
            <p className="text-muted text-sm mt-1">
              Weekly digest of what I&apos;m thinking about — AI, finance, distributed systems.
            </p>
          </div>
          <a
            href="https://arkash.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-primary hover:text-accent uppercase tracking-widest"
          >
            Subscribe →
          </a>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {SUBSTACK_POSTS.map((p) => (
            <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer">
              <Card glow className="h-full">
                <Badge variant="teal" className="mb-2">
                  Substack
                </Badge>
                <h3 className="text-text font-medium mb-1">{p.title}</h3>
                {p.date && (
                  <p className="font-mono text-xs text-subtle uppercase tracking-wider">{p.date}</p>
                )}
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Press"
          title="Press, profiles, mentions"
          description="Third-party pages that index or feature my work."
        />
        <div className="grid gap-3">
          {PRESS.map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 px-5 py-3 bg-surface border border-border hover:border-primary/60 transition-colors"
            >
              <div className="min-w-0">
                <p className="font-mono text-xs text-primary uppercase tracking-widest mb-0.5">
                  {p.outlet}
                </p>
                <h3 className="text-text font-medium truncate">{p.title}</h3>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {p.date && (
                  <span className="font-mono text-xs text-subtle uppercase tracking-wider">
                    {p.date}
                  </span>
                )}
                <Badge>{p.type}</Badge>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
