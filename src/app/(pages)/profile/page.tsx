// DB imports
import { db, eq, sql } from "@/db"
import { users as usersTable } from "@/db/schema/users"
import { userPostsQuery } from "@/db/queries/postFeed"

// Components
import Profile from "./profile"
import ProfileFeed from '../../components/organisms/profilefeed';
import SignoutButton from "./sign-out-btn"

// Utils
import { auth, signOut } from "@/utils/auth"
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

        <SignoutButton
          signOut={async () => {
            "use server"
            await signOut({redirectTo: "/"})
          }}
        />
      <div className="mt-7">
        <div className="w-full border-b mb-5">
          <div className="mb-2">Posts</div>
        </div>
        <div className="flex flex-col divide-y">
          {posts?.map((post) => (
            <ProfileFeed />
          ))}
        </div>
      </div>
    </>
  )
}