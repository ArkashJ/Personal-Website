type SubstackProps = {
  publication: string
  slug?: string
  height?: number
}

const Substack = ({ publication, slug, height = 320 }: SubstackProps) => {
  const src = slug
    ? `https://${publication}.substack.com/embed/p/${slug}`
    : `https://${publication}.substack.com/embed`
  return (
    <div className="my-8 overflow-hidden border border-border bg-surface">
      <iframe
        src={src}
        height={height}
        width="100%"
        title={`Substack ${publication}${slug ? ` — ${slug}` : ''}`}
        loading="lazy"
        className="block border-0"
      />
    </div>
  )
}

export default Substack
