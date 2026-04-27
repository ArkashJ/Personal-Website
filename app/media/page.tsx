import Image from 'next/image'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Disclosure from '@/components/ui/Disclosure'
import BackLink from '@/components/ui/BackLink'
import { YouTubeEmbed } from '@next/third-parties/google'
import {
  STU_STREET_EPISODES,
  PODCAST_LINKS,
  MEDIUM_ARTICLES,
  SUBSTACK_POSTS,
  PRESS,
  FEATURED_VIDEOS,
  REVIEWS,
} from '@/lib/media'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Media — Podcasts, Videos, Press, Reviews',
  description:
    'STU STREET podcast (25 episodes co-hosted at BU), Benmore feature talks, Trustpilot client reviews, Medium and Substack writing, and press mentions of Arkash Jain.',
  path: '/media',
  keywords: ['STU STREET', 'BU podcast', 'Benmore videos', 'Trustpilot reviews', 'press', 'media'],
})

const TOP_FEATURED = STU_STREET_EPISODES.filter((e) => e.youtubeId).slice(0, 6)
const FEATURED_IDS = new Set(TOP_FEATURED.map((e) => e.youtubeId))
const REST_EPISODES = STU_STREET_EPISODES.filter(
  (e) => !e.youtubeId || !FEATURED_IDS.has(e.youtubeId)
)

const reviewLabel = (url: string) => url.split('/').pop()?.slice(0, 8) || 'review'

const REVIEWS_WITH_IMAGE = REVIEWS.filter((r) => r.image)
const REVIEWS_LINK_ONLY = REVIEWS.filter((r) => !r.image)

