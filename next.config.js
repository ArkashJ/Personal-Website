/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/experience',
        destination: '/about#career',
        permanent: true,
      },
      // knowledge → writing migration
      {
        source: '/knowledge/physics/why-i-left-physics',
        destination: '/writing/why-i-left-physics',
        permanent: true,
      },
      {
        source: '/knowledge/physics/supercritical-fluids-paper',
        destination: '/writing/supercritical-fluids-paper',
        permanent: true,
      },
      {
        source: '/knowledge/finance/aggregation-theory',
        destination: '/writing/aggregation-theory',
        permanent: true,
      },
      {
        source: '/knowledge/software/claude-code-as-an-os',
        destination: '/writing/claude-code-as-an-os',
        permanent: true,
      },
      {
        source: '/knowledge/software/why-typescript-strict',
        destination: '/writing/why-typescript-strict',
        permanent: true,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'i9.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
}

module.exports = nextConfig
