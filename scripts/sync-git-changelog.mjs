#!/usr/bin/env node
// Build-time generator: snapshots the last N git commits to JSON so the
// website can render a tag-filterable changelog at request time without
// shelling out (and without git access at runtime on Vercel).
//
// Output: content/_generated/git-changelog.json
//
// Run automatically via the `predev` and `prebuild` hooks in package.json.

import { execSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'content', '_generated')
const OUT_FILE = join(OUT_DIR, 'git-changelog.json')
const COMMIT_LIMIT = 200

const SEP_FIELD = ''
const SEP_RECORD = '\n'
const FORMAT = ['%H', '%aI', '%s', '%b'].join(SEP_FIELD) + SEP_RECORD

function readGitLog() {
  try {
    const raw = execSync(
      `git log --no-merges -n ${COMMIT_LIMIT} --pretty=format:"${FORMAT}"`,
      { cwd: ROOT, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }
    )
    return raw
      .split(SEP_RECORD)
      .map((s) => s.trim())
      .filter(Boolean)
  } catch (err) {
    console.warn('[sync-git-changelog] git log failed:', err.message)
    return []
  }
}

const CONVENTIONAL = /^(\w+)(?:\(([^)]+)\))?:\s*(.+)$/

function parseCommit(record) {
  const [hash, date, subject, ...bodyParts] = record.split(SEP_FIELD)
  const body = bodyParts.join(SEP_FIELD).trim()
  const match = subject.match(CONVENTIONAL)
  let type = null
  let scopes = []
  let summary = subject
  if (match) {
    type = match[1].toLowerCase()
    scopes = (match[2] || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
    summary = match[3]
  }
  const tags = Array.from(new Set([type, ...scopes].filter(Boolean)))
  return { hash, date, type, scopes, summary, body, tags }
}

function main() {
  const records = readGitLog()
  const commits = records.map(parseCommit)

  // Strip trivial single-dot commits ('.', ',.') the user uses as WIP.
  const cleaned = commits.filter(
    (c) => c.summary && c.summary.replace(/[.\s,]/g, '').length > 0
  )

  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(OUT_FILE, JSON.stringify(cleaned, null, 2) + '\n', 'utf8')

  const types = new Set()
  const scopes = new Set()
  for (const c of cleaned) {
    if (c.type) types.add(c.type)
    for (const s of c.scopes) scopes.add(s)
  }
  console.log(
    `[sync-git-changelog] wrote ${cleaned.length} commits (${types.size} types, ${scopes.size} scopes) -> ${OUT_FILE.replace(ROOT + '/', '')}`
  )
}

main()
