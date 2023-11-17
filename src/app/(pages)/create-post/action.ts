'use server'

import { auth } from "@/utils/auth";

// server action for creating a post
export const createPost = async (title: string, content: string) => {
  
  const session = await auth();

  if (!session) {
    return { error: "You must be signed in to create a post" };
  }

}