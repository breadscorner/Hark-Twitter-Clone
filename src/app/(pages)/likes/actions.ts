// actions.ts

// Import necessary dependencies, adjust these imports based on your actual project structure
import { db, and, eq } from "@/db";
import { likes as likesTable } from "@/db/schema/likes";
import { auth } from "@/utils/auth";

export const toggleLike = async (postId: number) => {
  
  const session = await auth();
  if (!session?.user) {
    // Handle unauthenticated user, maybe throw an error or handle redirection
    throw new Error("User not logged in");
  }

  const userId = session.user.id;

  // Check if post is already liked by the user
  const existingLike = await db
    .select()
    .from(likesTable)
    .where(and(eq(likesTable.postId, postId), eq(likesTable.likedBy, userId)))
    .then(res => res[0]);

  if (existingLike) {
    // Unlike the post
    await db.delete(likesTable).where(eq(likesTable.id, existingLike.id));
    return false; // Return false to indicate the post is unliked
  } else {
    // Like the post
    await db.insert(likesTable).values({ postId, likedBy: userId });
    return true; // Return true to indicate the post is liked
  }
};

// You can add more functions here, like fetching the total likes count, if needed
