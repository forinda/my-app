import { injectable } from 'inversify';
import type { CreateProductCategoryPayloadType } from '../schema/schema';

import { and, eq } from 'drizzle-orm';

import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import type { InsertProjectCategoryInterface } from '@/db/schema';
import { OrgProjectCategory } from '@/db/schema';
import { ApiError, HttpStatus } from '@app/shared';

@injectable()
@Dependency()
export class CreateProjectCategoryService {
  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<CreateProductCategoryPayloadType>) {
    const exisiting = await transaction!.query.OrgProjectCategory.findFirst({
      where: and(
        eq(OrgProjectCategory.name, data.name),
        eq(OrgProjectCategory.organization_id, data.organization_id!)
      )
    });

    if (exisiting) {
      throw new ApiError(
        'Category with same name already exists',
        HttpStatus.CONFLICT,
        {}
      );
    }

    const category = (
      await transaction!
        .insert(OrgProjectCategory)
        .values(data as InsertProjectCategoryInterface)
        .returning()
        .execute()
    )[0];

    return {
      data: category,
      status: HttpStatus.CREATED,
      message: 'Category created successfully'
    };
  }
}
