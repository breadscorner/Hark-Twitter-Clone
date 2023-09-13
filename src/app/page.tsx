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

                {post.user?.avatar === 'image' ? (
                  <div className="flex justify-center items-center">
                    <Image
                      src={post.user?.avatar || "/placeholder.png"}
                      alt="Post Image"
                      width={75}
                      height={75}
                      className="rounded-full border-slate-500 border-[1px] mt-4 object-cover  min-h-[75]"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <Image
                      src={post.user?.avatar || "/placeholder.png"}
                      alt="User Image"
                      width={75}
                      height={75}
                      className="rounded-full border-slate-500 border-[1px] mt-4 object-cover  min-h-[75]"
                    />
                  </div>
                )}
                <h2 className='mt-4 ml-5'>{post.user?.username || "Anonymous User"}</h2>
              </div>
              <p className='flex ml-[100px] text-left'>{post.content}</p>
              {/* Icons under post content */}
              <div className="ml-[100px] flex items-center">
                <button className="mt-4 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v-3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>
                </button>
                <button className="ml-4 mt-4 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" /></svg>
                </button>
                <button className="ml-4 mt-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><path d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"/></svg>
                </button>
                <button className="ml-4 mt-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                </button>
              </div>
              {/* Likes & followers */}
                  <div className='flex ml-[100px] mt-4 text-left'>
                    <p>{post.likes} likes</p>
                    <p className='ml-4'>{post.user.followers} followers</p>
                  </div>
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
          </div>
        ))}
      </div>
    </div>
  );
}

