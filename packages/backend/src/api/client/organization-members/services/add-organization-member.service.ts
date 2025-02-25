import { inject, injectable } from 'inversify';
import { and, eq, inArray } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import { Organization, OrganizationInvite, User } from '@/db/schema';
import type { AddMemberToOrRemoveFromOrganizationType } from '../schema';
import { NodeMailer } from '@/common/utils/node-mailer';
// import { lower } from '@/db';

@injectable()
@Dependency()
export class AddOrganizationMemberService {
  @inject(NodeMailer) private readonly mailer: NodeMailer;
  @TransactionalService()
  async add({
    data,
    transaction
  }: TransactionContext<AddMemberToOrRemoveFromOrganizationType>) {
    const existingOrg = await transaction!.query.Organization.findFirst({
      where: eq(Organization.id, data.organization_id)
    });

    if (!existingOrg) {
      throw new ApiError('Organization not found', HttpStatus.CONFLICT, {});
    }

    const invitesToAlreadySentNot =
      (await transaction
        ?.select({
          id: OrganizationInvite.id,
          email: OrganizationInvite.email,
          is_accepted: OrganizationInvite.is_accepted,
          expiry_date: OrganizationInvite.expiry_date
        })
        .from(OrganizationInvite)
        .where(
          and(
            eq(OrganizationInvite.organization_id, existingOrg.id),
            inArray(OrganizationInvite.email, data.emails)
          )
        )
        .execute())! ?? [];
    const invitesToBeSent = data.emails.filter(
      (email) =>
        !invitesToAlreadySentNot.find(
          (invite) =>
            invite.email === email &&
            invite.is_accepted === false &&
            new Date(invite.expiry_date).getTime() < new Date().getTime()
        )
    );
    const newInvites = invitesToBeSent.map((email) => ({
      organization_id: existingOrg.id,
      email,
      created_by: data.created_by,
      updated_by: data.updated_by,
      is_accepted: false,
      expiry_date: /**30 days */ new Date(
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      designation_id: data.designation_id
    }));
    const invitesCreated = await transaction
      ?.insert(OrganizationInvite)
      .values(newInvites)
      .returning()
      .execute();

    if (invitesCreated && invitesCreated.length > 0) {
      const usersInDb = (await transaction
        ?.select({
          id: User.id,
          uuid: User.uuid,
          email: User.email
        })
        .from(User)
        .where(
          inArray(
            User.email,
            invitesCreated.map((u) => u.email.toLowerCase())
          )
        )
        .execute())!;

      if (usersInDb.length > 0) {
        for (const user of usersInDb) {
          await transaction!
            .update(OrganizationInvite)
            .set({
              user_id: user.id
            })
            .where(eq(OrganizationInvite.email, user.email.toLowerCase()));
        }
      }
    }

    await this.mailer.sendOrganizationInviteEmail(
      invitesCreated!.map((u) => u.email),
      `<strong>${existingOrg.name}</strong>`
    );

    return {
      data: {},
      status: HttpStatus.CREATED,
      message: `Successfully sent invites to users`
    };
  }
}
