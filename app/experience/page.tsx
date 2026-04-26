import SectionHeader from '@/components/sections/SectionHeader'
import ExperienceCard from '@/components/sections/ExperienceCard'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { EXPERIENCE, WORK_TOOLS } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Experience & Work — Benmore, Harvard, Tools & CLIs',
  description:
    'Career history (Benmore, Harvard, ZeroSync, Boston Children’s, BU, Battery Ventures) and the internal tooling I ship every day — Foundry CLI, RTK, Claude Code skills.',
  path: '/experience',
})

export default function ExperiencePage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Experience & Work"
        title="Where I've worked, what I've shipped."
        italicAccent="Career arc + the tools that came out of it."
        description="Reverse-chronological work history, followed by the internal tooling layer that compounds across every engagement."
      />

      <section id="career" className="mt-12 max-w-4xl mx-auto">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
          ● Career
        </h2>
        <div className="grid gap-6 reveal">
          {EXPERIENCE.map((e) => (
            <ExperienceCard key={`${e.org}-${e.role}`} {...e} />
          ))}
        </div>
      </section>

      <section id="tools" className="mt-20">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
          ● Tools & CLIs
        </h2>
        <p className="text-muted text-sm mb-6 max-w-2xl">
          Each one started as a one-off and graduated when it earned its keep.
        </p>
        <div className="grid gap-4 md:grid-cols-2 reveal">
          {WORK_TOOLS.map((w) => (
            <Card key={w.name} glow className="flex flex-col h-full">
              <h3 className="text-lg font-bold text-text mb-2 tracking-tight">{w.name}</h3>
              <p className="text-muted text-sm mb-4 leading-relaxed flex-1">{w.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {w.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
