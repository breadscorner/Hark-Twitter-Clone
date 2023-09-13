import * as fakeDB from '@/fake-db';
import { type Post } from '@/fake-db';
import Link from 'next/link';
import image from 'next/image';

export default function Home() {
  // Fetch posts from fakeDB
  const posts = fakeDB.getPosts();

  return (
    <div className="text-center">
      <h1 className="text-lg">Home</h1>
      <p className="text-xs">Post Feed</p>
      <div>
        {posts.map((post) => (
  <div className="post-container w-[75%] mx-auto my-4 p-4 rounded-lg shadow-md">
  <div key={post.id}>
    <div className='flex items-center'>

    {post.user.avatar === 'image' ? (
      <div className="flex justify-center items-center">
        <img
          src={post.user?.avatar || "/placeholder.png"}
          alt="Post Image"
          className="w-[75px] h-[75px] rounded-full border-slate-500 border-[1px] mt-4"
          />
      </div>
    ) : (
      <div className="flex justify-center items-center">
        <img
          src={post.user?.avatar || "/placeholder.png"}
          alt="User Image"
          className="w-[75px] h-[75px] rounded-full border-slate-500 border-[1px] mt-4"
          />
      </div>
    )}
    <h2 className='mt-4 ml-4'>{post.user?.username || "Anonymous User"}</h2>
    </div>
    <p className='mt-4 text-left'>{post.content}</p>
  </div>
</div>

        ))}
      </div>
    </div>
  );
}

