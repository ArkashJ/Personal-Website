import './globals.css'
import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import ThemeProvider from '@/components/ThemeProvider'
import { personSchema, websiteSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/site'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  ...buildMetadata({ path: '/' }),
  metadataBase: new URL(SITE.url),
  icons: { icon: '/favicon.svg' },
  verification: {
    google: '9i4OP2Utb_pb1gOLKG8gTxVcs0GrI8sDAJ4--Wi-xYU',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a1628',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* IndieWeb / identity-graph rel=me links — every public profile */}
        <link rel="me" href={SITE.social.linkedin} />
        <link rel="me" href={SITE.social.github} />
        <link rel="me" href={SITE.social.twitter} />
        <link rel="me" href={SITE.social.substack} />
        <link rel="me" href={SITE.social.medium} />
        <link rel="me" href={SITE.social.orcid} />
        <link rel="me" href={SITE.social.scholar} />
        <link rel="me" href={SITE.social.harvard} />
        <link rel="me" href={SITE.social.bu} />
        <link rel="me" href={`mailto:${SITE.email}`} />
        <link rel="author" href={SITE.url} />
        <link rel="canonical" href={SITE.url} />
        <meta name="author" content={SITE.name} />
        <meta name="creator" content={SITE.name} />
        <meta name="designer" content={SITE.name} />
        <meta name="copyright" content={`© ${new Date().getFullYear()} ${SITE.name}`} />
        <meta name="owner" content={SITE.name} />
        <meta property="article:author" content={SITE.name} />
        {/* OpenGraph see_also — boosts social-graph linking for SearchGE */}
        <meta property="og:see_also" content={SITE.social.github} />
        <meta property="og:see_also" content={SITE.social.linkedin} />
        <meta property="og:see_also" content={SITE.social.twitter} />
        <meta property="og:see_also" content={SITE.social.scholar} />
        <meta property="og:see_also" content={SITE.social.orcid} />
        <meta property="og:see_also" content={SITE.social.harvard} />
        <meta property="og:see_also" content={SITE.social.substack} />
        <meta property="og:see_also" content={SITE.social.medium} />
        <meta property="og:see_also" content={SITE.social.biorxiv} />
        <meta property="og:see_also" content={SITE.social.pubmed} />
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-text font-sans">
        {/* Crawler-visible authorship credit */}
        <noscript>
          <p>
            Site built and maintained by Arkash Jain — <a href={SITE.url}>{SITE.url}</a>.
          </p>
        </noscript>
        <ClerkProvider>
          <ThemeProvider>
            <JsonLd data={personSchema()} />
            <JsonLd data={websiteSchema()} />
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
