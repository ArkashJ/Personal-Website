export type TagIcon = { slug: string; label?: string }

const normalize = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, ' ').replace(/[._]+/g, ' ').trim()

const RAW: Record<string, TagIcon> = {
  // Languages
  python: { slug: 'python', label: 'Python' },
  java: { slug: 'openjdk', label: 'Java' },
  jvm: { slug: 'openjdk', label: 'JVM' },
  go: { slug: 'go', label: 'Go' },
  golang: { slug: 'go', label: 'Go' },
  rust: { slug: 'rust', label: 'Rust' },
  typescript: { slug: 'typescript', label: 'TypeScript' },
  ts: { slug: 'typescript', label: 'TypeScript' },
  javascript: { slug: 'javascript', label: 'JavaScript' },
  js: { slug: 'javascript', label: 'JavaScript' },

  // Python data / ML
  numpy: { slug: 'numpy', label: 'NumPy' },
  pandas: { slug: 'pandas', label: 'Pandas' },
  pytorch: { slug: 'pytorch', label: 'PyTorch' },
  tensorflow: { slug: 'tensorflow', label: 'TensorFlow' },

  // Java / data
  spring: { slug: 'spring', label: 'Spring' },
  'apache flink': { slug: 'apacheflink', label: 'Apache Flink' },
  flink: { slug: 'apacheflink', label: 'Apache Flink' },
  rocksdb: { slug: 'rocksdb', label: 'RocksDB' },
  hadoop: { slug: 'apachehadoop', label: 'Hadoop' },
  spark: { slug: 'apachespark', label: 'Spark' },
  'apache spark': { slug: 'apachespark', label: 'Apache Spark' },

  // Cloud / infra
  gcp: { slug: 'googlecloud', label: 'GCP' },
  'google cloud': { slug: 'googlecloud', label: 'Google Cloud' },
  aws: { slug: 'amazonwebservices', label: 'AWS' },
  docker: { slug: 'docker', label: 'Docker' },
  kubernetes: { slug: 'kubernetes', label: 'Kubernetes' },
  k8s: { slug: 'kubernetes', label: 'Kubernetes' },

  // Web
  react: { slug: 'react', label: 'React' },
  'next.js': { slug: 'nextdotjs', label: 'Next.js' },
  nextjs: { slug: 'nextdotjs', label: 'Next.js' },
  next: { slug: 'nextdotjs', label: 'Next.js' },
  'node.js': { slug: 'nodedotjs', label: 'Node.js' },
  nodejs: { slug: 'nodedotjs', label: 'Node.js' },
  node: { slug: 'nodedotjs', label: 'Node.js' },

  // DBs
  postgresql: { slug: 'postgresql', label: 'PostgreSQL' },
  postgres: { slug: 'postgresql', label: 'PostgreSQL' },
  redis: { slug: 'redis', label: 'Redis' },
  mongodb: { slug: 'mongodb', label: 'MongoDB' },
  mongo: { slug: 'mongodb', label: 'MongoDB' },

  // Concepts (use closest icon analogue)
  streaming: { slug: 'apachekafka', label: 'Streaming' },
  optimization: { slug: 'gnuoctave', label: 'Optimization' },
  sgd: { slug: 'pytorch', label: 'SGD' },
  pagerank: { slug: 'google', label: 'PageRank' },

  // Tooling
  'claude code': { slug: 'anthropic', label: 'Claude Code' },
  claude: { slug: 'anthropic', label: 'Claude' },
  anthropic: { slug: 'anthropic', label: 'Anthropic' },
  typer: { slug: 'typer', label: 'Typer' },
  rich: { slug: 'rich', label: 'Rich' },
  mypy: { slug: 'python', label: 'MyPy' },
  junit: { slug: 'junit5', label: 'JUnit' },
  testing: { slug: 'pytest', label: 'Testing' },

  // Services
  stripe: { slug: 'stripe', label: 'Stripe' },
  substack: { slug: 'substack', label: 'Substack' },
  medium: { slug: 'medium', label: 'Medium' },
  github: { slug: 'github', label: 'GitHub' },
  x: { slug: 'x', label: 'X' },
  twitter: { slug: 'x', label: 'X' },
  linkedin: { slug: 'linkedin', label: 'LinkedIn' },
  arxiv: { slug: 'arxiv', label: 'arXiv' },
  spotify: { slug: 'spotify', label: 'Spotify' },
}

export const TAG_ICONS: Record<string, TagIcon> = RAW

export function tagIconSlug(name: string): string | undefined {
  return RAW[normalize(name)]?.slug
}

export function tagIconUrl(name: string, color = '9aa0a6'): string | undefined {
  const slug = tagIconSlug(name)
  if (!slug) return undefined
  return `https://cdn.simpleicons.org/${slug}/${color}`
}

export function tagIconLabel(name: string): string {
  return RAW[normalize(name)]?.label ?? name
}
