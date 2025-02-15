import { injectable } from 'inversify';
import type { NewDepartmentPayload } from '../schema/schema';

import { eq } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import type { InsertOrganizationInterface } from '@/db/schema';
import { Organization, OrganizationMember } from '@/db/schema';

@injectable()
@Dependency()
export class DepartmentCreationService {
  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<NewDepartmentPayload>) {
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
