CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(30) NOT NULL,
	"content" varchar(250) NOT NULL,
	"media" varchar(150),
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_image" text,
	"username" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
