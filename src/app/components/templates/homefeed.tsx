import PostFeed from "../organisms/post-feed"
import { postsQuery } from "@/db/queries/postFeed"

export default async function HomeFeed() {

  const posts = await postsQuery.execute();

  return (

    // Import PostFeed component with props posts
    <PostFeed posts={posts} />
  )
}
