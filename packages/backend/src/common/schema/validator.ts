import type { z } from 'zod';
import { injectable } from 'inversify';
import { Dependency } from '../di';
import { ApiError, HttpStatus } from '@app/shared';

@injectable()
@Dependency()
export class PayloadValidator {
  validate<T = any>(schema: z.Schema, payload: T) {
    const { success, error } = schema.safeParse(payload);

    if (!success) {
      const firstIssue = error.issues[0];
      const message = firstIssue.message
        .toLowerCase()
        .includes(firstIssue.path.toString().toLowerCase())
        ? firstIssue.message
        : `[${firstIssue.path}] ${firstIssue.message}`;

      throw new ApiError(message, HttpStatus.BAD_REQUEST, {
        status: 'error',
        type: 'validation_error'
      });
    }

    return payload as z.infer<typeof schema>;
  }
}
