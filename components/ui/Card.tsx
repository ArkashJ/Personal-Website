import type { ReactNode } from 'react'

type CardProps = { children: ReactNode; className?: string; glow?: boolean }

const Card = ({ children, className = '', glow = false }: CardProps) => (
  <div
    className={`bg-surface border border-border p-6 transition-colors ${
      glow ? 'hover:border-primary/60' : ''
    } ${className}`}
  >
    {children}
  </div>
)

export default Card
