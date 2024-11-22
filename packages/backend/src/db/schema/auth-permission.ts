import { getTableTimestamps } from '@/common/constants/table-timestamps';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { AuthModule } from './auth-module';
import { foreignKeyConstraints } from '@/common/constants/foreign-key-constraints';
import { relations } from 'drizzle-orm';

export const AuthPermission = pgTable('auth_permissions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  module_id: integer()
    .references(() => AuthModule.id, foreignKeyConstraints)
    .notNull(),
  ...getTableTimestamps()
});

export const authPermissionRelations = relations(AuthPermission, ({ one }) => ({
  module: one(AuthModule, {
    fields: [AuthPermission.module_id],
    references: [AuthModule.id]
  })
}));
