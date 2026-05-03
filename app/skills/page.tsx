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
        title={`${skills.length} agent skills.`}
        italicAccent="Each one, one click into your LLM."
        description="A library of agent skills used daily at Benmore Technologies — payments, design, compliance, CLI tooling, AI SEO, frontend production. Built on the open Anthropic Skills format. Click any skill to copy its full SKILL.md into your clipboard, then paste into Claude, ChatGPT, or any LLM."
        asH1
      />

      {/* Install instructions — for humans AND LLMs reading this page */}
      <section className="mt-8 mb-10 bg-surface border border-border">
        <header className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-3">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary">
            ● How to use these skills
          </h2>
          <a
            href="https://skills.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-primary transition-colors duration-150"
          >
            More on skills.sh →
          </a>
        </header>
        <div className="grid divide-y divide-border md:grid-cols-3 md:divide-y-0 md:divide-x">
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text mb-2">
              ① One skill, one paste
            </p>
            <p className="text-muted text-xs leading-relaxed mb-2">
              Hit <span className="text-primary font-mono">Copy for LLM</span> on any card. Paste
              the SKILL.md into Claude, ChatGPT, Cursor, or any agent — it&apos;s a self-contained
              system prompt.
            </p>
          </div>
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text mb-2">
              ② Install all globally (Claude Code)
            </p>
            <pre className="text-text text-[11px] font-mono bg-elevated border border-border px-2 py-2 leading-relaxed overflow-x-auto">{`mkdir -p ~/.claude/skills
for s in $(curl -s https://www.arkashj.com/skills.json | jq -r '.[]'); do
  curl -fsSL "https://www.arkashj.com/skills/$s/raw" \\
    -o ~/.claude/skills/$s.md
done`}</pre>
          </div>
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text mb-2">
              ③ Symlink for your LLM
            </p>
            <p className="text-muted text-xs leading-relaxed mb-2">Pick the path your tool uses:</p>
            <ul className="text-[11px] font-mono text-muted space-y-1">
              <li>
                <span className="text-primary">Claude Code</span>:
                ~/.claude/skills/&lt;name&gt;/SKILL.md
              </li>
              <li>
                <span className="text-primary">Cursor</span>: .cursor/rules/&lt;name&gt;.mdc
              </li>
              <li>
                <span className="text-primary">Codex</span>: ~/.codex/skills/&lt;name&gt;.md
              </li>
              <li>
                <span className="text-primary">Web LLM</span>: paste into a Project / Custom GPT
              </li>
            </ul>
          </div>
        </div>
        <p className="px-5 py-3 text-[11px] font-mono text-subtle border-t border-border">
          Authored at{' '}
          <a
            href="https://benmore.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors duration-150"
          >
            Benmore Technologies →
          </a>{' '}
          · MIT-style usage. Skills are documentation, not executable code — review before running
          anything they suggest.
        </p>
      </section>

      <SkillsClient skills={skills} categories={categories} />
    </div>
  )
}
