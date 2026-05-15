// Programmatic-SEO topic hubs. Each hub clusters spokes (writing, weekly,
// skills, projects) under a keyword-targeted page with original prose, FAQ
// JSON-LD, and an ItemList of related content. Spokes link back to hubs via
// the `Related topic hubs` block rendered in app/topics/[slug]/page.tsx.

export type Faq = { q: string; a: string }

export type SpokeRef = {
  label: string
  path: string
  description?: string
  source?: string // optional source attribution (Bloomberg, Substack, etc.)
}

export type TopicHub = {
  slug: string
  name: string
  h1: string
  description: string
  keywords: string[]
  // The original prose intro — at least ~500 words of unique content per
  // the programmatic-SEO playbook. Plain markdown.
  intro: string
  // 5-8 FAQ pairs — drives Google rich-result eligibility.
  faqs: Faq[]
  // Manually curated spoke lists. Each list renders as its own section
  // with internal links + descriptions. Only sections that have entries
  // render — empty arrays are dropped.
  related: {
    writing?: SpokeRef[]
    weekly?: SpokeRef[]
    skills?: SpokeRef[]
    projects?: SpokeRef[]
    external?: SpokeRef[] // off-site sources cited in the prose
  }
}

export const TOPICS: TopicHub[] = [
  {
    slug: 'forward-deployed-engineering',
    name: 'Forward Deployed Engineering',
    h1: 'Forward Deployed Engineering — what an FDE actually does, and how to do it well',
    description:
      'Forward deployed engineering, explained from inside the role: how an FDE embeds with a client, ships production code from day one, and structurally compounds delivery velocity at consulting firms. Patterns drawn from 15+ SMB engagements at Benmore — Cattle Logic, Propurti, Home Service Pass, Noble Gas — plus the Foundry CLI that orchestrates them.',
    keywords: [
      'forward deployed engineer',
      'FDE',
      'forward deployed engineering',
      'deployed engineer',
      'AI consulting engineer',
      'embedded engineer',
      'forward deployed strategist',
      'Benmore Technologies',
      'SMB AI consulting',
      'Foundry CLI',
      'production AI engineering',
    ],
    intro: `**Forward deployed engineering** is the operating model where a single engineer (or a small pod) **embeds** inside a customer's team, scopes the system end-to-end, and ships production code against their backlog — usually under a fixed-price engagement with a clear handover at the end. The role originated at companies like Palantir, Anduril, and Ramp, and it has now become the dominant pattern for AI-era consulting: most enterprise AI value lives in the integration layer, not the model itself, so the people writing the deployment glue capture more of the value than the people writing the model.

The job is structurally different from a normal consulting engineer:

- **You own the system end-to-end.** Frontend, backend, data, infra, and the client's actual workflow — there is no separate "delivery team." If something breaks at 2 AM in production, you fix it.
- **You ship from day one.** No 6-week discovery phase. Read the codebase, watch the user, write code in the first week.
- **You write for the next FDE.** Every engagement ends in a handover packet. Skills, prompts, runbooks, on-call docs — codified so the next person picks up the engagement without a re-narration.
- **You are the integration layer.** AI/ML models, payment rails, mobile shells, third-party APIs — your job is to make them collectively work for one specific business.

At Benmore I joined as employee #2 and built the **Benmore Foundry CLI** as the orchestration layer for these engagements: it kicks off scoped Claude Code agents per engagement, tracks scope, manages FDE handoffs, and standardises the lifecycle from scope → build → ship → debrief. The point of the Foundry is not the CLI itself — it is that the same engineer can pick up any active engagement and continue without context loss, because the registry already knows the agents, skills, and decisions. Revenue scaled **887%** in under a year, and the through-line is that the Foundry made every engineer **3–5× more effective per engagement.**

The case studies on this site are the evidence:

- [**Cattle Logic**](/projects/cattle-logic) — offline-first React Native + Django ranch operations platform for a Durham, KS cattle feedlot. Multi-tenant scan flows, head-count invariants, Apple App Store release discipline as a codified [Claude skill](/skills/apple-release). Pilot live with a Texas ranch.
- [**Propurti**](/projects/propurti) — Calgary proptech platform: property-management desktop console, tenant-portal, document workflow primitives, eight tooling areas.
- [**Home Service Pass**](/projects/home-service-pass) — SLC hospitality membership program: Stripe-billed entitlements, operator dispatch console, multi-vendor routing.
- [**Noble Gas**](/projects/noble-gas) — Windsor, CT automotive: enterprise LLM layer grounded in a typed inventory backend, agent-mediated parts/procurement workflows.

The four engagements look unrelated on paper. Underneath, they share **one stack** (Django + Postgres + Stripe + React Native + Claude skills) and **one operating discipline** (Foundry-orchestrated, FDE-owned, handoff-ready). That is what "forward deployed" actually means — not "we're sending an engineer to your office," but "one team, one stack, one engineering culture, across every engagement we ship."

The pragmatic dev tooling that makes this scale — **RTK** (CLI proxy that compresses tool output 35.9% before it hits the LLM context), **context-mode** (MCP sandbox + per-project SQLite for Claude Code session continuity), the **Compound Engineering plugin** (37 skills + 51 agents) — is documented in the weekly logs and the Claude Skills library below.`,
    faqs: [
      {
        q: 'What does a forward deployed engineer do?',
        a: "A forward deployed engineer (FDE) embeds with a customer's team, scopes the system end-to-end, and ships production code under a fixed-price engagement. The role spans frontend, backend, data, infra, and the customer's actual workflow — there is no separate delivery team. The FDE is the integration layer for AI models, payment rails, mobile apps, and third-party APIs, owning the system from first commit through handover.",
      },
      {
        q: 'How is an FDE different from a normal consulting engineer?',
        a: 'A normal consulting engineer typically owns one slice of the stack and hands off to a delivery team. An FDE owns the entire engagement end-to-end, ships from day one (no long discovery phase), and writes documentation specifically for the next FDE who picks up the work. The role compounds across engagements because every shipped engagement leaves behind reusable skills, prompts, and handover packets.',
      },
      {
        q: 'Which companies invented the forward deployed engineering model?',
        a: "The role originated at defense and intelligence companies (Palantir is the most cited example), then spread to fintech (Ramp), defense tech (Anduril), and AI-era consulting firms like Benmore Technologies. The common thread is high-touch enterprise products where most of the value lives in integration with the customer's existing systems.",
      },
      {
        q: 'What does an AI-era FDE actually build?',
        a: 'Integration layers: production-grade systems that wire AI models into a specific business workflow. Examples from the Benmore portfolio: offline-first mobile shells for ranch hands (Cattle Logic), agent-mediated parts procurement grounded in typed inventory (Noble Gas), Stripe-billed membership entitlements with operator consoles (Home Service Pass), property-management desktop apps with document workflow primitives (Propurti). The pattern is "one stack, one engineering culture, every engagement."',
      },
      {
        q: 'Do you need to know AI/ML to be a forward deployed engineer?',
        a: "It helps but it is not the binding constraint. The binding constraint is being able to ship production code across the full stack and adapt to whatever the customer's workflow actually requires. AI/ML is one tool in the toolbox — the durable skill is full-stack production engineering plus the empathy to read someone else's business and reflect it back as a working system.",
      },
      {
        q: 'How do FDE consulting firms scale revenue without scaling headcount linearly?',
        a: 'By codifying repeated patterns. At Benmore the Foundry CLI orchestrates engagements, the bm CLI distributes Claude Code skills across the team, and every shipped engagement contributes a handover packet that the next engineer can pick up. Revenue at Benmore scaled 887% in roughly a year on top of this — not by hiring 8x more engineers, but by making each engineer 3-5x more effective.',
      },
      {
        q: 'What tooling does a forward deployed engineer use day-to-day?',
        a: "Claude Code is the IDE-equivalent. RTK (Rust Token Killer) compresses tool output 35.9% on average before it reaches the model context. context-mode sandboxes execution and indexes everything into per-project SQLite so /compact and --continue don't lose state. The Compound Engineering plugin ships 37 skills + 51 specialised subagents that handle code review, planning, debugging, and design. Together these turn the FDE into an agent operator, not just an engineer.",
      },
    ],
    related: {
      projects: [
        {
          label: 'Cattle Logic — Durham, KS ranch operations platform',
          path: '/projects/cattle-logic',
          description:
            'Offline-first React Native + Django, head-count invariants, Texas pilot live.',
        },
        {
          label: 'Home Service Pass — SLC hospitality',
          path: '/projects/home-service-pass',
          description: 'Stripe-billed membership entitlements + multi-vendor operator console.',
        },
        {
          label: 'Propurti — Calgary proptech',
          path: '/projects/propurti',
          description:
            'Property-manager desktop console + tenant portal + document workflow primitives.',
        },
        {
          label: 'Noble Gas — Windsor, CT automotive + enterprise LLM',
          path: '/projects/noble-gas',
          description: 'Agent-mediated parts procurement grounded in a typed inventory backend.',
        },
        {
          label: 'Benmore Foundry CLI',
          path: '/projects/benmore-foundry-cli',
          description:
            'Internal orchestration layer that kicks off scoped engagements and tracks handoffs.',
        },
        {
          label: 'Benmore-Meridian (bm CLI)',
          path: '/projects/benmore-meridian-bm-cli',
          description:
            '77 production Claude skills + a typed async Python client for the Benmore API.',
        },
      ],
      skills: [
        { label: 'Apple App Store release skill', path: '/skills/apple-release' },
        { label: 'Multi-tenant scan flows', path: '/skills/multi-tenant-scan' },
        { label: 'Service invariant guard', path: '/skills/service-invariant-guard' },
        { label: 'Audit trail', path: '/skills/audit-trail' },
      ],
      writing: [
        { label: 'SpatialDINO — engineering lessons', path: '/writing/spatialdino-lessons' },
      ],
      weekly: [
        {
          label: '2026-W19 — Kalshi, Stripe Sessions, RTK, context-mode',
          path: '/weekly/2026-W19',
          description:
            'Three primers on agentic commerce protocols + the dev-tooling stack an FDE uses daily.',
        },
        {
          label: '2026-W20 — KKR/FSK, SpaceXAI, EDA primer, Cattle Logic walkthrough',
          path: '/weekly/2026-W20',
          description: 'Cattle Logic on-site walkthrough video + Benmore case study landing.',
        },
      ],
    },
  },

  {
    slug: 'ai-engineering',
    name: 'AI Engineering',
    h1: 'AI Engineering — research, agents, and the production stack behind LLM-native apps',
    description:
      'AI engineering as I practise it: 3D self-supervised vision research at Harvard (SpatialDINO, beat a Nobel-laureate-led prior approach), production agent infrastructure at Benmore (Foundry, bm CLI, Compound Engineering), and the public Claude Skills library used across 15+ SMB engagements.',
    keywords: [
      'AI engineer',
      'applied AI engineering',
      'machine learning engineer',
      'production ML',
      'agent infrastructure',
      'LLM application engineering',
      'Claude skills',
      'Anthropic SDK',
      'self-supervised learning',
      'vision transformer',
      'SpatialDINO',
      'PyTorch DDP',
      'lattice light-sheet microscopy',
    ],
    intro: `**AI engineering** is the discipline of getting an AI model — typically a large language model or a vision transformer — into production against a real workflow. It is not "ML research" (which mostly produces papers) and it is not "MLOps" (which mostly produces dashboards). It is the layer in between: write the model code, train it, evaluate it, wrap it in the right control surface, integrate it into a customer's system, and keep it running.

My work splits into two tracks that inform each other.

### Research

[**SpatialDINO**](/research) — a 3D self-supervised vision transformer for label-free segmentation and tracking of subcellular dynamics in **lattice light-sheet microscopy (LLSM)**. Native 3D student/teacher ViTs with **3D iBOT block masking**, no positional encoding (NoPE), a streaming encoder with token-store + online softmax for million-token sequence lengths. Pre-trained on **2.4 TB / 180k volumes across 24 NVIDIA A100s** using PyTorch DDP, bf16 mixed precision, NVLink intra-node and InfiniBand inter-node. On downstream subcellular structure prediction it **beat a prior approach co-led by Nobel laureate Eric Betzig**. Authored at the [Kirchhausen Lab at Harvard Medical School](https://kirchhausen.hms.harvard.edu/people/arkash-jain-ms-bs). Released as a [BioRxiv preprint](https://www.biorxiv.org/content/10.1101/2025.02.04.636474), first-author. The work also produced a **Rendezvous backend fix to PyTorch (PR #144779)** that unblocked multi-node training over InfiniBand for the broader community.

The engineering lessons from that project — most importantly the streaming encoder + online softmax pattern that lets you do full-volume inference at million-token sequence lengths without OOMing — are written up at [/writing/spatialdino-lessons](/writing/spatialdino-lessons).

### Production

The other track is **production AI engineering** at [Benmore Technologies](/projects) — the integration layer between LLMs and SMB workflows. The pieces:

- [**Benmore-Meridian (bm CLI)**](/projects/benmore-meridian-bm-cli) — 77 production Claude Code skills covering Django, FastAPI, Stripe, HIPAA/GDPR/SOC 2 compliance, mobile (Expo/React Native), SEO, deployment, and microservices. Symlinked into \`~/.claude/skills/\` via one command so \`git pull\` is the only update step. Ships with a typed async Python client (\`benmore_client\`) whose 58 parallel HTTP calls drop end-to-end latency from ~30s to **3.7s** via \`asyncio.gather\`. Strict mypy, 168 tests, py.typed.
- [**Benmore Foundry CLI**](/projects/benmore-foundry-cli) — orchestration layer for scoped client engagements: kicks off scoped Claude Code agents, books scope, manages handoffs between FDEs.
- [**RTK (Rust Token Killer)**](https://github.com/rtk-ai/rtk) — single Rust binary, zero deps, **&lt;10ms overhead**. Hook transparently rewrites Bash commands (\`git status\` → \`rtk git status\`) before they reach the model context. My stats after running it: **13,454 commands · 17.9M tokens saved (35.9%)** on average across the session.
- [**context-mode**](https://github.com/mksglu/context-mode) — MCP sandbox + per-project SQLite that gives Claude Code **98% context reduction** on tool output (315 KB → 5.4 KB) and full session continuity on \`/compact\` and \`--continue\`.
- [**Compound Engineering plugin (Every)**](https://github.com/EveryInc/compound-engineering-plugin) — 37 skills + 51 specialised subagents covering code review, planning, ideation, frontend design, debugging, documentation. Underpins most of the agents I delegate to in \`/skills\`.

### The two tracks talk to each other

The production tooling is what made the research possible — full-volume LLSM inference uses the same streaming + caching patterns that show up in the agent dev tooling. Conversely, the agent tooling at Benmore is informed by what scales in research: bf16, DDP, careful memory accounting, parallel async I/O, and treating GPU/compute as a first-class resource that has to be measured before it can be optimised.

If you want to see what I actually ship as an AI engineer, the [Claude Skills library](/skills) and the [weekly logs](/weekly) are the public surface — every skill represents a pattern that survived contact with a real engagement.`,
    faqs: [
      {
        q: 'What is the difference between an AI engineer and an ML engineer?',
        a: "An ML engineer typically owns the training pipeline, model evaluation, and offline metrics. An AI engineer also covers the production wrapper around the model — the LLM control surface, the agent loop, the integration with the customer's system. In an LLM-first world, more of the value lives in the wrapper than in the model itself, so the AI engineer's remit has expanded.",
      },
      {
        q: 'What does production AI engineering look like in 2026?',
        a: "Agent infrastructure, not chat UIs. The work is wiring frontier LLMs (Claude, GPT, Gemini) into a typed backend that already runs the business: Django + Postgres, Stripe-billed entitlements, mobile shells, third-party APIs. The AI engineer's job is keeping the model grounded in the real state of the system (no hallucinated parts, no fictional invoices) while still letting it take useful actions.",
      },
      {
        q: 'How big do training runs get on lattice light-sheet microscopy data?',
        a: 'For SpatialDINO: 2.4 TB / 180,000 volumes pre-training across 24 NVIDIA A100s with PyTorch DDP, bf16 mixed precision, NVLink intra-node, InfiniBand inter-node. Full-volume inference uses a streaming encoder with token-store + online softmax to handle million-token sequence lengths without exceeding GPU memory. The Rendezvous backend fix I contributed to PyTorch (PR #144779) was the unblocker for the inter-node InfiniBand setup.',
      },
      {
        q: 'What is a Claude skill and how do you build a library of them?',
        a: 'A Claude skill is a markdown file with frontmatter that describes a discrete capability the model should invoke under specific conditions. The bm CLI we built at Benmore manages a library of 77 production skills across Django, FastAPI, Stripe, HIPAA/GDPR/SOC 2 compliance, mobile, SEO, deployment, and microservices. They are symlinked into ~/.claude/skills/ so `git pull` is the only update step, and they ship with `--json` flags so agents can query the registry directly.',
      },
      {
        q: 'How much does token-stream compression actually save in dev workflows?',
        a: "RTK's real numbers from my own usage: 13,454 commands proxied, 50.0M input + 31.2M output tokens passed through, 17.9M tokens saved (35.9% on average), <10ms overhead. The heaviest savers are lint output (97.8%), `gh pr create` (99.9%), `gh issue list` (99.7%), and curl-style fetches (95–98%). context-mode goes further on full tool output capture — 315 KB → 5.4 KB on representative cases, a 98% reduction, by sandboxing execution into a per-project SQLite store.",
      },
      {
        q: 'Why pre-train on LLSM data instead of using off-the-shelf models?',
        a: 'Subcellular structures in lattice light-sheet microscopy are 3D, sparse, and at scales (~3 nm) that ImageNet-pretrained 2D models do not generalise to. SpatialDINO uses native 3D student/teacher ViTs with 3D iBOT block masking and no positional encoding (NoPE), trained directly on volumetric LLSM crops. The result outperformed a prior approach co-led by Nobel laureate Eric Betzig on downstream subcellular structure prediction.',
      },
    ],
    related: {
      projects: [
        {
          label: 'SpatialDINO — 3D self-supervised ViT for LLSM',
          path: '/projects/spatialdino',
          description:
            'Pre-trained on 2.4 TB / 180k volumes across 24 A100s; beat a Nobel-laureate-led prior approach.',
        },
        {
          label: 'Benmore-Meridian (bm CLI)',
          path: '/projects/benmore-meridian-bm-cli',
          description: '77 production Claude skills + typed async Python client (30s → 3.7s).',
        },
        {
          label: 'Benmore Foundry CLI',
          path: '/projects/benmore-foundry-cli',
          description: 'Orchestrates scoped Claude Code agents per engagement.',
        },
      ],
      writing: [
        { label: 'SpatialDINO — engineering lessons', path: '/writing/spatialdino-lessons' },
        {
          label: 'AI hardware stack — building blocks of an AI training cluster',
          path: '/writing/ai-hardware-stack',
        },
      ],
      weekly: [
        {
          label: '2026-W19 — SemiAnalysis AI value capture + Stripe agent commerce',
          path: '/weekly/2026-W19',
          description:
            'Anthropic ARR $9B → $44B+, inference margins 38% → 70%+, MPP/UCP protocols.',
        },
        {
          label: '2026-W20 — SpaceXAI / Anthropic compute deal + EDA primer',
          path: '/weekly/2026-W20',
          description:
            'Stratechery + SemiAnalysis on the infra layer + Krishna Rao on Anthropic compute allocation.',
        },
      ],
      skills: [
        { label: 'AST-grep', path: '/skills/ast-grep' },
        { label: 'Multi-tenant scan flows', path: '/skills/multi-tenant-scan' },
        { label: 'Service invariant guard', path: '/skills/service-invariant-guard' },
      ],
      external: [
        {
          label: 'SpatialDINO (BioRxiv preprint)',
          path: 'https://www.biorxiv.org/content/10.1101/2025.02.04.636474',
          source: 'BioRxiv',
        },
        {
          label: 'PyTorch Rendezvous backend fix — PR #144779',
          path: 'https://github.com/pytorch/pytorch/pull/144779',
          source: 'GitHub',
        },
      ],
    },
  },

  {
    slug: 'pragmatic-engineering',
    name: 'Pragmatic Engineering',
    h1: 'Pragmatic Engineering — write less, ship more, keep the agents honest',
    description:
      'Pragmatic engineering as a worldview: prefer the boring tool, write less code, design for the next maintainer, and keep AI agents grounded in real system state. Drawn from 15+ Benmore engagements and the Claude Code dev-tooling stack (RTK, context-mode, Compound Engineering, bm CLI).',
    keywords: [
      'pragmatic engineering',
      'pragmatic programmer',
      'shipping software',
      'dev tooling',
      'CLI proxy',
      'Claude Code workflow',
      'agent operator',
      'compound engineering',
      'token optimisation',
      'context management',
      'session continuity',
      'rust binary',
      'MCP sandbox',
    ],
    intro: `**Pragmatic engineering** is a stance, not a stack. It says: prefer the boring tool, write less code, design for the next maintainer, and keep agents grounded in real system state — not in their own hallucinations. The opposite of pragmatic is "exciting" — frameworks-of-the-month, premature abstractions, and elegant solutions to imaginary problems. The pragmatic engineer rarely wins points for novelty and almost always wins points for **shipping the boring system that the customer can run in production for three years without you.**

A few principles that show up across the work on this site:

### 1. The agent operator is the new senior engineer

The 2026 engineering org has two layers: **agents** (Claude Code instances, scoped skills, parallel subagents) and **agent operators** (humans who choose which agents to invoke, what context to feed them, and where the loop has to terminate). The senior IC is no longer the person who writes the most code — it's the person who configures the most useful agent setup and reviews its output with the least friction. The tooling I've built and adopted reflects this:

- [**RTK (Rust Token Killer)**](https://github.com/rtk-ai/rtk) — CLI proxy that compresses dev-command output before it reaches the LLM context. Single Rust binary, zero deps, &lt;10ms overhead, **35.9% average token savings** across 13,454 commands in my own usage. Lint output → 97.8% saved. \`gh pr create\` → 99.9% saved. The premise: the model should not see the cargo-build output it does not need. The corollary: a 35% reduction in input tokens compounds across every prompt for the rest of the day.
- [**context-mode**](https://github.com/mksglu/context-mode) — MCP sandbox + per-project SQLite. Sandboxes execution, indexes every event into a per-project SQLite database, and on \`/compact\` or \`--continue\` your working state rebuilds automatically. The model picks up at your last prompt without you re-narrating what's been done. **98% context reduction** on representative tool output (315 KB → 5.4 KB). Registers PreToolUse / PostToolUse / PreCompact / SessionStart hooks + 11 MCP tools.
- [**Compound Engineering plugin (Every)**](https://github.com/EveryInc/compound-engineering-plugin) — 37 skills + 51 specialised subagents for code review, planning, ideation, frontend design, debugging, documentation. The pattern: don't ask one big model to do everything — dispatch specialised subagents in parallel and aggregate their results.

### 2. Skills > prompts > chats

A Claude skill is a markdown file with frontmatter that the model invokes under specific conditions. It is **discoverable, versionable, testable, and revisable.** A skill that codifies "how to ship an Apple App Store release for Cattle Logic" is more valuable than a one-shot prompt that says the same thing, because the skill survives across sessions, engineers, and even projects with similar shape. The bm CLI at Benmore manages a [library of 77 production skills](/skills) that ship across every engagement — symlinked into \`~/.claude/skills/\` so \`git pull\` is the only update step.

### 3. Bias toward boring tools

The Benmore production stack is deliberately unfashionable: **Django + Postgres + Stripe + React Native + TypeScript + Vercel.** None of these are exciting. All of them are well-understood, well-staffed, and have known failure modes. When something breaks at 2 AM you can find the answer on Stack Overflow without first decoding a community Discord. Mature tooling lets you spend your novelty budget on the parts that actually need to be novel — for instance, the AI integration layer or the offline-first mobile shell — instead of paying re-investment cost in the boring layers.

### 4. Write for the next maintainer

Every Benmore engagement ends with a **handover packet** — runbook, skills, decisions log, on-call docs. The Foundry CLI orchestrates this so the next FDE picks up the engagement without re-narration. The pragmatic stance here is recognising that **your future self is the next maintainer** in the median case, and the cost of writing the runbook is always less than the cost of re-reverse-engineering your own decisions six months later.

### 5. Measure compute, then optimise

In research, this means actually instrumenting bf16 vs FP8 throughput and capex-per-watt on B300 / GB300 / VR NVL72 generations before forming an opinion on which one to deploy. In production, it means actually measuring **35.9% token savings** with RTK before claiming you've improved dev velocity. The pragmatic engineer does not trust their intuition about performance — they instrument first, optimise second, and write the result down so the next person doesn't have to repeat the experiment.

The [weekly logs](/weekly) and [Claude Skills library](/skills) are the running record of this stance applied to real engagements.`,
    faqs: [
      {
        q: 'What does "pragmatic engineering" mean in 2026?',
        a: 'It means preferring the boring tool that has 20 years of Stack Overflow answers behind it, writing the smallest amount of code that solves the customer\'s actual problem, and designing every piece of work for the next maintainer — usually your future self. The opposite is "exciting" engineering: frameworks-of-the-month, premature abstractions, and elegant solutions to problems that nobody is actually paying you to solve.',
      },
      {
        q: 'What is an "agent operator" and why does the role matter?',
        a: "An agent operator is an engineer whose primary leverage comes from configuring AI agents — choosing which agent to invoke for which task, feeding the right context, and reviewing output with the least friction. In an agentic dev environment, the senior IC is no longer the person who writes the most code — it's the person whose agent setup ships the most production-ready code per hour.",
      },
      {
        q: 'Is RTK (Rust Token Killer) worth installing for Claude Code?',
        a: 'On my own usage: 13,454 commands proxied through RTK over a single Claude Code session yielded 17.9 million tokens saved — 35.9% on average. Lint output saves 97.8%. `gh pr create` saves 99.9%. `gh issue list` saves 99.7%. curl-style HTTP fetches save 95–98%. Single Rust binary, zero deps, <10ms overhead. The hook is transparent — Claude never sees the rewrite, only the compressed result.',
      },
      {
        q: 'What does context-mode do that base Claude Code does not?',
        a: 'context-mode sandboxes tool execution and indexes every meaningful event into a per-project SQLite database, then registers PreToolUse / PostToolUse / PreCompact / SessionStart hooks plus 11 MCP tools. The headline number is 98% context reduction (315 KB → 5.4 KB) on representative tool output, but the more important behaviour is that `/compact` and `--continue` rebuild your working state automatically — the model picks up at your last prompt without you re-narrating.',
      },
      {
        q: 'Why prefer Django + Postgres + Stripe over the framework of the month?',
        a: 'Because at 2 AM in production, the cost of an obscure stack is greater than the benefit of any minor performance or DX gain it offers. Django/Postgres/Stripe have well-understood failure modes, deep talent pools, and decades of operational scar tissue codified into the defaults. Pragmatic engineering spends its novelty budget on the parts of the system that actually need to be novel — typically the AI integration layer or the customer-specific workflow — not on rewriting the auth flow in $newest_framework.',
      },
      {
        q: 'Why are Claude skills better than one-shot prompts?',
        a: 'A Claude skill is discoverable (the model finds it via the description), versionable (lives in git), testable (you can write evaluation harnesses against it), and revisable (the next FDE can improve it without re-deriving it from scratch). A prompt is none of those things. At Benmore, the bm CLI manages 77 production skills symlinked into ~/.claude/skills/ across every engineer — `git pull` is the only update step.',
      },
    ],
    related: {
      projects: [
        {
          label: 'Benmore-Meridian (bm CLI) — 77 Claude skills + typed async Python client',
          path: '/projects/benmore-meridian-bm-cli',
        },
        {
          label: 'Benmore Foundry CLI — engagement orchestrator',
          path: '/projects/benmore-foundry-cli',
        },
      ],
      skills: [
        { label: 'Apple App Store release skill', path: '/skills/apple-release' },
        { label: 'Audit trail skill', path: '/skills/audit-trail' },
        { label: 'Multi-tenant scan flows', path: '/skills/multi-tenant-scan' },
        { label: 'Service invariant guard', path: '/skills/service-invariant-guard' },
        { label: 'Site capture', path: '/skills/site-capture' },
      ],
      weekly: [
        {
          label: '2026-W19 — RTK, context-mode, Compound Engineering plugin landing',
          path: '/weekly/2026-W19',
        },
        {
          label: '2026-W20 — EDA primer, deployment-company arc, Cattle Logic on-site',
          path: '/weekly/2026-W20',
        },
      ],
      external: [
        { label: 'RTK on GitHub', path: 'https://github.com/rtk-ai/rtk', source: 'GitHub' },
        {
          label: 'context-mode on GitHub',
          path: 'https://github.com/mksglu/context-mode',
          source: 'GitHub',
        },
        {
          label: 'Compound Engineering plugin (Every)',
          path: 'https://github.com/EveryInc/compound-engineering-plugin',
          source: 'GitHub',
        },
      ],
    },
  },

  {
    slug: 'finance-and-markets',
    name: 'Finance & Markets',
    h1: 'Finance & Markets — BDCs, prediction markets, private credit, and the Matt Levine reading list',
    description:
      "A running primer on private credit, BDCs, prediction markets, M&A structure, and the disclosure-rules-going-toothless story arc — drawn from a daily reading of Matt Levine's Money Stuff plus SemiAnalysis, Stratechery, and TBPN. Concept notes, ASCII flow diagrams, and source links per week.",
    keywords: [
      'Matt Levine',
      'Money Stuff',
      'BDC',
      'private credit',
      'KKR',
      'Apollo',
      'Blue Owl',
      'Kalshi',
      'prediction markets',
      'Section 16(b)',
      'appraisal arbitrage',
      'pre-hedging',
      'block trades',
      'fund formation fees',
      'ILPA',
      'moonshot pay',
      'empire building',
      'M&A structure',
      'short squeeze',
      'ESG securities fraud',
    ],
    intro: `**Finance & markets** as I read them: a daily diet of [Matt Levine's *Money Stuff*](https://www.bloomberg.com/account/newsletters/money-stuff), [SemiAnalysis](https://semianalysis.com), [Stratechery](https://stratechery.com), and the long-form podcast circuit (TBPN, All-In, Uncapped, Invest Like the Best). The structure I keep coming back to is that **the structural news is in the boring layer**: BDCs, swap docs, fund-formation fees, disclosure rules. The dramatic narratives — Cohen wants eBay, OpenAI tender, SpaceXAI merger — get the headlines, but the people who do well in markets pay attention to what's happening one layer below.

A few mental models that recur across the [weekly logs](/weekly):

### 1. Manager dilemma synthesis

When two impulses conflict, structurally do both. The canonical example is KKR's [May 11 Money Stuff column on FS KKR](/weekly/2026-W20#ms-kkr-fsk): a BDC manager looking at a $20 NAV / $15 market discount faces two impulses — buy at NAV (signal confidence in the marks) or buy at the market discount (better trade). KKR's $300M move was **$150M preferred at NAV ($18.83) + $150M tender at $11** — half of each impulse, neither one dominating. Same shape shows up in deal structuring, capital allocation, and even in agent dispatch.

### 2. Diversification at layer N is concentration at layer N–1

[HSBC's $400M MFS/Atlas SP charge](/weekly/2026-W19#ms-ebay-ouroboros) was the canonical 2026 example: 525 mortgages on the borrower side (diversified), one Atlas SP middle layer (concentrated), HSBC at 80% LTV at the top. When the borrower turned out to be fraudulent, the "diversification" evaporated because the middle layer was a single point of failure. Same shape as First Brands Group, Tricolor Auto. **Whenever you see a deep chain of pledges with a single middle node, the middle node is the diversification you actually have.**

### 3. Pay packages bias toward M&A

Modern moonshot pay (Musk Tesla 2018/2025, SpaceX, Cohen GameStop 2026) ties most upside to **absolute market cap targets**. Even with adjustment clauses, compounding favours growing the base via acquisition rather than organically — growing $60B → $150B is mechanically easier than $10B → $100B. The implication for governance: when a CEO has a moonshot package, an aggressive M&A pipeline is **the rational behaviour**, not a deviation from it.

### 4. Behavioural surplus pays makers

Bartlett & O'Hara's [analysis of 41.6M Kalshi trades](/weekly/2026-W19) found prediction-market makers earn **2× per contract** vs equity benchmarks, because retail systematically over-bets YES in markets that mostly settle NO. Events trading at "46% YES" actually settle YES only **21% of the time** — a 25-point miscalibration. The big quote: *"The offer side is the revenue engine, and the bid side is the hedge."*

### 5. Disclosure rules collapse when access is asymmetric

Three stories in two weeks of *Money Stuff* told the same shape:
- **Musk's $1.5M SEC settlement** for the 2022 Twitter 13D — saved ~$150M, settled for a 1% tax
- **Czechoslovak Group (CSG)** allegedly hid a €1.4B put-exercise disclosure in **white text on a white background** — visible to machines, invisible to humans
- **Adani's DOJ charges** being dropped after his Trump-tied lawyer presented 100 slides + a **$10B / 15K-jobs** pledge

The thesis: enforcement now turns on political access, not on the rules themselves. **Compliance is a 1% tax on the connected.**

---

The full breakdown — 20 concepts in 6 themes, source-linked, with ASCII flow diagrams — lives at [docs/notes/2026-W20-money-stuff-concepts.md](https://github.com/ArkashJ/Personal-Website/blob/main/docs/notes/2026-W20-money-stuff-concepts.md). Weekly source links and per-day TL;DR bullets are on each [weekly log page](/weekly).`,
    faqs: [
      {
        q: 'What is a BDC and why does it trade below NAV?',
        a: "A Business Development Company (BDC) is a publicly-traded fund that makes private-credit loans, designed to be retail-accessible. BDCs mark their loan portfolio to a Net Asset Value internally; the market then prices the BDC stock independently — usually below NAV when the private-credit asset class is stressed. The manager faces two impulses: buy stock at NAV to signal confidence, or buy at the market discount because it's a better trade.",
      },
      {
        q: 'What did KKR do at FS KKR in May 2026?',
        a: 'KKR injected $300M into FS KKR Capital Corp (FSK), structured as a synthesis of the two BDC-manager impulses: $150M in preferred equity convertible to common at $18.83 (Q1 NAV per share, paying 5% cash or 7% PIK) plus a $150M tender offer for common shares at $11 (vs $10.84 last close). The split simultaneously defends NAV marks and takes advantage of the market discount — half on each.',
      },
      {
        q: 'What is Section 16(b) and why is it weird?',
        a: 'Section 16(b) is the 1934 short-swing trading rule. If you own >10% of a company and buy and sell within 6 months, the 1943 Smolowe v. Delendo rule matches your lowest buy with your highest sell — not your actual trades. The result: your statutory disgorgement can be huge even when your real P&L is zero. It came up in the 2026 Avis short squeeze (Pentwater + SRS held 108% of economic ownership via swaps) and is now functioning as a back-stop tax on activist concentration.',
      },
      {
        q: 'How does appraisal arbitrage work as a volatility trade?',
        a: 'When a public company is acquired for cash, dissenting shareholders can sue in Delaware court for "fair value." You buy stock just before close, sue, and get court-determined value plus statutory interest. Historically the payoff shape was "bond plus call option" — at least the deal price, plus upside in court. The Skechers case (3G bought at $63 in Sep 2025, but the stock was $78 pre-Trump-tariffs) is the marquee 2026 example: tariff policy created the volatility that created the cheap LBO that created the appraisal claim. Settlement crept from $63 to $65.',
      },
      {
        q: 'What is the difference between pre-hedging and front-running?',
        a: "Same workflow, different names. Pre-hedging is when a dealer pre-sells some of a customer's expected block by calling other customers before the order is fully mandated — legal in some venues (FX, futures, options, especially at-the-close orders). Front-running is the illegal version: trading on material non-public information about a customer's order. The legal line typically turns on whether the deal was mandated and whether the counterparty was a tipped trader or a normal participant. The Segantii / BofA / Esprit HK case is the live 2026 test.",
      },
      {
        q: "What did Bartlett and O'Hara find about Kalshi market making?",
        a: 'Their analysis of 41.6 million Kalshi trades found that market makers earn 2× per contract vs equity benchmarks — driven primarily by retail behavioural surplus on the YES side. Markets trading at "46% YES" actually settle YES only 21% of the time, a 25-point miscalibration. A sell-only-YES strategy earns 2× the gross but with 3× the variance; the bid-side YES buys function as a hedge against tail outcomes. Their canonical line: "The offer side is the revenue engine, and the bid side is the hedge."',
      },
      {
        q: 'What does "promise nothing, get money, deliver nothing" mean as a business model?',
        a: "Matt Levine's Evil Business School framing of social-casino apps (High 5, Jackpot Party, Slotomania) and certain crypto projects. Three business models: (1) give value, get money, deliver value (real business), (2) promise value, get money, deliver nothing (fraud, risky), (3) promise nothing, get money, deliver nothing (legally bulletproof — you bought imaginary coins for entertainment, no winnings were ever promised). Industry revenue was >$11B in 2025, with whales spending >$1M each.",
      },
    ],
    related: {
      weekly: [
        {
          label:
            '2026-W19 — Avis short squeeze, SemiAnalysis AI value capture, GameStop/eBay $56B bid',
          path: '/weekly/2026-W19',
          description:
            'Section 16(b), Pentwater + SRS at 108% via swaps, the four daily Money Stuff entries May 4-7.',
        },
        {
          label:
            '2026-W20 — KKR/FSK, Skechers appraisal, white-on-white prospectus, GameStop activism reveal',
          path: '/weekly/2026-W20',
          description:
            'Three more Money Stuff columns: BDC synthesis, prosecutorial volatility trade, activism vs hostile takeover.',
        },
      ],
      writing: [],
      external: [
        {
          label: 'Money Stuff (Bloomberg, free signup)',
          path: 'https://www.bloomberg.com/account/newsletters/money-stuff',
          source: 'Bloomberg',
        },
        {
          label: 'Companion notes — 20 concepts in 6 themes',
          path: 'https://github.com/ArkashJ/Personal-Website/blob/main/docs/notes/2026-W20-money-stuff-concepts.md',
          source: 'GitHub',
        },
        { label: 'SemiAnalysis', path: 'https://semianalysis.com', source: 'SemiAnalysis' },
        {
          label: 'Stratechery — Ben Thompson',
          path: 'https://stratechery.com',
          source: 'Stratechery',
        },
      ],
    },
  },
]

export const TOPIC_SLUGS = TOPICS.map((t) => t.slug)

export function getTopic(slug: string): TopicHub | undefined {
  return TOPICS.find((t) => t.slug === slug)
}
