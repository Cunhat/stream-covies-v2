"use client"

import React, { useMemo } from "react"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import z from "zod"

import { Button } from "@/components/ui/button"
import { TwitchChat } from "@/components/ui/twitchChat"
import { YoutubeChat } from "@/components/ui/youtubeChat"
import DraggableStream from "@/components/draggableStream"
import Stream from "@/components/stream"

const CoViewSchema = z.object({
  mainStreamProvider: z.string(),
  mainStreamUrl: z.string(),
  secondaryStreamProvider: z.string(),
  secondaryStreamUrl: z.string(),
})

const CoView: React.FC<{
  searchParams: { [key: string]: string | string[] | undefined }
}> = ({ searchParams }) => {
  const [showChat, setShowChat] = React.useState<boolean>(true)
  const fullscreen = useFullScreenHandle()

  const getTwitchChatChannel = () => {
    if (searchParams?.mainStreamProvider === "twitch") {
      return searchParams?.mainStreamUrl
    } else if (searchParams?.secondaryStreamProvider === "twitch") {
      return searchParams?.secondaryStreamUrl
    } else {
      return ""
    }
  }

  const twitchChannel = useMemo(() => {
    return getTwitchChatChannel() as string
  }, [])

  if (!CoViewSchema.safeParse(searchParams).success) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl text-white">Invalid URL</h1>
      </div>
    )
  }

  console.log(searchParams)

  return (
    <div className="flex h-screen">
      <div className="h-full flex-1 ">
        <div className="flex h-full flex-col">
          <div className="flex flex-1 px-2 pt-2">
            <FullScreen className="flex-1" handle={fullscreen}>
              <Stream
                channel={searchParams.mainStreamUrl as string}
                provider={searchParams.mainStreamProvider as string}
                id={`mainStream${searchParams.mainStreamProvider}`}
              />
              <DraggableStream
                channel={searchParams.secondaryStreamUrl as string}
                provider={searchParams.secondaryStreamProvider as string}
              />
            </FullScreen>
          </div>
          <div className="flex justify-end gap-3 p-3">
            <Button
              variant="secondary"
              onClick={fullscreen.active ? fullscreen.exit : fullscreen.enter}
            >
              Full Screen
            </Button>
            {twitchChannel !== "" && (
              <Button onClick={() => setShowChat(!showChat)}>Hide Chat</Button>
            )}
          </div>
        </div>
      </div>
      {showChat && twitchChannel !== "" && (
        <div className="h-full w-80 ">
          <TwitchChat channel={getTwitchChatChannel() as string} />
        </div>
      )}
    </div>
  )
}

export default CoView
