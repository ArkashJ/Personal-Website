type GistProps = { user: string; id: string; height?: number }

const Gist = ({ user, id, height = 320 }: GistProps) => (
  <div className="my-8 overflow-hidden border border-border bg-white">
    <iframe
      src={`https://gist.github.com/${user}/${id}.pibb`}
      width="100%"
      height={height}
      title={`GitHub gist ${user}/${id}`}
      loading="lazy"
      className="block border-0"
    />
  </div>
)

export default Gist
