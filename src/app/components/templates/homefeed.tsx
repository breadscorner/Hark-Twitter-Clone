import PostFeed from '../organisms/post-feed';
import { homePostsQuery } from "@/db/queries/postFeed"

export default async function HomeFeed() {

  const posts = await homePostsQuery.execute();

  return (
    // Import PostFeed component with props posts
    <PostFeed posts={posts} />
  )
}
