import SectionHeader from '@/components/sections/SectionHeader'
import PaperCard from '@/components/sections/PaperCard'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import JsonLd from '@/components/seo/JsonLd'
import { scholarlyArticleSchema, breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { PAPERS } from '@/lib/data'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Research — SpatialDINO, Cell Biology ML, 3 Published Papers',
  description:
    'Three published papers including SpatialDINO (3D self-supervised vision transformer for lattice light-sheet microscopy), one Journal of Cell Biology paper, and supercritical fluid spectroscopy in J. Chem. Phys.',
  path: '/research',
  keywords: [
    'SpatialDINO',
    'lattice light-sheet microscopy',
    '2DIR spectroscopy',
    'supercritical fluids',
    'ultrafast lasers',
    'vision transformers',
  ],
})

export default function ResearchPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Research', path: '/research' },
        ])}
      />
      {PAPERS.map((p) => (
        <JsonLd key={p.title} data={scholarlyArticleSchema(p)} />
      ))}
      <JsonLd
        data={faqSchema([
          {
            q: 'What is SpatialDINO?',
            a: 'A 3D self-supervised vision transformer for label-free segmentation and tracking of subcellular dynamics in lattice light-sheet microscopy (LLSM). First-author work from the Kirchhausen Lab at Harvard Medical School. Pre-trained on 2.4 TB / 180k volumes across 24 NVIDIA A100s with PyTorch DDP, bf16 mixed precision. Outperformed a prior approach co-led by Nobel laureate Eric Betzig on downstream subcellular structure prediction. Released as a BioRxiv preprint.',
          },
          {
            q: 'What is lattice light-sheet microscopy (LLSM)?',
            a: "LLSM is a 4D live-cell imaging technique developed in the Betzig lab that uses a thin lattice-shaped light sheet to acquire volumetric data of subcellular dynamics at roughly 3 nm resolution. It's the imaging modality SpatialDINO was designed for.",
          },
          {
            q: 'What hardware did you train SpatialDINO on?',
            a: '24 NVIDIA A100 GPUs with PyTorch DDP, bf16 mixed precision, NVLink intra-node, and InfiniBand inter-node. The training also surfaced a Rendezvous backend bug in PyTorch that we contributed a fix for (PR #144779), which unblocked multi-node InfiniBand training for the broader community.',
          },
          {
            q: 'What was the supercritical fluid paper about?',
            a: 'Published in J. Chem. Phys. (Nov 2022), first-author work using ultrafast two-dimensional infrared spectroscopy to study rotational energy transfer, isolated binary collision breakdown, and near-critical fluctuations in Xe and SF6 solutions.',
          },
          {
            q: 'Are the papers open-access?',
            a: 'SpatialDINO is on BioRxiv (open-access). The Journal of Cell Biology paper is open at rupress.org. The J. Chem. Phys. paper is available via the AIP. Direct links and DOIs are on the research page.',
          },
        ])}
      />

      <SectionHeader
        eyebrow="Research"
        title="Three published papers."
        italicAccent="One thesis."
        description="From supercritical fluids in chemical physics to 3D self-supervised vision transformers at Harvard. Each paper, the journal, and a link."
        asH1
      />

      <div className="grid gap-6 md:grid-cols-2 mt-8 reveal">
        {PAPERS.map((p) => (
          <PaperCard key={p.title} {...p} />
        ))}
      </div>

      <div className="mt-16">
        <SectionHeader
          eyebrow="Infrastructure"
          title="The full ML stack"
          description="What it takes to train SpatialDINO end-to-end."
        />
        <Card glow>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-primary font-mono text-sm uppercase tracking-wider mb-3">
                Training stack
              </h3>
              <ul className="space-y-1.5 text-muted text-sm">
                <li>› Infiniband / RDMA collective ops</li>
                <li>› RAID storage tier with NVMe cache</li>
                <li>› NVLink intra-node, DGX A100/H100 nodes</li>
                <li>› PyTorch FSDP + bf16 mixed precision</li>
                <li>› Activation checkpointing for large models</li>
              </ul>
            </div>
            <div>
              <h3 className="text-primary font-mono text-sm uppercase tracking-wider mb-3">
                Open source
              </h3>
              <p className="text-muted text-sm mb-2">
                <Badge variant="cyan">PyTorch</Badge> <span className="ml-2">Issue #144779</span>
              </p>
              <p className="text-muted text-sm">
                Diagnosed and reported a Rendezvous (RDZV) backend issue affecting Infiniband
                multi-node training; contributed reproduction steps and root-cause analysis.
              </p>
              <a
                href="https://github.com/pytorch/pytorch/issues/144779"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-primary text-sm hover:text-accent inline-block mt-3"
              >
                View issue →
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
