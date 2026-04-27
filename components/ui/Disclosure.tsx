'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

type Props = {
  collapsedLabel?: string
  expandedLabel?: string
  children: ReactNode
}

const Disclosure = ({
  collapsedLabel = 'Show more',
  expandedLabel = 'Show less',
  children,
}: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="pt-4">{children}</div>
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary hover:text-accent transition-colors"
        aria-expanded={open}
      >
        {open ? expandedLabel : collapsedLabel}
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  )
}

export default Disclosure
