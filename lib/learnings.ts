export type LearningCategory =
  | 'Engineering'
  | 'Research'
  | 'Career'
  | 'Life'
  | 'ML'
  | 'Distributed Systems'

export type Learning = {
  title: string
  category: LearningCategory
  year: number
  lesson: string
}

// Reverse-chronological order.
export const LEARNINGS: Learning[] = [
  {
    title: 'Write the skill the second time, never the first',
    category: 'Engineering',
    year: 2026,
    lesson:
      'Premature abstraction is worse than no abstraction. The first time I solve a problem I do it inline; the second time I notice the pattern; only on the third does the skill earn its place. Every skill I wrote on the first pass got deleted within a month.',
  },
  {
    title: 'The CLAUDE.md is the product',
    category: 'Engineering',
    year: 2026,
    lesson:
      'On agent-driven projects, the prompt context is more load-bearing than any single file. A clear CLAUDE.md with sharp conventions outperforms a clever framework. Treat it like a public API and version it accordingly.',
  },
  {
    title: 'Plan length is not plan quality',
    category: 'Engineering',
    year: 2025,
    lesson:
      'The best plans I have shipped fit on one page. Confluence-grade plans signal that nobody actually knows what to build yet. If a plan needs more than ten bullets, the brainstorming step was skipped.',
  },
  {
    title: "The Nobel laureate's pipeline can be wrong",
    category: 'Research',
    year: 2025,
    lesson:
      'When I built SpatialDINO I assumed the published baseline from a Nobel-laureate-led group was the ceiling. It was not. Authority is a prior, not a posterior. Run your own ablations before deferring.',
  },
  {
    title: 'Forward-deployed beats project-priced consulting',
    category: 'Career',
    year: 2025,
    lesson:
      'Hourly billing punishes you for getting faster. Outcomes-based engagements compound: every tool you build for client N pays you back at client N+1. We went from $150k a year to $150k every fifteen days by switching the unit of sale.',
  },
  {
    title: 'Optimizer state is the headline memory cost',
    category: 'ML',
    year: 2025,
    lesson:
      'Adam doubles your model footprint in optimizer state alone. Lion roughly halves that. When training stalls on memory, audit the optimizer before reaching for sharding tricks. The cheapest gradient step is the one you do not have to recompute.',
  },
  {
    title: 'Most enterprise AI fails at the integration seam',
    category: 'Engineering',
    year: 2025,
    lesson:
      "The model works on the demo. The CRM API does not, the auth tokens expire mid-loop, and the customer's Excel exports have merged cells. That seam is the entire engagement. Spend the first week on the integration and the model picks itself.",
  },
  {
    title: 'Compounding tools beat heroic work',
    category: 'Career',
    year: 2025,
    lesson:
      'A hundred-hour week is a one-time gift. A CLI you wrote in three hours is a perpetuity. Every engagement should leave the toolkit measurably stronger than it found it; otherwise you are renting your own labor back to yourself.',
  },
  {
    title: 'Mock data hides the real bug',
    category: 'Engineering',
    year: 2024,
    lesson:
      'The bug almost never lives in the unit you are testing. It lives at the boundary where two systems agreed on a schema and then drifted. Mocks let you ship; integration tests let you sleep.',
  },
  {
    title: 'Backpressure tells you what your system actually wants',
    category: 'Distributed Systems',
    year: 2024,
    lesson:
      "My Flink thesis started with the goal of suppressing backpressure. It ended with the realization that backpressure is the runtime's honest report of where the bottleneck is. Listen to it, do not silence it. Adaptive checkpointing fell out naturally once I stopped fighting the signal.",
  },
  {
    title: 'Physics-grade rigor does not transfer to startup speed',
    category: 'Career',
    year: 2024,
    lesson:
      "In the lab you triple-check before you publish. In a startup you ship to learn whether the question was even worth asking. Both disciplines are correct in context; the trap is importing one's rituals into the other's domain.",
  },
  {
    title: 'The thing I avoid is usually the thing to do first',
    category: 'Life',
    year: 2024,
    lesson:
      'Whatever item I keep sliding to tomorrow is almost always the highest-leverage one on the list. Procrastination is a signal, not a flaw. The day improves the moment that item moves to the top.',
  },
]
