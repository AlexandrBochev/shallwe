import { getPosts } from "@/actions/post.action"
import { getDbUserId } from "@/actions/user.action"
import { CreatePost } from "@/components/CreatePost/CreatePost"
import { PostCard } from "@/components/PostCard/PostCard"
import { WhoToFollow } from "@/components/WhoToFollow/WhoToFollow"
import { currentUser } from "@clerk/nextjs/server"

const HomePage = async () => {
  const user = await currentUser()
  const posts = await getPosts()
  const dbUserId = await getDbUserId()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <section className="lg:col-span-6">
        {user ? <CreatePost /> : null}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </section>
      <section className="hidden lg:block lg:col-span-4 sticky">
        <WhoToFollow />
      </section>
    </div>
  )
}

export default HomePage