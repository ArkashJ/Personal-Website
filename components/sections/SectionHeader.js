const SectionHeader = ({ eyebrow, title, description, href, hrefLabel = 'View all →' }) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-8">
    <div>
      {eyebrow && (
        <p className="font-mono text-primary text-xs uppercase tracking-widest mb-2">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      {description && <p className="text-muted mt-2 max-w-2xl">{description}</p>}
    </div>
    {href && (
      <a href={href} className="font-mono text-primary text-sm hover:text-accent whitespace-nowrap">
        {hrefLabel}
      </a>
    )}
  </div>
)

export default SectionHeader
