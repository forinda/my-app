import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { User } from './user';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';
import { OrgTask } from './org-task';

export const OrgTaskComment = pgTable('organization_task_comments', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  task_id: integer()
    .notNull()
    .references(() => OrgTask.id, foreignKeyConstraints),
  created_by: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  updated_by: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  deleted_by: integer().references(() => User.id, foreignKeyConstraints),
  ...getTableTimestamps()
});

export const orgTaskCommmentRelations = relations(
  OrgTaskComment,
  ({ one }) => ({
    creator: one(User, {
      fields: [OrgTaskComment.created_by],
      references: [User.id]
    }),
    updater: one(User, {
      fields: [OrgTaskComment.updated_by],
      references: [User.id]
    }),
    task: one(OrgTask, {
      fields: [OrgTaskComment.task_id],
      references: [OrgTask.id]
    })
  })
);

export interface SelectOrgTaskCommentInterface
  extends InferSelectModel<typeof OrgTaskComment> {}

export interface InsertOrgTaskCommentInterface
  extends InferInsertModel<typeof OrgTaskComment> {}
