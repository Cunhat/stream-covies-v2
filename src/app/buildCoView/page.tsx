"use client"

import { type } from "os"
import { useState } from "react"
import Image from "next/image"
import { z } from "zod"

import { BuildProvider } from "@/components/buildProvider"

type Data = {
  mainStreamProvider: string
  mainStreamUrl: string
  secondaryStreamProvider: string
  secondaryStreamUrl: string
}

const UrlSchema = z
  .union([z.string().url().nonempty(), z.literal("")])
  .refine(
    (value) =>
      value.includes("https://www.youtube.com/") ||
      value.includes("https://www.twitch.tv/"),
    {
      message: "String must contain Youtube or Twitch URL",
    }
  )

type Url = z.infer<typeof UrlSchema>

export type DataElement =
  | "mainStreamProvider"
  | "mainStreamUrl"
  | "secondaryStreamProvider"
  | "secondaryStreamUrl"

export default function BuildCoView() {
  const [data, setData] = useState<Data>({
    mainStreamProvider: "",
    mainStreamUrl: "",
    secondaryStreamProvider: "",
    secondaryStreamUrl: "",
  })
  const [isInvalidMainUrl, setIsInvalidMainUrl] = useState<boolean>(false)
  const [isInvalidSecondaryUrl, setIsInvalidSecondaryUrl] =
    useState<boolean>(false)

  const checkIfIsValidUrl = (url: string) => {
    return UrlSchema.safeParse(url).success
  }

  const chooseStreamHandler = (
    provider: string,
    type: DataElement,
    isInput: boolean
  ) => {
    const newData = { ...data }

    if (isInput) {
      if (type === "mainStreamUrl" && !checkIfIsValidUrl(provider)) {
        setIsInvalidMainUrl(true)
      } else if (type === "mainStreamUrl") {
        setIsInvalidMainUrl(false)
      }

      if (type === "secondaryStreamUrl" && !checkIfIsValidUrl(provider)) {
        setIsInvalidSecondaryUrl(true)
      } else if (type === "secondaryStreamUrl") {
        setIsInvalidSecondaryUrl(false)
      }
    }

    newData[type] = provider
    setData(newData)
  }

  const checkIfCanGenerate = () => {
    console.log(
      data.mainStreamProvider !== "" &&
        data.mainStreamUrl !== "" &&
        data.secondaryStreamProvider !== "" &&
        data.secondaryStreamUrl !== "" &&
        !isInvalidMainUrl &&
        !isInvalidSecondaryUrl
    )
    return (
      data.mainStreamProvider !== "" &&
      data.mainStreamUrl !== "" &&
      data.secondaryStreamProvider !== "" &&
      data.secondaryStreamUrl !== "" &&
      !isInvalidMainUrl &&
      !isInvalidSecondaryUrl
    )
  }

  return (
    <main className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl text-indigo-500">Build your Co-View stream</h1>
      <BuildProvider
        title="Main Stream"
        onClick={chooseStreamHandler}
        type="main"
        invalidUrl={isInvalidMainUrl}
      />
      <BuildProvider
        title="Secondary Stream"
        onClick={chooseStreamHandler}
        type="secondary"
        invalidUrl={isInvalidSecondaryUrl}
      />
    </main>
  )
}
