import { integer, pgTable, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { Organization } from './organization';
import { User } from './user';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';
import { DepartmentMember } from './department-member';
import { DepartmentUserRole } from './department-user-role';

export const Department = pgTable(
  'departments',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uuid: uuid().defaultRandom().unique().notNull(),
    organization_id: integer()
      .notNull()
      .references(() => Organization.id, foreignKeyConstraints),
    name: varchar().notNull(),
    description: varchar().notNull(),
    created_by: integer()
      .notNull()
      .references(() => User.id, foreignKeyConstraints),
    updated_by: integer()
      .notNull()
      .references(() => User.id, foreignKeyConstraints),
    deleted_by: integer().references(() => User.id, foreignKeyConstraints),
    ...getTableTimestamps()
  },
  (table) => [unique().on(table.organization_id, table.name)]
);

export const departmentRelations = relations(Department, ({ one, many }) => ({
  creator: one(User, {
    fields: [Department.created_by],
    references: [User.id]
  }),
  updater: one(User, {
    fields: [Department.updated_by],
    references: [User.id]
  }),
  deleter: one(User, {
    fields: [Department.deleted_by],
    references: [User.id]
  }),
  organization: one(Organization, {
    fields: [Department.organization_id],
    references: [Organization.id]
  }),
  members: many(DepartmentMember),
  user_roles: many(DepartmentUserRole)
}));

export interface SelectOrganizationDepartmentInterface
  extends InferSelectModel<typeof Department> {}

export interface InsertOrganizationDepartmentInterface
  extends InferInsertModel<typeof Department> {}
