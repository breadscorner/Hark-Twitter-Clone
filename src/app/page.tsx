import * as fakeDB from '@/fake-db';
import { type Post } from '@/fake-db';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Fetch posts from fakeDB
  const posts = fakeDB.getPosts();

  return (
    <div className="text-center">

      <div>
        {posts.map((post) => (
          <div className="post-container w-[75%] mx-auto my-4 p-4 rounded-lg shadow-md">
            <div key={post.id}>
              <div className='flex items-center'>

                {post.user.avatar === 'image' ? (
                  <div className="flex justify-center items-center">
                    <Image
                      src={post.user?.avatar || "/placeholder.png"}
                      alt="Post Image"
                      width={75}
                      height={75}
                      className="rounded-full border-slate-500 border-[1px] mt-4"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <Image
                      src={post.user?.avatar || "/placeholder.png"}
                      alt="User Image"
                      width={75}
                      height={75}
                      className="rounded-full border-slate-500 border-[1px] mt-4"
                    />
                  </div>
                )}
                <h2 className='mt-4 ml-4'>{post.user?.username || "Anonymous User"}</h2>
              </div>
              <p className='mt-4 text-left'>{post.content}</p>
            </div>
            {post.media?.url ? (
              <div className="flex justify-center items-center">
                <Image
                  src={post.media.url}
                  alt="Post Image"
                  width={post.media?.width}
                  height={post.media?.height}
                  className="rounded-lg object-cover"
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

