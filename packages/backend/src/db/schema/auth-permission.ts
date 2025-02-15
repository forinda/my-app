import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { AuthModule } from './auth-module';
import { relations } from 'drizzle-orm';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';

export const AuthPermission = pgTable('auth_permissions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull().unique(),
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
