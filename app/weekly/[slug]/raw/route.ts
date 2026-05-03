import { NextResponse } from 'next/server'
import matter from 'gray-matter'
import { getAllWeeklyLogs, getWeeklyLog } from '@/lib/weekly'

export function generateStaticParams() {
  return getAllWeeklyLogs().map((l) => ({ slug: l.slug }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const log = await getWeeklyLog(slug)
  if (!log) return new NextResponse('Not found', { status: 404 })
  const body = matter.stringify(log.source, log.meta as unknown as Record<string, unknown>)
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
