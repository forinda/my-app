// import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  unique,
  varchar
} from 'drizzle-orm/pg-core';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { User } from './user';
import { Organization } from './organization';
import { OrganizationMember } from './organization-member';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';

export const OrganizationDesignation = pgTable(
  'organization_member_designations',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    organization_id: integer()
      .notNull()
      .references(() => Organization.id, foreignKeyConstraints),
    name: varchar().notNull(),
    description: varchar(),
    is_active: boolean().notNull().default(true),
    created_by: integer()
      .references(() => User.id, foreignKeyConstraints)
      .notNull(),
    updated_by: integer()
      .references(() => User.id, foreignKeyConstraints)
      .notNull(),
    deleted_by: integer().references(() => User.id, foreignKeyConstraints),
    ...getTableTimestamps()
  },
  (table) => [unique().on(table.organization_id, table.name)]
);

export const organizationMemberDesignationRelation = relations(
  OrganizationDesignation,
  ({ many, one }) => ({
    users: many(OrganizationMember),
    creator: one(User, {
      fields: [OrganizationDesignation.created_by],
      references: [User.id]
    }),
    updator: one(User, {
      fields: [OrganizationDesignation.updated_by],
      references: [User.id]
    }),
    deleter: one(User, {
      fields: [OrganizationDesignation.deleted_by],
      references: [User.id]
    })
  })
);

export interface SelectOrganizationMemberDesignationInterface
  extends InferSelectModel<typeof OrganizationDesignation> {}

export interface InsertOrganizationMemberDesignationInterface
  extends InferInsertModel<typeof OrganizationDesignation> {}
