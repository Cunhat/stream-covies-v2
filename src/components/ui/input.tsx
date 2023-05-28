import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const InputStyles = cva(
  "flex h-10 text-white w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      invalid: {
        true: "border-red-500 text-red-500",
      },
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(InputStyles({ invalid }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
