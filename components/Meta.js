import Head from 'next/head'
import { SITE } from '../lib/site'

const Meta = ({ title, description, path, image }) => {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.title
  const desc = description || SITE.description
  const url = `${SITE.url}${path || ''}`
  const ogImage = image || `${SITE.url}/myImg.jpeg`
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="me" href={SITE.social.linkedin} />
      <link rel="me" href={SITE.social.github} />
      <link rel="me" href={SITE.social.substack} />

      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>
  )
}

export default Meta
