ALTER TABLE "organization_projects" ADD COLUMN "category_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_projects" ADD CONSTRAINT "organization_projects_category_id_organization_project_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."organization_project_categories"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
