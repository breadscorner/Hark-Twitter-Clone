"use server"

import { db, eq } from "@/db"
import { posts as postsTable } from "@/db/schema/posts"
import { media as mediaTable } from "@/db/schema/media"
import { revalidatePath } from "next/cache"

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION1!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY1!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY1!,
  },
})

export async function deletePost(postId: number) {
  try {
    // Fetch media associated with post
    const post = await db
      .select({ mediaId: postsTable.media })
      .from(postsTable)
      .where(eq(postsTable.id, postId))
      .then(res => res[0]);

    // Delete post
    await db
      .delete(postsTable)
      .where(eq(postsTable.id, postId));

    if (post && post.mediaId) {
      // Fetch the media details using the mediaId
      const media = await db
        .select({ url: mediaTable.url })
        .from(mediaTable)
        .where(eq(mediaTable.id, post.mediaId))
        .then(res => res[0]);

      if (media && media.url) {
        // Delete the file from S3
        const key = media.url.split("/").slice(-1)[0];
        const deleteParams = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: key,
        };
        await s3Client.send(new DeleteObjectCommand(deleteParams));

        // Delete media from the database
        await db
          .delete(mediaTable)
          .where(eq(mediaTable.id, post.mediaId));
      }
    }

    // Revalidate path
    revalidatePath("/");
  } catch (e) {
    console.error(e);
    throw e;
  }
}
