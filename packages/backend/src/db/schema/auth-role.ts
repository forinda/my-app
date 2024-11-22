import { getTableTimestamps } from '@/common/constants/table-timestamps';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { AuthPermission } from './auth-permission';
import { relations } from 'drizzle-orm';

export const AuthRole = pgTable('auth_roles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  ...getTableTimestamps()
});

export const authRoleRelations = relations(AuthRole, ({ many }) => ({
  permissions: many(AuthPermission)
}));
