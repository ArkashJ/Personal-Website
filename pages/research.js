import SectionHeader from '../components/sections/SectionHeader'
import PaperCard from '../components/sections/PaperCard'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import JsonLd, { scholarlyArticleSchema } from '../components/seo/JsonLd'
import { PAPERS } from '../lib/data'

export default function Research() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      {PAPERS.map((p) => (
        <JsonLd key={p.title} data={scholarlyArticleSchema(p)} />
      ))}

      <SectionHeader
        eyebrow="Research"
        title="Four published papers, one thesis"
        description="From supercritical fluids to 3D self-supervised vision transformers."
      />

      <div className="grid gap-6 md:grid-cols-2 mt-8">
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

Research.meta = {
  title: 'Research — SpatialDINO, Cell Biology ML, 4 Published Papers',
  path: '/research',
  description:
    'Four published papers including SpatialDINO (3D self-supervised vision transformer for cryo-ET), two Journal of Cell Biology papers, and supercritical fluid spectroscopy.',
}
