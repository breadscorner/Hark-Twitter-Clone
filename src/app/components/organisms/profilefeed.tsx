import Image from 'next/image';
import { db, eq } from "@/db"
import { users as userTable } from '@/db/schema/users';
import { userPostsQuery } from '@/db/queries/postFeed';
import ProfileImage from '@/app/components/atoms/profile-image';

export default async function ProfileFeed() {

  // Display only posts from a single user.
  // Get user info
  const users = await db.select().from(userTable)
    .where(eq(userTable.username, 'breadscorner'));

  if (users.length === 0) {
    return <div>404</div>
  }

  const user = users[0];

  const postsWithMedia = await userPostsQuery.execute();

  return (
    <div>
      <div className="flex flex-row w-[65%] mx-auto px-4 border rounded-lg shadow-md">
        <div className="flex flex-col flex-grow">
          <h1 className="text-[2.5em] font-bold">{user.username}</h1>
          <h2 className="text-[1em] font-semibold">
            {user.firstName + ' ' + user.lastName}
          </h2>
        </div>

        {/* Profile Image */}
        <div className="relative overflow-hidden rounded-full border-slate-500 justify-end self-start">
          <ProfileImage />
        </div>
      </div>

      {/* Posts of breadscorner */}
      <div className="w-[65%] mx-auto my-4 rounded-lg">
        {postsWithMedia.map((post) => (
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
  );
}
