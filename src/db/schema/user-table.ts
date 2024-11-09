import { getTableTimestamps } from '@/common/constants/table-timestamps';
import { boolean, date, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const UserTable = pgTable('users', {
  id: integer().primaryKey(),
  first_name: varchar().notNull(),
  last_name: varchar().notNull(),
  email: varchar().notNull().unique(),
  username: varchar().notNull().unique(),
  password: varchar().notNull(),
  is_active: boolean().notNull().default(false),
  is_email_verified: boolean().notNull().default(false),
  last_login_at: date({ mode: 'string' }),
  last_login_ip: varchar(),
  needs_to_reset_password: boolean().notNull().default(false),
  ...getTableTimestamps()
});
