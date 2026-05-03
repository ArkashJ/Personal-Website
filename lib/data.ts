export type Paper = {
  title: string
  journal: string
  date: string
  authors?: string
  abstract?: string
  url?: string
  featured?: boolean
  doi?: string
  sameAs?: string[]
}

export type ExperienceEntry = {
  org: string
  role: string
  dates: string
  location?: string
  bullets: string[]
  story?: string
  stats?: { label: string; value: string }[]
  tech?: string[]
  links?: { label: string; href: string }[]
  featured?: boolean
}

export type Project = {
  name: string
  year: string
  description: string
  tech: string[]
  href?: string
  highlights?: string[]
  commands?: string[]
}

export type WorkTool = {
  name: string
  description: string
  tech: string[]
  href?: string
  highlights?: string[]
  commands?: string[]
  year?: string
}

export type TimelineEntry = {
  title: string
  category: string
  date: string
  status: 'Published' | 'Completed' | 'Current' | 'Live'
  description: string
  links?: { label: string; href: string }[]
  bullets?: string[]
  tech?: string[]
  slug?: string
  org?:
    | 'Boston University'
    | 'Harvard'
    | "Boston Children's Hospital"
    | 'NSF'
    | 'Benmore'
    | 'Battery Ventures'
    | 'ZeroSync'
  featured?: boolean
}

export type KnowledgeDomainMeta = {
  slug: string
  name: string
  description: string
}

export const PAPERS: Paper[] = [
  {
    title: 'SpatialDINO: Self-Supervised Learning for 3D Vision Transformers',
    journal: 'BioRxiv',
    date: '2025',
    authors: 'Arkash Jain et al. (Kirchhausen Lab, Harvard Medical School)',
    abstract:
      'A 3D self-supervised vision transformer for label-free segmentation and tracking of subcellular dynamics in lattice light-sheet microscopy (LLSM). Beat a prior approach co-led by Nobel laureate Eric Betzig on downstream subcellular structure prediction.',
    url: 'https://www.biorxiv.org/content/10.1101/2025.02.04.636474',
    featured: true,
    doi: '10.1101/2025.02.04.636474',
    sameAs: ['https://doi.org/10.1101/2025.02.04.636474'],
  },
  {
    title: 'Close-up of Vesicular ER Exit Sites by Volume Electron Imaging using FIB-SEM',
    journal: 'Journal of Cell Biology',
    date: '2026',
    authors: 'Kirchhausen Lab',
    abstract:
      'Volumetric reconstruction of mammalian ER exit sites at unprecedented resolution via FIB-SEM and learned segmentation.',
    url: 'https://rupress.org/jcb/article-abstract/225/1/e202504178/278432/Close-up-of-vesicular-ER-exit-sites-by-volume',
    doi: '10.1083/jcb.202504178',
    sameAs: ['https://doi.org/10.1083/jcb.202504178'],
  },
  {
    title:
      'Ultrafast 2DIR comparison of rotational energy transfer, isolated binary collision breakdown, and near critical fluctuations in Xe and SF6 solutions',
    journal: 'Journal of Chemical Physics',
    date: 'Nov 2022',
    authors: 'Arkash Jain et al.',
    abstract:
      'First-author work on supercritical-fluid dynamics using ultrafast two-dimensional infrared spectroscopy.',
    url: 'https://pubs.aip.org/aip/jcp/article-abstract/157/17/174305/2842177',
    doi: '10.1063/5.0118395',
    sameAs: ['https://doi.org/10.1063/5.0118395', 'https://pubmed.ncbi.nlm.nih.gov/36347695/'],
  },
]

