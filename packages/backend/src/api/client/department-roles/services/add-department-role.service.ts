import { injectable } from 'inversify';
import type { DepartmentUserRoleCreationRequest } from '../schema/schema';

import { and, eq, inArray } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import type { InsertDepartmentRoleInterface } from '@/db/schema';
import { Department, DepartmentTitle, DepartmentUserRole } from '@/db/schema';

@injectable()
@Dependency()
export class AddNewDepartmentUserRoleService {
  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<DepartmentUserRoleCreationRequest>) {
    const currentDepartment = await transaction!.query.Department.findFirst({
      where: and(
        eq(Department.id, data.department_id),
        eq(DepartmentTitle.organization_id, data.organization_id!)
      )
    });

    if (!currentDepartment) {
      throw new ApiError('Department not found', HttpStatus.NOT_FOUND, {});
    }

    const userWhoIsOrgmember =
      await transaction!.query.OrganizationMember.findFirst({
        where: eq(DepartmentUserRole.user_id, data.user_id)
      });

    if (!userWhoIsOrgmember || userWhoIsOrgmember.is_active === false) {
      throw new ApiError(
        `User is not an active member of the organization`,
        HttpStatus.NOT_FOUND,
        {}
      );
    }
    /**
     * If a user is already in the roles and it's same day,
     * we just update the one for today
     * If user is not in the dept roles we create new one and the
     * start date should be the end date of the
     * last role of the user in the department
     */
    const preExistingDeptRoles =
      await transaction!.query.DepartmentUserRole.findMany({
        where: and(
          eq(DepartmentUserRole.department_id, data.department_id),
          eq(DepartmentUserRole.is_active, true)
        )
      });

    const rolesToEnd = preExistingDeptRoles.map((role) => role.id);

    if (rolesToEnd.length > 0) {
      await transaction!
        .update(DepartmentUserRole)
        .set({ is_active: false, end_date: data.start_date })
        .where(inArray(DepartmentUserRole.id, rolesToEnd))
        .execute();
    }

    const preparedData: InsertDepartmentRoleInterface = {
      is_active: true,
      user_id: data.user_id,
      start_date: data.start_date,
      role_title_id: data.role_title_id,
      created_by: data.created_by!,
      updated_by: data.updated_by!,
      end_date: null,
      department_id: data.department_id
    };

    const role = (
      await transaction!
        .insert(DepartmentUserRole)
        .values(preparedData)
        .returning()
        .execute()
    )[0];

    return {
      data: role,
      status: HttpStatus.CREATED,
      message: 'Department role created successfully'
    };
  }
}
