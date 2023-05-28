import Image from "next/image"

import { BuildProvider } from "@/components/buildProvider"

export default function BuildCoView() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl text-indigo-500">Build your Co-View stream</h1>
      <BuildProvider
        title="Main Stream"
        // onClick={() => {}}
        type="main"
        invalidUrl
      />
      <BuildProvider
        title="Secondary Stream"
        // onClick={() => {}}
        type="secondary"
        invalidUrl
      />
    </main>
  )
}
