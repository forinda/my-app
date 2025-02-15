import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { User } from './user';
import { Department } from './department';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';

export const Organization = pgTable('organizations', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  is_active: boolean().notNull().default(true),
  uuid: uuid().defaultRandom().unique().notNull(),
  created_by: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  updated_by: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  deleted_by: integer().references(() => User.id, foreignKeyConstraints),
  ...getTableTimestamps()
});

export const organizationRelationships = relations(
  Organization,
  ({ one, many }) => ({
    owner: one(User, {
      fields: [Organization.created_by],
      references: [User.id]
    }),
    updatedBy: one(User, {
      fields: [Organization.updated_by],
      references: [User.id]
    }),
    departments: many(Department)
  })
);

export interface SelectOrganizationInterface
  extends InferSelectModel<typeof Organization> {}

export interface InsertOrganizationInterface
  extends InferInsertModel<typeof Organization> {}
