ALTER TABLE "department_members" ADD COLUMN "organization_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "department_members" ADD CONSTRAINT "department_members_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
