/**
 * Captures /weekly/2026-W19-tuesday-reads in light + dark themes plus a
 * scrollable frame sequence for GIF assembly. Output goes to
 * docs/screenshots/ (gitignored). Pair with scripts/frames-to-gif.sh.
 *
 * Run: `bun run capture:weekly` (after `bun add -D @playwright/test`).
 */
import { chromium, type Page } from '@playwright/test'
import { existsSync, mkdirSync, rmSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const TARGET_URL = process.env.WEEKLY_URL ?? 'http://localhost:3000/weekly/2026-W19-tuesday-reads'
const OUT_DIR = join(process.cwd(), 'docs', 'screenshots')
const VIEWPORT = { width: 1440, height: 900 }
const SCROLL_FRAMES = 24

async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.addInitScript((t: string) => {
    try {
      localStorage.setItem('theme', t)
    } catch {}
    document.documentElement.setAttribute('data-theme', t)
  }, theme)
}

async function captureTheme(theme: 'light' | 'dark') {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: theme,
  })
  const page = await context.newPage()
  await setTheme(page, theme)
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)

  // full-page proof shot
  await page.screenshot({
    path: join(OUT_DIR, `weekly-${theme}.png`),
    fullPage: true,
  })

  // scroll-frame sequence (dark only — that's what we'll GIF)
  if (theme === 'dark') {
    const total = await page.evaluate(() => document.body.scrollHeight - window.innerHeight)
    for (let i = 0; i < SCROLL_FRAMES; i++) {
      const y = Math.round((total * i) / (SCROLL_FRAMES - 1))
      await page.evaluate(
        (yy: number) => window.scrollTo({ top: yy, behavior: 'instant' as ScrollBehavior }),
        y
      )
      await page.waitForTimeout(120)
      await page.screenshot({
        path: join(OUT_DIR, `weekly-frame-${String(i).padStart(3, '0')}.png`),
        fullPage: false,
      })
    }
  }
  await browser.close()
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })
  // clean previous frame batch
  for (const f of readdirSync(OUT_DIR)) {
    if (f.startsWith('weekly-frame-')) rmSync(join(OUT_DIR, f))
  }
  await captureTheme('light')
  await captureTheme('dark')
  console.log(`Wrote captures to ${OUT_DIR}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
