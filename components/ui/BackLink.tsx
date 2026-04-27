import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Props = { href: string; label: string }

const BackLink = ({ href, label }: Props) => (
  <Link
    href={href}
    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted hover:text-primary transition-colors group"
  >
    <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
    {label}
  </Link>
)

export default BackLink
