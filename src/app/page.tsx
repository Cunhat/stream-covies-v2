import Image from "next/image"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl font-bold text-indigo-600">Stream Co-views</h1>
      <h2 className="text-2xl text-indigo-400">
        Welcome to your multi-stream platform!
      </h2>
      <h3 className="text-xl text-white">Join as guest</h3>
      <Link className={buttonVariants()} href="buildCoView">
        Build Co-View
      </Link>
      <h3 className="text-xl text-white">Login into your account</h3>
      <Button variant="secondary">Login</Button>
    </main>
  )
}
