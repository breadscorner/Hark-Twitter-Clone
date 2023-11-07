import Image from 'next/image';
import { db, eq } from "@/db"
import { posts as postTable } from '@/db/schema/posts';
import { users as userTable } from '@/db/schema/users';
import { postsQuery } from "@/db/queries/postFeed"

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
    .where(eq(postTable.userId, users[0].id));

  // Get post type - How do I use this with in the postsList.
  const postType = await postsQuery.execute();

  // console.log(postsList, "This one");

  return (
    <div>
      <div className="flex flex-row w-[65%] mx-auto px-4 border rounded-lg shadow-md">
        <div className="flex flex-col flex-grow">
          <h1 className="text-[2.5em] font-bold">{user.username}</h1>
          <h2 className="text-[1em] font-semibold">
            {user.firstName + ' ' + user.lastName}
          </h2>
          {/* <p className="pt-8 pb-4 text-[1em] font-semibold">
            {user.followers} Followers
          </p> */}
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
        {postType.map((post) => (
          <div className="w-full mx-auto mt-4 p-4 border shadow-md rounded-lg" key={post.id}>
            <p>{post.content}</p>

            {/* Images */}
            {post.media?.type === 'image' && (
              <Image
                src={post.media?.url}
                alt="Post Image"
                width={post.media.width}
                height={post.media.height}
                className="mt-4 object-cover"
              />
            )}

            {/* Likes and Replies */}
            {/* <div className='flex mt-4 text-left font-semibold'>
              <p>{post.likes} Likes</p>
              <p className='ml-4'>{post.replies} Replies</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
