import * as fakeDB from '@/fake-db';
import Image from 'next/image';
import PostIcons from '@/app/post-icons';
export default function Home() {

  const posts = fakeDB.getPosts();

  return (
    <div className="text-center">
      <div>
        {posts.map((post) => (
          <div className="post-container w-[65%] mx-auto px-4 rounded-lg shadow-md">
            <div key={post.id}>
              <div className='flex items-center'>
                <div className="flex justify-center items-center">
                  <Image
                    src={post.user?.avatar || "../placeholder.png"}
                    alt="Post Image"
                    width={75}
                    height={75}
                    className="rounded-full border-slate-500 border-[1px] mt-4 object-cover  min-h-[75]"
                  />
                </div>
                <h2 className='mt-4 ml-5 font-semibold text-[1em]'>{post.user?.username || "Anonymous User"}</h2>
              </div>
              <p className='flex ml-[100px] text-left'>{post.content}</p>
              <PostIcons />
              {/* Likes & followers */}
            </div>
            {post.media?.url ? (
              <div className="mt-4 flex justify-center items-center">
                <Image
                  src={post.media?.url}
                  alt="Post Image"
                  width={post.media?.width}
                  height={post.media?.height}
                  className="rounded-lg object-cover"
                />
              </div>
            ) : null}
              <div className='flex ml-[100px] mt-4 pb-4 text-left font-semibold'>
                <p>{post.likes} likes</p>
                <p className='ml-4'>{post.user.followers} followers</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

