import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';
import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { User } from './user';
import { Organization } from './organization';
import { relations } from 'drizzle-orm';

export const AuthSession = pgTable(
  'auth_sessions',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    auth_session_user_id: uuid()
      .notNull()
      .unique()
      .references(() => User.uuid, foreignKeyConstraints),
    auth_session_organization_id: uuid().references(
      () => Organization.uuid,
      foreignKeyConstraints
    ),
    ip: varchar().default(''),
    ...getTableTimestamps()
  }
  // (t) => [unique().on(t.user_id, t.organization_id)]
);

export const authSessionRelation = relations(AuthSession, ({ one }) => ({
  organization: one(Organization, {
    fields: [AuthSession.auth_session_organization_id],
    references: [Organization.uuid]
  }),
  user: one(User, {
    fields: [AuthSession.auth_session_user_id],
    references: [User.uuid]
  })
}));
