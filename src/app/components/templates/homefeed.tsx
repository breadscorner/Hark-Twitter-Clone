import PostFeed from '../organisms/post-feed';
import { homePostsQuery} from "@/db/queries/postFeed"

export default async function HomeFeed() {
  
  const allPosts = await homePostsQuery.execute();

  if(!allPosts) return (
    <div className="text-center text-2xl font-semibold">No Posts Found</div>
  )

  return (
    <PostFeed posts={allPosts} />
  );
}

