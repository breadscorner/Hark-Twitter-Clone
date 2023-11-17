// DB imports
import { userPostsQuery } from "@/db/queries/postFeed"

// Components
import Profile from "./profile"
import ProfileFeed from '../../components/organisms/profilefeed';

// Utils
import { auth } from "@/utils/auth"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profile")
  }

  const posts = await userPostsQuery.execute({ userId: session.user.id })

  console.log(posts)

  return (
    <>
      {/* <ProfileFeed  /> */}
      <Profile user={session.user} />

      <div className="w-[90%] md:w-[75%] mx-auto my-4 px-4 border rounded-lg shadow-lg">
        <div className="m-4 border-b mb-5">
          <div className="font-[1.5em]">Posts</div>
          <div>
            {posts?.map((post) => (
                      <div className="w-full mx-auto mt-4 p-4 border shadow-md rounded-lg" key={post.id}>

                      {/* Post Title */}
                      <h2 className="text-lg font-bold">{post.title}</h2>
          
                      {/* Post Content */}
                      <p className="mt-2">{post.content}</p>
          
                      {/* Render Images if media is of type image */}
                      {post.media?.type === 'image' && (
                        <div className="flex justify-center my-4">
                          <Image
                            src={post.media.url}
                            alt="Post Image"
                            width={post.media.width || 250}
                            height={post.media.height || 250}
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}