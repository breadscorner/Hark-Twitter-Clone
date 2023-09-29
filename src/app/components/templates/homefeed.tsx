import PostFeed from "../organisms/post-feed"
import * as fakeDB from '@/fake-db';
import db from '@neondatabase/serverless'
// import { posts } from '@/db/schema/';

export default function HomeFeed() {

  // Change to real db
  const posts = fakeDB.getPosts();

  // const postsReal = db.posts;

  return (

    // Import PostFeed component with props posts
    <PostFeed posts={posts} />
  )
}
