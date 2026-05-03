import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const SKILLS_DIR = path.join(process.cwd(), 'content', 'skills')

export type SkillMeta = {
  slug: string
  name: string
  description: string
  category: string
  lineCount: number
}

export type SkillFull = SkillMeta & {
  raw: string
  body: string
}

const CATEGORY_RULES: Array<[RegExp, string]> = [
  [/^(stripe|stripe-)/i, 'Payments'],
  [/^(django|django-|fastapi|django-celery)/i, 'Python Backend'],
  [/^(vercel-|chatbot|frontend|sentry-|three|remotion|expo|push-|playground)/i, 'Frontend & Apps'],
  [
    /^(audit|security|hipaa|gdpr|financial-audit|healthcare|dependency|service-invariant|multi-tenant|cross-module)/i,
    'Compliance & Security',
  ],
  [/^(ai-seo|seo|programmatic|ai-)/i, 'SEO & AI'],
  [/^(emil|web-design|minimalist|modern-floating|frontend-productionize)/i, 'Design Engineering'],
  [
    /^(creating-user-flows|user-flows|feature-alignment|client-|better-scope|client-value)/i,
    'Product & Discovery',
  ],
  [
    /^(productionize|deep-dive-ascii|create-research-primer|github-issue|gh_issue|tickets|release-notes|meeting-notes|qa-plan|create-project|skill-chain|full-pr-review|quick-pr-review)/i,
    'Workflow & Ops',
  ],
  [
    /^(mcp|claude-api|cli-builder|stripe_processing|skill-creator|find-skills|nano_banana|stripe-projects|video-download|xlsx|pdf|docx|presentation|mailjet|otp|role-based|universal-auth|django-react-2fa|django-auth)/i,
    'Tooling & Integrations',
  ],
  [
    /^(apple|heroku|doctl|vercel-cli|sentry-cli|modern-terminal|upgrade-stripe)/i,
    'CLI & Deployment',
  ],
  [/^(realtime-socket|threejs)/i, 'Real-time & 3D'],
  [/^(what-to-build|client-kickoff|client-value)/i, 'Engagements'],
]

function categoryFor(slug: string): string {
  for (const [pattern, category] of CATEGORY_RULES) {
    if (pattern.test(slug)) return category
  }
  return 'General'
}

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
}

export function getAllSkills(): SkillMeta[] {
  return readDir(SKILLS_DIR)
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(SKILLS_DIR, file), 'utf8')
      const { data } = matter(raw)
      const name = (data.name as string) || slug
      const description = ((data.description as string) || '').replace(/\s+/g, ' ').trim()
      const lineCount = raw.split('\n').length
      return {
        slug,
        name,
        description,
        category: categoryFor(slug),
        lineCount,
      }
    })
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

export function getSkill(slug: string): SkillFull | null {
  const file = path.join(SKILLS_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const name = (data.name as string) || slug
  const description = ((data.description as string) || '').replace(/\s+/g, ' ').trim()
  return {
    slug,
    name,
    description,
    category: categoryFor(slug),
    lineCount: raw.split('\n').length,
    raw,
    body: content,
  }
}

export function getCategories(skills: SkillMeta[]): { name: string; count: number }[] {
  const counts = skills.reduce<Record<string, number>>((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1
    return acc
  }, {})
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}
