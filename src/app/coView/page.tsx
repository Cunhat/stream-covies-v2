"use client"

import React from "react"
import z from "zod"

import { Button } from "@/components/ui/button"
import MainStream from "@/components/mainStream"

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
          <div className="flex flex-1  px-2 pt-2">
            <MainStream
              channel={searchParams.mainStreamUrl as string}
              provider={searchParams.mainStreamProvider as string}
            />
          </div>
          <div className="flex justify-end gap-3 p-3">
            <Button variant="secondary">Full Screen</Button>
            <Button onClick={() => setShowChat(!showChat)}>Hide Chat</Button>
          </div>
        </div>
      </div>
      {showChat && <div className="h-full w-80 bg-slate-200"></div>}
    </div>
  )
}

export default CoView
