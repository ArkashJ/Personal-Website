type LinkedInPostProps = {
  urn: string
  type?: 'share' | 'activity'
  height?: number
}

const LinkedInPost = ({ urn, type = 'share', height = 600 }: LinkedInPostProps) => (
  <div className="my-8 rounded-lg overflow-hidden border border-border bg-surface">
    <iframe
      src={`https://www.linkedin.com/embed/feed/update/urn:li:${type}:${urn}`}
      height={height}
      width="100%"
      frameBorder={0}
      allowFullScreen
      title={`LinkedIn post ${urn}`}
      loading="lazy"
    />
  </div>
)

export default LinkedInPost
