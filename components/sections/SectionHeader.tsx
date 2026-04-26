type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  href?: string
  hrefLabel?: string
}

const SectionHeader = ({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = 'View all →',
}: SectionHeaderProps) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-8 pb-4 border-b border-border">
    <div>
      {eyebrow && (
        <p className="font-mono text-primary text-[11px] uppercase tracking-widest mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight">{title}</h2>
      {description && (
        <p className="text-muted mt-2 max-w-2xl text-sm leading-relaxed">{description}</p>
      )}
    </div>
    {href && (
      <a
        href={href}
        className="font-mono text-primary text-xs hover:text-accent whitespace-nowrap uppercase tracking-widest"
      >
        {hrefLabel}
      </a>
    )}
  </div>
)

export default SectionHeader
