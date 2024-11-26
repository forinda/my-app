import db from '@/db';
import { ApiError } from '../errors/base';
import type { DbTransaction } from '../interfaces/db';

export type TransactionContext<D = any> = {
  data: D;
  transaction?: DbTransaction;
};

export function TransactionalService() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      return await db.transaction(async (tx) => {
        if (args.length > 1) {
          throw new ApiError('Method on requires a single argument');
        }
        const context: TransactionContext = {
          data: args[0]?.['data'],
          transaction: tx as any
        };
        const result = await originalMethod.apply(this, [context]);

        return result;
      });
    };

    return descriptor;
  };
}
