ALTER TABLE "user_roles" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "role_permissions" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "auth_permissions" ADD CONSTRAINT "auth_permissions_name_unique" UNIQUE("name");