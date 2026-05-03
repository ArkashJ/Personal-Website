'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { revalidatePath } from 'next/cache'
import type { RailKey, WeeklyItemKind } from '@/lib/weekly-types'
import { getIsoWeek, isoWeekSlug, weekToRange } from '@/lib/weekly-dates'

type ActionResult = { ok: true; slug: string } | { ok: false; error: string }

export async function addWeeklyItem(formData: FormData): Promise<ActionResult> {
  const { sessionClaims } = await auth()
  let email = sessionClaims?.email as string | undefined
  if (!email) {
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

  let raw: string
  try {
    raw = fs.readFileSync(filePath, 'utf8')
  } catch (err: unknown) {
    if (!(err instanceof Error) || (err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
    raw = matter.stringify('', {
      title: 'Draft',
      weekStart,
      weekEnd,
      read: [],
      watched: [],
      built: [],
      shipped: [],
      learned: [],
      met: [],
    })
  }

  const parsed = matter(raw)
  if (!Array.isArray(parsed.data[rail])) parsed.data[rail] = []
  ;(parsed.data[rail] as unknown[]).push(item)

  const output = matter.stringify(parsed.content, parsed.data)

  try {
    fs.writeFileSync(filePath, output, 'utf8')
  } catch (err: unknown) {
    if (err instanceof Error && (err as NodeJS.ErrnoException).code === 'EROFS') {
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
