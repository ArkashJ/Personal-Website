import { SITE } from '../lib/site'

const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/research', priority: '0.9', changefreq: 'monthly' },
  { path: '/experience', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.8', changefreq: 'monthly' },
  { path: '/work', priority: '0.8', changefreq: 'monthly' },
  { path: '/writing', priority: '0.8', changefreq: 'weekly' },
  { path: '/knowledge', priority: '0.7', changefreq: 'weekly' },
  { path: '/architecture', priority: '0.5', changefreq: 'yearly' },
]

function generateSiteMap() {
  const today = new Date().toISOString().split('T')[0]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE.url}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>`
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml')
  res.write(generateSiteMap())
  res.end()
  return { props: {} }
}

export default SiteMap
