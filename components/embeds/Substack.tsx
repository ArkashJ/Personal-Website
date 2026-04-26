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
    <div className="my-8 rounded-lg overflow-hidden border border-border bg-surface">
      <iframe
        src={src}
        height={height}
        width="100%"
        frameBorder={0}
        title={`Substack ${publication}${slug ? ` — ${slug}` : ''}`}
        loading="lazy"
      />
    </div>
  )
}

export default Substack
