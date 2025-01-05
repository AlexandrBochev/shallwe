"use client"

import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Textarea } from "../ui/textarea"
import { POST } from "@/lib/constants"
import { Button } from "../ui/button"
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react"
import { createPost } from "@/actions/post.action"
import toast from "react-hot-toast"
import { ImageUpload } from "../ImageUpload/ImageUpload"

const CreatePost = () => {
  const { user } = useUser()
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return
    setIsPosting(true)
    try {
      const result = await createPost(content, imageUrl)
      if (result?.success) {
        setContent('')
        setImageUrl('')
        setShowImageUpload(false)

        toast.success(POST.CREATE_POST.postCreated)
      }
    } catch (error) {
      console.error(POST.CREATE_POST.failedToCreatePost, error)
      toast.error(POST.CREATE_POST.failedToCreatePost)
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Avatar className="w-10 h-10 border-2">
            <AvatarImage src={user?.imageUrl || "/avatar.png"} className="object-cover" />
          </Avatar>
          <Textarea
            placeholder={POST.CREATE_POST.placeholder}
            className="min-h-[100px] resize-none shadow-none focus-visible:ring-0 p-2 text-base"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPosting}
          />
          {(showImageUpload || imageUrl) &&
            <div className="border rounded-lg p-4">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <ImageIcon className="size-4 mr-2" />
                {POST.CREATE_POST.photo}
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4 mr-2 animate-spin" />
                  {POST.CREATE_POST.posting}
                </>
              ) : (
                <>
                  <SendIcon className="size-4 mr-2" />
                  {POST.CREATE_POST.post}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { CreatePost }