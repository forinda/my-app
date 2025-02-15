import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { AuthRole } from './auth-role';
import { relations } from 'drizzle-orm';
import { User } from './user';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';
import { Organization } from './organization';

export const UserRole = pgTable(
  'user_roles',
  {
    user_id: integer()
      .notNull()
      .references(() => User.id, foreignKeyConstraints),
    role_id: integer()
      .notNull()
      .references(() => AuthRole.id, foreignKeyConstraints),
    organization_id: integer()
      .references(() => Organization.id, foreignKeyConstraints)
      .notNull(),
    ...getTableTimestamps()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.user_id, t.role_id, t.organization_id] })
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
