type LinkedInPostProps = {
  urn: string
  type?: 'share' | 'activity' | 'ugcPost'
  height?: number
  // Match LinkedIn's official embed snippet — `?collapsed=1` renders the
  // post in collapsed mode (click to expand) and is required for the
  // public embed endpoint to render at all on most posts.
  collapsed?: boolean
}

const LinkedInPost = ({
  urn,
  type = 'share',
  height = 600,
  collapsed = true,
}: LinkedInPostProps) => {
  const src = `https://www.linkedin.com/embed/feed/update/urn:li:${type}:${urn}${
    collapsed ? '?collapsed=1' : ''
  }`
  return (
    <div className="rounded-none overflow-hidden border border-border bg-surface">
      <iframe
        src={src}
        height={height}
        width="100%"
        allowFullScreen
        title={`LinkedIn post ${urn}`}
        loading="lazy"
        className="block border-0"
      />
    </div>
  )
}

export default LinkedInPost
