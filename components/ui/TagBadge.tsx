import Image from 'next/image'
import { tagIconUrl, tagIconLabel } from '@/lib/tag-icons'

type Variant = 'default' | 'teal' | 'cyan' | 'green'

const variants: Record<Variant, string> = {
  default: 'bg-elevated text-muted border border-border hover:border-primary/60 hover:text-text',
  teal: 'bg-primary/10 text-primary border border-primary/30 hover:border-primary/60',
  cyan: 'bg-accent/10 text-accent border border-accent/30 hover:border-accent/60',
  green: 'bg-success/10 text-success border border-success/30 hover:border-success/60',
}

type TagBadgeProps = {
  name: string
  variant?: Variant
  className?: string
}

const TagBadge = ({ name, variant = 'default', className = '' }: TagBadgeProps) => {
  const url = tagIconUrl(name)
  const label = tagIconLabel(name)
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors duration-150 ${variants[variant]} ${className}`}
    >
      {url && (
        <Image
          src={url}
          alt=""
          width={12}
          height={12}
          unoptimized
          aria-hidden
          className="shrink-0"
        />
      )}
      <span>{label}</span>
    </span>
  )
}

type TagBadgeListProps = {
  tags: string[]
  variant?: Variant
  className?: string
}

export const TagBadgeList = ({ tags, variant, className = '' }: TagBadgeListProps) => (
  <div className={`flex flex-wrap gap-1.5 ${className}`}>
    {tags.map((t) => (
      <TagBadge key={t} name={t} variant={variant} />
    ))}
  </div>
)

export default TagBadge
