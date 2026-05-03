import type { ReactNode } from 'react'

type CardProps = { children: ReactNode; className?: string; glow?: boolean }

const Card = ({ children, className = '', glow = false }: CardProps) => (
  <div
    className={`bg-surface border border-border p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out ${
      glow
        ? 'hover:border-primary/60 hover:-translate-y-1 hover:shadow-[0_0_40px_-12px_rgba(94,234,212,0.22)]'
        : 'hover:border-border-strong hover:-translate-y-0.5'
    } ${className}`}
  >
    {children}
  </div>
)

export default Card
