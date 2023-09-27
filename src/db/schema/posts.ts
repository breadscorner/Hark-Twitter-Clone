import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 30 }).notNull(),
  content: varchar("content", { length: 250 }).notNull(),
  media: varchar("media", { length: 150 }),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});