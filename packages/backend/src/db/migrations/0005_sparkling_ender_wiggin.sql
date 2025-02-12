ALTER TABLE "users" ADD COLUMN "phone_number" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number");