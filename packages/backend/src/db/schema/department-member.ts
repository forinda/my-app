import { integer, pgTable } from 'drizzle-orm/pg-core';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';
import { Department } from './department';
import { User } from './user';
import { Organization } from './organization';

export const DepartmentMember = pgTable('department_members', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  department_id: integer()
    .notNull()
    .references(() => Department.id, foreignKeyConstraints),
  organization_id: integer()
    .notNull()
    .references(() => Organization.id, foreignKeyConstraints),
  user_id: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  created_by: integer()
    .references(() => User.id, foreignKeyConstraints)
    .notNull(),
  updated_by: integer()
    .references(() => User.id, foreignKeyConstraints)
    .notNull(),
  ...getTableTimestamps()
});

export const departmentMemberRelations = relations(
  DepartmentMember,
  ({ one }) => ({
    user: one(User, {
      fields: [DepartmentMember.user_id],
      references: [User.id]
    }),
    department: one(Department, {
      fields: [DepartmentMember.department_id],
      references: [Department.id]
    }),
    organization: one(Organization, {
      fields: [DepartmentMember.organization_id],
      references: [Organization.id]
    })
  })
);

export interface SelectDepartmentMemberInterface
  extends InferSelectModel<typeof DepartmentMember> {}

export interface InsertDepartmentMemberInterface
  extends InferInsertModel<typeof DepartmentMember> {}
