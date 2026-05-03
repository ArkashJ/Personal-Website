import { auth } from '@clerk/nextjs/server'
import { readdir } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const dir = path.join(process.cwd(), 'content', 'writing')
    const files = await readdir(dir)
    const posts = files.filter((f) => f.endsWith('.mdx')).sort()
    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json({ posts: [] })
  }
}
