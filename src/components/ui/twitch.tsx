import React, { useRef } from "react"
import { TwitchEmbed, TwitchEmbedProps } from "react-twitch-embed"

export const Twitch: React.FC<TwitchEmbedProps> = ({
  channel,
  hideControls,
  id,
}) => {
  const embed = useRef()

  const handleReady = (e: any) => {
    embed.current = e
  }

  return (
    <TwitchEmbed
      channel={channel}
      autoplay
      muted
      darkMode={true}
      hideControls={hideControls}
      onVideoReady={handleReady}
      width="100%"
      height="100%"
      withChat={false}
      id={id}
    />
  )
}
