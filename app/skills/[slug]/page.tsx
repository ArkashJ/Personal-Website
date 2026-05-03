import { notFound } from 'next/navigation'
import Link from 'next/link'
import BackLink from '@/components/ui/BackLink'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { getAllSkills, getSkill } from '@/lib/skills'
import SkillCopyButton from './SkillCopyButton'
import SkillBody from './SkillBody'

type Params = { slug: string }

export function generateStaticParams() {
  return getAllSkills().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const skill = getSkill(slug)
  if (!skill) return {}
  return buildMetadata({
    title: `${skill.name} — Skill`,
    description: skill.description.slice(0, 200),
    path: `/skills/${slug}`,
    keywords: ['Claude Code', 'agent skills', skill.name, skill.category],
  })
}

export default async function SkillPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const skill = getSkill(slug)
  if (!skill) notFound()

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Skills', path: '/skills' },
          { name: skill.name, path: `/skills/${slug}` },
        ])}
      />
      <BackLink href="/skills" label="All skills" />

      <header className="mt-4 mb-8 pb-6 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">
          ● {skill.category}
        </p>
        <h1 className="text-3xl font-bold text-text mb-3 font-mono">{skill.name}</h1>
        <p className="text-muted leading-relaxed">{skill.description}</p>
        <div className="flex items-center gap-3 mt-5 flex-wrap">
          <SkillCopyButton slug={slug} />
          <a
            href={`/skills/${slug}/raw`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-mono border border-border text-muted hover:border-primary hover:text-primary transition-[color,border-color] duration-150"
          >
            View raw .md →
          </a>
          <a
            href="https://skills.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-mono border border-border text-muted hover:border-primary hover:text-primary transition-[color,border-color] duration-150"
          >
            skills.sh →
          </a>
          <span className="ml-auto text-[11px] font-mono text-subtle">{skill.lineCount} lines</span>
        </div>
      </header>

      <SkillBody body={skill.body} />

      {/* Per-skill credit + install hint */}
      <aside className="mt-12 bg-surface border border-border p-5">
        <div className="flex items-baseline justify-between gap-4 mb-3 flex-wrap">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
            ● Authored at Benmore Technologies
          </p>
          <a
            href="https://benmore.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted hover:text-primary transition-colors duration-150"
          >
            benmore.tech →
          </a>
        </div>
        <p className="text-muted text-xs leading-relaxed mb-4">
          Used daily by the Benmore forward-deployed engineering team. Built on the open Anthropic
          Skills format — drop the SKILL.md into any agent that supports skills, or paste it into a
          web LLM as a system prompt.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-text mb-2">
          Install just this skill
        </p>
        <pre className="text-text text-[11px] font-mono bg-elevated border border-border px-2 py-2 leading-relaxed overflow-x-auto">{`# Claude Code
mkdir -p ~/.claude/skills/${slug}
curl -fsSL https://www.arkashj.com/skills/${slug}/raw \\
  -o ~/.claude/skills/${slug}/SKILL.md

# Cursor
curl -fsSL https://www.arkashj.com/skills/${slug}/raw \\
  -o .cursor/rules/${slug}.mdc

# Symlink it back to the upstream copy
ln -s ~/.claude/skills/${slug}/SKILL.md .cursor/rules/${slug}.mdc`}</pre>
      </aside>

      <footer className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-4 flex-wrap">
        <Link
          href="/skills"
          className="font-mono text-xs text-primary hover:text-accent transition-colors duration-150"
        >
          ← Browse all skills
        </Link>
        <span className="font-mono text-[10px] text-subtle uppercase tracking-widest">
          {skill.category} · {skill.lineCount} lines
        </span>
      </footer>
    </article>
  )
}
