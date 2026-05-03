import SectionHeader from '@/components/sections/SectionHeader'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { getAllSkills, getCategories } from '@/lib/skills'
import SkillsClient from './SkillsClient'

export const metadata = buildMetadata({
  title: 'Skills — 71 Claude Code skills, copy-ready for LLMs',
  description:
    'A public library of 71 Claude Code skills authored for forward-deployed engineering: AI SEO, design, payments, compliance, CLI tooling, and more. Each one is one click to copy into your LLM.',
  path: '/skills',
  keywords: [
    'Claude Code skills',
    'agent skills',
    'LLM prompts',
    'AI agents',
    'forward deployed engineering',
    'bm CLI',
  ],
})

export default function SkillsPage() {
  const skills = getAllSkills()
  const categories = getCategories(skills)

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Skills', path: '/skills' },
        ])}
      />
      <SectionHeader
        eyebrow="Skills Library"
        title={`${skills.length} Claude Code skills.`}
        italicAccent="Each one, one click into your LLM."
        description="A public library of agent skills used daily at Benmore — payments, design, compliance, CLI tooling, AI SEO, frontend production. Click any skill to copy its full SKILL.md into your clipboard, then paste into Claude, ChatGPT, or any LLM."
        asH1
      />

      <div className="mt-6 mb-2 grid gap-3 md:grid-cols-2">
        <a
          href="https://github.com/Benmore-Studio/Benmore-Meridian"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-surface border border-border p-4 hover:border-primary/60 transition-[border-color] duration-150"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
            Source on GitHub
          </p>
          <p className="text-text text-sm font-semibold">Benmore-Studio/Benmore-Meridian</p>
          <p className="text-muted text-xs mt-1">
            Full repo with bm CLI, plugin guides, and the install guide.
          </p>
        </a>
        <div className="bg-surface border border-border p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
            Quick install
          </p>
          <code className="text-text text-xs font-mono block bg-bg/40 border border-border px-2 py-1.5 mt-1">
            pipx install bm && bm install
          </code>
          <p className="text-muted text-xs mt-1.5">
            Or copy individual SKILL.md content from any card below.
          </p>
        </div>
      </div>

      <SkillsClient skills={skills} categories={categories} />
    </div>
  )
}
