import { getTableTimestamps } from '@/common/constants/table-timestamps';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { User } from './user-table';
import { foreignKeyConstraints } from '../../common/constants/foreign-key-constraints';

export const Token = pgTable('tokens', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints)
    .notNull(),
  access_token: varchar(),
  refresh_token: varchar(),
  created_by: integer()
    .notNull()
    .references(() => User.id, foreignKeyConstraints)
    .notNull(),
  ...getTableTimestamps()
});

export const tokenRelations = relations(Token, ({ one }) => ({
  owner: one(User, {
    fields: [Token.user_id],
    references: [User.id]
  })
}));
