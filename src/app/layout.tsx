import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Stream Co-View",
  description: "Build your own co-view stream",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen bg-zinc-800`}>
        <main className="h-full">{children}</main>
      </body>
    </html>
  )
}
