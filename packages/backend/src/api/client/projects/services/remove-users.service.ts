import { injectable } from 'inversify';
import type { RemoveUsersFromProjectPayload } from '../schema/schema';

import { and, eq, inArray } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import { OrgProject, OrgProjectMember } from '@/db/schema';

@injectable()
@Dependency()
export class RemoveUserFromProjectService {
  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<RemoveUsersFromProjectPayload>) {
    const existingProject = await transaction!.query.OrgProject.findFirst({
      where: and(
        eq(OrgProject.id, data.project_id),
        eq(OrgProject.organization_id, data.organization_id)
      )
    });

    if (!existingProject) {
      throw new ApiError('Project not found', HttpStatus.NOT_FOUND, {});
    }

    const exisingMembers = await transaction!.query.OrgProjectMember.findMany({
      where: and(
        eq(OrgProjectMember.project_id, data.project_id),
        eq(OrgProjectMember.is_active, true),
        inArray(OrgProjectMember.user_id, data.users)
      )
    });

    if (exisingMembers.length) {
      // Filter to retain only members who are in the workspace
      data.users = data.users.filter((id) =>
        exisingMembers.some((m) => m.user_id === id)
      );
    }

    if (!data.users.length) {
      throw new ApiError(
        'Users not found in project',
        HttpStatus.NOT_FOUND,
        {}
      );
    }

    await transaction!
      .update(OrgProjectMember)
      .set({
        is_active: false
      })
      .where(
        and(
          eq(OrgProjectMember.project_id, data.project_id),
          inArray(OrgProjectMember.user_id, data.users)
        )
      );

    return {
      data: {},
      status: HttpStatus.CREATED,
      message: 'Users removed successfully'
    };
  }
}
