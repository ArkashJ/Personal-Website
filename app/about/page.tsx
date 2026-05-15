import SectionHeader from '@/components/sections/SectionHeader'
import TimelineItem from '@/components/sections/TimelineItem'
import ExperienceCard from '@/components/sections/ExperienceCard'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { TIMELINE, EXPERIENCE } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'About — Life Changelog, Experience & Work',
  description:
    'Life arc + reverse-chronological work history. Physics → VC → distributed systems → Harvard AI → forward-deployed engineering at Benmore, plus the internal CLIs and tooling that compound across engagements.',
  path: '/about',
  keywords: [
    'life story',
    'experience',
    'career',
    'Benmore',
    'Harvard',
    'Boston University',
    'Battery Ventures',
    'Foundry CLI',
    'RTK',
  ],
})

export default function AboutPage() {
  const featured = TIMELINE.filter((t) => t.featured)
    .slice()
    .reverse()

  return (
    <div className="px-6 py-16 max-w-4xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <JsonLd
        data={faqSchema([
          {
            q: 'Who is Arkash Jain?',
            a: 'AI researcher at the Kirchhausen Lab at Harvard Medical School (author of SpatialDINO, a 3D self-supervised vision transformer for lattice light-sheet microscopy), Forward Deployed Engineer at Benmore Technologies (employee #2, ~887% revenue scaling), and contributor to PyTorch (Rendezvous backend fix PR #144779). Boston University and Harvard alumni, three published papers, four shipped Benmore engagements (Cattle Logic, Propurti, Home Service Pass, Noble Gas).',
          },
          {
            q: 'What does Arkash do at Benmore Technologies?',
            a: 'Head of FDE (Forward Deployed Engineer) — embedded across SMB AI consulting engagements, owns the system end-to-end (Django, FastAPI, Next.js, React Native, Stripe, Claude Code). Author of the Benmore Foundry CLI that orchestrates these engagements and the bm CLI that distributes 77 production Claude skills across the team. Revenue scaled ~887% in under a year because the tooling made every engineer 3-5x more effective per engagement.',
          },
          {
            q: 'What is SpatialDINO?',
            a: 'A 3D self-supervised vision transformer for label-free segmentation and tracking of subcellular dynamics in lattice light-sheet microscopy. Native 3D student/teacher ViTs with 3D iBOT block masking, no positional encoding, a streaming encoder for million-token sequence lengths. Pre-trained on 2.4 TB / 180k volumes across 24 NVIDIA A100s with PyTorch DDP. Outperformed a prior approach co-led by Nobel laureate Eric Betzig on downstream subcellular structure prediction. Released as a BioRxiv preprint, first-author.',
          },
          {
            q: 'What is the O-1 visa evidence hub on arkashj.com?',
            a: 'arkashj.com is structured as both a personal site and an O-1 visa evidence hub — every research paper, project, talk, credential, and engagement that supports the extraordinary-ability application is linked, dated, and source-verifiable. The /credentials route hosts PDF verifiable credentials, /research covers the published papers, and /projects + /work cover the technical contributions.',
          },
          {
            q: 'Where did Arkash study?',
            a: 'Boston University (CS, Distributed Systems research, TA across 2021-2024) and Harvard University (research at Harvard Medical School, Kirchhausen Lab, May 2024 - Aug 2025).',
          },
        ])}
      />
      <SectionHeader
        eyebrow="About"
        title="Life Changelog & Experience."
        italicAccent="In order. Real dates. The full arc."
        description="Every meaningful milestone — arrival in the US, first paper, Harvard, Benmore — followed by a reverse-chronological work history and the internal tooling that came out of it."
        asH1
      />

      {/* Quick anchor strip */}
      <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2 font-mono text-[11px]">
        <a
          href="#timeline"
          className="px-3 py-1.5 border border-border rounded-full text-muted hover:text-primary hover:border-primary press"
        >
          ● Timeline
        </a>
        <a
          href="#career"
          className="px-3 py-1.5 border border-border rounded-full text-muted hover:text-primary hover:border-primary press"
        >
          ● Career
        </a>
      </nav>

      {/* Timeline */}
      <section id="timeline" className="mt-12 scroll-mt-24">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
          ● Life changelog
        </h2>
        <ol className="stagger">
          {featured.map((item) => (
            <TimelineItem key={item.title} {...item} />
          ))}
        </ol>
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-muted text-sm">
            Showing {featured.length} curated milestones.{' '}
            <a
              href="/about/archive"
              className="text-primary hover:text-accent font-mono inline-block ml-1 press"
            >
              See the full archive ({TIMELINE.length}) →
            </a>
          </p>
        </div>
      </section>

      {/* Career — formerly /experience */}
      <section id="career" className="mt-20 scroll-mt-24">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
          ● Career
        </h2>
        <p className="text-muted text-sm mb-6 max-w-2xl">
          Reverse-chronological — from Battery Ventures and BU to Harvard Medical School and
          Benmore.
        </p>
        <div className="grid gap-6 reveal">
          {EXPERIENCE.map((e) => (
            <ExperienceCard key={`${e.org}-${e.role}`} {...e} />
          ))}
        </div>
      </section>
    </div>
  )
}
