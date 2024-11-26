import { injectable } from 'inversify';
import type { CreateRoleRequestBody } from '../schema/create-role-request.schema';
import { AuthPermission, AuthRole, RolePermission } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import {
  raiseHttpErrorResponse,
  createHttpSuccessResponse
} from '@/common/utils/http-response';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';

@injectable()
@Dependency()
export class CreateRoleService {
  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<CreateRoleRequestBody>) {
    const { name, description, permissions } = data!;
    const [existingAuthRole] = await transaction!
      .select()
      .from(AuthRole)
      .where(eq(AuthRole.name, name));

    if (existingAuthRole) {
      raiseHttpErrorResponse(HttpStatus.CONFLICT, 'Role already exists');
    }

    const [createdRole] = await transaction!
      .insert(AuthRole)
      .values({
        name,
        description
      } as any)
      .returning();

    if (permissions) {
      const existingPermissions = await transaction!
        .select()
        .from(AuthPermission)
        .where(sql`id IN (${permissions})`)
        .execute();

      if (existingPermissions.length !== permissions.length) {
        raiseHttpErrorResponse(HttpStatus.BAD_REQUEST, 'Invalid permissions');
      }
      for (const permission of permissions) {
        const [existingRolePermission] = await transaction!
          .select()
          .from(RolePermission)
          .where(eq(RolePermission.permission_id, permission))
          .execute();

        if (!existingRolePermission) {
          await transaction!
            .insert(RolePermission)
            .values({
              role_id: createdRole.id,
              permission_id: permission
            } as any)
            .execute();
        }
      }
    }

    return createHttpSuccessResponse(
      createdRole,
      HttpStatus.CREATED,
      'Role created successfully'
    );
  }
}