export const EXPERIENCE: ExperienceEntry[] = [
  {
    org: 'Benmore Technologies',
    role: 'Head of FDE - Forward Deployed Strategist & Engineer',
    dates: 'Aug 2025 - Present',
    location: 'Remote',
    featured: true,
    story:
      'Joined as Employee #2 and became the technical spine of every client engagement. I built the Benmore Foundry CLI — an orchestration layer that turns a consulting engagement into a repeatable, AI-augmented delivery machine. Deployed across 15+ SMB clients, forward-engineering production systems in Stripe, Django, Next.js, FastAPI, and React Native. Revenue scaled 887% in under a year because the Foundry made every engineer 3–5× more effective per engagement.',
    stats: [
      { label: 'Revenue growth', value: '887%' },
      { label: 'Client engagements', value: '15+' },
      { label: 'Employee #', value: '2' },
    ],
    tech: ['Python', 'Django', 'Next.js', 'FastAPI', 'React Native', 'Stripe', 'Claude Code'],
    links: [{ label: 'benmore.tech', href: 'https://benmore.tech' }],
    bullets: [
      'Employee #2; scaled revenue 887% across 2025-2026.',
      'Forward-deployed lead engineer across the Benmore portfolio of SMB AI engagements.',
      'Built Benmore Foundry CLI for orchestrating SMB AI consulting engagements.',
      'Forward-deployed across Stripe, Django, Next.js, FastAPI, React Native, and Claude Code skill systems.',
    ],
  },
  {
    org: 'Harvard Medical School - Kirchhausen Lab',
    role: 'ML Researcher',
    dates: 'May 2024 - Aug 2025',
    location: 'Boston, MA',
    featured: true,
    story:
      'Joined the Kirchhausen Lab at Harvard Medical School to work on lattice light-sheet microscopy (LLSM) — 4D live-cell imaging of subcellular dynamics at ~3 nm. I authored SpatialDINO, a 3D self-supervised vision transformer for label-free segmentation and tracking of endosomes, viruses, and other sub-resolution organelles in LLSM volumes. Pre-trained on 2.4 TB / 180k volumes across 24 A100s; introduced KMeans content-aware 3D cropping, no-positional-encoding 3D ViTs (NoPE), a 3D adaptation of SINDER for singular-defect repair, and a streaming encoder with token-store + online softmax for full-volume inference. Contributed a Rendezvous backend fix to PyTorch (PR #144779) that unblocked multi-node training. The work produced three papers, two published in the Journal of Cell Biology.',
    stats: [
      { label: 'Papers', value: '3' },
      { label: 'Training infra', value: 'DGX A100' },
      { label: 'PyTorch PR', value: '#144779' },
    ],
    tech: ['PyTorch', 'DDP', 'DGX A100', 'LLSM', '3D ViT', 'MONAI', 'Triton', 'Python', 'CUDA'],
    links: [
      {
        label: 'SpatialDINO (BioRxiv)',
        href: 'https://www.biorxiv.org/content/10.1101/2025.02.04.636474',
      },
      {
        label: 'Kirchhausen Lab',
        href: 'https://kirchhausen.hms.harvard.edu/people/arkash-jain-ms-bs',
      },
      {
        label: 'SpatialDINO engineering log',
        href: '/knowledge/ai/spatialdino-lessons',
      },
    ],
    bullets: [
      'Authored SpatialDINO - 3D self-supervised vision transformer for label-free segmentation and tracking in lattice light-sheet microscopy.',
      'Pre-trained on 2.4 TB / 180k volumes on DGX A100 nodes with DDP, bf16, NVLink, InfiniBand; contributed Rendezvous backend fix to PyTorch (#144779).',
      'Co-authored two follow-on papers in Journal of Cell Biology.',
    ],
  },
  {
    org: 'ZeroSync',
    role: 'SWE Intern',
    dates: 'May 2023 - Aug 2023',
    location: 'Remote',
    bullets: ['Worked on Bitcoin STARK proof systems - recursive STARK aggregation tooling.'],
  },
  {
    org: "Boston Children's Hospital",
    role: 'SWE Intern',
    dates: 'Jan 2023 - May 2023',
    location: 'Boston, MA',
    bullets: ['Built ALS resource discovery tool used by clinicians and patients.'],
  },
  {
    org: 'Boston University',
    role: 'TA + Distributed Systems Researcher',
    dates: '2021 - 2024',
    location: 'Boston, MA',
    featured: true,
    story:
      'BU was the foundation. I arrived as a freshman from India, won one of five university-wide NSF UROP scholarships, and published my first first-author paper in chemical physics — all before my second year. I spent three years as a TA for systems and CS theory courses while pursuing a thesis on dynamic checkpointing for Apache Flink, building adaptive checkpoint cadence based on real-time backpressure signals. BU is where I learned that shipping real systems is different from studying them.',
    stats: [
      { label: 'NSF UROP', value: '1 of 5' },
      { label: 'First paper', value: 'Year 1' },
      { label: 'TA tenure', value: '3 years' },
    ],
    tech: ['Java', 'Apache Flink', 'RocksDB', 'Go', 'Python'],
    links: [{ label: 'BU CS Profile', href: 'https://www.bu.edu/cs/profiles/arkash-jain/' }],
    bullets: [
      'TA across systems and CS theory courses.',
      'Thesis: dynamic checkpointing for Apache Flink - adaptive checkpoint cadence based on backpressure signals.',
    ],
  },
  {
    org: 'Battery Ventures',
    role: 'Analyst - Diligence Extern',
    dates: 'May 2022 - Aug 2022',
    location: 'Boston, MA',
    bullets: ['Vertical-deep diligence on early-stage B2B SaaS investments.'],
  },
  {
    org: 'Battery Ventures',
    role: 'Analyst - Sourcing Extern',
    dates: 'Dec 2021 - Apr 2022',
    location: 'Boston, MA',
    bullets: ['Sourced early-stage B2B SaaS deals across multiple verticals.'],
  },
  {
    org: 'BU Chemistry / NSF UROP',
    role: 'Undergraduate Researcher',
    dates: 'Jan 2021 - Aug 2021',
    location: 'Boston, MA',
    bullets: [
      '1 of 5 UROP scholars selected university-wide as a freshman; led to first-author paper in chemical physics.',
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    name: 'Benmore-Meridian (bm CLI)',
    year: '2026',
    description:
      "Benmore Studio's Claude Code monorepo and the bm CLI that drives it. 77 production skills covering Django, FastAPI, Stripe, HIPAA/GDPR/SOC 2 compliance, mobile (Expo/React Native), SEO, deployment (Heroku/DigitalOcean/Vercel), and PCS microservices — all symlinked into ~/.claude/skills/ via one command so `git pull` is the only update step. Ships with `benmore_client`, a separate pip-installable typed async Python client for Benmore's project-management API (30+ endpoints, Pydantic v2 models, py.typed, 168 tests) whose 58 parallel HTTP calls drop end-to-end latency from ~30s to 3.7s via asyncio.gather. Adds 11 reusable prompt templates exportable as Claude Code /commands, git auto-sync hooks for skills and prompts, project-aware skill suggestions from static stack detection, post-session skill candidates surfaced from recent git history, a CLAUDE.md snippet generator, and a curated dev-toolkit installer (ripgrep, fzf, lazygit, bat, eza, zoxide, delta, gh). Every command supports --json so Claude agents can query the registry directly. Built with Typer + Rich, strict mypy (zero errors), ruff, 84+ tests, hatchling, uv. Used by every Benmore engineer; full FDE onboarding deck and presentation live in-repo.",
    tech: [
      'Python',
      'Typer',
      'Rich',
      'asyncio',
      'Pydantic',
      'httpx',
      'uv',
      'ruff',
      'mypy',
      'pytest',
      'Claude Code',
      'Markdown',
    ],
    href: 'https://github.com/Benmore-Studio/Benmore-Meridian',
    highlights: [
      'Symlink-first install — edit a skill once, every Claude session reflects it',
      'Project-skill lifecycle: scope to a project, generalize when proven universal',
      'Registry at ~/.bm/registry.json tracks every skill with source + install method',
      'Plugin detection for Superpowers and Double Shot Latte with install guides',
      '11 saved prompt templates exportable as Claude Code /commands ($1, $2, $ARGUMENTS)',
      'Git hooks auto-run bm install on pull/checkout when skills or prompts change',
      'Static stack detection → ranked skill suggestions and CLAUDE.md snippets',
      'Post-session debrief surfaces skill candidates from recent git history',
      'asyncio.gather parallelizes 58 Benmore API calls — 30s → 3.7s',
      '--json on every command for agent-native queries',
      'Strict mypy (zero errors), ruff clean, 84+ tests, dry-run on every destructive op',
    ],
    commands: [
      'bm install',
      'bm doctor',
      'bm status --json',
      'bm skill add <name> --project <p>',
      'bm skill generalize <name>',
      'bm suggest [path]',
      'bm context [path] --copy',
      'bm debrief --since <tag>',
      'bm prompt export --all',
      'bm hooks install',
      'bm benmore list',
      'bm tools install ripgrep fzf lazygit',
    ],
  },
  {
    name: 'SpatialDINO',
    year: '2025',
    description:
      'A 3D self-supervised vision transformer for label-free segmentation and tracking of subcellular dynamics in lattice light-sheet microscopy (LLSM). Adapts DINO-style student/teacher contrastive learning natively into 3D — student/teacher 3D ViTs trained over volumetric LLSM crops with 3D iBOT block masking. Pre-trained on 2.4 TB / 180k volumes across 24 NVIDIA A100s using PyTorch DDP, bf16 mixed precision, NVLink intra-node and InfiniBand inter-node. On downstream subcellular structure prediction it outperformed a prior approach co-led by Nobel laureate Eric Betzig. Released as a BioRxiv preprint, first-author; full engineering log at /knowledge/ai/spatialdino-lessons. The work also produced a Rendezvous backend fix to PyTorch (PR #144779) that unblocked multi-node training over InfiniBand.',
    tech: ['PyTorch', 'DDP', 'DGX A100', 'LLSM', '3D ViT', 'DINO', 'Triton', 'CUDA'],
    href: 'https://www.biorxiv.org/content/10.1101/2025.02.04.636474',
    highlights: [
      'Native 3D student/teacher ViT with 3D iBOT block masking — no 2D-stack hacks',
      'KMeans content-aware 3D cropping and a 3D adaptation of SINDER for singular-defect repair',
      'No-positional-encoding 3D ViTs (NoPE) — let attention learn structure from scratch',
      'Streaming encoder with token-store + online softmax for full-volume inference at million-token sequence lengths',
      'Pre-trained on 2.4 TB / 180k volumes across 24 A100s with DDP + bf16',
      'Beat the prior SOTA (Nobel-laureate-led) on downstream subcellular structure prediction',
      'Surfaced a PyTorch Rendezvous backend bug, filed and contributed PR #144779',
    ],
  },
  {
    name: 'Raft (Go)',
    year: '2023',
    description:
      'From-scratch Raft consensus implementation in Go for BU CS 350 (Distributed Systems). Implements the full state machine: leader election with randomized election timeouts, log replication with AppendEntries, persistence to stable storage, and snapshot install RPC for log compaction. Designed to pass the MIT 6.824 / BU 350 test harness covering elections, replication, persistence, snapshots, and unreliable-network conditions. Companion repo to a from-scratch MapReduce coordinator/worker also written in Go for the same course.',
    tech: ['Go', 'gRPC', 'Distributed Systems', 'Consensus'],
    href: 'https://github.com/ArkashJ/Raft',
    highlights: [
      'Leader election with randomized election timeouts — handles split votes cleanly',
      'AppendEntries-based log replication with prevLogIndex/prevLogTerm consistency check',
      'Persistent state (currentTerm, votedFor, log) survives crash + restart',
      'Snapshot install RPC for log compaction on long-running clusters',
      'Passes the unreliable-network test harness (drops, reorders, partitions)',
    ],
  },
  {
    name: 'CloudComputing - coursework + projects',
    year: '2023',
    description:
      'Cloud-systems coursework spanning MapReduce, distributed key-value stores, and graph-scale workloads. Includes a from-scratch MapReduce coordinator + worker with plugin-loaded map/reduce functions, distributed kv-store experiments, and a generated mini-internet used to benchmark PageRank locally vs. on Google Cloud. Repo serves as the working scratchpad for BU cloud / distributed-systems labs.',
    tech: ['Go', 'Spark', 'Hadoop', 'GCP', 'PageRank'],
    href: 'https://github.com/ArkashJ/CloudComputing',
    highlights: [
      'MapReduce coordinator + worker in Go with plugin-loaded map/reduce functions',
      'Distributed key-value store experiments (replication, leader assignment)',
      'Generated-HTML mini-internet for PageRank benchmarking',
      'PageRank evaluated locally vs. on GCP — same code, two scales',
    ],
  },
  {
    name: 'NEXMARK Benchmark',
    year: '2023',
    description:
      "Implementation of the NEXMARK streaming-systems benchmark suite against Apache Flink, used as the workload generator for my BU master's thesis on dynamic checkpointing. NEXMARK simulates an online auction: streams of person, auction, and bid events at configurable rates. Each query stresses a different streaming primitive — joins, aggregations, windowing, sessions — making it the standard rig for measuring tail latency, throughput, and checkpoint cost on bursty workloads. Wired into Flink with the RocksDB state backend so checkpoint behavior could be measured under realistic state sizes.",
    tech: ['Java', 'Apache Flink', 'RocksDB', 'Streaming'],
    href: 'https://github.com/ArkashJ/NEXMARK-Benchmark',
    highlights: [
      'Implements the standard NEXMARK queries (joins, aggregations, windows, sessions)',
      'Configurable event-rate driver for steady-state and burst workloads',
      'RocksDB state backend wired in for realistic state-size measurements',
      'Used as the workload generator for the dynamic-checkpointing thesis',
      'Captures throughput, tail latency, and checkpoint cost per query',
    ],
  },
  {
    name: 'Implicit SGD',
    year: '2024',
    description:
      'NumPy implementation and empirical study of implicit stochastic gradient descent (Toulis et al.) alongside standard explicit SGD baselines. Implicit SGD evaluates the gradient at the next iterate rather than the current one, which dramatically improves stability on ill-conditioned problems where explicit SGD diverges or oscillates with even modest step sizes. The repo runs a controlled comparison on synthetic regression problems with adjustable condition numbers and noise levels. Companion to BU DS 522 coursework on optimization (Adam / AMSGrad / RMSProp comparison and article evaluations of Reddi 2018 and Toulis 2016).',
    tech: ['Python', 'NumPy', 'Optimization', 'SGD'],
    href: 'https://github.com/ArkashJ/implict-SGD-implementation',
    highlights: [
      'NumPy implementation of implicit SGD alongside explicit SGD baselines',
      'Synthetic regression rig with adjustable condition number and noise',
      'Empirical demonstration of stability gains on ill-conditioned problems',
      'Tied to a written evaluation of Toulis 2016 and Reddi 2018 (AMSGrad)',
    ],
  },
  {
    name: 'CS411 Software Engineering Labs',
    year: '2023',
    description:
      'TA materials and reference solutions for BU CS 411 (undergraduate Software Engineering). Covers the standard SE curriculum: build systems, version control workflows, testing strategies, and small-team collaboration patterns. Reference solutions are in Java with JUnit tests so students can self-check; lab handouts walk through incremental refactors, code review, and CI-style automation.',
    tech: ['Java', 'JUnit', 'Testing'],
    href: 'https://github.com/ArkashJ/CS411_labs',
    highlights: [
      'Reference solutions in Java with JUnit coverage',
      'Lab handouts on build systems, VCS workflows, and code review',
      'Incremental-refactor exercises mirroring real-world maintenance work',
      'Used by undergraduates across multiple semesters',
    ],
  },
  {
    name: 'Benmore Foundry CLI',
    year: '2025',
    description:
      "Internal orchestration layer for Benmore's SMB AI consulting engagements. Kicks off scoped Claude Code agents per engagement, books and tracks scoped work, manages handoffs between FDEs, and standardizes the engagement lifecycle from scope → build → ship → debrief. Built on Typer + Rich with strict mypy and a registry that tracks every agent, skill, and engagement. Designed so that any FDE on the team can pick up any engagement and continue without context loss.",
    tech: ['Python', 'Typer', 'Rich', 'Claude Code', 'mypy'],
    highlights: [
      'Per-engagement scoped agent orchestration on top of Claude Code',
      'Registry of skills, prompts, and active engagements with --json on every command',
      'Lifecycle commands: scope, kickoff, ship, debrief',
      'Strict typing (mypy zero errors), Rich-formatted CLI output',
      'Handoff packets so any FDE can pick up any engagement',
    ],
    commands: [
      'foundry kickoff <client>',
      'foundry status --json',
      'foundry ship <engagement>',
      'foundry debrief --since <tag>',
    ],
  },
  {
    name: 'Dynamic Checkpointing in Apache Flink',
    year: '2024',
    description:
      "BU master's thesis. Static checkpoint intervals are a tax during idle periods and a stall during bursts. I built an adaptive controller that surfaces per-operator backpressure ratios from the Flink JobManager and uses them as a control signal: shorten cadence when load is low, lengthen under sustained backpressure to avoid amplifying stalls. Validated on the NEXMARK streaming benchmark with the RocksDB state backend; quantified write-amplification tradeoffs vs. in-memory state. Measured tail-latency wins on bursty workloads.",
    tech: ['Java', 'Apache Flink', 'RocksDB', 'NEXMARK', 'JVM'],
    highlights: [
      'Instrumented JobManager to surface per-operator backpressure ratios',
      'Adaptive checkpoint cadence — short under low load, long under burst',
      'RocksDB state backend benchmarked vs. in-memory; write-amplification quantified',
      'Validated on NEXMARK queries with bursty event rates',
      'Tail-latency wins on bursty workloads vs. fixed-interval baseline',
    ],
  },
  {
    name: 'OCaml Interpreter',
    year: '2022',
    description:
      'Tree-walking interpreter for a typed functional language, built from scratch for BU CS 320 (Programming Languages). Hand-written lexer, hand-written recursive-descent parser over the BNF grammar, and a stack-machine evaluator. No parser-generator — every token, every production, every reduction was written by hand. The exercise made the relationship between grammar, AST, and runtime semantics legible in a way that working with off-the-shelf parsers never quite does.',
    tech: ['OCaml', 'Compilers', 'Interpreters'],
    highlights: [
      'Hand-written lexer over the source grammar',
      'Hand-written recursive-descent parser over BNF — no parser-generator',
      'Stack-machine evaluator for the parsed AST',
      'Type checker for the typed core language',
    ],
    commands: ['dune build', 'dune exec interpreter <source.ml>', 'dune runtest'],
  },
  {
    name: 'Spotify to YouTube Transfer',
    year: '2022',
    description:
      "Migrate playlists between Spotify and YouTube Music via API matching. Authenticates against both platforms with OAuth, fetches the source playlist, and runs each track through a fuzzy title/artist match against the destination's search API. Edge cases handled: featuring credits, remixes, regional availability, and tracks that simply don't exist on the other side. A weekend project that turned into a working tool for actually moving years of curated playlists across services.",
    tech: ['Python', 'OAuth', 'Spotify API', 'YouTube API'],
    highlights: [
      'OAuth flows against both Spotify and YouTube Music',
      'Fuzzy title/artist matching with feature-credit and remix handling',
      'Reports unmatched tracks so the user can fix them by hand',
      'Idempotent — re-running on the same playlist is a no-op',
    ],
  },
  {
    name: 'STU STREET Podcast',
    year: '2022',
    description:
      'Co-hosted long-form interview podcast on WTBU (Boston University radio). Conversations with founders, professional athletes, and university professors about their work and craft. Covered the full production loop — booking, prep, recording, editing, distribution to Apple Podcasts and Spotify. Several episodes are linked from /media. The show ran across the 2022 academic year.',
    tech: ['Audio', 'Production', 'Interviewing'],
    href: 'https://podcasts.apple.com/us/podcast/stu-street/id1635472305',
    highlights: [
      'Long-form interviews with founders, athletes, and professors',
      'Full ownership of booking, prep, recording, editing, and distribution',
      'Distributed on Apple Podcasts and Spotify',
      'Hosted under the WTBU (Boston University radio) umbrella',
    ],
  },
  {
    name: 'ALS Resource Tool',
    year: '2023',
    description:
      "Internal ALS resource-discovery web app for clinicians and patient families, built at Boston Children's Hospital. The whole product was scoped to Section 508 / WCAG 2.1 AA — accessibility was the bar, not an afterthought. React frontend wired to a Strapi headless CMS so non-technical staff could update content without a deploy. Swagger-documented REST API for self-service contributor onboarding. Search and filter UX validated with real ALS clinicians; iterated on care-workflow ergonomics across the engagement.",
    tech: [
      'React',
      'Strapi',
      'Swagger / OpenAPI',
      'Node.js',
      'PostgreSQL',
      'WCAG 2.1',
      'Section 508',
    ],
    highlights: [
      'Section 508 / WCAG 2.1 AA: keyboard nav, ARIA landmarks, focus rings, contrast, skip links',
      'Strapi headless CMS so clinicians can update content without a deploy',
      'Swagger-documented REST API for contributor onboarding',
      'Search + filter UX validated directly with ALS clinicians',
      'Screen-reader tested across primary care-workflow paths',
    ],
  },
]

export const WORK_TOOLS: WorkTool[] = [
  {
    name: 'Benmore Foundry CLI',
    year: '2025',
    description:
      'Internal orchestration layer for SMB AI consulting engagements at Benmore. Kicks off scoped Claude Code agents per engagement, books and tracks scoped work, and manages handoffs between FDEs. Standardizes the engagement lifecycle from scope → build → ship → debrief so any FDE on the team can pick up any engagement without context loss. Built on Typer + Rich with strict mypy and a registry that tracks every active engagement.',
    tech: ['Python', 'Typer', 'Rich', 'Claude Code', 'mypy'],
    highlights: [
      'Per-engagement scoped agent orchestration on top of Claude Code',
      'Lifecycle commands: scope, kickoff, ship, debrief',
      '--json on every command for agent-native queries',
      'Strict typing (mypy zero errors), Rich-formatted CLI output',
      'Handoff packets so any FDE can resume any engagement',
    ],
    commands: [
      'foundry kickoff <client>',
      'foundry status --json',
      'foundry ship <engagement>',
      'foundry debrief --since <tag>',
    ],
  },
  {
    name: 'RTK - Rust Token Killer',
    year: '2026',
    description:
      "Token-optimized CLI proxy for Claude Code. Intercepts common dev commands via Claude Code hooks and rewrites their output before it hits the model context — 60-90% token savings on routine dev operations like git, ls, find, and grep without changing the developer's muscle memory. Written in Rust for fast startup; ships analytics so you can see exactly how many tokens (and dollars) you saved per session.",
    tech: ['Rust', 'Claude Code Hooks', 'CLI'],
    highlights: [
      'Transparent rewrite via Claude Code hooks — zero workflow change',
      '60-90% token savings on git, ls, find, grep, and other read-only commands',
      'Built-in analytics: rtk gain shows savings per session and historically',
      'Discovery mode mines Claude Code history for missed-savings opportunities',
      'Fast startup — Rust binary, no runtime',
    ],
    commands: [
      'rtk --version',
      'rtk gain',
      'rtk gain --history',
      'rtk discover',
      'rtk proxy <cmd>',
    ],
  },
  {
    name: 'Compound Engineering Skills',
    year: '2026',
    description:
      '71+ Claude Code skills authored for forward-deployed engineering — production-ready playbooks for Django, FastAPI, Stripe, HIPAA/GDPR/SOC 2 compliance, mobile (Expo/React Native), SEO, and deployment (Heroku/DigitalOcean/Vercel). Symlinked into ~/.claude/skills/ via one command so every Claude session reflects the latest versions; git pull is the only update step. Public on GitHub, copy-ready on /skills.',
    tech: ['Markdown', 'Claude Code Skills', 'Python'],
    href: 'https://github.com/Benmore-Studio/Benmore-Meridian',
    highlights: [
      '71+ skills covering Django, FastAPI, Stripe, mobile, SEO, deployment, compliance',
      'Symlink-first install — edit a skill once, every session reflects it',
      'Git hooks auto-run install on pull/checkout when skills change',
      'Project-aware skill suggestions from static stack detection',
      'Public on GitHub, surfaced on /skills',
    ],
    commands: [
      'bm install',
      'bm skill add <name>',
      'bm suggest [path]',
      'bm context [path] --copy',
    ],
  },
  {
    name: 'Excalidraw Discovery Flows',
    year: '2025',
    description:
      'Reusable client-discovery diagram set used during scoping engagements at Benmore. Pre-built Excalidraw templates for the recurring shapes of an SMB AI engagement: as-is workflow capture, gap analysis, system context, integration map, sequence diagrams for the proposed end-state, and a one-page summary slide. Cuts the prep time on a discovery call from a blank canvas to a structured walk-through.',
    tech: ['Excalidraw', 'Process', 'Discovery'],
    highlights: [
      'Templates for as-is workflows, gap analysis, system context, integration maps',
      'Sequence diagrams for proposed end-state architectures',
      'One-page summary slide template for handoff to client stakeholders',
      'Used across 15+ Benmore client engagements',
    ],
  },
]

export const TIMELINE: TimelineEntry[] = [
  {
    title: 'Wanted to be a physicist - prepped for JEE Advanced',
    featured: true,
    category: 'Life',
    date: '2018-2019',
    status: 'Completed',
    description:
      'Two years of E&M, particle physics, organic and physical chemistry, and optics - the standard JEE Advanced gauntlet for kids who wanted to do physics in India. Also sat AP Calculus, AP Physics C: Mechanics, and AP Physics C: E&M.',
  },
  {
    title: 'JEE Advanced - All-India rank ~8,000',
    category: 'Milestone',
    date: '2019',
    status: 'Completed',
    description: 'Sat the exam alongside ~1M candidates across India - top-percentile result.',
  },
  {
    title: 'College acceptances - UCL, NTU Singapore, BU, NYU, Dartmouth',
    category: 'Education',
    date: '2020',
    status: 'Completed',
    description:
      'Accepted to University College London, Nanyang Technological University, Boston University, NYU, and Dartmouth. Picked BU for its physics program and proximity to MIT/Harvard labs.',
  },
  {
    title: 'Arrived in the US from India',
    featured: true,
    category: 'Life',
    date: 'Sep 2020',
    status: 'Completed',
    description: 'Left Chandigarh for Boston University as an undergraduate.',
  },
  {
    slug: 'ziegler-lab-2dir',
    bullets: [
      'Aligned and maintained a femtosecond ultrafast laser system for 2D infrared spectroscopy.',
      'Prepared supercritical Xe and SF6 fluid samples for near-critical density studies.',
      'Wrote auto-correlation analysis code for rotational and vibrational energy relaxation traces.',
      'Co-authored the J. Chem. Phys. + ACS papers on N2O dynamics in supercritical solvents.',
    ],
    tech: ['Python', 'NumPy', 'Ultrafast Optics', '2DIR Spectroscopy', 'Supercritical Fluids'],
    title: 'Joined Ziegler Lab - ultrafast 2DIR research with Matt Rotondaro',
    org: 'Boston University',
    category: 'Research',
    date: '2020-2022',
    status: 'Completed',
    description:
      "Freshman year I joined Larry Ziegler's ultrafast spectroscopy lab under PhD student Matt Rotondaro. Aligned femtosecond lasers, prepared supercritical Xe and SF6 fluids, and wrote auto-correlation analysis code. Matt's thesis was on energy transfer in supercritical fluids - N2O rotational/vibrational relaxation, isolated binary collision breakdown, and near-critical density fluctuations. Working in the lab is what made me realize I liked the math and the code more than the optics bench.",
    links: [
      {
        label: 'PubMed - 2DIR Xe/SF6 (J. Chem. Phys. 2022)',
        href: 'https://pubmed.ncbi.nlm.nih.gov/36347695/',
      },
      {
        label: 'AIP - Ultrafast 2DIR full paper',
        href: 'https://pubs.aip.org/aip/jcp/article-abstract/157/17/174305/2842177/Ultrafast-2DIR-comparison-of-rotational-energy?redirectedFrom=fulltext',
      },
      {
        label: 'ACS - J. Phys. Chem. Lett.',
        href: 'https://pubs.acs.org/doi/10.1021/acs.jpclett.2c03331',
      },
      {
        label: 'Matt Rotondaro (LinkedIn)',
        href: 'https://www.linkedin.com/in/matthew-rotondaro-274176a0/',
      },
    ],
  },
  {
    title: 'UROP Scholar - 1 of 5 freshmen selected university-wide',
    featured: true,
    org: 'NSF',
    category: 'Award',
    date: '2021',
    status: 'Completed',
    description:
      '"Ultrafast Two Dimensional Infrared Spectroscopy of Supercritical Fluids: Energy Relaxation and Local Critical Slowing Effects." NSF-funded UROP under Lawrence Ziegler (CAS Chemistry).',
    links: [
      { label: 'BU CS profile', href: 'https://www.bu.edu/cs/profiles/arkash-jain/' },
      {
        label: 'UROP Symposium 2021 brochure (PDF)',
        href: 'https://www.bu.edu/urop/files/2021/10/UROP-Symposium-2021-Brochure-v5.pdf',
      },
      {
        label: 'UROP 2020-2021 awarded students',
        href: 'https://www.bu.edu/urop/achievements/award-recipients/2020-2021-awarded-students/',
      },
    ],
  },
  {
    title: 'TA for 300-level Mechanics + 20-hour work week',
    org: 'Boston University',
    category: 'Education',
    date: 'Fall 2021',
    status: 'Completed',
    description:
      "Sophomore fall: TA'd a 300-level Mechanics course. The following spring: kept a 20-hour work week while carrying an 18-credit load.",
    slug: 'ta-mechanics',
  },
  {
    title: 'Battery Ventures - Sourcing Intern',
    featured: true,
    org: 'Battery Ventures',
    category: 'VC',
    date: 'Dec 2021',
    status: 'Completed',
    description:
      'Battery taught me VC end-to-end. Worked under Dallin Bills sourcing early-stage B2B software - learned the difference between vertical and horizontal SaaS, fintech investment theses (payments, infra, embedded, neobanks), and how Battery sized markets across verticals. Got fluent in the financial bar: Rule of 40, ARR growth vs. burn multiples, gross retention vs. logo churn vs. net dollar retention, magic number, and CAC payback. Sourced 3 deals to partner-meeting stage, including CarNow.',
    links: [
      { label: 'Battery Ventures', href: 'https://www.battery.com/' },
      { label: 'CarNow (Battery portfolio)', href: 'https://www.battery.com/company/carnow/' },
      { label: 'Michael Brown - GP', href: 'https://www.battery.com/people/michael-brown/' },
      { label: 'Dallin Bills (LinkedIn)', href: 'https://www.linkedin.com/in/dallinbills/' },
    ],
  },
  {
    title: 'Chose Battery over MassMutual & State Street VC offers',
    category: 'VC',
    date: 'Feb 2022',
    status: 'Completed',
    description:
      'Got a VC offer from MassMutual Ventures (Feb 2022) and a Summer 2022 VC internship offer from State Street. Turned both down to stay at Battery - the bar, the deal flow, and the people were the right place to keep learning.',
  },
  {
    title: 'Battery Ventures - Diligence Intern',
    org: 'Battery Ventures',
    category: 'VC',
    date: 'Summer 2022',
    status: 'Completed',
    description:
      'Returned for a second summer doing deep diligence - embedded with a portfolio company on its EU expansion strategy. Pricing, GTM motion, regulatory fit, and competitive landscape across the European market.',
  },
  {
    title: 'Accepted into BU BA/MS CS - accelerated 4-year dual-degree',
    category: 'Education',
    date: '2022',
    status: 'Completed',
    description:
      "Admitted to BU's accelerated Bachelor's + Master's in Computer Science - finishes both degrees in four years instead of six.",
  },
  {
    title: 'First Paper: Supercritical Fluids in Chemical Physics',
    featured: true,
    category: 'Publication',
    date: 'Nov 2022',
    status: 'Published',
    description:
      'Co-authored ultrafast 2DIR study of N2O rotational and vibrational energy relaxation in supercritical Xe and SF6 - IBC breakdown and critical slowing near the critical point.',
    links: [
      {
        label: 'J. Chem. Phys. 157, 174305 (2022)',
        href: 'https://pubs.aip.org/aip/jcp/article-abstract/157/17/174305/2842177/Ultrafast-2DIR-comparison-of-rotational-energy?redirectedFrom=fulltext',
      },
      { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/36347695/' },
      {
        label: 'J. Phys. Chem. Lett. (ACS)',
        href: 'https://pubs.acs.org/doi/10.1021/acs.jpclett.2c03331',
      },
    ],
  },
  {
    title: 'Spring 2023 — BU coursework: CS 350 (Raft) & CS 611 (OOP)',
    featured: true,
    org: 'Boston University',
    category: 'Education',
    date: 'Spring 2023',
    status: 'Completed',
    description:
      'Distributed Systems (CS 350) — Raft consensus from scratch in Go, plus a MapReduce coordinator/worker. OOP & Design Patterns (CS 611) — Monsters & Heroes turn-based RPG plus a final Java Swing trading platform.',
    bullets: [
      'CS 350: full Raft state machine with leader election, log replication, and snapshot install RPC.',
      'CS 350: MapReduce coordinator + worker with plugin-loaded map/reduce functions.',
      'CS 611: Monsters & Heroes — battle, market, inventory, 2D grid world.',
      'CS 611: group capstone trading platform with Java Swing GUI and singleton persistence.',
    ],
    tech: ['Go', 'Raft', 'Java', 'OOP', 'Design Patterns'],
    links: [
      { label: 'CS 350 deep dive', href: '/coursework/cs350-raft' },
      { label: 'CS 611 Monsters & Heroes', href: '/coursework/cs611-monsters-and-heroes' },
      { label: 'CS 611 Trading System', href: '/coursework/cs611-trading-system' },
      { label: 'All coursework', href: '/coursework' },
    ],
    slug: 'coursework-spring-2023',
  },
  {
    title: "Boston Children's Hospital - Software Engineering Intern",
    org: "Boston Children's Hospital",
    category: 'Engineering',
    date: 'Spring 2023',
    status: 'Completed',
    description:
      'Built an internal ALS resource-discovery web app for clinicians and patient families. The whole product was scoped to Section 508 / WCAG 2.1 AA — accessibility was the bar, not an afterthought.',
    bullets: [
      'React frontend wired to a Strapi headless CMS so non-technical staff could update content without a deploy.',
      'Swagger-documented REST API for self-service contributor onboarding.',
      'Section 508 / WCAG 2.1 AA compliance: keyboard-only nav, ARIA landmarks, focus-visible rings, sufficient contrast, skip links, screen-reader tested.',
      'Validated search and filter UX with real ALS clinicians; iterated on care-workflow ergonomics.',
    ],
    tech: [
      'React',
      'Strapi',
      'Swagger / OpenAPI',
      'Node.js',
      'PostgreSQL',
      'WCAG 2.1',
      'Section 508',
    ],
    slug: 'bch-als-tool',
  },
  {
    title: 'ZeroSync - Rust Engineering Intern',
    featured: true,
    org: 'ZeroSync',
    category: 'Engineering',
    date: 'Summer 2023',
    status: 'Completed',
    description:
      'My first production-grade Rust. Built an Excel-side marketplace + a server-side ingestion pipeline that converted unstructured data (CSVs, JSON dumps, free-form Excel) into structured records flowing through NATS JetStreams. Spent the first two weeks deep in The Rust Book — the borrow checker forces you to internalize ownership, lifetimes, and Send/Sync before you can ship anything async.',
    bullets: [
      'tokio + async-trait for concurrent I/O across hundreds of NATS subjects.',
      'NATS JetStream for at-least-once delivery, persistent streams, and replay.',
      'Merkle-tree POC (SHA-256 + canonical JSON hashing + sorted pairwise concat) for tamper-evident sync of records across the pipeline.',
      'Excel side: JavaScript Office Add-in scaffolded with Yeoman (`yo generator-office`).',
      'Generated TLS dev certificates with `office-addin-dev-certs`, trusted them in macOS Keychain, wired their paths into `nats.conf` so the add-in published over TLS.',
      "Borrow checker lessons: `&str` vs `String`, ownership over defensive `.clone()`, Send + 'static for futures.",
    ],
    tech: [
      'Rust',
      'tokio',
      'async-trait',
      'serde',
      'sha2',
      'NATS JetStream',
      'Yeoman',
      'JavaScript',
      'Office Add-ins',
    ],
    links: [
      { label: 'merkle_tree (Rust POC)', href: 'https://github.com/ArkashJ/merkle_tree' },
      {
        label: 'Merkle tree write-up',
        href: '/knowledge/distributed-systems/merkle-tree-rust-poc',
      },
      {
        label: 'excel_connector (Yeoman + NATS)',
        href: 'https://github.com/ArkashJ/excel_connector',
      },
      { label: 'The Rust Book', href: 'https://doc.rust-lang.org/book/' },
    ],
    slug: 'zerosync-rust',
  },
  {
    title: 'Fall 2023 — BU coursework: CS 320, DS 522, CS 561, CS 630, MA 582, HI 151',
    featured: true,
    org: 'Boston University',
    category: 'Education',
    date: 'Fall 2023',
    status: 'Completed',
    description:
      'Six classes spanning programming-language theory (CS 320 — OCaml interpreter from scratch), optimization (DS 522 — SGD variants & implicit SGD), cloud (CS 561 — PageRank on a synthetic mini-internet), graduate algorithms (CS 630 — Gale-Shapley average-case analysis over 331,776 instances, reservoir sampling), mathematical statistics (MA 582), and a liberal-arts elective (HI 151).',
    bullets: [
      'CS 320: hand-written lexer, parser, and stack-machine evaluator for a BNF language in OCaml.',
      'DS 522: Adam / AMSGrad / RMSProp comparison, plus article evaluations of Reddi 2018 and Toulis 2016.',
      'CS 561: built a generated-HTML mini-internet and ran PageRank locally vs. on GCP.',
      'CS 630: 331,776-instance enumeration of Gale-Shapley to study average-case behavior.',
      'MA 582: rigorous graduate inference — MLE, sufficient statistics, MGF, asymptotics.',
    ],
    tech: ['OCaml', 'Python', 'R', 'GCP', 'Optimization', 'Statistics'],
    links: [
      { label: 'CS 320 OCaml interpreter', href: '/coursework/cs320-ocaml' },
      { label: 'DS 522 SGD variants', href: '/coursework/ds522-sgd-variants' },
      { label: 'CS 561 PageRank', href: '/coursework/cs561-pagerank' },
      { label: 'CS 630 Gale-Shapley', href: '/coursework/cs630-gale-shapley' },
      {
        label: 'MA 582 Mathematical Statistics',
        href: '/coursework/ma582-mathematical-statistics',
      },
      { label: 'All coursework', href: '/coursework' },
    ],
    slug: 'coursework-fall-2023',
  },
  {
    title: 'Distributed Systems Research at BU',
    featured: true,
    org: 'Boston University',
    category: 'Research',
    date: '2023',
    status: 'Completed',
    description:
      "BU Master's thesis: dynamic checkpointing for Apache Flink. Static checkpoint intervals are a tax in idle periods and a stall during bursts; I built a controller that adapted cadence from live backpressure signals.",
    bullets: [
      'Instrumented Flink JobManager to surface per-operator backpressure ratios as a control signal.',
      'Adaptive checkpoint cadence: shorten when load is low, lengthen under sustained backpressure to avoid amplifying stalls.',
      'RocksDB state backend benchmarked against in-memory; quantified write-amplification tradeoffs.',
      'Validated on the NEXMARK streaming benchmark — measured tail-latency wins on bursty workloads.',
    ],
    tech: ['Java', 'Apache Flink', 'RocksDB', 'NEXMARK', 'JVM'],
    slug: 'flink-dynamic-checkpointing',
  },
  {
    title: 'Marvin Freedman Scholar - 1 of 6 in Math department',
    org: 'Boston University',
    category: 'Award',
    date: '2024',
    status: 'Completed',
    description: 'Top mathematics undergraduate award at BU.',
  },
  {
    title: 'BA/MS Boston University - Magna Cum Laude',
    featured: true,
    org: 'Boston University',
    category: 'Education',
    date: 'May 2024',
    status: 'Completed',
    description: 'BA in Math & CS, MS in CS, completed in four years.',
    links: [
      {
        label: 'BA degree (PDF)',
        href: '/images/files/arkash-jain-bachelor-of-arts-mathematics-cs.pdf',
      },
      {
        label: 'MS degree (PDF)',
        href: '/images/files/arkash-jain-master-of-science-computer-science.pdf',
      },
      {
        label: 'Graduation post (LinkedIn)',
        href: 'https://www.linkedin.com/posts/arkashj_a-huge-chapter-of-my-life-came-to-an-end-ugcPost-7198500677231198208-pDtI',
      },
    ],
  },
  {
    title: 'Joined Harvard Kirchhausen Lab',
    featured: true,
    org: 'Harvard',
    category: 'Research',
    date: 'May 2024',
    status: 'Completed',
    description:
      'ML researcher at Harvard Medical School applying 3D vision transformers to lattice light-sheet microscopy. The lab images live-cell subcellular dynamics at ~3 nm; my job was to make the resulting 4D volumes interpretable at scale.',
    bullets: [
      'Trained on multi-node DGX clusters: A100 / H100, NVLink intra-node, Infiniband inter-node, RAID + NVMe storage tier.',
      'PyTorch DDP with bf16 mixed precision and activation checkpointing to fit large 3D ViTs.',
      'Diagnosed a Rendezvous (RDZV) backend issue affecting Infiniband multi-node training — filed PyTorch issue #144779.',
    ],
    tech: ['PyTorch', 'DDP', 'CUDA', 'Infiniband', 'NCCL', 'DGX', 'LLSM', '3D ViT'],
    links: [
      { label: 'View research ->', href: '/research' },
      { label: 'PyTorch #144779', href: 'https://github.com/pytorch/pytorch/issues/144779' },
      {
        label: 'Kirchhausen Lab profile',
        href: 'https://kirchhausen.hms.harvard.edu/people/arkash-jain-ms-bs',
      },
      { label: 'Harvard ID (PDF)', href: '/images/files/arkash-jain-harvard-university-id.pdf' },
    ],
    slug: 'harvard-kirchhausen',
  },
  {
    title: 'SpatialDINO - 3D self-supervised vision transformer for LLSM',
    featured: true,
    org: 'Harvard',
    category: 'Research',
    date: '2025',
    status: 'Completed',
    description:
      'Designed and trained a 3D self-supervised vision transformer for label-free segmentation and tracking of subcellular dynamics in lattice light-sheet microscopy — pre-trained on 2.4 TB / 180k volumes across 24 A100s. Beat a prior approach co-led by Nobel laureate Eric Betzig on downstream evaluation.',
    bullets: [
      'Adapted DINO-style self-supervised contrastive learning into 3D — student/teacher ViTs over LLSM volumes with native 3D iBOT block masking.',
      'Introduced KMeans content-aware 3D cropping, no-positional-encoding 3D ViTs (NoPE), and a 3D adaptation of SINDER for singular-defect repair.',
      'Built a streaming encoder with token-store + online softmax for full-volume inference at million-token sequence lengths.',
      'Beat the prior SOTA — including the Nobel-laureate-led approach — on downstream subcellular structure prediction.',
      'Released as a BioRxiv preprint, first-author; engineering log at /knowledge/ai/spatialdino-lessons.',
    ],
    tech: ['PyTorch', 'DINO', '3D ViT', 'Self-Supervised Learning', 'LLSM', 'DDP', 'Triton'],
    links: [
      {
        label: 'BioArxiv preprint',
        href: 'https://www.biorxiv.org/content/10.1101/2025.02.04.636474',
      },
      { label: 'SpatialDINO lessons ->', href: '/knowledge/ai/spatialdino-lessons' },
      { label: 'View papers ->', href: '/research' },
    ],
    slug: 'spatialdino',
  },
  {
    title: 'SpatialDINO - BioArxiv',
    org: 'Harvard',
    category: 'Publication',
    date: '2025',
    status: 'Published',
    description: 'Preprint released on BioArxiv, first-author.',
    links: [
      {
        label: 'BioArxiv preprint',
        href: 'https://www.biorxiv.org/content/10.1101/2025.02.04.636474',
      },
      { label: 'All papers ->', href: '/research' },
    ],
  },
  {
    title: 'Journal of Cell Biology - 2 papers',
    org: 'Harvard',
    category: 'Publication',
    date: 'Aug 2025',
    status: 'Published',
    description: 'Cryo-ET architecture of ER exit sites; UNET for semi-supervised segmentation.',
    links: [{ label: 'All papers ->', href: '/research' }],
  },
  {
    title: 'Joined Benmore Technologies - Employee #2',
    featured: true,
    org: 'Benmore',
    category: 'Work',
    date: 'Aug 2025',
    status: 'Completed',
    description:
      'Joined Benmore as Employee #2 — Forward Deployed Strategist & Engineer. Embedded into client engineering teams, scoped systems end-to-end, and shipped production code from day one.',
    bullets: [
      'Onboarded the first ten clients across SaaS, healthcare, and consumer verticals.',
      'Authored the Benmore Foundry CLI — internal orchestration layer for SMB AI consulting engagements.',
      'Cross-stack: Stripe, Django, Next.js, FastAPI, React Native, plus Claude Code skill systems.',
    ],
    tech: [
      'Python',
      'Typer',
      'Django',
      'FastAPI',
      'Next.js',
      'React Native',
      'Stripe',
      'Claude Code',
    ],
    links: [
      { label: 'Experience & work ->', href: '/about#career' },
      { label: 'Why FDE ->', href: '/writing/why-fde' },
    ],
    slug: 'benmore-fde',
  },
  {
    title: '$150k total -> $150k every 15 days',
    featured: true,
    category: 'Milestone',
    date: '2025-2026',
    status: 'Completed',
    description: '887% revenue acceleration through repeatable forward-deployed engagement model.',
    links: [{ label: 'FDE feedback loop ->', href: '/writing/the-fde-feedback-loop' }],
  },
  {
    title: 'Head of FDE, Benmore',
    featured: true,
    org: 'Benmore',
    category: 'Work',
    date: 'Apr 2026',
    status: 'Current',
    description: 'Leading the forward deployed engineering practice across all client engagements.',
    links: [{ label: 'Experience & work ->', href: '/about#career' }],
  },
  {
    title: 'The Complete AI Hardware Stack — Layer by Layer',
    featured: true,
    category: 'Knowledge',
    date: 'Apr 2026',
    status: 'Published',
    description:
      'From silicon atoms to generated tokens — every layer that makes modern AI inference possible. L7 silicon & packaging, HBM, NVLink, CUDA kernels, disaggregated serving, and deep dives on SRAM vs HBM, CPO, and EDA.',
    links: [
      { label: 'Read the deep dive ->', href: '/knowledge/ai/ai-hardware-stack' },
      { label: 'Interactive version ->', href: '/ai-hardware-stack.html' },
    ],
    slug: 'ai-hardware-stack',
  },
]

export const KNOWLEDGE_DOMAINS: KnowledgeDomainMeta[] = [
  {
    slug: 'ai',
    name: 'AI',
    description:
      'Self-supervised learning, vision transformers, distributed training infrastructure.',
  },
  {
    slug: 'finance',
    name: 'Finance',
    description:
      'Aggregation theory, AI infrastructure as a structural trade, public thesis tracker.',
  },
  {
    slug: 'distributed-systems',
    name: 'Distributed Systems',
    description: 'Flink, RocksDB, Raft, MapReduce, compression, checkpointing.',
  },
  {
    slug: 'math',
    name: 'Math',
    description: 'Optimizers, convergence, intuition behind the proofs.',
  },
  {
    slug: 'physics',
    name: 'Physics',
    description: 'Supercritical fluids, nuclear reactor efficiency, why I left physics.',
  },
  {
    slug: 'software',
    name: 'Software',
    description: 'Stack evolution, Claude Code, the tools that make me 10x.',
  },
]
