import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export function useDrizzle() {
  return drizzle(process.env.DATABASE_URL!, { casing: 'snake_case', schema });
}

type DrizzleHookReturnType = ReturnType<typeof useDrizzle>;
// export interface DrizzleTransaction extends DrizzleReturnType[''] {}
export type DrizzleTransaction = Parameters<
  Parameters<Pick<DrizzleHookReturnType, 'transaction'>['transaction']>[0]
>[0];
