import { injectable } from 'inversify';
import { AuthRole, User, UserRole } from '@/db/schema';
import { createHttpSuccessResponse } from '@/common/utils/http-response';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import { and, eq, inArray } from 'drizzle-orm';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import type { AssignOrRemoveUserRoleRequestBody } from '../schema/create-user-request.schema';
import { ApiError } from '@/common/errors/base';

@injectable()
@Dependency()
export class UpdateUserRoleService {
  @TransactionalService()
  async update({
    data,
    transaction
  }: TransactionContext<AssignOrRemoveUserRoleRequestBody>) {
    const { user_id, role_ids } = data;
    const [existingUser] = await transaction!
      .select({ id: User.id })
      .from(User)
      .where(eq(User.id, user_id));

    if (!existingUser) {
      throw new ApiError('User not found', HttpStatus.NOT_FOUND, {
        id: user_id
      });
    }

    const existingRoles = await transaction!
      .select({ id: AuthRole.id })
      .from(AuthRole)
      .where(inArray(AuthRole.id, role_ids));

    if (existingRoles.length !== role_ids.length) {
      const missingRoles = role_ids.filter(
        (roleId) => !existingRoles.find((role) => role.id === roleId)
      );

      throw new ApiError(
        `Some selected roles do not exist`,
        HttpStatus.NOT_FOUND,
        {
          ids: missingRoles
        }
      );
    }
    const preExisingUserRoles = await transaction!
      .select({ role_id: UserRole.role_id, user_id: UserRole.user_id })
      .from(UserRole)
      .where(eq(UserRole.user_id, user_id));
    // Get the roles that need to be removed
    const rolesToRemove = preExisingUserRoles.filter(
      (role) => !role_ids.includes(role.role_id)
    );

    if (rolesToRemove.length > 0) {
      await transaction!
        .delete(UserRole)
        .where(
          and(
            eq(UserRole.user_id, user_id),
            inArray(
              UserRole.role_id,
              rolesToRemove.map((role) => role.role_id)
            )
          )
        )
        .execute();
    }
    // Get the roles that need to be added
    const rolesToAdd = role_ids.filter(
      (roleId) => !preExisingUserRoles.find((role) => role.role_id === roleId)
    );

    const formattedRoles = rolesToAdd.map((roleId) => ({
      user_id,
      role_id: roleId
    }));

    await transaction!.insert(UserRole).values(formattedRoles).execute();

    return createHttpSuccessResponse(
      {},
      HttpStatus.OK,
      'User Roles updated successfully'
    );
  }
}
