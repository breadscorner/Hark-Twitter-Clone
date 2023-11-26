import { serial, text, integer, pgTable, pgEnum, timestamp } from "drizzle-orm/pg-core"
import { users } from "./users"

export const mediaType = pgEnum("media_type", ["image", "video"])

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  type: mediaType("type").notNull(),
  url: text("url").notNull(),
  width: integer("width").notNull().default(250),
  height: integer("height").notNull().default(250),
  userId: text("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})