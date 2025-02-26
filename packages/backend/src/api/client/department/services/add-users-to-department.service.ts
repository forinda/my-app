import { injectable } from 'inversify';
import type { AddUsersToDepartmentPayload } from '../schema/schema';

import { and, eq, inArray } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import type { InsertDepartmentMemberInterface } from '@/db/schema';
import { Department, DepartmentMember } from '@/db/schema';

@injectable()
@Dependency()
export class AddUserToDepartmentService {
  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<AddUsersToDepartmentPayload>) {
    const existingDept = await transaction!.query.Department.findFirst({
      where: and(
        eq(Department.id, data.department_id),
        eq(Department.organization_id, data.organization_id)
      )
    });

    if (!existingDept) {
      throw new ApiError('Department not found', HttpStatus.CONFLICT, {});
    }

    const exisingMembers = await transaction!.query.DepartmentMember.findMany({
      where: and(
        eq(DepartmentMember.department_id, data.department_id),
        eq(DepartmentMember.organization_id, data.organization_id),
        inArray(DepartmentMember.user_id, data.users)
      )
    });

    if (exisingMembers.length) {
      data.users = data.users.filter(
        (id) => !exisingMembers.some((m) => m.user_id === id)
      );
    }

    if (!data.users.length) {
      return {
        data: {},
        status: HttpStatus.OK,
        message: 'Users added successfully'
      };
    }
    const insertData: InsertDepartmentMemberInterface[] = data.users.map(
      (user_id) => ({
        department_id: data.department_id,
        organization_id: data.organization_id,
        user_id,
        created_by: data.created_by,
        updated_by: data.updated_by
      })
    );

    await transaction!.insert(DepartmentMember).values(insertData).execute();

    return {
      data: {},
      status: HttpStatus.CREATED,
      message: 'Users added successfully'
    };
  }
}
