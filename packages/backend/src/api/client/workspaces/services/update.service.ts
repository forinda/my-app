import { inject, injectable } from 'inversify';
import type { UpdateWorkspacePayload } from '../schema/schema';

import { and, eq, ne } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import { OrgWorkspace } from '@/db/schema';
import { UUID } from '@/common/utils/uuid';

@injectable()
@Dependency()
export class UpdateWorkspaceService {
  @inject(UUID) private uuid: UUID;
  @TransactionalService()
  async update({
    data,
    transaction
  }: TransactionContext<UpdateWorkspacePayload>) {
    this.uuid.validateUUID(data.workspace_id!);
    const existingDept = await transaction!.query.OrgWorkspace.findFirst({
      where: and(
        eq(OrgWorkspace.name, data.name!),
        eq(OrgWorkspace.organization_id, data.organization_id),
        ne(OrgWorkspace.uuid, data.workspace_id)
      )
    });

    if (existingDept) {
      throw new ApiError(
        'Workspace with same name already exists',
        HttpStatus.CONFLICT,
        {}
      );
    }

    await transaction!
      .update(OrgWorkspace)
      .set(data)
      .where(eq(OrgWorkspace.uuid, data.workspace_id!))
      .execute();

    return {
      data: {},
      status: HttpStatus.OK,
      message: 'Workspace updated successfully'
    };
  }
}
