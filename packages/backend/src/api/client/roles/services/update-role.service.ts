import { injectable } from 'inversify';
import type { UpdateRoleRequestBody } from '../schema/create-role-request.schema';
import { AuthPermission, AuthRole, RolePermission } from '@/db/schema';
import { and, eq, inArray } from 'drizzle-orm';
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
import { ApiError } from '@/common/errors/base';

@injectable()
@Dependency()
export class UpdateRoleService {
  @TransactionalService()
  async update({
    data,
    transaction
  }: TransactionContext<UpdateRoleRequestBody>) {
    const { permissions, role_id, ...rest } = data!;

    const [existingAuthRole] = await transaction!
      .select()
      .from(AuthRole)
      .where(eq(AuthRole.id, role_id!));

    if (!existingAuthRole) {
      raiseHttpErrorResponse(HttpStatus.BAD_REQUEST, 'Role not found');
    }

    const updatedRole = await transaction!
      .update(AuthRole)
      .set({
        ...rest
      } as any)
      .where(eq(AuthRole.id, role_id!))
      .returning();

    if (permissions) {
      // processs permissions
      const preExistingRolePermissions = await transaction!
        .select()
        .from(RolePermission)
        .where(eq(RolePermission.role_id, role_id!));

      // We need to only remove permissions that are not in the new permissions
      const permissionsToRemove = preExistingRolePermissions.filter(
        (permission) => !permissions?.includes(permission.permission_id)
      );

      // We need to only add permissions that are not in the old permissions
      const permissionsToAdd = permissions?.filter(
        (permission) =>
          !preExistingRolePermissions.find(
            (prePermission) => prePermission.permission_id === permission
          )
      );
      const formattedPermissionsToRemove = permissionsToRemove.map(
        (permission) => permission.permission_id
      );

      if (permissionsToRemove.length) {
        // We need to remove permissions
        await transaction!
          .delete(RolePermission)
          .where(
            and(
              eq(RolePermission.role_id, role_id!),
              inArray(
                RolePermission.permission_id,
                formattedPermissionsToRemove
              )
            )
          );
      }
      const formattedPermissionsToAdd = permissionsToAdd?.map((permission) => ({
        role_id,
        permission_id: permission
      }));

      // const
      const preExistingPermissionsInDb = await transaction
        ?.select()
        .from(AuthPermission)
        .where(inArray(AuthPermission.id, permissions));

      formattedPermissionsToAdd?.forEach((permission) => {
        if (
          !preExistingPermissionsInDb!.find(
            ({ id }) => id === permission.permission_id
          )
        ) {
          throw new ApiError(
            'Permission does not exist',
            HttpStatus.BAD_REQUEST,
            {
              id: permission.permission_id
            }
          );
        }
      });
      if (formattedPermissionsToAdd?.length) {
        // We need to add permissions
        await transaction!
          .insert(RolePermission)
          .values(formattedPermissionsToAdd);
      }
    }

    return createHttpSuccessResponse(
      updatedRole,
      HttpStatus.OK,
      'Role updated successfully'
    );
  }
}
