import { injectable } from 'inversify';
import type { UpdateDepartmentTitleRequest } from '../schema/schema';

import { and, eq, ne } from 'drizzle-orm';

import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { DepartmentTitle } from '@/db/schema';
import { ApiError, HttpStatus } from 'shared';

@injectable()
@Dependency()
export class UpdateDepartmentService {
  @TransactionalService()
  async update({
    data: { title_id, ...data },
    transaction
  }: TransactionContext<UpdateDepartmentTitleRequest>) {
    const exisiting = await transaction!.query.DepartmentTitle.findFirst({
      where: eq(DepartmentTitle.id, title_id)
    });

    if (!exisiting) {
      throw new ApiError(
        'Department title not found',
        HttpStatus.NOT_FOUND,
        {}
      );
    }

    const otherWithSameName =
      await transaction!.query.DepartmentTitle.findFirst({
        where: and(
          eq(DepartmentTitle.name, data.name!),
          eq(DepartmentTitle.organization_id, data.organization_id!),
          ne(DepartmentTitle.id, title_id)
        )
      });

    if (otherWithSameName) {
      throw new ApiError(
        'Title with same name already exists',
        HttpStatus.CONFLICT,
        {}
      );
    }

    return {
      data: {},
      status: HttpStatus.OK,
      message: 'Department title updated successfully'
    };
  }
}
