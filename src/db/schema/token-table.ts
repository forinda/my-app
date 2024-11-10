import { getTableTimestamps } from '@/common/constants/table-timestamps';
import { date, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { User } from './user-table';

export const Token = pgTable('tokens', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull(),
  token: varchar({ length: 6 }).notNull(),
  expiry_date: date({ mode: 'string' }),
  role: varchar().notNull(),
  ...getTableTimestamps()
});

export const tokenRelations = relations(Token, ({ one }) => ({
  owner: one(User, {
    fields: [Token.user_id],
    references: [User.id]
  })
}));
