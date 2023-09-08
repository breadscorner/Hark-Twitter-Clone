import * as fakeDB from '@/fake-db';

export default function Home() {

  // const posts = fakeDB.getPosts();
  // console.log(posts);
  
  return (
    <div className="text-center">
      <h1 className="text-lg">Home</h1>
      <p className="text-xs">Post Feed</p>
    </div>
  );
}