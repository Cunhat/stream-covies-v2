import React, { useEffect, useState } from "react"
import { faGear, faMaximize } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { Listbox } from "@headlessui/react"
import { animated, useSpring } from "@react-spring/web"
// import { Select } from "@ui/Select"
import { useDrag } from "@use-gesture/react"
import { cva } from "class-variance-authority"

import { useWindowSize } from "@/hooks/useWindowSize"
import Stream from "@/components/stream"

const DraggableStreamStyles = cva(
  "absolute top-0 left-0 h-[200px] w-[200px] group z-[1000]",
  {
    variants: {
      size: {
        extraSmall: "h-[100px] w-[150px]",
        small: "h-[200px] w-[360px]",
        medium: "h-[400px] w-[600px]",
        large: "h-[600px] w-[900px]",
      },
      defaultVariants: {
        size: "small",
      },
    },
  }
)

type DraggableStreamSizes = {
  value: "extraSmall" | "small" | "medium" | "large"
  label: string
}

const SIZES: Array<DraggableStreamSizes> = [
  { value: "extraSmall", label: "Extra Small" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
]

const DraggableStream: React.FC<{
  channel: string
  provider: string
}> = ({ channel, provider }) => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))
  const [selectedSize, setSelectedSize] = useState<DraggableStreamSizes>({
    value: "extraSmall",
    label: "Extra Small",
  })
  const { width, height } = useWindowSize()

  const bind = useDrag(
    ({ down, offset: [ox, oy] }) =>
      api.start({ x: ox, y: oy, immediate: down }),
    {
      bounds: { left: 0, right: width - 160, top: 0, bottom: height - 100 },
    }
  )

  return (
    <animated.div
      {...bind()}
      style={{ x, y, touchAction: "none" }}
      className={DraggableStreamStyles({ size: selectedSize.value })}
    >
      <FontAwesomeIcon
        icon={faMaximize}
        height={30}
        width={30}
        className="absolute right-2 top-2 text-xl text-neutral-500 opacity-0 hover:cursor-grab group-hover:opacity-100"
      />
      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100">
        {/* <Select
          value={selectedSize}
          data={SIZES}
          onChange={setSelectedSize}
          button={
            <Listbox.Button className="">
              <FontAwesomeIcon
                icon={faGear}
                className="text-xl text-neutral-500"
              />
            </Listbox.Button>
          }
        /> */}
      </div>
      <Stream channel={channel} provider={provider} id="floatingStream" />
    </animated.div>
  )
}

export default React.memo(DraggableStream)
