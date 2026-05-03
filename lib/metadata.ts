import type { Metadata } from 'next'
import { SITE } from './site'

export type PageMetaInput = {
  title?: string
  description?: string
  path?: string
  image?: string
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  type?: 'website' | 'article' | 'profile'
}

const DEFAULT_KEYWORDS = [
  'Arkash Jain',
  'AI researcher',
  'forward deployed engineer',
  'Harvard',
  'Boston University',
  'SpatialDINO',
  'lattice light-sheet microscopy',
  'self-supervised learning',
  'distributed systems',
  'Apache Flink',
  'Benmore Technologies',
  'Cattle Logic',
  'venture capital',
  'Battery Ventures',
]

export function buildMetadata({
  title,
  description,
  path = '',
  image,
  keywords,
  publishedTime,
  modifiedTime,
  type = 'website',
}: PageMetaInput = {}): Metadata {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.title
  const desc = description || SITE.description
  const url = `${SITE.url}${path}`
  const mergedKeywords = Array.from(new Set([...(keywords || []), ...DEFAULT_KEYWORDS]))
  return {
    title: fullTitle,
    description: desc,
    keywords: mergedKeywords,
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    category: 'technology',
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: type === 'profile' ? 'profile' : type,
      title: fullTitle,
      description: desc,
      url,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: fullTitle }] } : {}),
      siteName: SITE.name,
      locale: 'en_US',
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      ...(image ? { images: [image] } : {}),
      creator: '@_arkash',
      site: '@_arkash',
    },
  }
}
