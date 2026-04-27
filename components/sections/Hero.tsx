import Button from '@/components/ui/Button'
import StatBadge from '@/components/ui/StatBadge'
import Pill from '@/components/ui/Pill'
import HeroDemo from './HeroDemo'

const STATS = [
  { value: '3', label: 'Papers' },
  { value: 'Harvard + BU', label: 'Education' },
  { value: '887%', label: 'Revenue Growth' },
  { value: '3D SSL', label: 'Pioneer' },
]

const TAGS = [
  'AI Researcher',
  'Forward Deployed',
  'Distributed Systems',
  'Cryo-ET',
  'Stripe',
  'Open Source',
]

const Hero = () => (
  <section className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
      <div>
        <Pill className="mb-8">The work · papers · tools · talks</Pill>

        <h1 className="text-5xl md:text-7xl font-bold text-text leading-[1.02] tracking-tight">
          Arkash Jain.
        </h1>

        <p className="mt-8 text-base md:text-lg text-muted max-w-xl leading-relaxed">
          AI researcher (Harvard) and forward-deployed engineer at Benmore — three published papers
          including SpatialDINO (3D self-supervised cryo-ET), and the toolkit that makes SMB AI
          consulting compound.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/experience" variant="primary">
            View My Work →
          </Button>
          <Button href="/writing" variant="ghost">
            Read My Writing →
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <Pill key={t} className="!text-muted">
              {t}
            </Pill>
          ))}
        </div>
      </div>

      <div className="lg:mt-2">
        <HeroDemo />
      </div>
    </div>

    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 py-8 border-y border-border stagger">
      {STATS.map((s) => (
        <StatBadge key={s.label} value={s.value} label={s.label} />
      ))}
    </div>
  </section>
)

export default Hero
