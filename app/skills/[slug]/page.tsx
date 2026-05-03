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
            href={`https://github.com/Benmore-Studio/Benmore-Meridian/blob/main/skills/${slug}/SKILL.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-mono border border-border text-muted hover:border-primary hover:text-primary transition-[color,border-color] duration-150"
          >
            GitHub →
          </a>
          <span className="ml-auto text-[11px] font-mono text-subtle">{skill.lineCount} lines</span>
        </div>
      </header>

      <SkillBody body={skill.body} />

      <footer className="mt-12 pt-6 border-t border-border">
        <Link
          href="/skills"
          className="font-mono text-xs text-primary hover:text-accent transition-colors duration-150"
        >
          ← Browse all skills
        </Link>
      </footer>
    </article>
  )
}
