import Button from '@/components/ui/Button'
import StatBadge from '@/components/ui/StatBadge'
import Pill from '@/components/ui/Pill'
import HeroDemo from './HeroDemo'

const STATS = [
  { value: '3', label: 'Papers' },
  { value: 'Harvard + BU', label: 'Education' },
  { value: '6+ Years', label: 'Tech Experience' },
  { value: '3D SSL', label: 'Pioneer' },
]

const TAGS = [
  'AI Researcher',
  'Forward Deployed',
  'Distributed Systems',
  '3D Vision',
  'Stripe',
  'Open Source',
]

const Hero = () => (
  <section className="px-6 py-10 md:py-16 max-w-6xl mx-auto">
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
      <div>
        <Pill className="mb-5">The work · papers · tools · talks</Pill>

        <h1 className="text-4xl md:text-6xl font-bold text-text leading-[1.04] tracking-tight">
          Arkash Jain.
        </h1>

        <p className="mt-5 text-base text-muted max-w-xl leading-relaxed">
          AI researcher (Harvard) and forward-deployed engineer at Benmore — three published papers
          including SpatialDINO (3D self-supervised vision transformer for live-cell microscopy),
          and the toolkit that makes SMB AI consulting compound.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/about#career" variant="primary">
            View My Work →
          </Button>
          <Button href="/media" variant="ghost">
            Watch Talks →
          </Button>
          <Button href="/writing" variant="ghost">
            Read My Writing →
          </Button>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {TAGS.map((t) => (
            <Pill key={t} className="!text-muted">
              {t}
            </Pill>
          ))}
        </div>
      </div>

      <div>
        <HeroDemo />
      </div>
    </div>

    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 py-6 border-y border-border stagger">
      {STATS.map((s) => (
        <StatBadge key={s.label} value={s.value} label={s.label} />
      ))}
    </div>
  </section>
)

export default Hero
