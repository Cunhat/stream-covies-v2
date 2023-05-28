"use client"

import { useState } from "react"
import { faTwitch, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { cva } from "class-variance-authority"

import { Input } from "@/components/ui/input"

const ToggleIconStyles = cva("text-[50px] hover:cursor-pointer text-gray-400", {
  variants: {
    type: {
      red: "hover:text-red-500 ",
      violet: "hover:text-violet-500",
      null: "text-gray-400",
    },
    isToggled: {
      red: "text-red-500",
      violet: "text-violet-500",
      null: "text-gray-400",
    },
  },
  defaultVariants: {
    type: null,
    isToggled: "null",
  },
})

export type DataElement =
  | "mainStreamProvider"
  | "mainStreamUrl"
  | "secondaryStreamProvider"
  | "secondaryStreamUrl"

export const BuildProvider: React.FC<{
  title: string
  onClick: (provider: string, type: DataElement, isInput: boolean) => void
  type: "main" | "secondary"
  invalidUrl: boolean
}> = ({ title, type, invalidUrl, onClick }) => {
  const [isProviderSelected, setIsProviderSelected] = useState<boolean>(false)
  const [selectedProvider, setSelectedProvider] = useState<
    "youtube" | "twitch" | null
  >(null)

  const onProviderClick = (
    provider: string | "youtube" | "twitch",
    type: DataElement,
    isInput = false
  ) => {
    setIsProviderSelected(true)
    if (!isInput) {
      setSelectedProvider(provider as typeof selectedProvider)
    }
    onClick(provider, type, isInput)
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <h2 className="text-center text-xl font-bold text-white">{title}</h2>
      <div className="flex justify-center gap-5">
        <FontAwesomeIcon
          id={`${type}YoutubeStreamProvider`}
          icon={faYoutube}
          onClick={() => onProviderClick("youtube", `${type}StreamProvider`)}
          className={ToggleIconStyles({
            type: "red",
            isToggled: selectedProvider === "youtube" ? "red" : null,
          })}
        />
        <FontAwesomeIcon
          icon={faTwitch}
          id={`${type}TwitchStreamProvider`}
          onClick={() => onProviderClick("twitch", `${type}StreamProvider`)}
          className={ToggleIconStyles({
            type: "violet",
            isToggled: selectedProvider === "twitch" ? "violet" : null,
          })}
        />
      </div>
      {isProviderSelected && (
        <div className="flex w-4/5 max-w-md flex-col gap-4 md:w-3/5">
          <h2 className="text-xl font-bold text-white">Insert stream url</h2>
          <Input
            id={`${type}StreamProviderInput`}
            placeholder="Insert your stream url..."
            onBlur={(e) =>
              onProviderClick(e.target.value, `${type}StreamUrl`, true)
            }
            invalid={invalidUrl}
          />
        </div>
      )}
    </div>
  )
}
