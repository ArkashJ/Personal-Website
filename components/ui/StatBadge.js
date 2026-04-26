const StatBadge = ({ value, label }) => (
  <div className="flex flex-col">
    <span className="font-mono text-accent text-2xl md:text-3xl font-bold">{value}</span>
    {label && <span className="text-muted text-xs mt-1 uppercase tracking-wider">{label}</span>}
  </div>
)

export default StatBadge
