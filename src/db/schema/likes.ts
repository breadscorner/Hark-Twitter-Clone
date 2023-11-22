import { serial, text, pgTable, timestamp, integer } from "drizzle-orm/pg-core"
import { users } from "./users"
import { posts } from "./posts"

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id).notNull(),
  likedBy: text('user_id').references(() => users.id).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})
