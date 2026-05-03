import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ComponentProps } from 'react'

const components = {
  h1: (p: ComponentProps<'h1'>) => (
    <h1 className="text-2xl font-bold text-text mt-10 mb-4 font-mono" {...p} />
  ),
  h2: (p: ComponentProps<'h2'>) => (
    <h2 className="text-xl font-bold text-text mt-10 mb-3 font-mono" {...p} />
  ),
  h3: (p: ComponentProps<'h3'>) => (
    <h3 className="text-lg font-bold text-text mt-8 mb-2 font-mono" {...p} />
  ),
  h4: (p: ComponentProps<'h4'>) => (
    <h4 className="text-base font-bold text-text mt-6 mb-2 font-mono" {...p} />
  ),
  p: (p: ComponentProps<'p'>) => <p className="text-muted leading-relaxed mb-5" {...p} />,
  a: (p: ComponentProps<'a'>) => (
    <a className="text-primary hover:text-accent underline underline-offset-2" {...p} />
  ),
  ul: (p: ComponentProps<'ul'>) => (
    <ul className="list-disc list-outside ml-5 mb-5 text-muted space-y-1.5" {...p} />
  ),
  ol: (p: ComponentProps<'ol'>) => (
    <ol className="list-decimal list-outside ml-5 mb-5 text-muted space-y-1.5" {...p} />
  ),
  li: (p: ComponentProps<'li'>) => <li className="leading-relaxed" {...p} />,
  blockquote: (p: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-2 border-primary pl-4 py-1 my-6 text-muted italic" {...p} />
  ),
  code: ({ className, children, ...rest }: ComponentProps<'code'>) => {
    const isBlock = className?.includes('language-')
    if (isBlock) {
      return (
        <code className={`${className} block text-xs`} {...rest}>
          {children}
        </code>
      )
    }
    return (
      <code
        className="bg-surface border border-border text-accent text-[0.85em] font-mono px-1.5 py-0.5 rounded"
        {...rest}
      >
        {children}
      </code>
    )
  },
  pre: (p: ComponentProps<'pre'>) => (
    <pre
      className="bg-elevated border border-border text-muted text-xs font-mono p-4 rounded-lg overflow-x-auto my-5"
      {...p}
    />
  ),
  hr: () => <hr className="border-border my-10" />,
  strong: (p: ComponentProps<'strong'>) => <strong className="text-text font-bold" {...p} />,
  em: (p: ComponentProps<'em'>) => <em className="text-text" {...p} />,
  table: (p: ComponentProps<'table'>) => (
    <div className="overflow-x-auto my-6 border border-border">
      <table className="min-w-full text-sm" {...p} />
    </div>
  ),
  thead: (p: ComponentProps<'thead'>) => (
    <thead
      className="bg-surface/60 text-primary font-mono uppercase text-xs tracking-wider"
      {...p}
    />
  ),
  th: (p: ComponentProps<'th'>) => (
    <th className="px-3 py-2 text-left border-b border-border" {...p} />
  ),
  td: (p: ComponentProps<'td'>) => (
    <td className="px-3 py-2 border-b border-border/50 text-muted" {...p} />
  ),
}

export default function SkillBody({ body }: { body: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {body}
      </ReactMarkdown>
    </div>
  )
}
