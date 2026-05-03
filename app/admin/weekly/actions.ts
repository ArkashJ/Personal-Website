'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { revalidatePath } from 'next/cache'
import type { RailKey, WeeklyItemKind } from '@/lib/weekly-types'

// ---------------------------------------------------------------------------
// ISO week helpers
// ---------------------------------------------------------------------------

function getIsoWeek(date: Date): { year: number; week: number } {
  const d = new Date(date.getTime())
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7)) // Thursday of this week
  const yearStart = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return { year: d.getFullYear(), week }
}

function pad2(n: number): string {
  return n.toString().padStart(2, '0')
}

function isoWeekSlug(year: number, week: number): string {
  return `${year}-W${pad2(week)}`
}

/**
 * Returns the Monday and Sunday of the given ISO week as 'YYYY-MM-DD'.
 */
function weekToRange(year: number, week: number): { weekStart: string; weekEnd: string } {
  // Jan 4 is always in week 1 (ISO rule: week 1 contains the year's first Thursday)
  const jan4 = new Date(year, 0, 4)
  // Day of week for jan4 (ISO: Mon=1 … Sun=7)
  const jan4Dow = jan4.getDay() || 7
  // Monday of week 1
  const week1Monday = new Date(jan4.getTime() - (jan4Dow - 1) * 86400000)
  // Monday of the target week
  const monday = new Date(week1Monday.getTime() + (week - 1) * 7 * 86400000)
  const sunday = new Date(monday.getTime() + 6 * 86400000)

  const fmt = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`

  return { weekStart: fmt(monday), weekEnd: fmt(sunday) }
}

// ---------------------------------------------------------------------------
// Server action
// ---------------------------------------------------------------------------

type ActionResult = { ok: true; slug: string } | { ok: false; error: string }

export async function addWeeklyItem(formData: FormData): Promise<ActionResult> {
  // --- Auth ---
  const { sessionClaims } = await auth()
  let email: string | undefined =
    (sessionClaims?.email as string | undefined) ?? (sessionClaims?.['email'] as string | undefined)

  if (!email) {
    // Fallback: full currentUser() lookup (works on Clerk free tier)
    const user = await currentUser()
    email = user?.primaryEmailAddress?.emailAddress
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (!email || !adminEmail || email !== adminEmail) {
    throw new Error('Forbidden')
  }

  // --- Parse fields ---
  const rail = (formData.get('rail') as RailKey) ?? 'read'
  const kind = (formData.get('kind') as WeeklyItemKind) ?? 'article'
  const title = (formData.get('title') as string | null)?.trim() ?? ''
  const source = (formData.get('source') as string | null)?.trim() ?? ''
  const href = (formData.get('href') as string | null)?.trim() ?? ''
  const description = (formData.get('description') as string | null)?.trim() ?? ''
  const thumbnail = (formData.get('thumbnail') as string | null)?.trim() ?? ''
  const tagsRaw = (formData.get('tags') as string | null)?.trim() ?? ''

  if (!title) throw new Error('title is required')
  if (!href) throw new Error('href is required')

  const tags = tagsRaw
    ? tagsRaw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []

  // Build item object — drop empty optional fields
  const item: Record<string, unknown> = { text: title, href, kind }
  if (source) item.source = source
  if (description) item.notes = description
  if (thumbnail) item.image = thumbnail
  if (tags.length > 0) item.tags = tags

  // --- Compute current ISO week ---
  const { year, week } = getIsoWeek(new Date())
  const slug = isoWeekSlug(year, week)
  const { weekStart, weekEnd } = weekToRange(year, week)
  const filePath = path.join(process.cwd(), 'content', 'weekly', `${slug}.mdx`)

  // --- Read or create file ---
  let raw: string
  if (fs.existsSync(filePath)) {
    raw = fs.readFileSync(filePath, 'utf8')
  } else {
    // Create minimal frontmatter template
    const template = {
      title: 'Draft',
      weekStart,
      weekEnd,
      read: [],
      watched: [],
      built: [],
      shipped: [],
      learned: [],
      met: [],
    }
    raw = matter.stringify('', template)
  }

  // --- Parse, mutate, serialize ---
  const parsed = matter(raw)

  // Ensure the rail array exists
  if (!Array.isArray(parsed.data[rail])) {
    parsed.data[rail] = []
  }
  ;(parsed.data[rail] as unknown[]).push(item)

  const output = matter.stringify(parsed.content, parsed.data)

  // --- Write ---
  try {
    fs.writeFileSync(filePath, output, 'utf8')
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException).code
    if (code === 'EROFS') {
      return {
        ok: false,
        error: 'Filesystem is read-only — run this locally and commit the change.',
      }
    }
    throw err
  }

  // --- Revalidate ---
  revalidatePath('/weekly')
  revalidatePath(`/weekly/${slug}`)
  revalidatePath('/')

  return { ok: true, slug }
}
