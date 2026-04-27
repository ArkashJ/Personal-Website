// Real public media: podcasts, videos, articles, talks, press, reviews.

export type PodcastEpisode = {
  show: string
  number?: string
  title: string
  guests?: string
  date?: string
  youtubeId?: string
  url?: string
  views?: number
  arkashHosted?: boolean
  description?: string
}

export type VideoFeature = {
  title: string
  youtubeId: string
  description?: string
  date?: string
  outlet?: string
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

export type Review = {
  url: string
  source: 'Trustpilot'
  excerpt?: string
}

const STU_CHANNEL = 'https://www.youtube.com/@stustreetofficial'

// Sorted by views desc — featured grid uses top 6, the rest go behind a Disclosure.
export const STU_STREET_EPISODES: PodcastEpisode[] = [
  {
    show: 'STU STREET',
    number: '15',
    title: 'Samson Abrams on Making Your Money Work For You',
    guests: 'Samson Abrams',
    youtubeId: 'KV5rYy9-1Ds',
    views: 578,
    arkashHosted: true,
  },
  {
    show: 'STU STREET',
    number: '21',
    title: 'Fahir Han on Scaling Startups and Building an Adaptable Skill Set',
    guests: 'Fahir Han',
    youtubeId: 'x377gxDWcgs',
    views: 432,
    arkashHosted: true,
  },
  {
    show: 'STU STREET',
    number: '25',
    title: 'Rob Spivey on Research, the Credit Cycle and Breaking into Finance',
    guests: 'Rob Spivey',
    youtubeId: 'Jg5orZDmeXE',
    views: 396,
  },
  {
    show: 'STU STREET',
    number: '16',
    title: 'Dave Daglio on the World of Business and Remaining Present in the Moment',
    guests: 'Dave Daglio',
    url: STU_CHANNEL,
    views: 309,
  },
  {
    show: 'STU STREET',
    number: '23',
    title: 'Fireside: The Startup Getting Students into Venture Capital',
    guests: 'Chris Nakayama, Katherine Cao',
    youtubeId: '7NtlumvgdOw',
    views: 307,
  },
  {
    show: 'STU STREET',
    number: '19',
    title: 'MIT Sloan Professor Neal Hartman',
    guests: 'Neal Hartman',
    youtubeId: '_ybZiVsrPP4',
    views: 258,
  },
  {
    show: 'STU STREET',
    number: '06',
    title: 'ByDesign — BU entrepreneurship scene',
    guests: 'ByDesign',
    youtubeId: 'q1JkhI4_FQ0',
    views: 237,
    arkashHosted: true,
  },
  {
    show: 'STU STREET',
    number: '12',
    title: 'Dr. Matthew Reis and Understanding Organizational Behavior',
    guests: 'Dr. Matthew Reis',
    youtubeId: 'AQSWw5tV86s',
    views: 227,
  },
  {
    show: 'STU STREET',
    number: '13',
    title: 'Armaan Israni on Recruiting for Investment Banking',
    guests: 'Armaan Israni',
    url: STU_CHANNEL,
    views: 227,
    arkashHosted: true,
  },
  {
    show: 'STU STREET',
    number: '17',
    title: 'Raul Heraud on His Experiences Working in 11 Different Countries',
    guests: 'Raul Heraud',
    url: STU_CHANNEL,
    views: 197,
  },
  {
    show: 'STU STREET',
    number: '01',
    title: 'Dr. Andrew Mack',
    guests: 'Dr. Andrew Mack',
    url: STU_CHANNEL,
    views: 176,
  },
  {
    show: 'STU STREET',
    number: '14',
    title: 'Joe Hale on Exploring the World Outside Your Classroom',
    guests: 'Joe Hale',
    youtubeId: 'g-AiPYy4Ry4',
    views: 156,
    arkashHosted: true,
  },
  {
    show: 'STU STREET',
    number: '04',
    title: 'Uchenna Nwosu',
    guests: 'Uchenna Nwosu',
    url: STU_CHANNEL,
    views: 133,
  },
  {
    show: 'STU STREET',
    number: '02',
    title: 'Gordon Gilkes',
    guests: 'Gordon Gilkes',
    url: STU_CHANNEL,
    views: 127,
  },
  {
    show: 'STU STREET',
    number: '08',
    title: 'Daniel Daly',
    guests: 'Daniel Daly',
    url: STU_CHANNEL,
    views: 123,
    arkashHosted: true,
  },
  {
    show: 'STU STREET',
    number: '05',
    title: 'Alex Dunne',
    guests: 'Alex Dunne',
    url: STU_CHANNEL,
    views: 101,
  },
  {
    show: 'STU STREET',
    number: '11',
    title: 'Ethan Curtis on the Medical Field and Finding What Drives You',
    guests: 'Ethan Curtis',
    youtubeId: 'Rinjo3lDCEk',
    views: 99,
  },
  {
    show: 'STU STREET',
    number: 'S2',
    title: 'STU STREET — Season 2 Coming Soon',
    url: STU_CHANNEL,
    views: 82,
  },
  {
    show: 'STU STREET',
    number: '03',
    title: 'Nate Dizor',
    guests: 'Nate Dizor',
    url: STU_CHANNEL,
    views: 75,
    arkashHosted: true,
  },
  {
    show: 'STU STREET',
    number: '09',
    title: 'Aurojit Chakraborty',
    guests: 'Aurojit Chakraborty',
    url: STU_CHANNEL,
    views: 57,
  },
  {
    show: 'STU STREET',
    number: '10',
    title: 'BU Community Service Center',
    guests: 'BU CSC',
    url: STU_CHANNEL,
    views: 55,
    arkashHosted: true,
  },
  {
    show: 'STU STREET',
    number: '18',
    title: 'Dr. Joseph LiPuma on the Importance of a Global Mindset',
    guests: 'Dr. Joseph LiPuma',
    youtubeId: 'djkIXkEIQUY',
    views: 54,
  },
  {
    show: 'STU STREET',
    number: '20',
    title: 'Amanda Sherlip on the Benefits of Working for a Non-Profit',
    guests: 'Amanda Sherlip',
    url: STU_CHANNEL,
    views: 53,
  },
  {
    show: 'STU STREET',
    number: '22',
    title: 'German Eguiguren on Becoming a CFO and Why You Should Get an MBA',
    guests: 'German Eguiguren',
    url: STU_CHANNEL,
    views: 46,
  },
  {
    show: 'STU STREET',
    number: 'F',
    title: '$2,500 Fundraiser for Child Literacy in the Caribbean',
    url: STU_CHANNEL,
    views: 10,
  },
]

export const PODCAST_LINKS = {
  spotify: 'https://podcasters.spotify.com/pod/show/stu-street',
  apple: 'https://podcasts.apple.com/us/podcast/stu-street/id1635472305',
  youtube: STU_CHANNEL,
  instagram: 'https://www.instagram.com/stu.street',
  tiktok: 'https://www.tiktok.com/@stu.street',
}

// Videos featuring Arkash through Benmore (or other employers).
export const FEATURED_VIDEOS: VideoFeature[] = [
  {
    outlet: 'Benmore Technologies',
    title: 'Benmore — Forward Deployed Engineering at SMB scale',
    youtubeId: '0XDr6hGHQSs',
    description: 'Talk featuring Arkash on FDE practice at Benmore.',
  },
  {
    outlet: 'Benmore Technologies',
    title: 'Benmore — building with AI agents (talk #2)',
    youtubeId: 'iJwLvPLINHc',
  },
]

// Public client reviews (Trustpilot — Benmore engagements).
export const REVIEWS: Review[] = [
  { source: 'Trustpilot', url: 'https://www.trustpilot.com/reviews/69e22d4dd9ce71b5546fd2b0' },
  { source: 'Trustpilot', url: 'https://www.trustpilot.com/reviews/69e0f217dd4cad42cefdeea8' },
  { source: 'Trustpilot', url: 'https://www.trustpilot.com/reviews/69e02257342a7cee30270e4c' },
  { source: 'Trustpilot', url: 'https://www.trustpilot.com/reviews/69c2befdcbe87c9496120d52' },
  { source: 'Trustpilot', url: 'https://www.trustpilot.com/reviews/69c18f48c998986d1445ef40' },
  { source: 'Trustpilot', url: 'https://www.trustpilot.com/reviews/69bcc9fd5bf37932e12bd474' },
  { source: 'Trustpilot', url: 'https://www.trustpilot.com/reviews/69bc88c7306d95781ec837fc' },
  { source: 'Trustpilot', url: 'https://www.trustpilot.com/reviews/69bc5f3a0f14ed516870eb5a' },
  { source: 'Trustpilot', url: 'https://www.trustpilot.com/reviews/69a85729f3e0887293d03d12' },
  { source: 'Trustpilot', url: 'https://www.trustpilot.com/reviews/697b85b05482042b928ffd86' },
]

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
