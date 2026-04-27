import { renderOg, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Research — Arkash Jain'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOg({
    eyebrow: 'Research',
    title: 'Three published papers, one thesis',
    subtitle: 'SpatialDINO · Cell Biology ML · Supercritical Fluids',
  })
}
