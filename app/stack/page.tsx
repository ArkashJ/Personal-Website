import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import { STACK } from '@/lib/stack'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Stack — What I Use',
  description:
    'The current stack: hardware, editor, languages, frameworks, AI tooling, infrastructure, and services. Updated when something graduates from experiment to default.',
  path: '/stack',
})

export default function StackPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Stack"
        title="What I use."
        italicAccent="Updated when something earns it."
        description="Hardware, editor, languages, frameworks, infra. Opinionated. Real."
      />

      <div className="space-y-12">
        {STACK.map((group) => (
          <section key={group.category}>
            <h3 className="font-mono text-primary text-[11px] uppercase tracking-widest mb-4 pb-2 border-b border-border">
              {group.category}
            </h3>
            <div className="grid gap-4 md:grid-cols-2 reveal">
              {group.items.map((item) => (
                <Card key={item.name} glow className="flex flex-col h-full">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h4 className="text-base font-bold text-text tracking-tight">{item.name}</h4>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[10px] text-primary hover:text-accent uppercase tracking-widest whitespace-nowrap"
                      >
                        Link →
                      </a>
                    )}
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{item.why}</p>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
