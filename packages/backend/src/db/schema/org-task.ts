import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';
import { Organization } from './organization';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';
import { User } from './user';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { OrgWorkspace } from './org-workspace';
import { OrgProject } from './org-project';

export const taskStatus = pgEnum('organization_task_status_enum', [
  'pending',
  'in_progress',
  'completed',
  'cancelled',
  'on_hold',
  'archived'
]);

export const taskPriority = pgEnum('organization_task_priority_enum', [
  'low',
  'medium',
  'high'
]);

export const OrgTask = pgTable('organization_tasks', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: uuid().defaultRandom().unique().notNull(),
  organization_id: integer()
    .notNull()
    .references(() => Organization.id, foreignKeyConstraints),
  title: varchar().notNull(),
  description: text().notNull(),
  status: taskStatus().default('pending').notNull(),
  start_date: date({ mode: 'string' }),
  end_date: date({ mode: 'string' }),
  due_date: date({ mode: 'string' }),
  workspace_id: integer()
    .notNull()
    .references(() => OrgWorkspace.id, foreignKeyConstraints),
  project_id: integer()
    .notNull()
    .references(() => OrgProject.id, foreignKeyConstraints),
  assignee_id: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  parent_id: integer().references(
    (): AnyPgColumn => OrgTask.id,
    foreignKeyConstraints
  ),
  story_points: integer().default(0).notNull(),
  priority: taskPriority().default('low').notNull(),
  created_by: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  updated_by: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  deleted_by: integer().references(() => User.id, foreignKeyConstraints),
  ...getTableTimestamps()
});

export const orgTaskRelations = relations(OrgTask, ({ one, many }) => ({
  creator: one(User, {
    fields: [OrgTask.created_by],
    references: [User.id]
  }),
  updator: one(User, {
    fields: [OrgTask.updated_by],
    references: [User.id]
  }),
  organization: one(Organization, {
    fields: [OrgTask.organization_id],
    references: [Organization.id]
  }),
  assignee: one(User, {
    fields: [OrgTask.assignee_id],
    references: [User.id]
  }),
  workspace: one(OrgWorkspace, {
    fields: [OrgTask.workspace_id],
    references: [OrgWorkspace.id]
  }),
  project: one(OrgProject, {
    fields: [OrgTask.project_id],
    references: [OrgProject.id]
  }),
  parent: one(OrgTask, {
    fields: [OrgTask.parent_id],
    references: [OrgTask.id]
  }),
  subtasks: many(OrgTask)
}));

export interface SelectOrgTaskInterface
  extends InferSelectModel<typeof OrgTask> {}

export interface InsertOrgTaskInterface
  extends InferInsertModel<typeof OrgTask> {}
