const variants = {
  default: 'bg-border text-muted',
  teal: 'bg-primary/20 text-primary border border-primary/30',
  cyan: 'bg-accent/10 text-accent border border-accent/30',
  green: 'bg-green-400/10 text-green-400 border border-green-400/30',
}

const Badge = ({ children, variant = 'default', className = '' }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono ${variants[variant]} ${className}`}
  >
    {children}
  </span>
)

export default Badge
