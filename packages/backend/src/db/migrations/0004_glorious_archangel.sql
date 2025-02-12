CREATE TABLE "organization_member_designations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "organization_member_designations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"organization_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_by" integer NOT NULL,
	"updated_by" integer NOT NULL,
	"deleted_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "organization_member_designations_organization_id_name_unique" UNIQUE("organization_id","name")
);
--> statement-breakpoint
ALTER TABLE "organization_invites" ADD COLUMN "designation_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_members" ADD COLUMN "designation_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_members" ADD COLUMN "department_id" integer;--> statement-breakpoint
ALTER TABLE "organization_member_designations" ADD CONSTRAINT "organization_member_designations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "organization_member_designations" ADD CONSTRAINT "organization_member_designations_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "organization_member_designations" ADD CONSTRAINT "organization_member_designations_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "organization_member_designations" ADD CONSTRAINT "organization_member_designations_deleted_by_users_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "organization_invites" ADD CONSTRAINT "organization_invites_designation_id_organization_member_designations_id_fk" FOREIGN KEY ("designation_id") REFERENCES "public"."organization_member_designations"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_designation_id_organization_member_designations_id_fk" FOREIGN KEY ("designation_id") REFERENCES "public"."organization_member_designations"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_department_id_organization_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."organization_departments"("id") ON DELETE restrict ON UPDATE cascade;