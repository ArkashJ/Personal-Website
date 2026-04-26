import type { ReactNode } from 'react'

type Variant = 'default' | 'teal' | 'cyan' | 'green'

const variants: Record<Variant, string> = {
  default: 'bg-elevated text-muted border border-border',
  teal: 'bg-primary/10 text-primary border border-primary/30',
  cyan: 'bg-accent/10 text-accent border border-accent/30',
  green: 'bg-success/10 text-success border border-success/30',
}

type BadgeProps = { children: ReactNode; variant?: Variant; className?: string }

const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider ${variants[variant]} ${className}`}
  >
    {children}
  </span>
)

export default Badge
