import Link from 'next/link'
import type { ReactNode } from 'react'

type CardProps = { children: ReactNode; className?: string; glow?: boolean; href?: string }

const cardClasses = (glow: boolean, className: string) =>
  `bg-surface border border-border p-6 transition-all duration-300 ease-out ${
    glow
      ? 'hover:border-primary/60 hover:-translate-y-1 hover:shadow-[0_0_40px_-12px_rgba(94,234,212,0.22)]'
      : 'hover:border-border-strong hover:-translate-y-0.5'
  } ${className}`

const Card = ({ children, className = '', glow = false, href }: CardProps) => {
  if (href) {
    return (
      <Link href={href} className={cardClasses(glow, className)}>
        {children}
      </Link>
    )
  }
  return <div className={cardClasses(glow, className)}>{children}</div>
}

export default Card
