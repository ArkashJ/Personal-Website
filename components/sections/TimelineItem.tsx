import Image, { type StaticImageData } from 'next/image'
import Badge from '@/components/ui/Badge'
import type { TimelineEntry } from '@/lib/data'

const STATUS_VARIANT: Record<TimelineEntry['status'], 'teal' | 'default' | 'cyan' | 'green'> = {
  Published: 'teal',
  Completed: 'default',
  Current: 'cyan',
  Live: 'green',
}

const STATUS_LABEL: Record<TimelineEntry['status'], string> = {
  Published: '● Published',
  Completed: 'Completed',
  Current: '● Current',
  Live: '● Live',
}

// Major milestones get the spotlight treatment.
const isMajor = (status: TimelineEntry['status']) =>
  status === 'Published' || status === 'Current' || status === 'Live'

type Props = TimelineEntry & { avatar?: StaticImageData | string }

const TimelineItem = ({ title, category, date, description, status, avatar }: Props) => {
  const major = isMajor(status)
  return (
    <li className="relative pl-12 pb-8 border-l border-border last:border-l-transparent">
      {/* Avatar / status node */}
      <span
        className={`absolute -left-[14px] top-0 w-7 h-7 bg-surface border-2 overflow-hidden ${
          major ? 'border-primary shadow-[0_0_0_4px_rgba(94,234,212,0.10)]' : 'border-border-strong'
        } ${status === 'Current' ? 'rounded-full' : ''}`}
      >
        {avatar && (
          <Image
            src={avatar}
            alt=""
            width={28}
            height={28}
            className="object-cover w-full h-full"
          />
        )}
      </span>

      <div
        className={`bg-surface border p-5 transition-all ${
          major
            ? 'border-primary/40 hover:border-primary'
            : 'border-border hover:border-border-strong'
        }`}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className={`font-bold tracking-tight ${
              major ? 'text-text text-lg md:text-xl' : 'text-text text-base'
            }`}
          >
            {title}
          </h3>
          <span className="font-mono text-[10px] text-subtle uppercase tracking-widest whitespace-nowrap pt-1">
            {date}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          {category && <Badge>{category}</Badge>}
          {status && (
            <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status] || status}</Badge>
          )}
        </div>

        {description && (
          <p className={`text-muted leading-relaxed ${major ? 'text-sm md:text-base' : 'text-sm'}`}>
            {description}
          </p>
        )}

        {/* Accent rule — only on major milestones */}
        {major && (
          <div className="mt-4 h-px bg-gradient-to-r from-primary via-primary/40 to-transparent" />
        )}
      </div>
    </li>
  )
}

export default TimelineItem
