import { renderOg, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Projects — Arkash Jain'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOg({
    eyebrow: 'Projects',
    title: 'Things I’ve built',
    subtitle: 'Cattle Logic · SpatialDINO · Foundry CLI · Apache Flink thesis',
  })
}
