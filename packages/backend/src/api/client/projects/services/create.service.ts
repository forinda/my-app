import { injectable } from 'inversify';
import type { NewProjectPayload } from '../schema/schema';

import { and, eq } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import type { InsertOrgProjectInterface } from '@/db/schema';
import { OrgProject, OrgProjectCategory } from '@/db/schema';

@injectable()
@Dependency()
export class CreateProjectService {
  @TransactionalService()
  async create({ data, transaction }: TransactionContext<NewProjectPayload>) {
    const existingProject = await transaction!.query.OrgProject.findFirst({
      where: and(
        eq(OrgProject.name, data.name),
        eq(OrgProject.organization_id, data.organization_id)
      )
    });

    if (existingProject) {
      throw new ApiError(
        'Project with same name already exists',
        HttpStatus.CONFLICT,
        {}
      );
    }

    const category = await transaction!.query.OrgProjectCategory.findFirst({
      where: and(
        eq(OrgProjectCategory.id, data.category_id),
        eq(OrgProjectCategory.organization_id, data.organization_id)
      )
    });

    if (!category) {
      throw new ApiError('Category not found', HttpStatus.NOT_FOUND, {});
    }

    await transaction!
      .insert(OrgProject)
      .values(data as InsertOrgProjectInterface)
      .returning()
      .execute();

    return {
      data: {},
      status: HttpStatus.CREATED,
      message: 'Project created successfully'
    };
  }
}
