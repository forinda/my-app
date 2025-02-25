import { injectable } from 'inversify';
import { and, eq } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import { OrganizationInvite, OrganizationMember } from '@/db/schema';
import type { RespondToOrgInviteType } from '../schema';
// import { lower } from '@/db';

@injectable()
@Dependency()
export class RespondToOrgInviteService {
  @TransactionalService()
  async add({ data, transaction }: TransactionContext<RespondToOrgInviteType>) {
    const invite = await transaction!.query.OrganizationInvite.findFirst({
      where: eq(OrganizationInvite.id, data.invite_id)
    });

    if (!invite) {
      throw new ApiError(
        'Organization invite not found',
        HttpStatus.NOT_FOUND,
        {}
      );
    }
    if (invite.status !== 'pending') {
      throw new ApiError(
        'Organization invite has already been responded to',
        HttpStatus.CONFLICT,
        {}
      );
    }
    // Expiry date check
    if (new Date(invite.expiry_date).getTime() < new Date().getTime()) {
      throw new ApiError(
        'Organization invite has expired',
        HttpStatus.CONFLICT,
        {}
      );
    }

    await transaction!
      .update(OrganizationInvite)
      .set({
        status: data.action
      })
      .where(eq(OrganizationInvite.id, data.invite_id));

    if (data.action === 'accepted') {
      const existingOrgMember =
        await transaction!.query.OrganizationMember.findFirst({
          where: and(
            eq(OrganizationMember.organization_id, invite.organization_id),
            eq(OrganizationMember.user_id, invite.user_id!)
          )
        });

      if (!existingOrgMember) {
        await transaction!.insert(OrganizationMember).values({
          organization_id: invite.organization_id,
          user_id: invite.user_id!,
          is_active: true,
          date_joined: new Date().toISOString(),
          created_by: invite.created_by,
          updated_by: invite.user_id!,
          designation_id: invite.designation_id
        });
      }
    }

    return {
      data: {},
      status: HttpStatus.CREATED,
      message: `Successfully sent invites to users`
    };
  }
}
