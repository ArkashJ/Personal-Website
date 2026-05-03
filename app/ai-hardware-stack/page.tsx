import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import JsonLd from '@/components/seo/JsonLd'
import { articleSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'

const TITLE = 'The Complete AI Hardware Stack — Layer by Layer'
const DESCRIPTION =
  'Interactive deck walking through every layer of the modern AI hardware stack — from 3nm silicon and CoWoS-L packaging up through HBM3e, NVLink, InfiniBand, CUDA kernels, and disaggregated serving.'
const PATH = '/ai-hardware-stack'
const RAW_HTML = '/ai-hardware-stack.html'

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: 'article',
  keywords: [
    'AI hardware stack',
    'HBM3e',
    'NVLink',
    'CoWoS',
    'CUDA',
    'FlashAttention',
    'co-packaged optics',
    'EDA',
    'disaggregated serving',
    'Blackwell B200',
  ],
})

export default function AiHardwareStackDeckPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <JsonLd
        data={articleSchema({
          title: TITLE,
          description: DESCRIPTION,
          date: '2026-04-28',
          slug: PATH,
        })}
      />

      <Link
        href="/knowledge/ai"
        className="font-mono text-primary text-xs hover:text-accent uppercase tracking-widest"
      >
        ← AI Knowledge
      </Link>

      <SectionHeader
        eyebrow="AI Hardware Stack · Deck"
        title={TITLE}
        description={DESCRIPTION}
        asH1
      />

      <div className="border border-border bg-surface">
        <iframe
          src={RAW_HTML}
          title={TITLE}
          loading="lazy"
          className="w-full block"
          style={{ height: '85vh', border: 0 }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <a
          href={RAW_HTML}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-primary text-xs hover:text-accent uppercase tracking-widest"
        >
          View raw HTML ↗
        </a>
        <Link
          href="/knowledge/ai/ai-hardware-stack"
          className="font-mono text-primary text-xs hover:text-accent uppercase tracking-widest"
        >
          Read the long-form essay →
        </Link>
      </div>
    </div>
  )
}
