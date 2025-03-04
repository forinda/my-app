import { injectable } from 'inversify';
import type { CreateOrganizationInputType } from '../schema/schema';

import { eq } from 'drizzle-orm';

import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import type { InsertOrganizationInterface } from '@/db/schema';
import { Organization, OrganizationMember } from '@/db/schema';
import { ApiError, HttpStatus } from 'shared';

@injectable()
@Dependency()
export class CreateOrganizationService {
  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<CreateOrganizationInputType>) {
    const exisiting = await transaction!.query.Organization.findFirst({
      where: eq(Organization.name, data.name)
    });

    if (exisiting) {
      throw new ApiError(
        'Organization with same name already exists',
        HttpStatus.CONFLICT,
        {}
      );
    }
    // console.log({ data });

    const organization = (
      await transaction!
        .insert(Organization)
        .values(data as InsertOrganizationInterface)
        .returning()
        .execute()
    )[0];

    await transaction!.insert(OrganizationMember).values({
      user_id: organization!.created_by,
      organization_id: organization.id,
      updated_by: organization!.created_by,
      date_joined: new Date().toISOString(),
      created_by: organization!.created_by
    });

    return {
      data: organization,
      status: HttpStatus.CREATED,
      message: 'Organization created successfully'
    };
  }
}
