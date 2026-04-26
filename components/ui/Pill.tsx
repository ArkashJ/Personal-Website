import type { ReactNode } from 'react'

type PillProps = {
  children: ReactNode
  className?: string
  withDot?: boolean
}

const Pill = ({ children, className = '', withDot = true }: PillProps) => (
  <span
    className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border bg-surface text-primary font-mono text-[11px] uppercase tracking-widest ${className}`}
  >
    {withDot && (
      <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-primary dot-pulse" />
    )}
    {children}
  </span>
)

export default Pill
