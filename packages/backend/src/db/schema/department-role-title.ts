// import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  unique,
  varchar
} from 'drizzle-orm/pg-core';
import { User } from './user';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { Organization } from './organization';

export const DepartmentTitle = pgTable(
  'department_role_titles',
  {
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
  },
  (table) => [unique().on(table.name, table.organization_id)]
);

export const departmentStaffRoleTitleRelation = relations(
  DepartmentTitle,
  ({ one }) => ({
    cxreator: one(User, {
      fields: [DepartmentTitle.created_by],
      references: [User.id]
    }),
    updater: one(User, {
      fields: [DepartmentTitle.updated_by],
      references: [User.id]
    }),
    deleter: one(User, {
      fields: [DepartmentTitle.deleted_by],
      references: [User.id]
    })
  })
);

export interface InsertDepartmentTitleInterface
  extends InferInsertModel<typeof DepartmentTitle> {}

export type SelectDepartmentTitleInterface = InferSelectModel<
  typeof DepartmentTitle
>;
