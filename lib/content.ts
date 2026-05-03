import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const WRITING_DIR = path.join(ROOT, 'content', 'writing')
const COURSEWORK_DIR = path.join(ROOT, 'content', 'coursework')

export type WritingMeta = {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
  originalDomain?: string
}

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
}

function readMdx(filePath: string): { data: Record<string, unknown>; content: string } {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { data, content }
}

export function getAllWritingPosts(): WritingMeta[] {
  return readDir(WRITING_DIR)
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const { data } = readMdx(path.join(WRITING_DIR, file))
      return { slug, ...(data as Omit<WritingMeta, 'slug'>) }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getWritingPost(
  slug: string
): Promise<{ meta: WritingMeta; source: string } | null> {
  const file = path.join(WRITING_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { data, content } = readMdx(file)
  return { meta: { slug, ...(data as Omit<WritingMeta, 'slug'>) }, source: content }
}

// Knowledge loaders removed in v2.6.0 — all articles consolidated under
// content/writing/ with `originalDomain` frontmatter. /knowledge/* URLs
// 308-redirect to /writing/<slug> via next.config.js.

// -------- Coursework --------
// Layout: content/coursework/<semester-slug>/<course-slug>.mdx
//         content/coursework/<semester-slug>/<course-slug>/<sub>.mdx  (sub-pages)

export async function getCoursePost(
  semesterSlug: string,
  courseSlug: string
): Promise<string | null> {
  const file = path.join(COURSEWORK_DIR, semesterSlug, `${courseSlug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { content } = readMdx(file)
  return content
}

export async function getCourseSubPagePost(
  semesterSlug: string,
  courseSlug: string,
  subSlug: string
): Promise<string | null> {
  const file = path.join(COURSEWORK_DIR, semesterSlug, courseSlug, `${subSlug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { content } = readMdx(file)
  return content
}
