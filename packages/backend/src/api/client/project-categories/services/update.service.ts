import { injectable } from 'inversify';
import type { UpdateProjectCategoryPayloadType } from '../schema/schema';

import { and, eq, ne } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import { OrgProjectCategory } from '@/db/schema';

@injectable()
@Dependency()
export class UpdateProjectCategoryService {
  @TransactionalService()
  async update({
    data,
    transaction
  }: TransactionContext<UpdateProjectCategoryPayloadType>) {
    const exisiting = await transaction!.query.OrgProjectCategory.findFirst({
      where: eq(OrgProjectCategory.id, data.category_id)
    });

    if (!exisiting) {
      throw new ApiError('Category not found', HttpStatus.NOT_FOUND, {});
    }

    const otherWithSameName =
      await transaction!.query.DepartmentTitle.findFirst({
        where: and(
          eq(OrgProjectCategory.name, data.name!),
          eq(OrgProjectCategory.organization_id, data.organization_id!),
          ne(OrgProjectCategory.id, data.category_id)
        )
      });

    if (otherWithSameName) {
      throw new ApiError(
        'Category same name already exists',
        HttpStatus.CONFLICT,
        {}
      );
    }

    await transaction!
      .update(OrgProjectCategory)
      .set(data)
      .where(eq(OrgProjectCategory.id, data.category_id))
      .execute();

    return {
      data: {},
      status: HttpStatus.OK,
      message: 'Category updated successfully'
    };
  }
}
