import { MDXRemote } from 'next-mdx-remote/rsc'
import type { ComponentProps } from 'react'

const components = {
  h1: (p: ComponentProps<'h1'>) => (
    <h1 className="text-3xl font-bold text-text mt-10 mb-4" {...p} />
  ),
  h2: (p: ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-bold text-text mt-10 mb-3" {...p} />
  ),
  h3: (p: ComponentProps<'h3'>) => <h3 className="text-xl font-bold text-text mt-8 mb-2" {...p} />,
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
  code: (p: ComponentProps<'code'>) => (
    <code
      className="bg-surface border border-border text-accent text-sm font-mono px-1.5 py-0.5 rounded"
      {...p}
    />
  ),
  pre: (p: ComponentProps<'pre'>) => (
    <pre
      className="bg-elevated border border-border text-muted text-xs font-mono p-4 rounded-lg overflow-x-auto my-5"
      {...p}
    />
  ),
  hr: () => <hr className="border-border my-10" />,
  strong: (p: ComponentProps<'strong'>) => <strong className="text-text font-bold" {...p} />,
  em: (p: ComponentProps<'em'>) => <em className="text-text" {...p} />,
}

const MdxContent = ({ source }: { source: string }) => (
  <MDXRemote source={source} components={components} />
)

export default MdxContent
