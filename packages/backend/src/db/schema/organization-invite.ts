import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { User } from './user';
import { Organization } from './organization';
import { OrganizationDesignation } from './organization-member-designation';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';

export const OrganizationInvite = pgTable('organization_invites', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().references(() => User.id, foreignKeyConstraints),
  organization_id: integer()
    .notNull()
    .references(() => Organization.id, foreignKeyConstraints),
  designation_id: integer()
    .notNull()
    .references(() => OrganizationDesignation.id, foreignKeyConstraints),
  email: varchar().notNull(),
  is_accepted: boolean().notNull().default(false),
  expiry_date: timestamp({ mode: 'string' }).notNull(),
  created_by: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  updated_by: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints),
  deleted_by: integer().references(() => User.id, foreignKeyConstraints),
  ...getTableTimestamps()
});

export const organizationInviteRelations = relations(
  OrganizationInvite,
  ({ one }) => ({
    designation: one(OrganizationDesignation, {
      fields: [OrganizationInvite.designation_id],
      references: [OrganizationDesignation.id]
    }),
    creator: one(User, {
      fields: [OrganizationInvite.created_by],
      references: [User.id]
    }),
    updator: one(User, {
      fields: [OrganizationInvite.updated_by],
      references: [User.id]
    }),
    deleter: one(User, {
      fields: [OrganizationInvite.deleted_by],
      references: [User.id]
    }),
    organization: one(Organization, {
      fields: [OrganizationInvite.organization_id],
      references: [Organization.id]
    })
  })
);

export interface SelectOrganizationInviteInterface
  extends InferSelectModel<typeof OrganizationInvite> {}

export interface InsertOrganizationInviteInterface
  extends InferInsertModel<typeof OrganizationInvite> {}
