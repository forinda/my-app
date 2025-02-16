// import { relations } from "drizzle-orm";
import { boolean, date, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { Department } from './department';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';
import { User } from './user';
import { DepartmentTitle } from './department-role-title';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

export const DepartmentUserRole = pgTable('department_user_roles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  is_active: boolean().notNull().default(true),
  status: varchar({ enum: ['active', 'inactive'] })
    .notNull()
    .default('active'),
  department_id: integer()
    .references(() => Department.id, foreignKeyConstraints)
    .notNull(),
  user_id: integer()
    .references(() => User.id, foreignKeyConstraints)
    .notNull(),
  role_title_id: integer()
    .references(() => DepartmentTitle.id, foreignKeyConstraints)
    .notNull(),
  start_date: date({ mode: 'string' }).notNull(),
  end_date: date({ mode: 'string' }),
  created_by: integer()
    .references(() => User.id, foreignKeyConstraints)
    .notNull(),
  updated_by: integer()
    .references(() => User.id, foreignKeyConstraints)
    .notNull(),
  deleted_by: integer().references(() => User.id, foreignKeyConstraints),
  ...getTableTimestamps()
});

export const departmentStaffRoleRelation = relations(
  DepartmentUserRole,
  ({ one }) => ({
    user: one(User, {
      fields: [DepartmentUserRole.user_id],
      references: [User.id]
      // relationName
    }),
    department: one(Department, {
      fields: [DepartmentUserRole.department_id],
      references: [Department.id]
      // relationName
    }),
    role_title: one(DepartmentTitle, {
      fields: [DepartmentUserRole.role_title_id],
      references: [DepartmentTitle.id]
      // relationName
    }),
    creator: one(User, {
      fields: [DepartmentUserRole.created_by],
      references: [User.id]
      // relationName
    }),
    updater: one(User, {
      fields: [DepartmentUserRole.updated_by],
      references: [User.id]
      // relationName
    }),
    deleter: one(User, {
      fields: [DepartmentUserRole.deleted_by],
      references: [User.id]
      // relationName
    })
  })
);

export interface IDepartmentRole
  extends InferInsertModel<typeof DepartmentUserRole> {}

export interface SelectDepartmentRoleInterface
  extends InferSelectModel<typeof DepartmentUserRole> {}
