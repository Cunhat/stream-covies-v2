import { memo } from "react"

import { Twitch } from "@/components/ui/twitch"
import { Youtube } from "@/components/ui/youtube"

const MainStream: React.FC<{ provider: string; channel: string }> = ({
  provider,
  channel,
}) => {
  if (provider === "youtube")
    return <Youtube channel={channel} id="mainProviderYoutube" />
  else return <Twitch channel={channel} id="mainProviderTwitch" />
}

export default memo(MainStream)
