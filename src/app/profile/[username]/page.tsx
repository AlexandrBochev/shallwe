import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile.actions"
import { MAIN_LAYOUT, PROFILE } from "@/lib/constants"
import { notFound } from "next/navigation"
import { ProfilePageClient } from "./ProfilePageClient"

type ProfilePageServerProps = {
  params: {
    username: string
  }
}

export const generateMetadata = async ({ params }: ProfilePageServerProps) => {
  const user = await getProfileByUsername(params.username)
  if (!user) return
  return {
    title: `${MAIN_LAYOUT.METADATA.title} | ${user?.name || params.username}`,
    description: `${MAIN_LAYOUT.METADATA.description} | ${user?.bio || PROFILE.USER_PROFILE}`,
  }
}

const ProfilePageServer = async ({ params }: ProfilePageServerProps) => {
  const user = await getProfileByUsername(params.username)
  if (!user) notFound()

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ])

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  )
}

export default ProfilePageServer