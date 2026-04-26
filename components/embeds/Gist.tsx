type GistProps = { user: string; id: string; height?: number }

const Gist = ({ user, id, height = 320 }: GistProps) => (
  <div className="my-8 rounded-lg overflow-hidden border border-border bg-white">
    <iframe
      src={`https://gist.github.com/${user}/${id}.pibb`}
      width="100%"
      height={height}
      frameBorder={0}
      title={`GitHub gist ${user}/${id}`}
      loading="lazy"
    />
  </div>
)

export default Gist
