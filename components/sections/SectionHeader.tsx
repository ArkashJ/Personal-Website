import Pill from '@/components/ui/Pill'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  italicAccent?: string
  description?: string
  href?: string
  hrefLabel?: string
}

const SectionHeader = ({
  eyebrow,
  title,
  italicAccent,
  description,
  href,
  hrefLabel = 'View all →',
}: SectionHeaderProps) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 pb-6 border-b border-border">
    <div>
      {eyebrow && <Pill className="mb-4">{eyebrow}</Pill>}
      <h2 className="text-3xl md:text-4xl font-bold text-text tracking-tight leading-[1.1]">
        {title}
      </h2>
      {italicAccent && (
        <p className="mt-1 text-2xl md:text-3xl font-bold leading-[1.1] tracking-tight italic text-accent">
          {italicAccent}
        </p>
      )}
      {description && (
        <p className="text-muted mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
          {description}
        </p>
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
