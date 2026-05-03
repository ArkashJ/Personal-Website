import { NextResponse } from 'next/server'
import { getAllSkills } from '@/lib/skills'

export async function GET() {
  const skills = getAllSkills().map((s) => s.slug)
  return NextResponse.json(skills, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
