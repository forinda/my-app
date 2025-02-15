// import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { User } from './user';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { Organization } from './organization';

export const DepartmentRoleTitle = pgTable('department_role_titles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  description: varchar(),
  is_active: boolean().notNull().default(true),
  organization_id: integer()
    .notNull()
    .references(() => Organization.id, foreignKeyConstraints),
  created_by: integer()
    .references(() => User.id, foreignKeyConstraints)
    .notNull(),
  updated_by: integer()
    .references(() => User.id, foreignKeyConstraints)
    .notNull(),
  deleted_by: integer().references(() => User.id, foreignKeyConstraints),
  ...getTableTimestamps()
});

export const departmentStaffRoleTitleRelation = relations(
  DepartmentRoleTitle,
  ({ one }) => ({
    cxreator: one(User, {
      fields: [DepartmentRoleTitle.created_by],
      references: [User.id]
    }),
    updater: one(User, {
      fields: [DepartmentRoleTitle.updated_by],
      references: [User.id]
    }),
    deleter: one(User, {
      fields: [DepartmentRoleTitle.deleted_by],
      references: [User.id]
    })
  })
);

export interface InsertDepartmentRoleTitleInterface
  extends InferInsertModel<typeof DepartmentRoleTitle> {}

export type SelectDepartmentRoleTitleInterface = InferSelectModel<
  typeof DepartmentRoleTitle
>;
