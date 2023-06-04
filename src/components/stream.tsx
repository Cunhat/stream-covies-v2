import { memo } from "react"

import { Twitch } from "@/components/ui/twitch"
import { Youtube } from "@/components/ui/youtube"

const Stream: React.FC<{ provider: string; channel: string; id: string }> = ({
  provider,
  channel,
  id,
}) => {
  if (provider === "youtube") return <Youtube channel={channel} id={id} />
  else return <Twitch channel={channel} id={id} />
}

export default memo(Stream)
