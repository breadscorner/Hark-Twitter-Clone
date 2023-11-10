import Image from 'next/image';
import { db, eq } from "@/db"
import { users as userTable } from '@/db/schema/users';
import { posts as postTable } from '@/db/schema/posts';
import { media as mediaTable } from '@/db/schema/media';
import { Post } from '@/db/schema/posts'; // Import the Post type

// Extend the Post type to include mediaDetails
interface ExtendedPost extends Post {
  mediaDetails?: {
    id: number;
    type: string;
    url: string;
    width: number;
    height: number;
  } | null;
}

export default async function ProfileFeed() {
  // Display only posts from a single user.

  // Get user info
  const users = await db.select().from(userTable)
    .where(eq(userTable.username, 'breadscorner'));

  if (users.length === 0) {
    return <div>404</div>
  }

  const user = users[0];

  // Get posts from single user
  const postsList = await db.select().from(postTable)
    .where(eq(postTable.userId, user.id));

  // Fetch media for each post and add to postsList
  const postsWithMedia: ExtendedPost[] = await Promise.all(postsList.map(async (post) => {
    const extendedPost = { ...post } as ExtendedPost; // Cast to ExtendedPost
    if (post.media) {
      const media = await db.select().from(mediaTable)
        .where(eq(mediaTable.id, post.media))
        .execute();
      extendedPost.mediaDetails = media.length > 0 ? media[0] : null;
    }
    return extendedPost;
  }));

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
        <div className="relative overflow-hidden rounded-full my-4 border-slate-500 border-[1px] justify-end self-start"
          style={{ width: '125px', height: '125px' }}>
          <Image
            src={user.profileImage || "../placeholder.png"}
            alt="Profile Image"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
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
            {post.mediaDetails?.type === 'image' && (
              <div className="flex justify-center my-4">
                <Image
                  src={post.mediaDetails.url}
                  alt="Post Image"
                  width={250}
                  height={250}
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
