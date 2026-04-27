import { SITE } from './site'

export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE.url}#person`,
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}/myImg.jpeg`,
  email: `mailto:${SITE.email}`,
  sameAs: [
    SITE.social.linkedin,
    SITE.social.github,
    SITE.social.substack,
    SITE.social.medium,
    SITE.social.twitter,
    SITE.social.biorxiv,
    SITE.social.scholar,
    SITE.social.harvard,
  ],
  jobTitle: SITE.jobTitle,
  worksFor: { '@type': 'Organization', name: SITE.worksFor, url: 'https://benmore.tech' },
  alumniOf: SITE.alumniOf.map((name) => ({ '@type': 'EducationalOrganization', name })),
  knowsLanguage: ['en', 'hi'],
  knowsAbout: [
    'Machine Learning',
    'Computer Vision',
    'Distributed Systems',
    'Self-Supervised Learning',
    '3D Vision Transformers',
    'Cryo-Electron Tomography',
    'AI Infrastructure',
    'Venture Capital',
    'Forward Deployed Engineering',
    'Forward Deployed Strategy',
    'Apache Flink',
    'Ultrafast Spectroscopy',
    'Programming Language Theory',
    'Type Systems',
    'OCaml',
    'Raft Consensus',
    'Stable Matching',
    'Mathematical Statistics',
    'Stochastic Optimization',
    'PageRank',
    'Object-Oriented Design',
  ],
})

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  author: { '@id': `${SITE.url}#person` },
  publisher: { '@id': `${SITE.url}#person` },
  creator: { '@id': `${SITE.url}#person` },
  copyrightHolder: { '@id': `${SITE.url}#person` },
  copyrightYear: new Date().getFullYear(),
  mainEntity: { '@id': `${SITE.url}#person` },
  inLanguage: 'en',
})

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: `${SITE.url}${item.path}`,
  })),
})

export const articleSchema = ({
  title,
  description,
  date,
  dateModified,
  slug,
  image,
  keywords,
}: {
  title: string
  description: string
  date: string
  dateModified?: string
  slug: string
  image?: string
  keywords?: string[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  datePublished: date,
  dateModified: dateModified || date,
  url: `${SITE.url}${slug}`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}${slug}` },
  image: image || `${SITE.url}/myImg.jpeg`,
  inLanguage: 'en',
  ...(keywords && keywords.length ? { keywords: keywords.join(', ') } : {}),
  author: { '@id': `${SITE.url}#person` },
  publisher: { '@id': `${SITE.url}#person` },
})

export const scholarlyArticleSchema = ({
  title,
  authors,
  journal,
  date,
  url,
  abstract,
  doi,
  sameAs,
}: {
  title: string
  authors?: string | string[]
  journal: string
  date: string
  url?: string
  abstract?: string
  doi?: string
  sameAs?: string[]
}) => {
  const authorList = Array.isArray(authors) ? authors : authors ? [authors] : [SITE.name]
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: title,
    author: authorList.map((name) => ({ '@type': 'Person', name })),
    publisher: { '@type': 'Organization', name: journal },
    datePublished: date,
    url,
    abstract,
    inLanguage: 'en',
    isPartOf: { '@type': 'Periodical', name: journal },
    ...(doi
      ? {
          identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: doi },
        }
      : {}),
    ...(sameAs && sameAs.length ? { sameAs } : {}),
  }
}
