import { boolean, integer, pgTable } from 'drizzle-orm/pg-core';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';
import { User } from './user';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { OrgProject } from './org-project';

export const OrgProjectMember = pgTable('organization_project_members', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  project_id: integer()
    .notNull()
    .references(() => OrgProject.id, foreignKeyConstraints),
  is_active: boolean().default(true).notNull(),
  created_by: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  updated_by: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  deleted_by: integer().references(() => User.id, foreignKeyConstraints),
  ...getTableTimestamps()
});

export const orgProjectMemberRelations = relations(
  OrgProjectMember,
  ({ one }) => ({
    creator: one(User, {
      fields: [OrgProjectMember.created_by],
      references: [User.id]
    }),
    updator: one(User, {
      fields: [OrgProjectMember.updated_by],
      references: [User.id]
    }),
    project: one(OrgProject, {
      fields: [OrgProjectMember.project_id],
      references: [OrgProject.id]
    }),
    user: one(User, {
      fields: [OrgProjectMember.user_id],
      references: [User.id]
    })
  })
);

export interface SelectOrgProjectMemberInterface
  extends InferSelectModel<typeof OrgProjectMember> {}

export interface InsertOrgProjectMemberInterface
  extends InferInsertModel<typeof OrgProjectMember> {}
