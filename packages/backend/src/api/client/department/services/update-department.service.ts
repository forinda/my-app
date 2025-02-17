import { injectable } from 'inversify';
import type { UpdateDepartmentPayload } from '../schema/schema';

import { and, eq, ne } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import { Department } from '@/db/schema';

@injectable()
@Dependency()
export class UpdateDepartmentService {
  @TransactionalService()
  async update({
    data,
    transaction
  }: TransactionContext<UpdateDepartmentPayload>) {
    const existingDept = await transaction!.query.Department.findFirst({
      where: and(
        eq(Department.name, data.name!),
        eq(Department.organization_id, data.organization_id),
        ne(Department.id, data.department_id)
      )
    });

    if (existingDept) {
      throw new ApiError(
        'Department with same name already exists',
        HttpStatus.CONFLICT,
        {}
      );
    }

    await transaction!
      .update(Department)
      .set(data)
      .where(eq(Department.id, data.department_id!))
      .execute();

    return {
      data: {},
      status: HttpStatus.OK,
      message: 'Department updated successfully'
    };
  }
}
