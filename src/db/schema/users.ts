import {pgTable, serial, text} from "drizzle-orm/pg-core";

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const users = pgTable("users", {
    id: serial("id").primaryKey().notNull(),
    username: text("username").unique().notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    email: text("email"),
    profileImage: text("profile_image"),
});