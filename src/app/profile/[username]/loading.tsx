import { Loader2Icon } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className="w-full h-[100svh] flex items-center justify-center">
      <Loader2Icon className="size-10 text-gray-400 animate-spin" />
    </div>
  )
}

export default Loading