import { integer, pgTable, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { Organization } from './organization';
import { User } from './user';
import { getTableTimestamps } from '@/common/utils/drizzle';

export const OrganizationDepartment = pgTable(
  'organization_departments',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uuid: uuid().defaultRandom().unique().notNull(),
    organization_id: integer().notNull(),
    name: varchar().notNull(),
    description: varchar().notNull(),
    created_by: integer().notNull(),
    updated_by: integer().notNull(),
    deleted_by: integer(),
    ...getTableTimestamps()
  },
  (table) => [unique().on(table.organization_id, table.name)]
);

export const organizationDepartmentRelationships = relations(
  OrganizationDepartment,
  ({ one }) => ({
    creator: one(User, {
      fields: [OrganizationDepartment.created_by],
      references: [User.id]
    }),
    updater: one(User, {
      fields: [OrganizationDepartment.updated_by],
      references: [User.id]
    }),
    deleter: one(User, {
      fields: [OrganizationDepartment.deleted_by],
      references: [User.id]
    }),
    organization: one(Organization, {
      fields: [OrganizationDepartment.organization_id],
      references: [Organization.id]
    })
  })
);

export interface SelectOrganizationDepartmentInterface
  extends InferSelectModel<typeof OrganizationDepartment> {}

export interface InsertOrganizationDepartmentInterface
  extends InferInsertModel<typeof OrganizationDepartment> {}
