import { renderOg, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Arkash Jain — AI Researcher, Forward Deployed Engineer & Builder'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return renderOg({
    eyebrow: 'arkashj.com',
    title: 'Arkash Jain',
    subtitle: 'AI Researcher · Forward Deployed Engineer · Builder',
  })
}
