// Shared types + pure helpers — safe to import from client and server.
// (Server-only loading lives in lib/git-changelog.ts to keep `fs` away from
// the client bundle.)

export type GitCommit = {
  hash: string
  date: string
  type: string | null
  scopes: string[]
  summary: string
  body: string
  tags: string[]
}

export type CommitType =
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

export const KNOWN_TYPES: ReadonlySet<CommitType> = new Set<CommitType>([
  'feat',
  'fix',
  'chore',
  'docs',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'style',
  'revert',
  'weekly',
])

export function isKnownType(t: string | null): boolean {
  return Boolean(t && KNOWN_TYPES.has(t as CommitType))
}

const REPO_URL = 'https://github.com/ArkashJ/Personal-Website'

export function commitGithubUrl(hash: string): string {
  return `${REPO_URL}/commit/${hash}`
}

export function shortHash(hash: string): string {
  return hash.slice(0, 7)
}
