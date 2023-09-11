import * as fakeDB from '@/fake-db';

export default function Home() {
  // Fetch posts from fakeDB
  const posts = fakeDB.getPosts();

  return (
    <div className="text-center">
      <h1 className="text-lg">Home</h1>
      <p className="text-xs">Post Feed</p>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            {post.media && post.media.type === 'image' ? (
              <div className="flex justify-center items-center">
                <img
                  src={post.media.url}
                  alt="Post Media"
                  className="w-[75px] h-[75px] rounded-full border-slate-500 border-[1px] mt-4"
                />
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <img
                  src="/placeholder.png"
                  alt="Default Image"
                  className="w-[75px] h-[75px] rounded-full border-slate-500 border-[1px] mt-4"
                />
              </div>
            )}
            <h2 className='mt-4'>{post.user?.username || 'Anonymous User'}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

