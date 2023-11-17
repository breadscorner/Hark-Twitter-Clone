// @ts-nocheck

// Need to add function for media to get pushed to S3

"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { db } from "@/db"
import { posts as postsTable } from "@/db/schema/posts"

import {auth} from "@/utils/auth"

export async function createPost(title: string, content: string) {
   
  const session = await auth()
  if (!title || title.length < 3) {
    return { error: "Title not long enough" }
  }

  if (!content || content.length < 3) {
    return { error: "Not enough content" }
  }
  
  try {
    await db.insert(postsTable).values({
      title: title,
      content: content,
      media: 1, // Need to correct to properly store media
      userId: session?.user.id,
      createdAt: new Date(),
    }).execute()
  } catch (error) {
    console.error(error)
    return { error: "Something went wrong" }
  }
  
  revalidatePath("/")
  redirect(`/`)
}
