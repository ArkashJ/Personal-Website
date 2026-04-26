import { YouTubeEmbed } from '@next/third-parties/google'

type YouTubeProps = { id: string; height?: number }

const YouTube = ({ id, height = 400 }: YouTubeProps) => (
  <div className="my-8 rounded-lg overflow-hidden border border-border">
    <YouTubeEmbed videoid={id} height={height} />
  </div>
)

export default YouTube
