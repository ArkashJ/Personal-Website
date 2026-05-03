// Server component — no 'use client'. Accordion behavior via native <details>.
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { getGitChangelog } from '@/lib/git-changelog'
import { getAllWeeklyLogs } from '@/lib/weekly'
import { commitGithubUrl, shortHash, type GitCommit } from '@/lib/git-commit'

// ── Types ──────────────────────────────────────────────────────────────────

type CommitType =
  | 'feat'
  | 'fix'
  | 'refactor'
  | 'chore'
  | 'docs'
  | 'perf'
  | 'test'
  | 'build'
  | 'ci'
  | 'style'
  | 'revert'
  | 'weekly'
  | 'other'

// Ordered display groups
const TYPE_ORDER: CommitType[] = [
  'feat',
  'fix',
  'refactor',
  'chore',
  'docs',
  'perf',
  'test',
  'build',
  'ci',
  'style',
  'revert',
  'weekly',
  'other',
]

// Groups open by default
const DEFAULT_OPEN = new Set<CommitType>(['feat', 'fix'])

// Per-type badge variant (matches GitChangelog.tsx teal for feat/fix)
type BadgeVariant = 'teal' | 'cyan' | 'green' | 'default'

const TYPE_VARIANT: Record<CommitType, BadgeVariant> = {
  feat: 'teal',
  fix: 'green',
  refactor: 'cyan',
  chore: 'default',
  docs: 'default',
  perf: 'cyan',
  test: 'default',
  build: 'default',
  ci: 'default',
  style: 'default',
  revert: 'default',
  weekly: 'teal',
  other: 'default',
}

// Max commits shown per group
const MAX_PER_GROUP = 20

// ── Date-to-weekly-slug map ────────────────────────────────────────────────

/** Build a Map from every ISO date (YYYY-MM-DD) that falls in a weekly
 *  log window to that log's slug. */
function buildDateToSlugMap(): Map<string, string> {
  const logs = getAllWeeklyLogs()
  const map = new Map<string, string>()
  for (const log of logs) {
    // iterate each day in [weekStart, weekEnd]
    const start = new Date(log.weekStart)
    const end = new Date(log.weekEnd)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) continue
    const cur = new Date(start)
    while (cur <= end) {
      const key = cur.toISOString().slice(0, 10)
      if (!map.has(key)) map.set(key, log.slug)
      cur.setDate(cur.getDate() + 1)
    }
  }
  return map
}

// ── Group commits ──────────────────────────────────────────────────────────

function groupByType(commits: GitCommit[]): Map<CommitType, GitCommit[]> {
  const map = new Map<CommitType, GitCommit[]>()
  for (const type of TYPE_ORDER) map.set(type, [])
  for (const c of commits) {
    const t = (c.type ?? '') as CommitType
    if (map.has(t)) map.get(t)!.push(c)
    else map.get('other')!.push(c)
  }
  return map
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ExternalLinkIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" />
      <path d="M8 1h3v3" />
      <path d="M11 1 6 6" />
    </svg>
  )
}

function SidebarCommitRow({
  commit,
  weeklySlug,
}: {
  commit: GitCommit
  weeklySlug: string | undefined
}) {
  const dateKey = commit.date.slice(0, 10)
  const scopeLabel =
    commit.scopes.length > 0 ? `${commit.type}(${commit.scopes.join(',')})` : (commit.type ?? null)

  return (
    <li className="relative pl-4">
      {/* Timeline dot */}
      <span className="absolute left-[-1px] top-[6px] w-1.5 h-1.5 rounded-full bg-border flex-shrink-0" />

      <div className="flex flex-col gap-0.5">
        {/* Date + hash row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[10px] text-subtle">{dateKey}</span>
          <a
            href={commitGithubUrl(commit.hash)}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
            title="View on GitHub"
          >
            {shortHash(commit.hash)}
            <ExternalLinkIcon />
          </a>
        </div>

        {/* Type-scope pill */}
        {scopeLabel && (
          <Badge
            variant={TYPE_VARIANT[commit.type as CommitType] ?? 'default'}
            className="w-fit text-[9px]"
          >
            {scopeLabel}
          </Badge>
        )}

        {/* Summary */}
        <p className="text-[12px] text-text leading-snug line-clamp-2">{commit.summary}</p>

        {/* Weekly log deep-link */}
        {weeklySlug && (
          <Link
            href={`/weekly/${weeklySlug}`}
            className="font-mono text-[10px] text-primary hover:text-accent transition-colors"
          >
            → /weekly/{weeklySlug}
          </Link>
        )}
      </div>
    </li>
  )
}

function TypeGroup({
  type,
  commits,
  dateToSlug,
}: {
  type: CommitType
  commits: GitCommit[]
  dateToSlug: Map<string, string>
}) {
  if (commits.length === 0) return null
  const visible = commits.slice(0, MAX_PER_GROUP)
  const isOpen = DEFAULT_OPEN.has(type)

  return (
    <details open={isOpen} className="group">
      <summary className="flex items-center gap-2 cursor-pointer select-none list-none py-2 border-b border-border hover:text-primary transition-colors">
        {/* Remove default marker */}
        <span className="font-mono text-[9px] uppercase tracking-widest text-subtle group-open:text-primary transition-colors">
          ▸
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-text flex-1">
          {type}
        </span>
        <span className="font-mono text-[10px] text-subtle bg-elevated border border-border px-1.5 py-0.5">
          {commits.length}
        </span>
      </summary>

      {/* Timeline rail */}
      <ul className="mt-3 mb-4 pl-2 border-l border-border space-y-4">
        {visible.map((c) => (
          <SidebarCommitRow
            key={c.hash}
            commit={c}
            weeklySlug={dateToSlug.get(c.date.slice(0, 10))}
          />
        ))}
        {commits.length > MAX_PER_GROUP && (
          <li className="pl-4">
            <span className="font-mono text-[10px] text-subtle">
              +{commits.length - MAX_PER_GROUP} more not shown
            </span>
          </li>
        )}
      </ul>
    </details>
  )
}

// ── Main export ────────────────────────────────────────────────────────────

export default function CommitsSidebar() {
  const commits = getGitChangelog()
  const dateToSlug = buildDateToSlugMap()

  if (commits.length === 0) {
    return (
      <div className="border border-border bg-surface p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-subtle mb-2">
          Commit history
        </p>
        <p className="text-muted text-sm">No commits yet.</p>
      </div>
    )
  }

  const grouped = groupByType(commits)

  // Count non-empty groups
  const activeGroups = TYPE_ORDER.filter((t) => (grouped.get(t)?.length ?? 0) > 0)

  return (
    <div className="border border-border bg-surface">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
          Commit history
        </p>
        <p className="text-[11px] text-subtle mt-0.5">
          {commits.length} commit{commits.length === 1 ? '' : 's'} · {activeGroups.length} type
          {activeGroups.length === 1 ? '' : 's'}
        </p>
      </div>

      {/* Accordion groups */}
      <div className="px-4 py-2 divide-y-0">
        {TYPE_ORDER.map((type) => (
          <TypeGroup
            key={type}
            type={type}
            commits={grouped.get(type) ?? []}
            dateToSlug={dateToSlug}
          />
        ))}
      </div>
    </div>
  )
}
