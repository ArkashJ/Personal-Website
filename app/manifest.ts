import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.title,
    short_name: 'AJ',
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a1628',
    theme_color: '#0a1628',
    scope: '/',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
