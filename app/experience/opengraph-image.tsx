import { renderOg, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Experience — Arkash Jain'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOg({
    eyebrow: 'Experience',
    title: 'Where I’ve worked',
    subtitle: 'Benmore · Harvard · ZeroSync · BCH · BU · Battery Ventures',
  })
}
