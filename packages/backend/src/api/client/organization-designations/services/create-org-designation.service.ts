import { injectable } from 'inversify';
import type { CreateOrganizationDesignationInputType } from '../schema/schema';

import { and, eq } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import type { InsertOrganizationMemberDesignationInterface } from '@/db/schema';
import { Organization, OrganizationDesignation } from '@/db/schema';

@injectable()
@Dependency()
export class CreateOrganizationDesignationService {
  @TransactionalService()
  async create({
    data,
    transaction
  }: TransactionContext<CreateOrganizationDesignationInputType>) {
    const exisiting =
      await transaction!.query.OrganizationDesignation.findFirst({
        where: and(
          eq(Organization.name, data.name),
          eq(OrganizationDesignation.organization_id, data.organization_id)
        )
      });

    if (exisiting) {
      throw new ApiError(
        'Organization designation already exists',
        HttpStatus.CONFLICT,
        {}
      );
    }
    // console.log({ data });

    const designation = (
      await transaction!
        .insert(OrganizationDesignation)
        .values(data as InsertOrganizationMemberDesignationInterface)
        .returning()
        .execute()
    )[0];

    return {
      data: designation,
      status: HttpStatus.CREATED,
      message: 'Organization created successfully'
    };
  }
}
