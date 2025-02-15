CREATE TABLE IF NOT EXISTS "auth_sessions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "auth_sessions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"auth_session_user_id" uuid NOT NULL,
	"auth_session_organization_id" uuid,
	"ip" varchar DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "auth_sessions_auth_session_user_id_unique" UNIQUE("auth_session_user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_auth_session_user_id_users_uuid_fk" FOREIGN KEY ("auth_session_user_id") REFERENCES "public"."users"("uuid") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_auth_session_organization_id_organizations_uuid_fk" FOREIGN KEY ("auth_session_organization_id") REFERENCES "public"."organizations"("uuid") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
