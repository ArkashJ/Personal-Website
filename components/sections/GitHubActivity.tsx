/* eslint-disable @next/next/no-img-element */
// Live GitHub activity widgets are SVG endpoints from third-party services.
// Using <img> (not next/image) keeps them as raw SVG with the cache headers
// the source server controls — and avoids leaking config to remotePatterns
// for what is essentially an embedded badge.

import Image from 'next/image'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import { SITE } from '@/lib/site'

const GH_USER = 'ArkashJ'

// Theme tuned to the Metior-Pro palette (`bg #0A1628`, mint primary `#5EEAD4`).
// `cache_seconds=3600` reduces re-render thrash; the Vercel layer caches
// these as well.
const STATS = `https://github-readme-stats.vercel.app/api?username=${GH_USER}&show_icons=true&hide_border=true&include_all_commits=true&count_private=true&theme=transparent&title_color=5EEAD4&icon_color=5EEAD4&text_color=B9C2D0&bg_color=00000000&cache_seconds=3600`
const TOP_LANGS = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GH_USER}&layout=compact&hide_border=true&theme=transparent&title_color=5EEAD4&text_color=B9C2D0&bg_color=00000000&cache_seconds=3600&langs_count=10`
const STREAK = `https://streak-stats.demolab.com/?user=${GH_USER}&theme=transparent&hide_border=true&background=00000000&stroke=1C2D48&ring=5EEAD4&fire=F4A66A&currStreakLabel=5EEAD4&sideLabels=B9C2D0&dates=8C97AE&cache_seconds=3600`
// 53-week contribution heatmap. ghchart is canonical and dependency-free.
const CONTRIB = `https://ghchart.rshah.org/5EEAD4/${GH_USER}`

const GitHubActivity = () => (
  <section className="px-6 py-10 max-w-6xl mx-auto">
    <SectionHeader
      eyebrow="GitHub"
      title="Live activity"
      italicAccent="Refreshed straight from the source."
      description="Public commit cadence, top languages, streaks, and a private snapshot from a personal commit-graph tool."
      href={SITE.social.github}
      hrefLabel={`@${GH_USER} →`}
    />

    {/* Live contribution heatmap — full-width on every viewport */}
    <Card glow className="overflow-hidden">
      <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">
        Contribution graph · last 12 months
      </p>
      <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
        <img
          src={CONTRIB}
          alt={`@${GH_USER} GitHub contribution graph (last 12 months)`}
          loading="lazy"
          className="w-full min-w-[640px] h-auto"
        />
      </div>
    </Card>

    {/* Stats + Streak + Top languages — responsive grid */}
    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      <Card glow className="overflow-hidden">
        <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">Stats</p>
        <img
          src={STATS}
          alt={`@${GH_USER} GitHub stats`}
          loading="lazy"
          className="w-full h-auto"
        />
      </Card>
      <Card glow className="overflow-hidden">
        <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">
          Current streak
        </p>
        <img
          src={STREAK}
          alt={`@${GH_USER} GitHub streak`}
          loading="lazy"
          className="w-full h-auto"
        />
      </Card>
      <Card glow className="overflow-hidden">
        <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">
          Top languages
        </p>
        <img
          src={TOP_LANGS}
          alt={`@${GH_USER} top languages`}
          loading="lazy"
          className="w-full h-auto"
        />
      </Card>
    </div>

    {/* Private snapshot from personal tooling */}
    <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr] items-start">
      <Card glow className="overflow-hidden">
        <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">
          Personal commit-tracker · 60-day window
        </p>
        <div className="relative w-full">
          <Image
            src="/images/receipts/github-activity.png"
            alt="Personal GitHub commit-tracker showing 624 commits in 30 days, 186 in the last 7"
            width={794}
            height={714}
            className="w-full h-auto"
            sizes="(min-width: 768px) 60vw, 100vw"
          />
        </div>
      </Card>
      <Card glow>
        <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">
          Snapshot · ~April 14, 2026
        </p>
        <ul className="space-y-3 text-sm">
          <li className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
            <span className="text-muted text-xs uppercase tracking-widest font-mono">
              30d commits
            </span>
            <span className="text-text font-bold">624</span>
          </li>
          <li className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
            <span className="text-muted text-xs uppercase tracking-widest font-mono">
              7d commits
            </span>
            <span className="text-text font-bold">186</span>
          </li>
          <li className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
            <span className="text-muted text-xs uppercase tracking-widest font-mono">
              Active days
            </span>
            <span className="text-text font-bold">28</span>
          </li>
          <li className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
            <span className="text-muted text-xs uppercase tracking-widest font-mono">
              Raw lines
            </span>
            <span className="text-text font-bold">823,824</span>
          </li>
          <li className="flex items-baseline justify-between gap-3">
            <span className="text-muted text-xs uppercase tracking-widest font-mono">
              Adj output
            </span>
            <span className="text-primary font-bold">520,582</span>
          </li>
        </ul>
        <p className="text-subtle text-[11px] font-mono mt-4 leading-relaxed">
          Aggregated across public + private repos.
        </p>
      </Card>
    </div>
  </section>
)

export default GitHubActivity
