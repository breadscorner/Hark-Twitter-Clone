import Image from "next/image"
import Link from "next/link"
import SignoutButton from "./sign-out-btn"
import { signOut } from "@/utils/auth"

export default async function Profile({
  user,
}: {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}) {
  return (
    <div className="flex justify-center">
      <div className="post-container w-[90%] md:w-[75%] mx-auto my-4 py-4 border rounded-lg shadow-lg">
        <div className="flex items-center">
          <Link href={user.image || "https://www.gravatar.com/avatar/?d=mp"}>
            <div className="relative w-[100px] h-[100px] rounded-full object-cover overflow-hidden ml-8 border-slate-500 border-[1px]">
              <Image
                src={user.image || "https://www.gravatar.com/avatar/?d=mp"}
                alt={user.name || "user profile image"}
                layout="fill"
                className="object-cover"
              />
            </div>
          </Link>

          {/* Username and email */}
          <div className="w-full p-4">
            <h2 className="font-semibold text-[2em]">{user.name}</h2>
            <div className="italic text-[1em]">{user.email}</div>
          </div>

          {/* Signout Button */}
          <div className="flex w-full justify-end pr-8">
            <SignoutButton
              signOut={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            />
          </div>

        </div>
      </div>
    </div>

  )
}