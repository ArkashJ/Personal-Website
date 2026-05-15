#!/usr/bin/env bun
/**
 * Fetches real branded favicons for sources used in /weekly entries.
 * Single source of truth: edit ICON_SOURCES, run `bun run icons:fetch`.
 * Output: public/assets/weekly/icons/<slug>.<ext>
 *
 * When you add a new weekly source whose icon isn't in SimpleIcons, add an
 * entry to ICON_SOURCES here AND to LOCAL_ICON_MAP in lib/weekly-render.ts.
 */
import { mkdir, writeFile } from 'node:fs/promises'

type IconSource = { slug: string; urls: string[] }

const ICON_SOURCES: IconSource[] = [
  {
    slug: 'bloomberg',
    urls: [
      'https://www.bloomberg.com/favicon.ico',
      'https://assets.bbhub.io/company/sites/51/2019/08/favicon.ico',
    ],
  },
  {
    slug: 'semianalysis',
    urls: [
      'https://newsletter.semianalysis.com/favicon.ico',
      'https://semianalysis.com/favicon.ico',
      'https://www.semianalysis.com/favicon.ico',
    ],
  },
  {
    slug: 'stratechery',
    urls: [
      'https://stratechery.com/apple-touch-icon.png',
      'https://stratechery.com/wp-content/uploads/2022/04/cropped-stratechery-favicon-180x180.png',
      'https://stratechery.com/favicon.ico',
    ],
  },
  {
    slug: 'tbpn',
    urls: ['https://tbpn.substack.com/favicon.ico', 'https://tbpn.com/favicon.ico'],
  },
]

const OUT_DIR = 'public/assets/weekly/icons'

function extFromContentType(ct: string | null, url: string): string {
  if (ct?.includes('png')) return 'png'
  if (ct?.includes('jpeg')) return 'jpg'
  if (ct?.includes('svg')) return 'svg'
  if (ct?.includes('icon') || ct?.includes('x-icon') || ct?.includes('vnd.microsoft')) return 'ico'
  // fall back to URL suffix
  const m = url.match(/\.(png|jpe?g|ico|svg)(?:\?|$)/i)
  return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : 'png'
}

async function fetchOne({ slug, urls }: IconSource) {
  for (const url of urls) {
    try {
      const r = await fetch(url, { redirect: 'follow' })
      if (!r.ok) continue
      const buf = Buffer.from(await r.arrayBuffer())
      if (buf.length < 200) continue
      const ext = extFromContentType(r.headers.get('content-type'), url)
      const out = `${OUT_DIR}/${slug}.${ext}`
      await writeFile(out, buf)
      console.log(`✓ ${out} ← ${url} (${buf.length}b)`)
      return out
    } catch (err) {
      console.log(`  ✗ ${url}: ${String(err).slice(0, 80)}`)
    }
  }
  console.error(`✗ ${slug} — no source worked`)
  return null
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const results = await Promise.all(ICON_SOURCES.map(fetchOne))
  const ok = results.filter(Boolean).length
  console.log(`\n${ok}/${ICON_SOURCES.length} icons fetched`)
  if (ok < ICON_SOURCES.length) process.exit(1)
}

main()
