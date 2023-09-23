import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial('id').primaryKey().notNull(),
    username: varchar('username', { length: 30 }).notNull(),
    email: varchar('email', { length: 30 }).notNull(),
    password: varchar('password', { length: 30 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});