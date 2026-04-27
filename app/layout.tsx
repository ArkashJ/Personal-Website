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

export const metadata: Metadata = {
  ...buildMetadata({ path: '/' }),
  metadataBase: new URL(SITE.url),
  icons: { icon: '/favicon.svg' },
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
        <link rel="me" href={SITE.social.linkedin} />
        <link rel="me" href={SITE.social.github} />
        <link rel="me" href={SITE.social.substack} />
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-text font-sans">
        <ThemeProvider>
          <JsonLd data={personSchema()} />
          <JsonLd data={websiteSchema()} />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
