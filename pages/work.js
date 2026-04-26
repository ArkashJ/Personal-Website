import SectionHeader from '../components/sections/SectionHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { WORK_TOOLS } from '../lib/data'

export default function Work() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Work"
        title="Tools & CLIs I built that I use every day"
        description="The internal tooling layer. Demos roll into this page as recordings land in /public/demos."
      />
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {WORK_TOOLS.map((w) => (
          <Card key={w.name} glow>
            <h3 className="text-xl font-bold text-white mb-2">{w.name}</h3>
            <p className="text-muted text-sm mb-4 leading-relaxed">{w.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {w.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <div className="rounded-md border border-dashed border-border bg-bg/40 px-4 py-3 text-xs font-mono text-muted">
              Demo coming — record with <code className="text-accent">ffmpeg</code> recipes from the
              README.
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

Work.meta = {
  title: 'Work — Tools & CLIs',
  path: '/work',
  description:
    'Internal tooling: Benmore Foundry CLI, RTK (Rust Token Killer), Claude Code skills, discovery flows.',
}
