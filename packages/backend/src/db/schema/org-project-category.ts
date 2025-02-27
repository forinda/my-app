import { integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { Organization } from './organization';
import { User } from './user';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';

export const OrgProjectCategory = pgTable(
  'organization_project_categories',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
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

export const organizationProjectCategoryRelations = relations(
  OrgProjectCategory,
  ({ one }) => ({
    creator: one(User, {
      fields: [OrgProjectCategory.created_by],
      references: [User.id]
    }),
    updater: one(User, {
      fields: [OrgProjectCategory.updated_by],
      references: [User.id]
    }),
    deleter: one(User, {
      fields: [OrgProjectCategory.deleted_by],
      references: [User.id]
    }),
    organization: one(Organization, {
      fields: [OrgProjectCategory.organization_id],
      references: [Organization.id]
    })
  })
);

export interface SelectProjectCategoryInterface
  extends InferSelectModel<typeof OrgProjectCategory> {}

export interface InsertProjectCategoryInterface
  extends InferInsertModel<typeof OrgProjectCategory> {}
