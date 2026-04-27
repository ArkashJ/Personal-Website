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
}

export type Project = {
  name: string
  year: string
  description: string
  tech: string[]
  href?: string
}

export type WorkTool = {
  name: string
  description: string
  tech: string[]
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
      'A 3D self-supervised vision transformer that beats a Nobel laureate-led approach for understanding subcellular structures from cryo-electron tomograms.',
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
    bullets: [
      'Authored SpatialDINO - first 3D self-supervised vision transformer for cryo-ET subcellular structure prediction.',
      'Trained on DGX nodes with FSDP, bf16, NVLink, Infiniband; contributed Rendezvous backend fix to PyTorch (#144779).',
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
    name: 'SpatialDINO',
    year: '2025',
    description: 'First 3D self-supervised vision transformer for cryo-ET subcellular structures.',
    tech: ['PyTorch', 'FSDP', 'DGX', 'cryo-ET'],
    href: 'https://www.biorxiv.org/content/10.1101/2025.02.04.636474',
  },
  {
    name: 'Raft (Go)',
    year: '2023',
    description:
      'From-scratch Raft consensus implementation. Leader election, log replication, snapshotting.',
    tech: ['Go', 'gRPC', 'Distributed Systems'],
    href: 'https://github.com/ArkashJ/Raft',
  },
  {
    name: 'CloudComputing - coursework + projects',
    year: '2023',
    description:
      'BU CS591 coursework, including MapReduce, Spark, distributed kv-store experiments.',
    tech: ['Go', 'Spark', 'Hadoop'],
    href: 'https://github.com/ArkashJ/CloudComputing',
  },
  {
    name: 'NEXMARK Benchmark',
    year: '2023',
    description: 'Streaming-systems benchmark suite implementation against Apache Flink.',
    tech: ['Java', 'Flink', 'RocksDB'],
    href: 'https://github.com/ArkashJ/NEXMARK-Benchmark',
  },
  {
    name: 'Implicit SGD',
    year: '2024',
    description:
      'Implicit stochastic gradient descent - convergence improvements for ill-conditioned problems.',
    tech: ['Python', 'NumPy', 'Optimization'],
    href: 'https://github.com/ArkashJ/implict-SGD-implementation',
  },
  {
    name: 'CS411 Software Engineering Labs',
    year: '2023',
    description:
      'TA materials and reference solutions for the BU undergraduate software-engineering course.',
    tech: ['Java', 'JUnit'],
    href: 'https://github.com/ArkashJ/CS411_labs',
  },
  {
    name: 'Benmore Foundry CLI',
    year: '2025',
    description: 'Internal orchestration layer for SMB AI consulting engagements.',
    tech: ['Python', 'Typer', 'Claude Code'],
  },
  {
    name: 'Dynamic Checkpointing in Apache Flink',
    year: '2024',
    description: 'BU thesis - adaptive checkpoint cadence driven by backpressure signals.',
    tech: ['Java', 'Apache Flink', 'RocksDB'],
  },
  {
    name: 'OCaml Interpreter',
    year: '2022',
    description: 'Tree-walking interpreter for a typed functional language.',
    tech: ['OCaml'],
  },
  {
    name: 'Spotify to YouTube Transfer',
    year: '2022',
    description: 'Migrate playlists between music platforms via API matching.',
    tech: ['Python', 'OAuth'],
    href: 'https://github.com/ArkashJ',
  },
  {
    name: 'STU STREET Podcast',
    year: '2022',
    description: 'Co-hosted long-form interviews with founders, athletes, and professors on WTBU.',
    tech: ['Audio', 'Production'],
    href: 'https://podcasts.apple.com/us/podcast/stu-street/id1635472305',
  },
  {
    name: 'ALS Resource Tool',
    year: '2023',
    description: "Resource-discovery tool for ALS patients, built at Boston Children's.",
    tech: ['Django', 'Postgres'],
  },
]

export const WORK_TOOLS: WorkTool[] = [
  {
    name: 'Benmore Foundry CLI',
    description:
      'Internal orchestration layer for SMB AI consulting engagements - kicks off scoped agents, books work, manages handoffs.',
    tech: ['Python', 'Typer', 'Claude Code'],
  },
  {
    name: 'RTK - Rust Token Killer',
    description:
      'Token-optimized CLI proxy for Claude Code. 60-90% token savings on dev operations through transparent rewrite hooks.',
    tech: ['Rust', 'Claude Code Hooks'],
  },
  {
    name: 'Compound Engineering Skills',
    description:
      'Authored Claude Code skills for code review, debugging, planning, brainstorming, frontend design - used by team daily.',
    tech: ['Markdown', 'Claude Code Skills'],
  },
  {
    name: 'Excalidraw Discovery Flows',
    description:
      'Reusable client-discovery diagram set used during scoping engagements at Benmore.',
    tech: ['Excalidraw', 'Process'],
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
      'ML researcher at Harvard Medical School applying 3D vision transformers to cryo-electron tomography. The lab images subcellular structures at near-atomic resolution; my job was to make the resulting volumes interpretable at scale.',
    bullets: [
      'Trained on multi-node DGX clusters: A100 / H100, NVLink intra-node, Infiniband inter-node, RAID + NVMe storage tier.',
      'PyTorch FSDP with bf16 mixed precision and activation checkpointing to fit large 3D ViTs.',
      'Diagnosed a Rendezvous (RDZV) backend issue affecting Infiniband multi-node training — filed PyTorch issue #144779.',
    ],
    tech: ['PyTorch', 'FSDP', 'CUDA', 'Infiniband', 'NCCL', 'DGX', 'cryo-ET'],
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
    title: 'SpatialDINO - first 3D self-supervised vision transformer for cryo-ET',
    featured: true,
    org: 'Harvard',
    category: 'Research',
    date: '2025',
    status: 'Completed',
    description:
      'Designed and trained the first 3D self-supervised vision transformer for subcellular structure prediction from cryo-electron tomograms — a result that beat a prior approach led by a Nobel laureate.',
    bullets: [
      'Adapted DINO-style self-supervised contrastive learning into 3D — student/teacher ViTs over volumetric tomograms.',
      'Pretrained on unannotated tomograms; fine-tuned on a tiny labeled set for vesicle / organelle classification.',
      'Beat the prior SOTA, including the Nobel-laureate-led approach, on downstream evaluation.',
      'Released as a BioRxiv preprint, first-author.',
    ],
    tech: ['PyTorch', 'DINO', '3D ViT', 'Self-Supervised Learning', 'cryo-ET', 'FSDP'],
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
      { label: 'Experience & work ->', href: '/experience' },
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
    links: [{ label: 'Experience & work ->', href: '/experience' }],
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
