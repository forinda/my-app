import type { PgTransaction } from 'drizzle-orm/pg-core';

export type DbTransaction = PgTransaction<any>;
