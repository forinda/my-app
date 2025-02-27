import { inject, injectable } from 'inversify';
import type { UpdateProjectPayload } from '../schema/schema';

import { and, eq, ne } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import { OrgProject } from '@/db/schema';
import { UUID } from '@/common/utils/uuid';

@injectable()
@Dependency()
export class UpdateProjectService {
  @inject(UUID) private uuid: UUID;
  @TransactionalService()
  async update({
    data,
    transaction
  }: TransactionContext<UpdateProjectPayload>) {
    this.uuid.validateUUID(data.project_id!);
    const existingProject = await transaction!.query.OrgProject.findFirst({
      where: and(
        eq(OrgProject.name, data.name!),
        eq(OrgProject.organization_id, data.organization_id),
        ne(OrgProject.uuid, data.project_id)
      )
    });

    if (existingProject) {
      throw new ApiError(
        'Project with same name already exists',
        HttpStatus.CONFLICT,
        {}
      );
    }

    await transaction!
      .update(OrgProject)
      .set(data)
      .where(eq(OrgProject.uuid, data.project_id!))
      .execute();

    return {
      data: {},
      status: HttpStatus.OK,
      message: 'Project updated successfully'
    };
  }
}
