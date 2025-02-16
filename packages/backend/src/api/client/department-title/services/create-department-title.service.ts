import { injectable } from 'inversify';
import type { DepartmentTitleCreationRequest } from '../schema/schema';

import { and, eq } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import type { InsertDepartmentTitleInterface } from '@/db/schema';
import { DepartmentTitle } from '@/db/schema';

@injectable()
@Dependency()
export class CreateNewDepartmentTitleService {
  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<DepartmentTitleCreationRequest>) {
    const exisiting = await transaction!.query.DepartmentTitle.findFirst({
      where: and(
        eq(DepartmentTitle.name, data.name),
        eq(DepartmentTitle.organization_id, data.organization_id!)
      )
    });

    if (exisiting) {
      throw new ApiError(
        'Title with same name already exists',
        HttpStatus.CONFLICT,
        {}
      );
    }

    const title = (
      await transaction!
        .insert(DepartmentTitle)
        .values(data as InsertDepartmentTitleInterface)
        .returning()
        .execute()
    )[0];

    return {
      data: title,
      status: HttpStatus.CREATED,
      message: 'Department title created successfully'
    };
  }
}
