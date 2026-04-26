const Card = ({ children, className = '', glow = false }) => (
  <div
    className={`bg-surface border border-border rounded-lg p-6 transition-all ${
      glow ? 'hover:border-primary hover:shadow-[0_0_20px_rgba(48,172,166,0.15)]' : ''
    } ${className}`}
  >
    {children}
  </div>
)

export default Card
