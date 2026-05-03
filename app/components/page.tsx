import SectionHeader from '@/components/sections/SectionHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Pill from '@/components/ui/Pill'
import StatBadge from '@/components/ui/StatBadge'
import Disclosure from '@/components/ui/Disclosure'
import BackLink from '@/components/ui/BackLink'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Components — Design System',
  description: 'A showcase of all reusable UI primitives used across the site.',
  path: '/components',
})

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-6">
      ● {children}
    </h2>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{children}</span>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>
}

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

export default function ComponentsPage() {
  return (
    <div className="px-6 pt-6 pb-16 max-w-6xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Components', path: '/components' },
        ])}
      />

      <SectionHeader
        eyebrow="Design System"
        title="Components"
        italicAccent="All UI primitives in one place."
        description="A living reference for every reusable component used across the site. Useful during development to verify tokens, variants, and states."
        asH1
      />

      <div className="space-y-16">
        {/* Badge */}
        <section>
          <SectionTitle>Badge</SectionTitle>
          <Row>
            <Item label="default">
              <Badge>TypeScript</Badge>
            </Item>
            <Item label="teal">
              <Badge variant="teal">Primary</Badge>
            </Item>
            <Item label="cyan">
              <Badge variant="cyan">Accent</Badge>
            </Item>
            <Item label="green">
              <Badge variant="green">Success</Badge>
            </Item>
          </Row>
        </section>

        {/* Button */}
        <section>
          <SectionTitle>Button</SectionTitle>
          <div className="space-y-6">
            <div>
              <Label>as button element</Label>
              <Row>
                <Item label="primary">
                  <Button variant="primary">Primary</Button>
                </Item>
                <Item label="ghost">
                  <Button variant="ghost">Ghost</Button>
                </Item>
                <Item label="outline">
                  <Button variant="outline">Outline</Button>
                </Item>
              </Row>
            </div>
            <div>
              <Label>as link (internal)</Label>
              <Row>
                <Item label="primary + href">
                  <Button href="/about" variant="primary">
                    Go to About
                  </Button>
                </Item>
                <Item label="ghost + href">
                  <Button href="/research" variant="ghost">
                    Research
                  </Button>
                </Item>
              </Row>
            </div>
            <div>
              <Label>as external link</Label>
              <Row>
                <Item label="outline + external">
                  <Button href="https://github.com" variant="outline">
                    GitHub ↗
                  </Button>
                </Item>
              </Row>
            </div>
          </div>
        </section>

        {/* Card */}
        <section>
          <SectionTitle>Card</SectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            <Item label="default (hover lifts slightly)">
              <Card>
                <p className="text-text font-bold mb-1">Default Card</p>
                <p className="text-muted text-sm">Hover to see the subtle lift effect.</p>
              </Card>
            </Item>
            <Item label="glow (hover glow + stronger lift)">
              <Card glow>
                <p className="text-text font-bold mb-1">Glow Card</p>
                <p className="text-muted text-sm">Hover to see the teal glow shadow effect.</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <Badge variant="teal">React</Badge>
                  <Badge>Next.js</Badge>
                  <Badge variant="green">TypeScript</Badge>
                </div>
              </Card>
            </Item>
          </div>
        </section>

        {/* Pill */}
        <section>
          <SectionTitle>Pill</SectionTitle>
          <Row>
            <Item label="with dot (default)">
              <Pill>Available</Pill>
            </Item>
            <Item label="without dot">
              <Pill withDot={false}>Design System</Pill>
            </Item>
            <Item label="custom class">
              <Pill className="border-accent/40 text-accent">Custom</Pill>
            </Item>
          </Row>
        </section>

        {/* StatBadge */}
        <section>
          <SectionTitle>StatBadge</SectionTitle>
          <Row>
            <Item label="value only">
              <StatBadge value="42" />
            </Item>
            <Item label="value + label">
              <StatBadge value="4" label="Published Papers" />
            </Item>
            <Item label="large value">
              <StatBadge value="200K+" label="Lines of Code" />
            </Item>
            <Item label="percentage">
              <StatBadge value="98%" label="Uptime" />
            </Item>
          </Row>
        </section>

        {/* Disclosure */}
        <section>
          <SectionTitle>Disclosure</SectionTitle>
          <div className="max-w-lg">
            <Item label="toggle to reveal hidden content">
              <Card>
                <p className="text-text text-sm mb-2">
                  This card has additional content hidden behind a disclosure toggle.
                </p>
                <Disclosure collapsedLabel="Show details" expandedLabel="Hide details">
                  <p className="text-muted text-sm leading-relaxed">
                    This is the revealed content. It animates in with a smooth max-height
                    transition. Useful for long lists, fine-print, or secondary information that
                    doesn&apos;t need to be immediately visible.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <Badge variant="teal">Hidden</Badge>
                    <Badge>Until toggled</Badge>
                  </div>
                </Disclosure>
              </Card>
            </Item>
          </div>
        </section>

        {/* BackLink */}
        <section>
          <SectionTitle>BackLink</SectionTitle>
          <Row>
            <Item label="back to home">
              <BackLink href="/" label="Back to home" />
            </Item>
            <Item label="back to writing">
              <BackLink href="/writing" label="All posts" />
            </Item>
            <Item label="back to research">
              <BackLink href="/research" label="Research" />
            </Item>
          </Row>
        </section>
      </div>
    </div>
  )
}
