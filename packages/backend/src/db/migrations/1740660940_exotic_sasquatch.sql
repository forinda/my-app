CREATE TYPE "public"."organization_task_priority_enum" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
ALTER TABLE "organization_tasks" ADD COLUMN "parent_id" integer;--> statement-breakpoint
ALTER TABLE "organization_tasks" ADD COLUMN "story_points" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_tasks" ADD COLUMN "priority" "organization_task_priority_enum" DEFAULT 'low' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_tasks" ADD CONSTRAINT "organization_tasks_parent_id_organization_tasks_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."organization_tasks"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
