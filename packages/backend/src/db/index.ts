import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import type { SQL } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

export function useDrizzle() {
  return drizzle(process.env.DATABASE_URL!, { casing: 'snake_case', schema });
}

type DrizzleHookReturnType = ReturnType<typeof useDrizzle>;
// export interface DrizzleTransaction extends DrizzleReturnType[''] {}
export type DrizzleTransaction = Parameters<
  Parameters<Pick<DrizzleHookReturnType, 'transaction'>['transaction']>[0]
>[0];

// custom lower function
export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}

// custom upper function
export function upper(email: AnyPgColumn): SQL {
  return sql`upper(${email})`;
}
