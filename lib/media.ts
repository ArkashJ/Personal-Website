// Real public media: podcasts, videos, articles, talks, press.

export type PodcastEpisode = {
  show: string
  number?: string
  title: string
  guests?: string
  date?: string
  youtubeId: string
  description?: string
}

export type ArticleLink = {
  source: 'Medium' | 'Substack' | 'Other'
  title: string
  date?: string
  url: string
  description?: string
}

export type PressMention = {
  outlet: string
  title: string
  url: string
  date?: string
  type: 'article' | 'profile' | 'press-release' | 'directory'
}

export const STU_STREET_EPISODES: PodcastEpisode[] = [
  {
    show: 'STU STREET',
    number: '06',
    title: 'ByDesign w/ Sam Morra & Arkash Jain',
    guests: 'ByDesign',
    youtubeId: 'q1JkhI4_FQ0',
    description: 'Conversation with the founders of ByDesign on the BU entrepreneurship scene.',
  },
  {
    show: 'STU STREET',
    number: '14',
    title: 'Joe Hale w/ Sam Morra & Arkash Jain',
    guests: 'Joe Hale',
    youtubeId: 'g-AiPYy4Ry4',
  },
  {
    show: 'STU STREET',
    number: '15',
    title: 'Samson Abrams w/ Arkash Jain',
    guests: 'Samson Abrams',
    youtubeId: 'KV5rYy9-1Ds',
  },
  {
    show: 'STU STREET',
    number: '21',
    title: 'Fahir Han w/ Arkash Jain',
    guests: 'Fahir Han',
    youtubeId: 'x377gxDWcgs',
  },
]

export const PODCAST_LINKS = {
  spotify: 'https://podcasters.spotify.com/pod/show/stu-street',
  apple: 'https://podcasts.apple.com/us/podcast/stu-street/id1635472305',
}

export const MEDIUM_ARTICLES: ArticleLink[] = [
  {
    source: 'Medium',
    title: 'WASP: Wide-area Adaptive Stream Processing',
    date: '2024-09',
    url: 'https://medium.com/@arkjain',
    description: 'Notes on adaptive stream-processing architectures for wide-area deployments.',
  },
  {
    source: 'Medium',
    title: 'Megaphone',
    date: '2024-08',
    url: 'https://medium.com/@arkjain',
    description: 'Distributed systems paper review.',
  },
  {
    source: 'Medium',
    title: 'Sponge',
    date: '2024-08',
    url: 'https://medium.com/@arkjain',
  },
  {
    source: 'Medium',
    title: 'Milwheel — Fault-Tolerant Stream Processing at Internet Scale (Pt 1/2)',
    date: '2024-07',
    url: 'https://medium.com/@arkjain',
  },
  {
    source: 'Medium',
    title: 'Impatience Sort (Pt 1/2)',
    date: '2024-07',
    url: 'https://medium.com/@arkjain',
  },
  {
    source: 'Medium',
    title: 'Twitter Heron',
    date: '2024-07',
    url: 'https://medium.com/@arkjain',
  },
  {
    source: 'Medium',
    title: 'Pravega',
    date: '2024-06',
    url: 'https://medium.com/@arkjain',
  },
]

export const SUBSTACK_POSTS: ArticleLink[] = [
  {
    source: 'Substack',
    title: 'What Happened This Week — ab3',
    date: '2025-06-29',
    url: 'https://arkash.substack.com/p/what-happened-this-week-ab3',
  },
  {
    source: 'Substack',
    title: 'What Happened This Week — 3fb',
    date: '2025-06-21',
    url: 'https://arkash.substack.com/p/what-happened-this-week-3fb',
  },
  {
    source: 'Substack',
    title: 'What Happened This Week — d4a',
    date: '2025-03-17',
    url: 'https://arkash.substack.com/p/what-happened-this-week-d4a',
  },
]

export const PRESS: PressMention[] = [
  {
    outlet: 'Harvard Medical School — Kirchhausen Lab',
    title: 'Arkash Jain — Lab profile',
    url: 'https://kirchhausen.hms.harvard.edu/people/arkash-jain-ms-bs',
    type: 'profile',
  },
  {
    outlet: 'BU Today',
    title: 'WTBU Podcasts: Talk Sports, News, Novels and More',
    url: 'https://www.bu.edu/articles/2022/wtbu-podcast-talk-sports-news-novels-and-more/',
    date: '2022',
    type: 'article',
  },
  {
    outlet: 'Boston University CS',
    title: 'MS Alumni Directory',
    url: 'https://www.bu.edu/cs/ms-alumni/',
    type: 'directory',
  },
]
