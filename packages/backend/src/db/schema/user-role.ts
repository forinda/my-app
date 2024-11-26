import { getTableTimestamps } from '@/common/constants/table-timestamps';
import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { AuthRole } from './auth-role';
import { foreignKeyConstraints } from '@/common/constants/foreign-key-constraints';
import { User } from './user-table';
import { relations } from 'drizzle-orm';

export const UserRole = pgTable(
  'user_roles',
  {
    user_id: integer('user_id')
      .notNull()
      .references(() => User.id, foreignKeyConstraints),
    role_id: integer('role_id')
      .notNull()
      .references(() => AuthRole.id, foreignKeyConstraints),
    ...getTableTimestamps()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.user_id, t.role_id] })
  })
);

export const userRoleRelations = relations(UserRole, ({ one }) => ({
  user: one(User, {
    fields: [UserRole.user_id],
    references: [User.id]
  }),
  role: one(AuthRole, {
    fields: [UserRole.role_id],
    references: [AuthRole.id]
  })
}));
