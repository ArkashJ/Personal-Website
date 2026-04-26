import { SITE } from '../lib/site'
import { getAllWritingPosts, getAllKnowledgePosts } from '../lib/content'

const STATIC_ROUTES = [
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

function buildRoutes() {
  const today = new Date().toISOString().split('T')[0]
  const writing = getAllWritingPosts().map((p) => ({
    path: `/writing/${p.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: p.date || today,
  }))
  const knowledge = getAllKnowledgePosts()
    .filter((p) => p.slug !== 'index')
    .map((p) => ({
      path: `/knowledge/${p.domain}/${p.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: p.date || today,
    }))
  const knowledgeDomains = Array.from(new Set(getAllKnowledgePosts().map((p) => p.domain))).map(
    (d) => ({ path: `/knowledge/${d}`, priority: '0.7', changefreq: 'monthly', lastmod: today })
  )
  return [...STATIC_ROUTES, ...knowledgeDomains, ...writing, ...knowledge].map((r) => ({
    ...r,
    lastmod: r.lastmod || today,
  }))
}

function generateSiteMap() {
  const routes = buildRoutes()
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE.url}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
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
