import { channel } from "diagnostics_channel"
import { memo } from "react"

type YoutubeStreamProps = {
  channel: string
  id: string
}

const YoutubeStream: React.FC<YoutubeStreamProps> = ({ channel, id }) => {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${channel}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      id={id}
    ></iframe>
  )
}

export const Youtube = memo(YoutubeStream)
