// Frequency-rank tags across an array of items. Returns tag strings sorted
// by count desc, alphabetical asc on ties. Used by /projects, /weekly, and
// the git changelog UI.
export function tagsByFrequency<T>(items: T[], pick: (item: T) => readonly string[]): string[] {
  const counts: Record<string, number> = {}
  for (const item of items) {
    for (const tag of pick(item)) {
      if (!tag) continue
      counts[tag] = (counts[tag] ?? 0) + 1
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag)
}
