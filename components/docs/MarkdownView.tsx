import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ComponentProps } from 'react'

const components = {
  h1: (p: ComponentProps<'h1'>) => (
    <h1
      className="text-3xl md:text-4xl font-bold text-text tracking-tight mt-12 mb-4 first:mt-0"
      {...p}
    />
  ),
  h2: (p: ComponentProps<'h2'>) => (
    <h2
      className="text-2xl font-bold text-text tracking-tight mt-12 mb-3 pb-2 border-b border-border"
      {...p}
    />
  ),
  h3: (p: ComponentProps<'h3'>) => (
    <h3 className="text-xl font-bold text-text tracking-tight mt-8 mb-2" {...p} />
  ),
  h4: (p: ComponentProps<'h4'>) => (
    <h4 className="text-base font-bold text-text mt-6 mb-2" {...p} />
  ),
  p: (p: ComponentProps<'p'>) => <p className="text-muted leading-relaxed mb-4" {...p} />,
  a: (p: ComponentProps<'a'>) => (
    <a className="text-primary hover:text-accent underline underline-offset-2" {...p} />
  ),
  ul: (p: ComponentProps<'ul'>) => (
    <ul className="list-disc list-outside ml-6 mb-5 text-muted space-y-1.5" {...p} />
  ),
  ol: (p: ComponentProps<'ol'>) => (
    <ol className="list-decimal list-outside ml-6 mb-5 text-muted space-y-1.5" {...p} />
  ),
  li: (p: ComponentProps<'li'>) => <li className="leading-relaxed" {...p} />,
  blockquote: (p: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-2 border-primary pl-4 py-1 my-6 text-muted italic" {...p} />
  ),
  code: (p: ComponentProps<'code'>) => (
    <code
      className="bg-elevated border border-border text-accent text-[13px] font-mono px-1.5 py-0.5"
      {...p}
    />
  ),
  pre: (p: ComponentProps<'pre'>) => (
    <pre
      className="bg-elevated border border-border text-muted text-xs font-mono p-4 overflow-x-auto my-5 [&_code]:bg-transparent [&_code]:border-0 [&_code]:p-0"
      {...p}
    />
  ),
  hr: () => <hr className="border-border my-10" />,
  strong: (p: ComponentProps<'strong'>) => <strong className="text-text font-bold" {...p} />,
  em: (p: ComponentProps<'em'>) => <em className="text-text" {...p} />,
  table: (p: ComponentProps<'table'>) => (
    <div className="overflow-x-auto my-6 border border-border">
      <table className="min-w-full divide-y divide-border text-sm" {...p} />
    </div>
  ),
  thead: (p: ComponentProps<'thead'>) => (
    <thead
      className="bg-elevated text-primary font-mono uppercase text-[11px] tracking-wider"
      {...p}
    />
  ),
  th: (p: ComponentProps<'th'>) => <th className="px-4 py-3 text-left" {...p} />,
  td: (p: ComponentProps<'td'>) => (
    <td className="px-4 py-3 text-muted border-t border-border" {...p} />
  ),
  img: ({ src, alt }: ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || ''} className="my-6 max-w-full" />
  ),
}

const MarkdownView = ({ source }: { source: string }) => (
  <article className="prose-custom">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {source}
    </ReactMarkdown>
  </article>
)

export default MarkdownView
