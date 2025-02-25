import { inject, injectable } from 'inversify';
import { Organization, OrganizationMember, User } from '@/db/schema';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import { eq, inArray } from 'drizzle-orm';
import { ApiError } from '@/common/errors/base';
import type { TransactionContext } from '@/common/decorators/service-transaction';
import { TransactionalService } from '@/common/decorators/service-transaction';
import { UUID } from '@/common/utils/uuid';
import type { AddMemberToOrRemoveFromOrganizationType } from '../schema';

@injectable()
@Dependency()
export class RemoveOrganizationMemberService {
  @inject(UUID) private uuid: UUID;

  @TransactionalService()
  async remove({
    data,
    transaction
  }: TransactionContext<AddMemberToOrRemoveFromOrganizationType>) {
    const existingOrg = await transaction!.query.Organization.findFirst({
      where: eq(Organization.uuid, data.organization_id)
    });

    if (!existingOrg) {
      throw new ApiError('Organization not found', HttpStatus.CONFLICT, {});
    }

    const usersInDb = (await transaction
      ?.select({
        id: User.id,
        uuid: User.uuid
      })
      .from(User)
      .where(inArray(User.uuid, data.emails))
      .execute())!;
    const membersToRemove = await transaction
      ?.select({
        id: OrganizationMember.id,
        user_id: OrganizationMember.user_id,
        is_active: OrganizationMember.is_active
      })
      .from(OrganizationMember)
      .where(
        inArray(
          OrganizationMember.user_id,
          usersInDb.map((user) => user.id)
        )
      )
      .execute();

    if (!membersToRemove || membersToRemove.length === 0) {
      throw new ApiError(
        'No members found to remove',
        HttpStatus.NOT_FOUND,
        {}
      );
    }

    const activeMembers = membersToRemove.filter((m) => m.is_active);
    const { updated_by } = data;

    if (activeMembers.length > 0) {
      await transaction!
        .update(OrganizationMember)
        .set({
          is_active: false,
          updated_by
        })
        .where(
          inArray(
            OrganizationMember.id,
            activeMembers.map((m) => m.id)
          )
        );
    }

    return {
      data: {},
      status: HttpStatus.OK,
      message: `Successfully removed ${activeMembers.length} members from ${existingOrg.name}`
    };
  }
}
