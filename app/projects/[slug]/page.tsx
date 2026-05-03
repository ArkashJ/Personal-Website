import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { ComponentProps } from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/metadata'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { getReadme } from '@/lib/projects-readme'

// slug -> "owner/repo" for the README eyebrow. Mirrors scripts/sync-project-readmes.mjs.
const README_REPOS: Record<string, string> = {
  'benmore-meridian': 'Benmore-Studio/Benmore-Meridian',
  raft: 'ArkashJ/Raft',
  'cloudcomputing-coursework-projects': 'ArkashJ/CloudComputing',
  'nexmark-benchmark': 'ArkashJ/NEXMARK-Benchmark',
  'implicit-sgd': 'ArkashJ/implict-SGD-implementation',
  'cs411-software-engineering-labs': 'ArkashJ/CS411_labs',
  'ocaml-interpreter': 'ArkashJ/OCaml-Interpreter',
  'stu-street-podcast': 'ArkashJ/STU-STREET-Website',
  'compound-engineering-skills': 'Benmore-Studio/Benmore-Meridian',
}

const readmeMdxComponents = {
  h1: (p: ComponentProps<'h1'>) => <h1 className="text-2xl font-bold text-text mt-8 mb-3" {...p} />,
  h2: (p: ComponentProps<'h2'>) => <h2 className="text-xl font-bold text-text mt-8 mb-3" {...p} />,
  h3: (p: ComponentProps<'h3'>) => <h3 className="text-lg font-bold text-text mt-6 mb-2" {...p} />,
  p: (p: ComponentProps<'p'>) => <p className="text-muted leading-relaxed mb-4" {...p} />,
  a: (p: ComponentProps<'a'>) => (
    <a className="text-primary hover:text-accent underline underline-offset-2" {...p} />
  ),
  ul: (p: ComponentProps<'ul'>) => (
    <ul className="list-disc list-outside ml-5 mb-4 text-muted space-y-1.5" {...p} />
  ),
  ol: (p: ComponentProps<'ol'>) => (
    <ol className="list-decimal list-outside ml-5 mb-4 text-muted space-y-1.5" {...p} />
  ),
  li: (p: ComponentProps<'li'>) => <li className="leading-relaxed" {...p} />,
  blockquote: (p: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-2 border-primary pl-4 py-1 my-5 text-muted italic" {...p} />
  ),
  code: (p: ComponentProps<'code'>) => (
    <code
      className="bg-surface border border-border text-accent text-[12px] font-mono px-1.5 py-0.5 rounded"
      {...p}
    />
  ),
  pre: (p: ComponentProps<'pre'>) => (
    <pre
      className="bg-elevated border border-border text-muted text-xs font-mono p-4 rounded-lg overflow-x-auto my-4"
      {...p}
    />
  ),
  hr: () => <hr className="border-border my-8" />,
  strong: (p: ComponentProps<'strong'>) => <strong className="text-text font-bold" {...p} />,
  em: (p: ComponentProps<'em'>) => <em className="text-text" {...p} />,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  img: (p: ComponentProps<'img'>) => <img className="max-w-full h-auto my-4" {...p} />,
  table: (p: ComponentProps<'table'>) => (
    <div className="overflow-x-auto my-4">
      <table className="text-sm text-muted border border-border" {...p} />
    </div>
  ),
  th: (p: ComponentProps<'th'>) => (
    <th className="border border-border px-3 py-1.5 text-left font-semibold text-text" {...p} />
  ),
  td: (p: ComponentProps<'td'>) => <td className="border border-border px-3 py-1.5" {...p} />,
}

async function ReadmeBody({ source }: { source: string }) {
  try {
    // MDXRemote is async — awaiting it here lets us catch parse errors and
    // fall back to a plain <pre> instead of 500ing the page.
    return await MDXRemote({
      source,
      components: readmeMdxComponents,
      options: { mdxOptions: { remarkPlugins: [], rehypePlugins: [] } },
    })
  } catch {
    return (
      <pre className="whitespace-pre-wrap text-sm text-muted font-mono leading-relaxed bg-surface border border-border p-4 overflow-x-auto">
        {source}
      </pre>
    )
  }
}

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  const description =
    project.description.slice(0, 200) + (project.description.length > 200 ? '…' : '')
  return buildMetadata({
    title: project.name,
    description,
    path: `/projects/${slug}`,
    keywords: project.tech ?? [],
  })
}

function ExternalLinkIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" />
      <path d="M8 1h3v3" />
      <path d="M11 1 6 6" />
    </svg>
  )
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return notFound()

  const year = 'year' in project ? project.year : undefined
  const isExternal = project.href ? /^https?:\/\//.test(project.href) : false
  const highlights = project.highlights ?? []
  const commands = project.commands ?? []
  const readme = getReadme(slug)
  const readmeRepo = README_REPOS[slug]

  return (
    <article className="px-6 py-16 max-w-3xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.name, path: `/projects/${slug}` },
        ])}
      />

      <Link href="/projects" className="text-primary hover:text-accent font-mono text-sm">
        ← Projects
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-text mt-6 mb-3">{project.name}</h1>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {year && (
          <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">{year}</span>
        )}
        <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
          {project.kind === 'work-tool' ? 'Internal tool' : 'Project'}
        </span>
        {project.href ? (
          <a
            href={project.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="font-mono text-[11px] uppercase tracking-wider text-primary hover:text-accent flex items-center gap-1 transition-colors"
          >
            View on GitHub <ExternalLinkIcon />
          </a>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">
            Internal / private
          </span>
        )}
      </div>

      <p className="text-muted text-lg leading-relaxed mb-8 whitespace-pre-line">
        {project.description}
      </p>

      {highlights.length > 0 && (
        <section className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
            Highlights
          </p>
          <ul className="space-y-2 list-disc list-outside ml-4 marker:text-primary/50">
            {highlights.map((h) => (
              <li key={h} className="text-sm text-muted leading-relaxed">
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      {commands.length > 0 && (
        <section className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
            Run it
          </p>
          <div className="space-y-1.5">
            {commands.map((c) => (
              <pre
                key={c}
                className="font-mono text-[12px] text-primary/90 bg-surface border border-border px-3 py-2 overflow-x-auto"
              >
                <code>$ {c}</code>
              </pre>
            ))}
          </div>
        </section>
      )}

      {project.tech.length > 0 && (
        <section className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">Tech</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </section>
      )}

      {project.href && (
        <Card>
          <p className="text-sm text-muted mb-3">
            The canonical source for this {project.kind === 'work-tool' ? 'tool' : 'project'} is on{' '}
            {isExternal ? 'GitHub' : 'the linked surface'}.
          </p>
          <a
            href={project.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:text-accent active:scale-[0.97] border border-primary/60 hover:border-accent px-3 py-2 transition-[color,border-color,transform] duration-150"
          >
            View on GitHub <ExternalLinkIcon />
          </a>
        </Card>
      )}

      {readme && (
        <section className="mt-12 pt-10 border-t border-border">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-6">
            {readmeRepo ? `README · github.com/${readmeRepo}` : 'README'}
          </p>
          <div className="readme-body">
            <ReadmeBody source={readme} />
          </div>
        </section>
      )}
    </article>
  )
}
