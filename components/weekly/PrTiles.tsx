// Report-style PR impact strip: every merged PR is one clickable tile, width
// scaled by additions, colour by impact bucket. Server component (links only).

type Pr = { n: number; url: string; add: number; cat: string }

const BUCKET_BG = [
  'rgba(91,140,255,0.42)', // <400
  'rgba(91,140,255,0.72)', // 400–2k
  'linear-gradient(180deg,#5b8cff,#7c5cff)', // 2k–10k
  'linear-gradient(180deg,#7c5cff,#c0392b)', // 10k+
]
const bucket = (a: number) => (a >= 10000 ? 3 : a >= 2000 ? 2 : a >= 400 ? 1 : 0)

export default function PrTiles({ prs }: { prs: Pr[] }) {
  if (!prs?.length) return null
  const max = Math.max(...prs.map((p) => p.add)) || 1
  const totalAdd = prs.reduce((s, p) => s + p.add, 0)
  const legend = [
    { c: BUCKET_BG[0], l: '<400' },
    { c: BUCKET_BG[1], l: '400–2k' },
    { c: BUCKET_BG[2], l: '2k–10k' },
    { c: BUCKET_BG[3], l: '10k+' },
  ]
  return (
    <section className="my-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[11px] text-neutral-400">
        <span>
          {prs.length} PRs this cycle — each tile is one PR (width = size); click to open on GitHub
        </span>
        <span className="tabular-nums">+{totalAdd.toLocaleString()} lines</span>
      </div>
      <div className="flex flex-wrap gap-[3px]">
        {prs.map((p) => {
          const w = Math.round(6 + (p.add / max) * 52)
          return (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`#${p.n} · ${p.cat} · +${p.add.toLocaleString()}`}
              aria-label={`PR #${p.n}, ${p.cat}, +${p.add.toLocaleString()} lines`}
              style={{ width: `${w}px`, height: '16px', background: BUCKET_BG[bucket(p.add)] }}
              className="block rounded-[3px] transition-transform hover:-translate-y-0.5 hover:outline hover:outline-2 hover:outline-offset-1 hover:outline-[#7c5cff]"
            />
          )
        })}
      </div>
      <div className="mt-2 flex flex-wrap gap-3 font-mono text-[10px] text-neutral-500">
        {legend.map((x) => (
          <span key={x.l} className="inline-flex items-center gap-1.5">
            <i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: x.c }} />
            {x.l}
          </span>
        ))}
      </div>
    </section>
  )
}
