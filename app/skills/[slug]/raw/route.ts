import { NextResponse } from 'next/server'
import { getAllSkills, getSkill } from '@/lib/skills'

export function generateStaticParams() {
  return getAllSkills().map((s) => ({ slug: s.slug }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const skill = getSkill(slug)
  if (!skill) return new NextResponse('Skill not found', { status: 404 })
  return new NextResponse(skill.raw, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
