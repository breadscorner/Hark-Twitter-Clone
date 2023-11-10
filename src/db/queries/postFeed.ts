import { db, eq } from "@/db"
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
      username: userTable.username,
      profileImage: userTable.profileImage,
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
  .prepare("selectAllPosts")

  // Create variable for only logged in user || wrong syntax
  // ---------------------------
  // const profilePostQuery = db 
  // .where(eq(postTable.userId, 1))

  export type Post = Awaited<ReturnType<typeof postsQuery.execute>>[0];
