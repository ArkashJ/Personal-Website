import { renderOg, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Knowledge — Arkash Jain'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOg({
    eyebrow: 'Knowledge',
    title: 'Second brain, in public',
    subtitle: 'AI · Finance · Distributed Systems · Math · Physics · Software',
  })
}
