import { pgTable, serial, varchar, integer, text, timestamp } from "drizzle-orm/pg-core";
import { media } from "./media";
import { users } from "./users";

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export const posts = pgTable("posts", {
    id: serial('id').primaryKey().notNull(),
    title: varchar('title', { length: 30 }).notNull(),
    content: varchar('content', { length: 250 }).notNull(),
    media: integer('media').references(() => media.id),
    userId: text('user_id').references(() => users.id).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});
