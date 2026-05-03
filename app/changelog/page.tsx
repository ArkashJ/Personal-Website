import SectionHeader from '@/components/sections/SectionHeader'
import JsonLd from '@/components/seo/JsonLd'
import GitChangelog from '@/components/sections/GitChangelog'
import ParsedChangelogList from '@/components/sections/ParsedChangelogList'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { getAllWeeklyLogs } from '@/lib/weekly'
import { getCommitsForWeek, getGitChangelog } from '@/lib/git-changelog'

export const metadata = buildMetadata({
  title: 'Changelog — arkashj.com',
  description: 'Every notable change to arkashj.com, documented in Keep-a-Changelog format.',
  path: '/changelog',
  keywords: ['changelog', 'releases', 'arkash jain', 'updates'],
})

export default function ChangelogPage() {
  const latestWeek = getAllWeeklyLogs()[0]
  const allCommits = getGitChangelog()
  const weekCommits = latestWeek ? getCommitsForWeek(latestWeek.weekStart, latestWeek.weekEnd) : []

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Changelog', path: '/changelog' },
        ])}
      />

      <div className="px-6 py-16 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Changelog"
          title="What's shipped"
          italicAccent="every release, documented."
          description="Engineering changelog for arkashj.com — formatted per Keep a Changelog 1.1.0."
          asH1
        />

        <div>
          <ParsedChangelogList />
          <GitChangelog weekCommits={weekCommits} allCommits={allCommits} />
        </div>
      </div>
    </>
  )
}
