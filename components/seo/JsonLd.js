import { SITE } from '../../lib/site'

const JsonLd = ({ data }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
)

export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}/myImg.jpeg`,
  sameAs: [SITE.social.linkedin, SITE.social.github, SITE.social.substack, SITE.social.biorxiv],
  jobTitle: SITE.jobTitle,
  worksFor: { '@type': 'Organization', name: SITE.worksFor },
  alumniOf: SITE.alumniOf.map((name) => ({ '@type': 'EducationalOrganization', name })),
  knowsAbout: [
    'Machine Learning',
    'Computer Vision',
    'Distributed Systems',
    'Self-Supervised Learning',
    '3D Vision Transformers',
    'AI Infrastructure',
    'Venture Capital',
    'Forward Deployed Engineering',
  ],
})

export const articleSchema = ({ title, description, date, slug }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  datePublished: date,
  url: `${SITE.url}${slug}`,
  author: { '@type': 'Person', name: SITE.name, url: SITE.url },
})

export const scholarlyArticleSchema = ({ title, authors, journal, date, url, abstract }) => {
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
  }
}

export default JsonLd
