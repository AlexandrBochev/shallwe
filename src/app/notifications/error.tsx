"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-red-500">Something went wrong!</h2>
      <Button
        onClick={() => reset()}
        variant="ghost"
      >
        Try again
      </Button>
    </div>
  )
}

export default Error