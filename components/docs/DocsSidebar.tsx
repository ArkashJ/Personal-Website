import Link from 'next/link'
import type { DocEntry } from '@/lib/docs'

type Props = {
  byCategory: Record<DocEntry['category'], DocEntry[]>
  activeSlug?: string
}

const CATEGORY_ORDER: DocEntry['category'][] = [
  'Getting Started',
  'Reference',
  'Planning',
  'Releases',
]

const DocsSidebar = ({ byCategory, activeSlug }: Props) => (
  <nav className="space-y-8">
    {CATEGORY_ORDER.filter((cat) => byCategory[cat]?.length).map((cat) => (
      <div key={cat}>
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-3">{cat}</h3>
        <ul className="space-y-1.5">
          {byCategory[cat].map((d) => {
            const active = activeSlug === d.slug
            return (
              <li key={d.slug}>
                <Link
                  href={`/docs/${d.slug}`}
                  className={`block text-sm transition-colors ${
                    active ? 'text-primary font-medium' : 'text-muted hover:text-text'
                  }`}
                >
                  {d.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    ))}
  </nav>
)

export default DocsSidebar
