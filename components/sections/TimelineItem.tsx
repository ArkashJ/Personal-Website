import Image, { type StaticImageData } from 'next/image'
import Badge from '@/components/ui/Badge'
import type { TimelineEntry } from '@/lib/data'

const STATUS_VARIANT: Record<TimelineEntry['status'], 'teal' | 'default' | 'cyan' | 'green'> = {
  Published: 'teal',
  Completed: 'default',
  Current: 'cyan',
  Live: 'green',
}

type Props = TimelineEntry & { avatar?: StaticImageData | string }

const TimelineItem = ({ title, category, date, description, status, avatar }: Props) => (
  <li className="relative pl-12 pb-10 border-l-2 border-primary/40 last:border-l-transparent">
    <span className="absolute -left-[18px] top-0 w-8 h-8 rounded-full bg-surface border-2 border-primary overflow-hidden">
      {avatar && (
        <Image src={avatar} alt="" width={32} height={32} className="object-cover w-full h-full" />
      )}
    </span>
    <div className="bg-surface border border-border rounded-lg p-5 hover:border-primary/60 transition-colors">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="text-white font-bold">{title}</h3>
        {category && <Badge>{category}</Badge>}
      </div>
      <p className="text-muted text-xs font-mono mb-2">{date}</p>
      {description && <p className="text-muted text-sm leading-relaxed mb-3">{description}</p>}
      {status && (
        <Badge variant={STATUS_VARIANT[status] || 'default'}>
          {status === 'Current' ? '● Current' : status}
        </Badge>
      )}
      <div className="mt-4 h-0.5 bg-primary/30 rounded-full">
        <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
      </div>
    </div>
  </li>
)

export default TimelineItem
