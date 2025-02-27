ALTER TABLE "organization_workspace_members" RENAME COLUMN "organization_workspace_id" TO "workspace_id";--> statement-breakpoint
ALTER TABLE "organization_workspace_members" DROP CONSTRAINT "organization_workspace_members_uuid_unique";--> statement-breakpoint
ALTER TABLE "organization_workspace_members" DROP CONSTRAINT "organization_workspace_members_organization_workspace_id_organization_workspaces_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_workspace_members" ADD CONSTRAINT "organization_workspace_members_workspace_id_organization_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."organization_workspaces"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "organization_workspace_members" DROP COLUMN IF EXISTS "uuid";