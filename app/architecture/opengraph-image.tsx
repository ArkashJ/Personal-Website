import { renderOg, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Site Architecture — Arkash Jain'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOg({
    eyebrow: 'Architecture',
    title: 'Site Architecture',
    subtitle: 'ASCII flow diagrams for the entire arkashj.com stack.',
  })
}
