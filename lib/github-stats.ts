import 'server-only'

const GH_USER = 'ArkashJ'
const GH_GRAPHQL = 'https://api.github.com/graphql'

export type GitHubStats = {
  /** Total commits authored by the user in the last 30 days (public + private). */
  commits30d: number
  /** Total commits in the last 7 days. */
  commits7d: number
  /** Distinct days with at least one contribution in the last 30 days. */
  activeDays: number
  /** ISO date the snapshot was generated. */
  asOf: string
  /** True when GitHub returned live data; false when we fell back. */
  live: boolean
}

const FALLBACK: GitHubStats = {
  commits30d: 624,
  commits7d: 186,
  activeDays: 28,
  asOf: '2026-04-14',
  live: false,
}

type ContributionDay = { date: string; contributionCount: number }
type ContributionsResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: { contributionDays: ContributionDay[] }[]
        }
      }
    }
  }
}

function isoDaysAgo(n: number): string {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  d.setUTCDate(d.getUTCDate() - n)
  return d.toISOString().slice(0, 10)
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return FALLBACK

  const from = `${isoDaysAgo(30)}T00:00:00Z`
  const to = new Date().toISOString()

  const query = `query($user: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $user) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }`

  try {
    const res = await fetch(GH_GRAPHQL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { user: GH_USER, from, to } }),
      next: { revalidate: 3600 },
    })
    if (!res.ok) return FALLBACK

    const json = (await res.json()) as ContributionsResponse
    const days =
      json.data?.user?.contributionsCollection?.contributionCalendar?.weeks?.flatMap(
        (w) => w.contributionDays
      ) ?? []
    if (days.length === 0) return FALLBACK

    const sevenDayCutoff = isoDaysAgo(7)
    let commits30d = 0
    let commits7d = 0
    let activeDays = 0
    for (const d of days) {
      commits30d += d.contributionCount
      if (d.contributionCount > 0) activeDays += 1
      if (d.date >= sevenDayCutoff) commits7d += d.contributionCount
    }

    return {
      commits30d,
      commits7d,
      activeDays,
      asOf: new Date().toISOString().slice(0, 10),
      live: true,
    }
  } catch {
    return FALLBACK
  }
}
