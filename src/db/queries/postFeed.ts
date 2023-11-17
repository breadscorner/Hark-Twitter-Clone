import { db, eq, desc, sql } from "@/db"
import { posts as postTable } from '@/db/schema/posts';
import { users as userTable } from '@/db/schema/users';
import { media as mediaTable } from '@/db/schema/media';

export const postsQuery = db
  .select({
    id: postTable.id,
    title: postTable.title,
    content: postTable.content,
    createdAt: postTable.createdAt,
    user: {
      id: userTable.id,
      username: userTable.name,
      profileImage: userTable.image,
    },
    media: {
      id: mediaTable.id,
      type: mediaTable.type,
      url: mediaTable.url,
      width: mediaTable.width,
      height: mediaTable.height,
    },
  })
  .from(postTable)
  .innerJoin(userTable, eq(postTable.userId, userTable.id))
  .leftJoin(mediaTable, eq(postTable.media, mediaTable.id))

  // All posts
  export const homePostsQuery = postsQuery 
  .orderBy(desc(postTable.createdAt))
  .prepare("selectAllPosts")

  // Single user posts
  export const userPostsQuery = postsQuery
  .where(eq(postTable.userId, sql.placeholder("userId")))
  .orderBy(desc(postTable.createdAt))
  .prepare("selectUserPosts")

  export type Post = Awaited<ReturnType<typeof postsQuery.execute>>[0];
