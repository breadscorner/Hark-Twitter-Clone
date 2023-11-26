import Image from 'next/image';
import { db, eq } from "@/db"
import { users as userTable } from '@/db/schema/users';
import { userPostsQuery } from '@/db/queries/postFeed';
import ProfileImage from '@/app/components/molecules/profile-image';
import { auth } from '@/utils/auth'
import { redirect } from 'next/navigation';

export default async function ProfileFeed() {
  
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/profile');
  }

  return (

    <>
    <pre>
    {JSON.stringify(session, null, 2)}
    </pre>
    </>
    // <div>
    //   <div className="flex flex-row w-[65%] mx-auto px-4 border rounded-lg shadow-md">
    //     <div className="flex flex-col flex-grow">
    //       {/* <h1 className="text-[2.5em] font-bold">{user.username}</h1> */}
    //       <h2 className="text-[1em] font-semibold">
    //         {/* {user.firstName + ' ' + user.lastName} */}
    //       </h2>
    //     </div>

    //     {/* Profile Image */}
    //     <div className="relative overflow-hidden rounded-full border-slate-500 justify-end self-start">
    //       <ProfileImage />
    //     </div>
    //   </div>

    //   {/* Posts of breadscorner */}
    //   <div className="w-[65%] mx-auto my-4 rounded-lg">
    //     {postsWithMedia.map((post) => (
  
    //     ))}
    //   </div>
    // </div>
  );
}
