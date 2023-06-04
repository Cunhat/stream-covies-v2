import { useEffect, useState } from "react"

export type WindowSize = {
  width: number
  height: number
}

const getWindowSize = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export function useWindowSize() {
  const [windowDimensions, setWindowDimensions] = useState<WindowSize>(
    getWindowSize()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowSize())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}
