import type { ChangelogEntry } from '@/lib/weekly'
import { commitGithubUrl, shortHash, type GitCommit } from '@/lib/git-commit'

type Props = {
  changelog?: ChangelogEntry[]
  commits?: GitCommit[]
}

type Row =
  | { kind: 'note'; date: string; sortKey: string; note: string; href?: string }
  | { kind: 'commit'; date: string; sortKey: string; commit: GitCommit }

function dayOf(iso: string): string {
  return iso.slice(0, 10)
}

export default function WeeklyTimeline({ changelog, commits }: Props) {
  const rows: Row[] = []

  for (const e of changelog ?? []) {
    rows.push({
      kind: 'note',
      date: dayOf(e.date),
      sortKey: e.date,
      note: e.note,
      href: e.href,
    })
  }
  for (const c of commits ?? []) {
    rows.push({
      kind: 'commit',
      date: dayOf(c.date),
      sortKey: c.date,
      commit: c,
    })
  }

  if (rows.length === 0) return null

  rows.sort((a, b) => (a.sortKey < b.sortKey ? 1 : -1))

  return (
    <section className="mt-10 pt-6 border-t border-border">
      <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
          Timeline · commits + curated notes
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
          {rows.length} entr{rows.length === 1 ? 'y' : 'ies'}
        </p>
      </div>
      <ol className="relative border-l border-border ml-2 space-y-2">
        {rows.map((row, i) => (
          <li key={i} className="pl-4 relative">
            <span
              aria-hidden="true"
              className={`absolute left-0 -translate-x-[3.5px] top-[7px] w-1.5 h-1.5 rounded-full ${
                row.kind === 'commit' ? 'bg-primary' : 'bg-subtle'
              }`}
            />
            <div className="flex items-baseline gap-2 flex-wrap text-[11px] leading-snug">
              <time className="font-mono text-subtle whitespace-nowrap w-[78px] flex-shrink-0">
                {row.date}
              </time>
              {row.kind === 'commit' ? (
                <>
                  <a
                    href={commitGithubUrl(row.commit.hash)}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10px] text-subtle hover:text-primary transition-colors"
                  >
                    {shortHash(row.commit.hash)}
                  </a>
                  {row.commit.type && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                      {row.commit.scopes.length > 0
                        ? `${row.commit.type}(${row.commit.scopes.join(',')})`
                        : row.commit.type}
                    </span>
                  )}
                  <a
                    href={commitGithubUrl(row.commit.hash)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted hover:text-text transition-colors"
                  >
                    {row.commit.summary}
                  </a>
                </>
              ) : (
                <>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                    note
                  </span>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith('http') ? '_blank' : undefined}
                      rel={row.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="text-muted hover:text-primary transition-colors"
                    >
                      {row.note}
                    </a>
                  ) : (
                    <span className="text-muted">{row.note}</span>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
