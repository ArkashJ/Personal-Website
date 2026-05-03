export type StackItem = {
  name: string
  why: string
  url?: string
}

export type StackGroup = {
  category: string
  items: StackItem[]
}

export const STACK: StackGroup[] = [
  {
    category: 'Hardware',
    items: [
      {
        name: 'MacBook Pro M3 Max',
        why: 'Daily driver. The fans never spin and the battery survives a full day of Claude Code sessions.',
      },
      {
        name: 'DGX cluster (Harvard)',
        why: 'Training rig for SpatialDINO and follow-on lab work. DDP across 8x H100 with NVLink + Infiniband.',
      },
      {
        name: 'Apple Studio Display',
        why: 'One big panel beats two smaller ones for long context windows and large diffs.',
      },
    ],
  },
  {
    category: 'Editor & terminal',
    items: [
      {
        name: 'Claude Code',
        why: 'Primary editor. Most of my code is now written in conversation, not in a buffer.',
        url: 'https://claude.com/claude-code',
      },
      {
        name: 'Cursor',
        why: 'When I want a UI for tab-completion or quick edits across a few files.',
        url: 'https://cursor.com',
      },
      {
        name: 'fish shell + RTK proxy',
        why: 'fish for ergonomics, RTK to cut 60-90% of token spend on routine dev operations.',
      },
      {
        name: 'tmux',
        why: 'Long-lived sessions across remote training boxes and local agent runs.',
      },
      {
        name: 'Excalidraw',
        why: 'The whiteboard for client discovery and architecture sketches. Nothing else has the same hand-drawn legibility.',
        url: 'https://excalidraw.com',
      },
    ],
  },
  {
    category: 'Languages',
    items: [
      {
        name: 'TypeScript (strict)',
        why: 'Default for anything web. Strict mode is non-negotiable.',
      },
      {
        name: 'Python',
        why: 'Research, ML, FastAPI services, glue scripts. Still the language of the field.',
      },
      {
        name: 'Go',
        why: 'Distributed systems work. Boring, predictable concurrency.',
      },
      {
        name: 'Rust',
        why: 'Performance-critical CLIs (RTK). The compiler pays back the friction.',
      },
      {
        name: 'Java',
        why: 'Apache Flink work. Not a love story, but the JVM is where the streaming runtime lives.',
      },
      {
        name: 'OCaml',
        why: 'School. Still the cleanest way to learn what types should feel like.',
      },
    ],
  },
  {
    category: 'Frameworks',
    items: [
      {
        name: 'Next.js 15 (App Router)',
        why: 'Server components by default, edge when it matters. This site runs on it.',
        url: 'https://nextjs.org',
      },
      { name: 'React 19', why: 'The default client runtime. Server Actions are finally usable.' },
      {
        name: 'Tailwind CSS',
        why: 'Design tokens in the markup. Faster than naming things.',
        url: 'https://tailwindcss.com',
      },
      {
        name: 'FastAPI',
        why: 'Async Python services with type-safe contracts. Default backend at Benmore.',
        url: 'https://fastapi.tiangolo.com',
      },
      {
        name: 'Django',
        why: 'When the client needs an admin and an ORM more than they need speed.',
      },
      {
        name: 'PyTorch + FSDP',
        why: 'Training stack for SpatialDINO and the 3D microscopy ViT pipeline.',
      },
      {
        name: 'Apache Flink',
        why: 'Streaming runtime for the BU thesis on dynamic checkpointing.',
      },
      {
        name: 'React Native (Expo)',
        why: 'Mobile for Cattle Logic. Offline-first ranches need a native shell.',
      },
    ],
  },
  {
    category: 'AI tooling',
    items: [
      {
        name: 'Claude Opus + Sonnet via Claude Code',
        why: 'Opus for hard reasoning, Sonnet for everything else. The split saves real money.',
      },
      {
        name: 'Compound Engineering skills',
        why: 'Authored the team skill library: planning, debugging, brainstorming, code review, frontend design.',
      },
      {
        name: 'RTK token proxy',
        why: 'My Rust CLI that intercepts Claude Code commands and rewrites them for token efficiency.',
      },
      { name: 'Cursor', why: 'Backup editor when I want a graphical diff and tab-complete.' },
      {
        name: 'OpenAI Codex CLI',
        why: 'For comparing model behavior on the same prompt. Useful as a second opinion.',
      },
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      {
        name: 'Vercel',
        why: 'Deploy, edge functions, OG images. Zero-config for the frontend stack.',
        url: 'https://vercel.com',
      },
      {
        name: 'Stripe',
        why: 'Payments for every Benmore engagement. Connect for marketplace flows.',
        url: 'https://stripe.com',
      },
      { name: 'Postgres + RDS', why: 'Default storage. Boring is a feature.' },
      { name: 'Kafka', why: 'Event streams between PCS microservices. The contract layer.' },
      { name: 'RocksDB', why: 'Embedded state for Flink and other streaming systems.' },
      { name: 'Sentry', why: 'Error monitoring across web and mobile.', url: 'https://sentry.io' },
      {
        name: 'Linear',
        why: 'The only issue tracker that respects keyboard users.',
        url: 'https://linear.app',
      },
    ],
  },
  {
    category: 'Services',
    items: [
      {
        name: 'GitHub',
        why: 'Source of truth for code and reviews.',
        url: 'https://github.com/ArkashJ',
      },
      { name: 'Vercel', why: 'Hosting for arkashj.com and most client frontends.' },
      { name: 'Stripe', why: 'Money in, money out.' },
      { name: 'Linear', why: 'Project management across Benmore engagements.' },
      { name: 'Substack', why: 'Long-form writing.', url: 'https://arkash.substack.com' },
      { name: 'Medium', why: 'Older essays still live here.', url: 'https://medium.com/@arkjain' },
      { name: 'Slack', why: 'Client comms. Pinned channels per engagement.' },
    ],
  },
]
