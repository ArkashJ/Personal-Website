import Link from 'next/link'

const variants = {
  primary: 'bg-primary text-bg hover:bg-accent hover:text-bg',
  ghost: 'bg-transparent text-primary border border-primary hover:bg-primary/10',
  outline: 'bg-transparent text-white border border-border hover:border-primary hover:text-primary',
}

const Button = ({ href, variant = 'primary', children, className = '', ...props }) => {
  const cls = `inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm font-medium transition-colors ${variants[variant]} ${className}`
  if (href) {
    const external = href.startsWith('http')
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={cls} {...props}>
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
