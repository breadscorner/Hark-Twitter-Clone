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
            {post.media && post.media.type === 'image' && (
              <div className="flex justify-center items-center">
                <img
                  src={post.media.url}
                  alt="Post Media"
                  className="max-w-[200px] h-auto"
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
