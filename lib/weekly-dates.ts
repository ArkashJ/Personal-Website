// Pure ISO-8601 week math. Safe to import from both client and server.

export function getIsoWeek(date: Date): { year: number; week: number } {
  const d = new Date(date.getTime())
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7)) // Thursday of this week
  const yearStart = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return { year: d.getFullYear(), week }
}

export function pad2(n: number): string {
  return n.toString().padStart(2, '0')
}

export function isoWeekSlug(year: number, week: number): string {
  return `${year}-W${pad2(week)}`
}

/**
 * Mon–Sun of the given ISO week as 'YYYY-MM-DD'. Jan 4 is always in week 1
 * (week 1 contains the year's first Thursday).
 */
export function weekToRange(year: number, week: number): { weekStart: string; weekEnd: string } {
  const jan4 = new Date(year, 0, 4)
  const jan4Dow = jan4.getDay() || 7
  const week1Monday = new Date(jan4.getTime() - (jan4Dow - 1) * 86400000)
  const monday = new Date(week1Monday.getTime() + (week - 1) * 7 * 86400000)
  const sunday = new Date(monday.getTime() + 6 * 86400000)
  const fmt = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
  return { weekStart: fmt(monday), weekEnd: fmt(sunday) }
}
