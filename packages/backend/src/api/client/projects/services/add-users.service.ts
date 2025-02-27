import { injectable } from 'inversify';
import type { AddUsersToProjectPayload } from '../schema/schema';

import { and, eq, inArray } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import type { InsertOrgProjectMemberInterface } from '@/db/schema';
import {
  OrgProjectMember,
  OrgWorkspace,
  OrgWorkspaceMember
} from '@/db/schema';

@injectable()
@Dependency()
export class AddUserToWorkspaceService {
  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<AddUsersToProjectPayload>) {
    const existingWorkspace = await transaction!.query.OrgWorkspace.findFirst({
      where: and(
        eq(OrgWorkspace.id, data.project_id),
        eq(OrgWorkspace.organization_id, data.organization_id)
      )
    });

    if (!existingWorkspace) {
      throw new ApiError('Workspace not found', HttpStatus.NOT_FOUND, {});
    }

    const exisingMembers = await transaction!.query.OrgWorkspaceMember.findMany(
      {
        where: and(
          eq(OrgWorkspaceMember.workspace_id, data.project_id),
          inArray(OrgWorkspaceMember.user_id, data.users)
        )
      }
    );

    if (exisingMembers.length) {
      // Remove existing members from the list
      data.users = data.users.filter(
        (id) => !exisingMembers.some((m) => m.user_id === id)
      );
    }

    if (!data.users.length) {
      // return {
      //   data: {},
      //   status: HttpStatus.OK,
      //   message: 'Users added successfully'
      // };
      throw new ApiError(
        'Users already added to workspace',
        HttpStatus.CONFLICT,
        {}
      );
    }
    const insertData: InsertOrgProjectMemberInterface[] = data.users.map(
      (user_id) => ({
        user_id,
        created_by: data.created_by,
        updated_by: data.updated_by,

        is_active: true,
        project_id: data.project_id
      })
    );

    await transaction!.insert(OrgProjectMember).values(insertData).execute();

    return {
      data: {},
      status: HttpStatus.CREATED,
      message: 'Users added successfully'
    };
  }
}
