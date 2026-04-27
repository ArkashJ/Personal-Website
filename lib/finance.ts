export type Thesis = {
  title: string
  status: 'Active' | 'Watching' | 'Closed'
  note: string
}

export type Trade = {
  date: string
  instrument: string
  thesis: string
  outcome: string
}

export const THESES: Thesis[] = [
  {
    title: 'Aggregation Theory → SaaS Platform Consolidation',
    status: 'Active',
    note: 'Demand-side aggregators win categories with high user fragmentation. Watching the AI dev tools and CRM verticals.',
  },
  {
    title: 'AI Infrastructure Layer > Application Layer',
    status: 'Active',
    note: 'Margins migrate to whoever controls compute, networking, and memory. Apps are commoditized by foundation models.',
  },
  {
    title: 'HBM Scarcity as Structural Constraint',
    status: 'Active',
    note: 'High-bandwidth memory remains the binding constraint on training throughput. Early MU thesis still holds.',
  },
  {
    title: '2028: Red + Blue Coalition Against Tech',
    status: 'Watching',
    note: 'Bipartisan antitrust posture against frontier AI labs and platform aggregators is a tail risk worth tracking.',
  },
  {
    title: 'Private Credit Replacing Public Markets',
    status: 'Watching',
    note: 'BDC and direct-lending growth as banks pull back; durable structural shift, not a cycle.',
  },
]

export const TRADES: Trade[] = [
  {
    date: '2025-09-12',
    instrument: 'LITE 2026 calls',
    thesis: 'Optical interconnect demand inflection — Coherent + Lumentum captures Nvidia spend',
    outcome: 'Open',
  },
  {
    date: '2025-07-21',
    instrument: 'MU shares',
    thesis: 'HBM scarcity, Micron is third source behind Hynix + Samsung',
    outcome: 'Open · +28%',
  },
  {
    date: '2025-04-03',
    instrument: 'SPY puts (hedge)',
    thesis: 'Tariff overhang on Q2 prints; small portfolio hedge',
    outcome: 'Closed · −12% (hedge cost)',
  },
  {
    date: '2024-11-08',
    instrument: 'PLTR shares',
    thesis: 'Forward-deployed engineering model is the right shape for AI consulting at scale',
    outcome: 'Closed · +94%',
  },
]
