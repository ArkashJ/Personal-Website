// Course catalog for the BU coursework section.
// Each entry maps to one MDX file at content/coursework/<semester-slug>/<slug>.mdx,
// rendered by app/coursework/[slug]/page.tsx (and optional sub-pages via [sub]).

export type CoursePaper = {
  title: string
  authors?: string
  year?: string
  url: string
}

export type CourseSubPage = {
  slug: string
  title: string
  description: string
}

export type Course = {
  slug: string
  code: string
  title: string
  semester: 'Spring 2023' | 'Fall 2023'
  semesterSlug: 'spring-2023' | 'fall-2023'
  university: 'Boston University'
  summary: string
  bullets: string[]
  tech: string[]
  papers?: CoursePaper[]
  links?: { label: string; href: string }[]
  subPages?: CourseSubPage[]
}

export const COURSES: Course[] = [
  // ---------- Spring 2023 ----------
  {
    slug: 'cs350-raft',
    code: 'CS 350',
    title: 'Distributed Systems — Raft + MapReduce',
    semester: 'Spring 2023',
    semesterSlug: 'spring-2023',
    university: 'Boston University',
    summary:
      'A from-scratch Raft consensus implementation in Go (leader election, log replication, snapshotting) plus a MapReduce coordinator/worker, evaluated under a custom RPC fault-injection harness.',
    bullets: [
      'Raft state machine — randomized election timeouts, AppendEntries-driven log replication, snapshot install RPC.',
      'MapReduce coordinator and worker with plugin-loaded map/reduce functions and crash-timeout reassignment.',
      'Custom labrpc network simulator used to inject delays, drops, reorders for chaos-style tests.',
      'Read the original Raft, GFS, MapReduce, Dynamo, and PNUTS papers across the semester.',
    ],
    tech: ['Go', 'gRPC', 'Distributed Systems', 'Raft Consensus'],
    papers: [
      {
        title: 'In Search of an Understandable Consensus Algorithm (Raft)',
        authors: 'Ongaro & Ousterhout',
        year: '2014',
        url: 'https://raft.github.io/raft.pdf',
      },
      {
        title: 'MapReduce: Simplified Data Processing on Large Clusters',
        authors: 'Dean & Ghemawat',
        year: '2004',
        url: 'https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/',
      },
      {
        title: 'The Google File System',
        authors: 'Ghemawat et al.',
        year: '2003',
        url: 'https://research.google/pubs/the-google-file-system/',
      },
    ],
    links: [{ label: 'Raft repo (Go)', href: 'https://github.com/ArkashJ/Raft' }],
  },
  {
    slug: 'cs611-monsters-and-heroes',
    code: 'CS 611',
    title: 'OOP & Design Patterns — Monsters & Heroes',
    semester: 'Spring 2023',
    semesterSlug: 'spring-2023',
    university: 'Boston University',
    summary:
      'A turn-based RPG built in Java to exercise SOLID principles, factories, strategies, and template-method parsers. Battle, market, inventory, and a 2D grid world — all decomposed into single-responsibility packages.',
    bullets: [
      'Hero/Monster class hierarchy with HP/MP/strength/agility/dexterity stat sheets and leveling.',
      'Battle resolver combines stats, item bonuses, and spell mana cost into damage formulas.',
      'File-driven content: data parsers populate weapons/armor/potions/spells from text files.',
      'Market system with price tables, transaction validation, and inventory equipping.',
    ],
    tech: ['Java', 'OOP', 'Design Patterns'],
    links: [
      { label: 'Monsters & Heroes repo', href: 'https://github.com/ArkashJ/Monsters_and_Heroes' },
    ],
  },
  {
    slug: 'cs611-trading-system',
    code: 'CS 611',
    title: 'Final Project — Java Swing Trading Platform',
    semester: 'Spring 2023',
    semesterSlug: 'spring-2023',
    university: 'Boston University',
    summary:
      'Group capstone for CS 611: a multi-page Swing trading platform with role-based accounts, persistent state, profit/loss calculation, and an admin dashboard. Co-authored with Trisha Anil and Jianxio Yang.',
    bullets: [
      'Account hierarchy (TradingAccount, OptionsAccount) created via factory pattern.',
      'Singleton Database, Market, BankManager, and Initiator coordinate persistence and pricing.',
      'Swing-based MVC: AccountPage, StockPage, ManagerPage bound to backend services.',
      'Role-based access — admins approve account requests, monitor system logs, view all activity.',
    ],
    tech: ['Java', 'Java Swing', 'OOP', 'Design Patterns'],
    links: [
      {
        label: 'Trading System repo (archived)',
        href: 'https://github.com/ArkashJ/_611Final_TradingSystem',
      },
    ],
  },

  // ---------- Fall 2023 ----------
  {
    slug: 'cs320-ocaml',
    code: 'CS 320',
    title: 'Programming Languages — OCaml Interpreter',
    semester: 'Fall 2023',
    semesterSlug: 'fall-2023',
    university: 'Boston University',
    summary:
      'Built an interpreter in OCaml for a stack-based, BNF-defined language. Lexer, parser, AST, and evaluator — every layer hand-written, no parser generator.',
    bullets: [
      'Recursive-descent parser over a BNF grammar — no yacc, no menhir.',
      'Pattern-matching AST evaluator with environment-based variable binding.',
      'Stack-based execution model with explicit push/pop/swap operators.',
      'Algebraic data types for values, expressions, and parser combinators.',
    ],
    tech: ['OCaml', 'Functional Programming', 'Parsing', 'Type Systems'],
    links: [
      { label: 'OCaml-Interpreter repo', href: 'https://github.com/ArkashJ/OCaml-Interpreter' },
    ],
    subPages: [
      {
        slug: 'parser',
        title: 'The Parser — Recursive Descent over a BNF Grammar',
        description:
          'How the OCaml interpreter turns source text into an AST without a parser generator.',
      },
      {
        slug: 'evaluator',
        title: 'The Evaluator — Stack Semantics & Environments',
        description:
          'Walking the AST, environment-based binding, and the stack-machine semantics of the language.',
      },
    ],
  },
  {
    slug: 'ds522-sgd-variants',
    code: 'DS 522',
    title: 'Optimization — SGD Variants & Implicit SGD',
    semester: 'Fall 2023',
    semesterSlug: 'fall-2023',
    university: 'Boston University',
    summary:
      'Implemented and benchmarked SGD, Adam, AMSGrad, and RMSProp on convex and ill-conditioned problems. Article evaluations on Reddi 2018 (on the convergence of Adam) and Toulis 2016 (implicit SGD).',
    bullets: [
      'SGD variants in R and Python — vanilla, momentum, Adam, AMSGrad, RMSProp.',
      'Hyperparameter sensitivity sweeps: learning rate, batch size, momentum, decay schedule.',
      'Article evaluations on the convergence of adaptive methods and implicit SGD.',
      'Convergence plots, time/memory tradeoff measurements, MSE-vs-iteration curves.',
    ],
    tech: ['R', 'Python', 'NumPy', 'Optimization', 'SGD'],
    papers: [
      {
        title: 'On the Convergence of Adam and Beyond',
        authors: 'Reddi, Kale, Kumar',
        year: '2018',
        url: 'https://openreview.net/forum?id=ryQu7f-RZ',
      },
      {
        title: 'Towards Stability and Optimality of SGD (Implicit SGD)',
        authors: 'Toulis & Airoldi',
        year: '2016',
        url: 'https://proceedings.mlr.press/v33/toulis14.html',
      },
    ],
    links: [
      {
        label: 'implict-SGD-implementation (R)',
        href: 'https://github.com/ArkashJ/implict-SGD-implementation',
      },
      {
        label: 'mini_project_sgd (Python)',
        href: 'https://github.com/ArkashJ/mini_project_sgd',
      },
    ],
  },
  {
    slug: 'cs561-pagerank',
    code: 'CS 561',
    title: 'Cloud Computing — PageRank on a Mini-Internet',
    semester: 'Fall 2023',
    semesterSlug: 'fall-2023',
    university: 'Boston University',
    summary:
      'Generated a synthetic internet of cross-linked HTML pages, parsed the link graph, and computed PageRank to convergence — locally and on GCP — to feel where cloud actually compounds.',
    bullets: [
      'Page generator emits N HTML pages with random link distributions.',
      'Adjacency matrix built from regex-extracted hrefs across the corpus.',
      'Iterative PageRank with damping factor d = 0.85, convergence at ‖Pₜ − Pₜ₋₁‖ < ε.',
      'Local (numba JIT) vs. GCP execution — quantified the breakeven crossover.',
    ],
    tech: ['Python', 'GCP', 'PageRank', 'Numba'],
    papers: [
      {
        title: 'Dremel: Interactive Analysis of Web-Scale Datasets',
        authors: 'Melnik et al.',
        year: '2010',
        url: 'https://research.google/pubs/dremel-interactive-analysis-of-web-scale-datasets-2/',
      },
      {
        title: 'Kafka: A Distributed Messaging System for Log Processing',
        authors: 'Kreps, Narkhede, Rao',
        year: '2011',
        url: 'https://notes.stephenholiday.com/Kafka.pdf',
      },
    ],
    links: [{ label: 'CloudComputing repo', href: 'https://github.com/ArkashJ/CloudComputing' }],
  },
  {
    slug: 'cs630-gale-shapley',
    code: 'CS 630',
    title: 'Graduate Algorithms — Gale-Shapley & Reservoir Sampling',
    semester: 'Fall 2023',
    semesterSlug: 'fall-2023',
    university: 'Boston University',
    summary:
      'Average-case analysis of Gale-Shapley stable matching by exhaustive enumeration over 4!⁴ = 331,776 preference instances. Plus reservoir sampling and assorted randomized algorithms.',
    bullets: [
      'Gale-Shapley implementation with O(1) preference-rank lookup table.',
      'Exhaustive enumeration of 331,776 instances → empirical proposal-count distribution.',
      'Reservoir sampling (Algorithm R) — uniform sample from a stream of unknown length.',
      'Worked off CLRS and Kleinberg/Tardos.',
    ],
    tech: ['Python', 'Algorithm Analysis', 'Randomized Algorithms'],
    papers: [
      {
        title: 'College Admissions and the Stability of Marriage',
        authors: 'Gale & Shapley',
        year: '1962',
        url: 'https://www.jstor.org/stable/2312726',
      },
      {
        title: 'Random Sampling with a Reservoir',
        authors: 'Vitter',
        year: '1985',
        url: 'https://www.cs.umd.edu/~samir/498/vitter.pdf',
      },
    ],
  },
  {
    slug: 'ma582-mathematical-statistics',
    code: 'MA 582',
    title: 'Mathematical Statistics — Hogg/McKean/Craig',
    semester: 'Fall 2023',
    semesterSlug: 'fall-2023',
    university: 'Boston University',
    summary:
      'Rigorous graduate-level statistical inference: point estimation, confidence intervals, hypothesis testing, MLE, sufficient statistics, MGF, asymptotic theory.',
    bullets: [
      'Point estimation, MSE, bias-variance, Cramér-Rao lower bound.',
      'Likelihood ratio tests, Neyman-Pearson lemma, UMP tests.',
      'MLE, sufficient statistics, complete sufficient statistics, Lehmann-Scheffé.',
      'Asymptotic distribution of estimators, delta method, CLT applications.',
    ],
    tech: ['Probability', 'Statistics', 'Mathematical Analysis'],
  },
  {
    slug: 'hi151-american-history',
    code: 'HI 151',
    title: 'American History to 1877',
    semester: 'Fall 2023',
    semesterSlug: 'fall-2023',
    university: 'Boston University',
    summary:
      "Liberal-arts elective covering colonial America through Reconstruction. Foner's *Give Me Liberty!* and Boyer's *Salem Possessed* as the spine; final essay on social origins of historical phenomena.",
    bullets: [
      "Boyer's *Salem Possessed* — witchcraft as social-stress symptom.",
      'Discovering the American Past — primary-source-driven inquiry.',
      'Reconstruction-era essay: evidence-based historiography.',
    ],
    tech: ['History', 'Liberal Arts'],
  },
]

export const courseBySlug = (slug: string): Course | undefined =>
  COURSES.find((c) => c.slug === slug)

export const coursesBySemester = (semester: Course['semester']): Course[] =>
  COURSES.filter((c) => c.semester === semester)

export const coursesBySemesterSlug = (slug: Course['semesterSlug']): Course[] =>
  COURSES.filter((c) => c.semesterSlug === slug)

export const allCourseSubPages = (): { courseSlug: string; sub: CourseSubPage }[] => {
  const out: { courseSlug: string; sub: CourseSubPage }[] = []
  for (const c of COURSES) {
    if (c.subPages) {
      for (const s of c.subPages) out.push({ courseSlug: c.slug, sub: s })
    }
  }
  return out
}
