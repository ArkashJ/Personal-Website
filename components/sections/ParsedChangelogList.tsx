import Link from 'next/link'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { getParsedChangelog } from '@/lib/changelog-md'

const SECTION_VARIANT: Record<string, 'teal' | 'cyan' | 'green' | 'default'> = {
  Added: 'teal',
  Changed: 'cyan',
  Fixed: 'green',
  Removed: 'default',
  Build: 'default',
  Docs: 'default',
}

function sectionVariant(label: string): 'teal' | 'cyan' | 'green' | 'default' {
  const key = label.split(/\s+/)[0]
  return SECTION_VARIANT[key] ?? 'default'
}

function formatDate(date: string) {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function ParsedChangelogList({ showFooter = true }: { showFooter?: boolean }) {
  const releases = getParsedChangelog()

  if (releases.length === 0) {
    return (
      <Card>
        <p className="text-muted text-sm">No releases found in CHANGELOG.md.</p>
      </Card>
    )
  }

  return (
    <div>
      <div className="space-y-10">
        {releases.map((release) => (
          <div key={release.id} id={release.id}>
            <div className="flex flex-wrap items-baseline gap-3 mb-4 pb-3 border-b border-border">
              <h3 className="text-xl font-bold text-text">v{release.version}</h3>
              {release.date && (
                <time
                  dateTime={release.date}
                  className="font-mono text-[11px] text-subtle uppercase tracking-wider"
                >
                  {formatDate(release.date)}
                </time>
              )}
              <a
                href={`#${release.id}`}
                className="font-mono text-[10px] text-subtle hover:text-primary transition-colors ml-auto"
                aria-label={`Link to release ${release.version}`}
              >
                #
              </a>
            </div>

            {Object.entries(release.sections).length === 0 ? (
              <p className="text-muted text-sm italic">No structured sections found.</p>
            ) : (
              <div className="space-y-5">
                {Object.entries(release.sections).map(([sectionLabel, items]) => (
                  <div key={sectionLabel}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={sectionVariant(sectionLabel)}>{sectionLabel}</Badge>
                    </div>
                    <ul className="space-y-1.5 pl-0">
                      {items.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted leading-relaxed">
                          <span className="text-subtle mt-1.5 flex-shrink-0">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showFooter && (
        <div className="mt-12 pt-6 border-t border-border">
          <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
            Format:{' '}
            <a
              href="https://keepachangelog.com/en/1.1.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Keep a Changelog 1.1.0
            </a>{' '}
            ·{' '}
            <Link href="/weekly" className="hover:text-primary transition-colors">
              Weekly logs →
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
