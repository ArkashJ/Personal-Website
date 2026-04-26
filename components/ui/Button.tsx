import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'outline'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-bg hover:bg-accent hover:text-bg',
  ghost: 'bg-transparent text-primary border border-primary hover:bg-primary/10',
  outline: 'bg-transparent text-white border border-border hover:border-primary hover:text-primary',
}

type ButtonProps = {
  href?: string
  variant?: Variant
  children: ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ href, variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const cls = `inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm font-medium transition-colors ${variants[variant]} ${className}`
  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}

export default Button
