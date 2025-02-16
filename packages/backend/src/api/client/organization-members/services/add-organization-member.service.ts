import { inject, injectable } from 'inversify';
import { eq, inArray } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import { Organization, OrganizationMember, User } from '@/db/schema';
import type { AddMemberToOrRemoveFromOrganizationType } from '../schema';
import { UUID } from '@/common/utils/uuid';

@injectable()
@Dependency()
export class AddOrganizationMemberService {
  @inject(UUID) private uuid: UUID;
  @TransactionalService()
  async add({
    data,
    transaction
  }: TransactionContext<AddMemberToOrRemoveFromOrganizationType>) {
    this.uuid.validateUUID(data.organization_id, { throwError: true });
    const existingOrg = await transaction!.query.Organization.findFirst({
      where: eq(Organization.uuid, data.organization_id)
    });

    if (!existingOrg) {
      throw new ApiError('Organization not found', HttpStatus.CONFLICT, {});
    }
    const allExistingMembers = (await transaction
      ?.select({
        id: OrganizationMember.id,
        user_id: OrganizationMember.user_id,
        is_active: OrganizationMember.is_active,
        organization_id: Organization.id
      })
      .from(OrganizationMember)
      .where(eq(Organization.id, existingOrg.id))
      .execute())!;

    const usersToBeAdded = await transaction
      ?.select({
        id: User.id,
        uuid: User.uuid,
        is_active: User.is_active
      })
      .from(User)
      .where(inArray(User.uuid, data.users))
      .execute();
    const { updated_by, created_by } = data;
    const addData = data.users.map((user) => {
      const dbUser = usersToBeAdded?.find((u) => u.uuid === user);

      if (dbUser) {
        const isMember = allExistingMembers.find(
          (u) => u.user_id === dbUser.id
        );

        if (isMember) {
          if (!isMember.is_active) {
            return {
              user_id: dbUser.id,
              organization_id: existingOrg.id,
              action: 'update',
              member_id: isMember.id
            } as const;
          }

          return {
            user_id: dbUser.id,
            organization_id: existingOrg.id,
            action: 'skip'
          } as const;
        } else {
          return {
            user_id: dbUser.id,
            organization_id: existingOrg.id,
            action: 'add'
          } as const;
        }
      } else {
        return {
          user_id: null,
          organization_id: existingOrg.id,
          action: 'ommit'
        } as const;
      }
    });

    const usersToAdd = addData
      .filter((u) => u.action === 'add')
      .map((u) => ({
        ...u,
        created_by,
        updated_by,
        date_joined: new Date().toISOString(),
        is_active: true
      }));

    const usersToActivate = addData
      .filter((u) => u.action === 'update')
      .map(({ member_id }) => ({
        member_id
      }));

    if (usersToActivate.length > 0) {
      await transaction!
        .update(OrganizationMember)
        .set({
          is_active: true,
          updated_by
        })
        .where(
          inArray(
            OrganizationMember.id,
            usersToActivate.map((u) => u.member_id)
          )
        );
    }

    await transaction!.insert(OrganizationMember).values(usersToAdd).execute();

    return {
      data: {},
      status: HttpStatus.CREATED,
      message: `Successfully added ${usersToAdd.length} members to ${existingOrg.name}`
    };
  }
}
