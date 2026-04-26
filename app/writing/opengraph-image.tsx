import { renderOg, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Writing — Arkash Jain'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOg({
    eyebrow: 'Writing',
    title: 'Essays, notes, and theses',
    subtitle: 'AI · Hardware · Finance · Distributed Systems · Venture',
  })
}
