import assert from 'node:assert/strict'
import { test } from 'node:test'
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
