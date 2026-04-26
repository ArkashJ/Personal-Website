import { renderOg, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Work — Arkash Jain'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOg({
    eyebrow: 'Work',
    title: 'Tools & CLIs I built',
    subtitle: 'Benmore Foundry · RTK · Claude Code skills',
  })
}
