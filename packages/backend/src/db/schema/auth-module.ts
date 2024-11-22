import { getTableTimestamps } from '@/common/constants/table-timestamps';
import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { AuthPermission } from './auth-permission';

export const AuthModule = pgTable('auth_modules', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  ...getTableTimestamps()
});

export const authModuleRelations = relations(AuthModule, ({ many }) => ({
  permissions: many(AuthPermission)
}));
