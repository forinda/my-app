import { getTableTimestamps } from '@/common/utils/drizzle';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const AuthModule = pgTable('auth_modules', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  ...getTableTimestamps()
});

// export const authModuleRelations = relations(AuthModule, ({ many }) => ({
//   permissions: many(AuthPermission)
// }));
