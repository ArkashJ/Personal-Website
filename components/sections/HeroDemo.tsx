import { Check, Square, CheckCircle2 } from 'lucide-react'

type Step = {
  title: string
  meta: string
  status: 'done' | 'active' | 'pending'
}

const STEPS: Step[] = [
  { title: 'Joined Harvard Kirchhausen Lab', meta: 'May 2024 · ML Researcher', status: 'done' },
  { title: 'SpatialDINO published', meta: '2025 · BioRxiv · 1st author', status: 'done' },
  { title: 'Joined Benmore — Employee #2', meta: 'Aug 2025 · Forward Deployed', status: 'done' },
  { title: 'Cattle Logic launched', meta: '2026 · CME-integrated', status: 'active' },
  { title: 'Head of FDE', meta: 'Apr 2026 · ongoing', status: 'pending' },
]

const HeroDemo = () => (
  <div className="relative">
    {/* Subtle gradient border on top edge */}
    <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

    <div className="bg-surface border border-border p-6 md:p-7 shadow-[0_0_60px_-12px_rgba(94,234,212,0.08)]">
      <div className="font-mono text-[10px] uppercase tracking-widest text-subtle mb-5">
        Project · Live · arkashj.com
      </div>

      <ol className="space-y-4">
        {STEPS.map((s, i) => {
          const isActive = s.status === 'active'
          const isDone = s.status === 'done'
          const Icon = isDone ? Check : isActive ? Square : Square
          return (
            <li key={s.title} className="flex items-start gap-3">
              {/* Status indicator */}
              <span
                className={`flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 border ${
                  isDone
                    ? 'bg-primary text-bg border-primary'
                    : isActive
                      ? 'border-accent text-accent'
                      : 'border-border text-subtle'
                }`}
              >
                <Icon size={12} strokeWidth={2.5} />
              </span>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${isDone ? 'text-text' : isActive ? 'text-text' : 'text-muted'}`}
                >
                  {s.title}
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent dot-pulse ml-2 align-middle" />
                  )}
                </p>
                <p className="text-xs text-subtle font-mono mt-0.5">{s.meta}</p>
              </div>

              {isDone && <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-1" />}
              {/* connector line */}
              {i < STEPS.length - 1 && (
                <span
                  className="absolute left-[37px] mt-7 w-px h-4 bg-border"
                  aria-hidden
                  style={{ marginTop: 0 }}
                />
              )}
            </li>
          )
        })}
      </ol>

      <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
          ● Career arc · 2024 → present
        </span>
        <span className="font-mono text-sm text-accent font-bold">5 / 5</span>
      </div>
    </div>
  </div>
)

export default HeroDemo
