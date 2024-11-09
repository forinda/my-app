CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"is_email_verified" boolean DEFAULT false NOT NULL,
	"last_login_at" date,
	"last_login_ip" varchar,
	"needs_to_reset_password" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT 'now()' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
