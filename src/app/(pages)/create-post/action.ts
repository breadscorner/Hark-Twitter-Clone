// @ts-nocheck
"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { db, and, eq } from "@/db"
import { posts as postsTable } from "@/db/schema/posts"
import { media } from "@/db/schema/media"

import { auth } from "@/utils/auth"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import crypto from "crypto"
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION1!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY1!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY1!,
  }
})

const acceptedTypes = [
  "image/png",
  "image/webp",
  "image/jpeg",
  "image/gif",
  "video/mp4",
  "video/mov",
]

const maxFileSize = 1024 * 1024 * 10 // 10MB

// Get signed url for uploading media
export async function getCustomSignedUrl(type: string, size: number, checkSum: string) {
  const session = await auth()

  if (!session) {
    return { failure: "Not Authenticated" }
  }

  if (!acceptedTypes.includes(type)) {
    return { failure: "File type not accepted" }
  }

  if (size > maxFileSize) {
    return { failure: "File size too large" }
  }

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME1!,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checkSum,
    Metadata: {
      userId: session.user.id,
    }
  })

  const signedUrl = await getSignedUrl(
    s3,
    command,
    { expiresIn: 60 })

  let mediaId;

  try {
    const mediaResult = await db.insert(media).values({
      userId: session.user.id,
      type: type.startsWith("image") ? "image" : "video",
      width: 200,
      height: 200,
      url: signedUrl.split("?")[0],
    }).returning({ id: media.id }).then(res => res[0]);

    console.log("Media Result:", mediaResult);
    mediaId = mediaResult.id;
  } catch (error) {
    console.error("Error in media insertion:", error);
    return { failure: "Error during media insertion" };
  }

  return { success: { url: signedUrl, mediaId: mediaId } };
}

// Create post
export async function createPost(title: string, content: string, mediaId?: number) {
  const session = await auth()

  if (!session) {
    return { error: "Not Authenticated" }
  }

  if (!title || title.length < 3) {
    return { error: "Title not long enough" }
  }

  if (!content || content.length < 3) {
    return { error: "Not enough content" }
  }

  if (mediaId) {
    const mediaItem = await db
      .select()
      .from(media)
      .where(and(eq(media.id, mediaId), eq(media.userId, session.user.id)))
      .then(res => res[0]);

    console.log("Media Item:", mediaItem);
    if (!mediaItem) {
      return { failure: "Media not found" }
    }

    try {
      const postResult = await db.insert(postsTable).values({
        title,
        content,
        media: mediaId,
        userId: session.user.id,
        createdAt: new Date(),
      }).returning().execute();

    } catch (error) {
      console.error(error)
      return { error: "Something went wrong" }
    }
    revalidatePath("/")
    redirect(`/`)
  }
  else {
    try {
      await db.insert(postsTable).values({
        title,
        content,
        userId: session.user.id,
        createdAt: new Date(),
      }).execute()

    } catch (error) {
      console.error(error)
      return { error: "Something went wrong" }
    }
    revalidatePath("/")
    redirect(`/`)
  }
}
