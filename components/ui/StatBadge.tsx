type StatBadgeProps = { value: string; label?: string }

const StatBadge = ({ value, label }: StatBadgeProps) => (
  <div className="flex flex-col border-l-2 border-primary/40 pl-4">
    <span className="font-mono text-text text-2xl md:text-3xl font-bold tracking-tight">
      {value}
    </span>
    {label && (
      <span className="text-subtle text-[11px] mt-1 uppercase tracking-widest font-mono">
        {label}
      </span>
    )}
  </div>
)

export default StatBadge
