import {pgTable, serial, text} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey().notNull(),
    profileImage: text("profile_image"),
    username: text("username").unique().notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    email: text("email")
});