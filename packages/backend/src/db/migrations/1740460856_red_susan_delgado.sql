CREATE TYPE "public"."organization_invite_status_enum" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
ALTER TABLE "organization_invites" ADD COLUMN "status" "organization_invite_status_enum" DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_invites" DROP COLUMN IF EXISTS "is_accepted";