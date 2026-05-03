import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import { getGitChangelog } from '@/lib/git-changelog'
import { getAllWeeklyLogs } from '@/lib/weekly'
import { commitGithubUrl, shortHash, type GitCommit, type CommitType } from '@/lib/git-commit'

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

const DEFAULT_OPEN = new Set<CommitType>(['feat', 'fix'])

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

const MAX_PER_GROUP = 20

function buildDateToSlugMap(): Map<string, string> {
  const logs = getAllWeeklyLogs()
  const map = new Map<string, string>()
  for (const log of logs) {
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
      <span className="absolute left-[-1px] top-[6px] w-1.5 h-1.5 rounded-full bg-border" />

      <div className="flex flex-col gap-0.5">
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
            <ExternalLinkIcon size={10} />
          </a>
        </div>

        {scopeLabel && (
          <Badge
            variant={TYPE_VARIANT[commit.type as CommitType] ?? 'default'}
            className="w-fit text-[9px]"
          >
            {scopeLabel}
          </Badge>
        )}

        <p className="text-[12px] text-text leading-snug line-clamp-2">{commit.summary}</p>

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
      <div className="px-4 py-3 border-b border-border">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
          Commit history
        </p>
        <p className="text-[11px] text-subtle mt-0.5">
          {commits.length} commit{commits.length === 1 ? '' : 's'} · {activeGroups.length} type
          {activeGroups.length === 1 ? '' : 's'}
        </p>
      </div>

      <div className="px-4 py-2">
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
