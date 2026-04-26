import Button from '@/components/ui/Button'
import StatBadge from '@/components/ui/StatBadge'

const STATS = [
  { value: '4', label: 'Papers' },
  { value: 'Harvard + BU', label: 'Education' },
  { value: '887%', label: 'Revenue Growth' },
  { value: '3D SSL', label: 'Pioneer' },
]

const Hero = () => (
  <section className="px-6 py-24 md:py-32 max-w-6xl mx-auto">
    <p className="font-mono text-primary text-[11px] mb-6 tracking-widest uppercase">
      AI Researcher · Forward Deployed Engineer · Builder
    </p>
    <h1 className="text-5xl md:text-7xl font-bold text-text mb-8 leading-[1.05] tracking-tight">
      Arkash Jain.
    </h1>
    <p className="text-lg md:text-xl text-muted max-w-3xl mb-12 leading-relaxed">
      Physicist turned distributed-systems researcher turned Harvard AI researcher, now Head of FDE
      at Benmore — building the operating system for American cattle ranches and helping SMBs
      compound through AI.
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 mb-12 py-8 border-y border-border">
      {STATS.map((s) => (
        <StatBadge key={s.label} value={s.value} label={s.label} />
      ))}
    </div>

    <div className="flex flex-wrap gap-3">
      <Button href="/work" variant="primary">
        View My Work →
      </Button>
      <Button href="/writing" variant="ghost">
        Read My Writing →
      </Button>
      <Button href="/research" variant="outline">
        Research →
      </Button>
    </div>
  </section>
)

export default Hero
