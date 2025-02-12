import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';
import { Organization } from './organization';
import { getTableTimestamps } from '@/common/utils/drizzle';

export const User = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: uuid().defaultRandom().unique().notNull(),
  first_name: varchar().notNull(),
  last_name: varchar().notNull(),
  email: varchar().notNull().unique(),
  gender: varchar().notNull(),
  username: varchar().notNull().unique(),
  password: varchar().notNull(),
  is_active: boolean().notNull().default(false),
  phone_number: varchar().notNull().unique(),
  is_email_verified: boolean().notNull().default(false),
  last_login_at: timestamp({ mode: 'string' }),
  is_admin: boolean().notNull().default(false),
  avatar: varchar().notNull().default(''),
  ...getTableTimestamps()
});

export const userRelationShips = relations(User, ({ many }) => ({
  organizations: many(Organization)
}));

export interface SelectUserInterface extends InferSelectModel<typeof User> {}

export interface InsertUserInterface extends InferInsertModel<typeof User> {}