export default function MediaPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto space-y-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Media', path: '/media' },
        ])}
      />

      <BackLink href="/" label="Home" />

      <SectionHeader
        eyebrow="Media"
        title="Podcasts, videos, articles, press, reviews"
        description="The public footprint — every long-form interview I co-hosted, talks where Benmore shows up, what clients have said, and what the press has indexed."
        asH1
      />

      {/* Benmore feature videos */}
      <section>
        <SectionHeader
          eyebrow="Benmore"
          title="Featured talks"
          description="Public talks featuring Arkash and the Benmore forward-deployed practice."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {FEATURED_VIDEOS.map((v) => (
            <Card key={v.youtubeId} glow className="overflow-hidden">
              <div className="-mx-6 -mt-6 mb-4 border-b border-border">
                <YouTubeEmbed videoid={v.youtubeId} height={260} />
              </div>
              {v.outlet && (
                <Badge variant="teal" className="mb-2">
                  {v.outlet}
                </Badge>
              )}
              <h3 className="text-text font-bold mb-1">{v.title}</h3>
              {v.description && <p className="text-muted text-sm">{v.description}</p>}
            </Card>
          ))}
        </div>
      </section>

      {/* STU STREET — featured + disclosure */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-text tracking-tight">
              STU STREET — BU Podcast (Co-host)
            </h2>
            <p className="text-muted text-sm mt-1">
              Co-hosted on WTBU during my time at Boston University. 25 episodes — long-form
              interviews with founders, professors, athletes, and operators.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={PODCAST_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:text-accent uppercase tracking-widest"
            >
              YouTube →
            </a>
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
            <a
              href={PODCAST_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:text-accent uppercase tracking-widest"
            >
              Instagram →
            </a>
            <a
              href={PODCAST_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:text-accent uppercase tracking-widest"
            >
              TikTok →
            </a>
          </div>
        </div>

        {/* Featured top-6 with embeds */}
        <div className="grid gap-6 md:grid-cols-2">
          {TOP_FEATURED.map((ep) => (
            <Card key={ep.youtubeId} glow className="overflow-hidden">
              <div className="-mx-6 -mt-6 mb-4 border-b border-border">
                <YouTubeEmbed videoid={ep.youtubeId as string} height={260} />
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="teal">{ep.show}</Badge>
                {ep.number && <Badge>Ep {ep.number}</Badge>}
                {ep.arkashHosted && <Badge variant="cyan">● Arkash hosted</Badge>}
                {typeof ep.views === 'number' && (
                  <span className="font-mono text-[10px] text-subtle uppercase tracking-widest">
                    {ep.views.toLocaleString()} views
                  </span>
                )}
              </div>
              <h3 className="text-text font-bold mb-1">{ep.title}</h3>
              {ep.guests && <p className="text-muted text-xs font-mono">Guest: {ep.guests}</p>}
            </Card>
          ))}
        </div>

        {/* All other episodes behind a Disclosure */}
        {REST_EPISODES.length > 0 && (
          <div className="mt-6">
            <Disclosure
              collapsedLabel={`Show all ${STU_STREET_EPISODES.length} episodes`}
              expandedLabel="Show featured only"
            >
              <ul className="grid gap-2 md:grid-cols-2">
                {REST_EPISODES.map((ep) => (
                  <li key={`${ep.number}-${ep.title}`}>
                    <a
                      href={
                        ep.youtubeId
                          ? `https://www.youtube.com/watch?v=${ep.youtubeId}`
                          : (ep.url as string)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 px-4 py-3 bg-surface border border-border hover:border-primary/60 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
                            EP {ep.number}
                          </span>
                          {ep.arkashHosted && (
                            <span className="font-mono text-[9px] text-accent uppercase tracking-widest">
                              ARKASH HOSTED
                            </span>
                          )}
                        </div>
                        <h3 className="text-text text-sm font-medium truncate">{ep.title}</h3>
                        {ep.guests && (
                          <p className="text-muted text-xs font-mono truncate">{ep.guests}</p>
                        )}
                      </div>
                      <span className="font-mono text-[10px] text-subtle uppercase tracking-widest whitespace-nowrap">
                        {typeof ep.views === 'number' ? `${ep.views} views` : 'Watch →'}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Disclosure>
          </div>
        )}
      </section>

      {/* Trustpilot reviews */}
      <section>
        <SectionHeader
          eyebrow="Reviews"
          title="What clients say"
          italicAccent="Verified on Trustpilot."
          description={`${REVIEWS.length} public client reviews from Benmore engagements — screenshots are linked to the live Trustpilot pages.`}
        />

        {/* Image-cards: real reviewers, real screenshots */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS_WITH_IMAGE.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-surface border border-border hover:border-primary hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-elevated">
                <Image
                  src={r.image as string}
                  alt={`Trustpilot review from ${r.reviewer}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest truncate">
                    {r.reviewer}
                  </span>
                  <span
                    className="text-success text-base leading-none flex-shrink-0"
                    aria-label="Five stars"
                  >
                    ★★★★★
                  </span>
                </div>
                {r.excerpt && (
                  <p className="text-muted text-xs leading-relaxed line-clamp-3">{r.excerpt}</p>
                )}
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-subtle truncate">
                    {r.date || 'Trustpilot'}
                  </span>
                  <Badge variant="green">Trustpilot ↗</Badge>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Remaining reviews — compact link list */}
        {REVIEWS_LINK_ONLY.length > 0 && (
          <div className="mt-6">
            <p className="font-mono text-[10px] text-subtle uppercase tracking-widest mb-3">
              + {REVIEWS_LINK_ONLY.length} more verified reviews
            </p>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {REVIEWS_LINK_ONLY.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 px-3 py-2 bg-surface border border-border hover:border-primary transition-colors"
                  >
                    <span className="font-mono text-[11px] text-muted group-hover:text-primary truncate">
                      trustpilot.com/{reviewLabel(r.url)}…
                    </span>
                    <span
                      className="text-success text-sm leading-none flex-shrink-0"
                      aria-label="Five stars"
                    >
                      ★★★★★
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-subtle text-xs mt-4 font-mono">
          Click any card or link to open the verifiable Trustpilot review page.
        </p>
      </section>

      {/* Medium */}
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
              className="flex items-center justify-between gap-4 px-5 py-3 bg-surface border border-border hover:border-primary/60 hover:-translate-y-0.5 transition-all duration-200"
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

      {/* Substack */}
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

      {/* Press */}
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
              className="flex items-center justify-between gap-4 px-5 py-3 bg-surface border border-border hover:border-primary/60 hover:-translate-y-0.5 transition-all duration-200"
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
