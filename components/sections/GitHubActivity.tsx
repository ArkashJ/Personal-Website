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

// 53-week contribution heatmap. ghchart is canonical and dependency-free.
// Deep GitHub green to match the standard contribution chart aesthetic.
const CONTRIB = `https://ghchart.rshah.org/216E39/${GH_USER}`

const GitHubActivity = () => (
  <section className="px-6 py-10 max-w-6xl mx-auto">
    <SectionHeader
      eyebrow="GitHub"
      title="Live activity"
      italicAccent="Refreshed straight from the source."
      description="Public commit cadence plus a private snapshot from a personal commit-graph tool."
      href={SITE.social.github}
      hrefLabel={`@${GH_USER} →`}
    />

    {/* Live contribution heatmap — capped width, deep green */}
    <Card glow className="overflow-hidden">
      <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">
        Contribution graph · last 12 months
      </p>
      <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
        <img
          src={CONTRIB}
          alt={`@${GH_USER} GitHub contribution graph (last 12 months)`}
          loading="lazy"
          className="block mx-auto w-full max-w-3xl min-w-[520px] h-auto"
        />
      </div>
    </Card>

    {/* Snapshot table + small commit-tracker thumbnail */}
    <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px] items-start">
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
      <Card glow className="overflow-hidden">
        <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">
          Commit-tracker · 60d
        </p>
        <Image
          src="/images/receipts/github-activity.png"
          alt="Personal GitHub commit-tracker showing 624 commits in 30 days, 186 in the last 7"
          width={794}
          height={714}
          className="w-full h-auto"
          sizes="320px"
        />
      </Card>
    </div>
  </section>
)

export default GitHubActivity
