import { getTableTimestamps } from '@/common/constants/table-timestamps';
import { relations } from 'drizzle-orm';
import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { User } from './user-table';

export const LoginSession = pgTable('login_sessions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull(),
  login_ip: varchar().notNull(),
  session_id: uuid().notNull(),
  ...getTableTimestamps()
});

export const loginSessionRelations = relations(LoginSession, ({ one }) => ({
  owner: one(User, {
    fields: [LoginSession.user_id],
    references: [User.id]
  })
}));
