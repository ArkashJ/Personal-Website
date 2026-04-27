import Badge from './Badge'

// Two-tier icon resolution:
//   - 'simple' → https://cdn.simpleicons.org/<slug>             (preferred — flat brand mark)
//   - 'devicon' → https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<slug>/<slug>-<variant>.svg
// Slugs verified against the live CDNs. Many brands (Heroku, Slack, Twilio,
// AWS, Microsoft Office/Excel, Yeoman, OpenAI) were scrubbed from simple-icons
// over trademark policy — those fall through to devicon when available.

type IconSpec =
  | { provider: 'simple'; slug: string }
  | { provider: 'devicon'; slug: string; variant: string }

const ICON: Record<string, IconSpec> = {
  // Languages
  rust: { provider: 'simple', slug: 'rust' },
  python: { provider: 'simple', slug: 'python' },
  javascript: { provider: 'simple', slug: 'javascript' },
  typescript: { provider: 'simple', slug: 'typescript' },
  java: { provider: 'simple', slug: 'openjdk' },
  jvm: { provider: 'simple', slug: 'openjdk' },
  kotlin: { provider: 'simple', slug: 'kotlin' },
  swift: { provider: 'simple', slug: 'swift' },
  go: { provider: 'simple', slug: 'go' },
  golang: { provider: 'simple', slug: 'go' },
  ruby: { provider: 'simple', slug: 'ruby' },
  elixir: { provider: 'simple', slug: 'elixir' },

  // Rust ecosystem (no individual marks → use Rust)
  tokio: { provider: 'simple', slug: 'rust' },
  'async-trait': { provider: 'simple', slug: 'rust' },
  serde: { provider: 'simple', slug: 'rust' },
  sha2: { provider: 'simple', slug: 'rust' },

  // Frontend frameworks
  react: { provider: 'simple', slug: 'react' },
  'react native': { provider: 'simple', slug: 'react' },
  'next.js': { provider: 'simple', slug: 'nextdotjs' },
  nextjs: { provider: 'simple', slug: 'nextdotjs' },
  vue: { provider: 'simple', slug: 'vuedotjs' },
  svelte: { provider: 'simple', slug: 'svelte' },
  astro: { provider: 'simple', slug: 'astro' },
  nuxt: { provider: 'simple', slug: 'nuxt' },

  // Backend frameworks
  django: { provider: 'simple', slug: 'django' },
  fastapi: { provider: 'simple', slug: 'fastapi' },
  flask: { provider: 'simple', slug: 'flask' },
  express: { provider: 'simple', slug: 'express' },
  nestjs: { provider: 'simple', slug: 'nestjs' },
  laravel: { provider: 'simple', slug: 'laravel' },
  rails: { provider: 'simple', slug: 'rubyonrails' },
  'ruby on rails': { provider: 'simple', slug: 'rubyonrails' },
  strapi: { provider: 'simple', slug: 'strapi' },
  typer: { provider: 'simple', slug: 'python' },

  // Runtime / build
  'node.js': { provider: 'simple', slug: 'nodedotjs' },
  nodejs: { provider: 'simple', slug: 'nodedotjs' },
  bun: { provider: 'simple', slug: 'bun' },
  deno: { provider: 'simple', slug: 'deno' },
  npm: { provider: 'simple', slug: 'npm' },
  pnpm: { provider: 'simple', slug: 'pnpm' },
  vite: { provider: 'simple', slug: 'vite' },
  webpack: { provider: 'simple', slug: 'webpack' },

  // Testing
  jest: { provider: 'simple', slug: 'jest' },
  vitest: { provider: 'simple', slug: 'vitest' },
  cypress: { provider: 'simple', slug: 'cypress' },

  // CSS
  tailwindcss: { provider: 'simple', slug: 'tailwindcss' },
  tailwind: { provider: 'simple', slug: 'tailwindcss' },
  sass: { provider: 'simple', slug: 'sass' },
  postcss: { provider: 'simple', slug: 'postcss' },

  // Data / DB
  postgresql: { provider: 'simple', slug: 'postgresql' },
  postgres: { provider: 'simple', slug: 'postgresql' },
  mysql: { provider: 'simple', slug: 'mysql' },
  sqlite: { provider: 'simple', slug: 'sqlite' },
  redis: { provider: 'simple', slug: 'redis' },
  mongodb: { provider: 'simple', slug: 'mongodb' },
  supabase: { provider: 'simple', slug: 'supabase' },
  rocksdb: { provider: 'simple', slug: 'rocksdb' },

  // Streaming / messaging
  'nats jetstream': { provider: 'simple', slug: 'natsdotio' },
  nats: { provider: 'simple', slug: 'natsdotio' },
  'apache flink': { provider: 'simple', slug: 'apacheflink' },
  flink: { provider: 'simple', slug: 'apacheflink' },

  // ML
  pytorch: { provider: 'simple', slug: 'pytorch' },
  fsdp: { provider: 'simple', slug: 'pytorch' },
  tensorflow: { provider: 'simple', slug: 'tensorflow' },
  huggingface: { provider: 'simple', slug: 'huggingface' },
  numpy: { provider: 'simple', slug: 'numpy' },

  // GPU / hardware
  cuda: { provider: 'simple', slug: 'nvidia' },
  nvidia: { provider: 'simple', slug: 'nvidia' },
  dgx: { provider: 'simple', slug: 'nvidia' },
  infiniband: { provider: 'simple', slug: 'nvidia' },
  nccl: { provider: 'simple', slug: 'nvidia' },

  // Cloud / hosting (mostly devicon — simple-icons removed these)
  vercel: { provider: 'simple', slug: 'vercel' },
  heroku: { provider: 'devicon', slug: 'heroku', variant: 'original' },
  aws: { provider: 'devicon', slug: 'amazonwebservices', variant: 'original-wordmark' },
  'amazon web services': {
    provider: 'devicon',
    slug: 'amazonwebservices',
    variant: 'original-wordmark',
  },
  azure: { provider: 'devicon', slug: 'azure', variant: 'original' },
  'google cloud': { provider: 'simple', slug: 'googlecloud' },
  gcp: { provider: 'simple', slug: 'googlecloud' },
  cloudflare: { provider: 'simple', slug: 'cloudflare' },
  digitalocean: { provider: 'simple', slug: 'digitalocean' },
  netlify: { provider: 'simple', slug: 'netlify' },
  firebase: { provider: 'devicon', slug: 'firebase', variant: 'original' },

  // Payments / commerce
  stripe: { provider: 'simple', slug: 'stripe' },
  shopify: { provider: 'simple', slug: 'shopify' },

  // DevOps
  docker: { provider: 'simple', slug: 'docker' },
  kubernetes: { provider: 'simple', slug: 'kubernetes' },
  terraform: { provider: 'simple', slug: 'terraform' },
  ansible: { provider: 'simple', slug: 'ansible' },
  nginx: { provider: 'simple', slug: 'nginx' },
  github: { provider: 'simple', slug: 'github' },
  gitlab: { provider: 'simple', slug: 'gitlab' },
  'github actions': { provider: 'simple', slug: 'githubactions' },
  bitbucket: { provider: 'devicon', slug: 'bitbucket', variant: 'original' },

  // Observability
  sentry: { provider: 'simple', slug: 'sentry' },
  datadog: { provider: 'simple', slug: 'datadog' },
  newrelic: { provider: 'simple', slug: 'newrelic' },
  'new relic': { provider: 'simple', slug: 'newrelic' },
  grafana: { provider: 'simple', slug: 'grafana' },
  prometheus: { provider: 'simple', slug: 'prometheus' },

  // Communication / SaaS
  slack: { provider: 'devicon', slug: 'slack', variant: 'original' },
  twilio: { provider: 'devicon', slug: 'twilio', variant: 'original' },

  // Design / collab
  figma: { provider: 'simple', slug: 'figma' },
  framer: { provider: 'simple', slug: 'framer' },
  linear: { provider: 'simple', slug: 'linear' },
  notion: { provider: 'simple', slug: 'notion' },

  // Mobile
  flutter: { provider: 'simple', slug: 'flutter' },
  androidstudio: { provider: 'devicon', slug: 'androidstudio', variant: 'original' },
  'android studio': { provider: 'devicon', slug: 'androidstudio', variant: 'original' },
  xcode: { provider: 'devicon', slug: 'xcode', variant: 'original' },

  // API / spec
  swagger: { provider: 'simple', slug: 'swagger' },
  'swagger / openapi': { provider: 'simple', slug: 'swagger' },
  openapi: { provider: 'simple', slug: 'swagger' },
  graphql: { provider: 'simple', slug: 'graphql' },

  // Misc
  'claude code': { provider: 'simple', slug: 'anthropic' },
  anthropic: { provider: 'simple', slug: 'anthropic' },
  wordpress: { provider: 'simple', slug: 'wordpress' },
  salesforce: { provider: 'devicon', slug: 'salesforce', variant: 'original' },
}

const iconUrl = (label: string): string | null => {
  const spec = ICON[label.toLowerCase().trim()]
  if (!spec) return null
  if (spec.provider === 'simple') return `https://cdn.simpleicons.org/${spec.slug}`
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${spec.slug}/${spec.slug}-${spec.variant}.svg`
}

const TechBadge = ({ label }: { label: string }) => {
  const url = iconUrl(label)
  return (
    <Badge>
      <span className="inline-flex items-center gap-1.5">
        {url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            width={14}
            height={14}
            loading="lazy"
            className="opacity-90 select-none"
          />
        )}
        {label}
      </span>
    </Badge>
  )
}

export default TechBadge
