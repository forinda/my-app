import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { AuthRole } from './auth-role';
import { AuthPermission } from './auth-permission';
import { relations } from 'drizzle-orm';
import {
  foreignKeyConstraints,
  getTableTimestamps
} from '@/common/utils/drizzle';

export const RolePermission = pgTable(
  'role_permissions',
  {
    permission_id: integer('permission_id')
      .notNull()
      .references(() => AuthPermission.id, foreignKeyConstraints),
    role_id: integer('role_id')
      .notNull()
      .references(() => AuthRole.id, foreignKeyConstraints),
    ...getTableTimestamps()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.permission_id, t.role_id] })
  })
);

export const rolePermissionRelations = relations(RolePermission, ({ one }) => ({
  permission: one(AuthPermission, {
    fields: [RolePermission.permission_id],
    references: [AuthPermission.id]
  }),
  role: one(AuthRole, {
    fields: [RolePermission.role_id],
    references: [AuthRole.id]
  })
}));
