import PostFeed from "../organisms/post-feed"
import * as fakeDB from '@/fake-db';

export default function HomeFeed() {

  // Change to real db
  const posts = fakeDB.getPosts();

  return (

    // Import PostFeed component with props posts
    <PostFeed posts={posts} />
  )
}
