import { injectable } from 'inversify';
import type { UpdateRoleRequestBody } from '../schema/create-role-request.schema';
import { AuthRole } from '@/db/schema';
import { eq } from 'drizzle-orm';
import {
  raiseHttpErrorResponse,
  createHttpSuccessResponse
} from '@/common/utils/http-response';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import type { TransactionContext } from '@/common/decorators/service-transaction';

@injectable()
@Dependency()
export class UpdateRoleService {
  async create({
    data,
    transaction
  }: TransactionContext<UpdateRoleRequestBody>) {
    const { name, description } = data!;

    const [existingAuthRole] = await transaction!
      .select()
      .from(AuthRole)
      .where(eq(AuthRole.name, name!));

    if (existingAuthRole) {
      raiseHttpErrorResponse(HttpStatus.CONFLICT, 'Role already exists');
    }

    const createdRole = await transaction!
      .insert(AuthRole)
      .values({
        name,
        description
      } as any)
      .returning();

    throw new Error('Not implemented');

    return createHttpSuccessResponse(
      createdRole,
      HttpStatus.OK,
      'Role updated successfully'
    );
  }
}
