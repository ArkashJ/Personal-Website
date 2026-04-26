import type { ReactNode } from 'react'

type CardProps = { children: ReactNode; className?: string; glow?: boolean }

const Card = ({ children, className = '', glow = false }: CardProps) => (
  <div
    className={`bg-surface border border-border p-6 transition-all duration-200 ${
      glow
        ? 'hover:border-primary/60 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-12px_rgba(94,234,212,0.18)]'
        : ''
    } ${className}`}
  >
    {children}
  </div>
)

export default Card
