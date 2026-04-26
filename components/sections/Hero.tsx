import Button from '@/components/ui/Button'
import StatBadge from '@/components/ui/StatBadge'

const STATS = [
  { value: '4', label: 'Papers Published' },
  { value: 'Harvard + BU', label: 'Education' },
  { value: '887%', label: 'Revenue Growth' },
  { value: '3D SSL', label: 'Pioneer' },
]

const Hero = () => (
  <section className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
    <p className="font-mono text-primary text-sm mb-4 tracking-wider uppercase">
      AI Researcher · Forward Deployed Engineer · Builder
    </p>
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
      Hi, I&apos;m Arkash Jain.
    </h1>
    <p className="text-lg md:text-xl text-muted max-w-3xl mb-10 leading-relaxed">
      Physicist turned distributed-systems researcher turned Harvard AI researcher, now Head of FDE
      at Benmore — building the operating system for American cattle ranches and helping SMBs
      compound through AI.
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-6 border-y border-border">
      {STATS.map((s) => (
        <StatBadge key={s.label} value={s.value} label={s.label} />
      ))}
    </div>

    <div className="flex flex-wrap gap-4">
      <Button href="/work" variant="primary">
        View My Work →
      </Button>
      <Button href="/writing" variant="ghost">
        Read My Writing →
      </Button>
    </div>
  </section>
)

export default Hero
