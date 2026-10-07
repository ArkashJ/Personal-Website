import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { isPublicCommit } from './sync-git-changelog.mjs'

test('public activity excludes application context in subjects and bodies', () => {
  for (const text of [
    'O-1 evidence',
    'O\u20111 evidence',
    'writing/o1-visa-evidence-hub.mdx',
    'Why This Site Exists: Evidence Hub',
    'visa application',
  ]) {
    assert.equal(isPublicCommit({ summary: text, body: '' }), false)
    assert.equal(isPublicCommit({ summary: 'Update site', body: text }), false)
  }
  assert.equal(isPublicCommit({ summary: 'Publish research', body: 'Add paper and links' }), true)
})

test('deployments without Git preserve and filter the committed snapshot', () => {
  const root = mkdtempSync(join(tmpdir(), 'site-changelog-'))
  try {
    mkdirSync(join(root, 'scripts'))
    mkdirSync(join(root, 'content/_generated'), { recursive: true })
    const script = join(root, 'scripts/sync-git-changelog.mjs')
    copyFileSync(new URL('./sync-git-changelog.mjs', import.meta.url), script)
    const snapshot = join(root, 'content/_generated/git-changelog.json')
    const publicCommit = { summary: 'Publish research', body: '', scopes: [] }
    writeFileSync(snapshot, JSON.stringify([publicCommit, { summary: 'O-1 evidence', body: '' }]))
    execFileSync(process.execPath, [script], { cwd: root, stdio: 'pipe' })
    assert.deepEqual(JSON.parse(readFileSync(snapshot, 'utf8')), [publicCommit])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
