#!/usr/bin/env node
// Build-time generator: fetches each public-project README from GitHub via the
// `gh` CLI and snapshots it under content/projects/<slug>.md so the per-project
// detail page can render the canonical README at the bottom without runtime
// network access.
//
// Run automatically via the `prebuild` hook in package.json after the
// changelog sync. Failures are logged and skipped — never fatal — so a
// missing repo, rate-limit, or offline build still produces a green build.

import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'content', 'projects')

// slug -> "owner/repo". Slugs match lib/projects.ts:projectSlug(name).
// Verified against PROJECTS / WORK_TOOLS in lib/data.ts on 2026-05-02.
const REPOS = {
  'benmore-meridian': 'Benmore-Studio/Benmore-Meridian',
  raft: 'ArkashJ/Raft',
  'cloudcomputing-coursework-projects': 'ArkashJ/CloudComputing',
  'nexmark-benchmark': 'ArkashJ/NEXMARK-Benchmark',
  'implicit-sgd': 'ArkashJ/implict-SGD-implementation',
  'cs411-software-engineering-labs': 'ArkashJ/CS411_labs',
  'ocaml-interpreter': 'ArkashJ/OCaml-Interpreter',
  'stu-street-podcast': 'ArkashJ/STU-STREET-Website',
  // Work tool — points at the same Benmore-Meridian repo.
  'compound-engineering-skills': 'Benmore-Studio/Benmore-Meridian',
}

function fetchReadme(ownerRepo) {
  const b64 = execFileSync(
    'gh',
    ['api', `repos/${ownerRepo}/readme`, '--jq', '.content'],
    { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }
  )
  // The .content field is base64 with embedded newlines — Buffer handles those.
  return Buffer.from(b64.trim(), 'base64').toString('utf8')
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  let ok = 0
  let skipped = 0
  for (const [slug, ownerRepo] of Object.entries(REPOS)) {
    try {
      const md = fetchReadme(ownerRepo)
      const outFile = join(OUT_DIR, `${slug}.md`)
      writeFileSync(outFile, md, 'utf8')
      const sizeKB = (Buffer.byteLength(md, 'utf8') / 1024).toFixed(1)
      console.log(`[sync-project-readmes] ${slug} <- ${ownerRepo} (${sizeKB} KB)`)
      ok += 1
    } catch (err) {
      const msg = err && err.message ? err.message.split('\n')[0] : String(err)
      console.warn(`[sync-project-readmes] WARN ${slug} <- ${ownerRepo}: ${msg}`)
      skipped += 1
    }
  }

  console.log(`[sync-project-readmes] done — ${ok} fetched, ${skipped} skipped`)
}

main()
