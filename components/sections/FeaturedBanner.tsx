import Link from 'next/link'
import { activeBanner } from '@/lib/banners'

const FeaturedBanner = () => {
  const banner = activeBanner()
  if (!banner) return null

  const inner = (
    <div className="flex items-center gap-3 px-4 py-2 text-xs font-mono">
      <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-primary dot-pulse" />
      <span className="uppercase tracking-widest text-primary">{banner.headline}</span>
      {banner.body && <span className="text-muted normal-case tracking-normal">{banner.body}</span>}
      {banner.href && (
        <span className="ml-auto text-primary uppercase tracking-widest hidden sm:inline">
          {banner.ctaLabel ?? 'View'} →
        </span>
      )}
    </div>
  )

  return banner.href ? (
    <Link
      href={banner.href}
      className="block bg-surface border border-border hover:border-primary transition-[border-color] duration-150"
    >
      {inner}
    </Link>
  ) : (
    <div className="bg-surface border border-border">{inner}</div>
  )
}

export default FeaturedBanner
