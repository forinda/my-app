ALTER TABLE "tokens" RENAME COLUMN "token" TO "access_token";--> statement-breakpoint
ALTER TABLE "tokens" ADD COLUMN "refresh_token" varchar;