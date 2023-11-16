// DB imports
import { userPostsQuery } from "@/db/queries/postFeed"

// Components
import Profile from "./profile"
import ProfileFeed from '../../components/organisms/profilefeed';

// Utils
import { auth } from "@/utils/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profile")
  }

  const posts = await userPostsQuery.execute({ userId: session.user.id })

  return (
    <>
      {/* <ProfileFeed  /> */}
      <Profile user={session.user} />

      <div  className="w-[90%] md:w-[75%] mx-auto my-4 px-4 border rounded-lg shadow-lg">
        <div className="m-4 border-b mb-5">
          <div className="font-[1.5em]">Posts</div>
        <div>
          {posts?.map((post) => (
            <div>
            <ProfileFeed />
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  )
}