import { renderOg, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'About — Arkash Jain'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOg({
    eyebrow: 'About',
    title: 'Life Changelog',
    subtitle: 'Physics → VC → distributed systems → Harvard AI → Benmore.',
  })
}
