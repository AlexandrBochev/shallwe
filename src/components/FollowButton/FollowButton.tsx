"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { USER } from "@/lib/constants"
import { Loader2Icon } from "lucide-react"
import toast from "react-hot-toast"
import { toggleFollow } from "@/actions/user.action"

type FollowButtonProps = {
  userId: string
}

const FollowButton = ({ userId }: FollowButtonProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleFollow = async () => {
    setIsLoaded(true)
    try {
      await toggleFollow(userId)
      toast.success(USER.WHO_TO_FOLLOW.userFollowed)
    } catch (error) {
      console.error(error)
      toast.error(USER.WHO_TO_FOLLOW.errorFollowingUser)
    } finally {
      setIsLoaded(false)
    }
  }

  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      onClick={handleFollow}
      disabled={isLoaded}
      className="w-20"
    >
      {isLoaded ? <Loader2Icon className="size-4 animate-spin" /> : USER.WHO_TO_FOLLOW.follow}
    </Button>
  )
}

export { FollowButton }