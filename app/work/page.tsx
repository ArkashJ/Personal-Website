import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { WORK_TOOLS } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Work — Tools & CLIs',
  description:
    'Internal tooling: Benmore Foundry CLI, RTK (Rust Token Killer), Claude Code skills, discovery flows.',
  path: '/work',
})

export default function WorkPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Work"
        title="Tools & CLIs I built that I use every day"
        description="The internal tooling layer at Benmore. Each one started as a one-off and graduated when it earned its keep."
      />
      <div className="grid gap-4 md:grid-cols-2 mt-8">
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
    </div>
  )
}
