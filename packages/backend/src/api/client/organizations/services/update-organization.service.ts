import { injectable } from 'inversify';
import type { UpdateOrganizationInputType } from '../schema/schema';

import { and, eq, ne } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import { Organization } from '@/db/schema';

@injectable()
@Dependency()
export class UpdateOrganizationService {
  @TransactionalService()
  async update({
    data,
    transaction
  }: TransactionContext<UpdateOrganizationInputType>) {
    const exisiting = await transaction!.query.Organization.findFirst({
      where: eq(Organization.uuid, data.organization_id)
    });

    if (!exisiting) {
      throw new ApiError(
        'Organization does not exist',
        HttpStatus.BAD_REQUEST,
        {}
      );
    }

    const otherOrganization = await transaction
      ?.select({
        id: Organization.id,
        name: Organization.name
      })
      .from(Organization)
      .where(
        and(
          eq(Organization.name, data.name),
          ne(Organization.uuid, data.organization_id)
        )
      )
      .execute();

    if (otherOrganization!.length > 0) {
      throw new ApiError(
        'Organization with this name already exists',
        HttpStatus.BAD_REQUEST,
        {}
      );
    }

    await transaction!
      .update(Organization)
      .set({
        ...exisiting!,
        ...data
      })
      .where(eq(Organization.uuid, data.organization_id))
      .execute();

    return {
      data: {},
      status: HttpStatus.CREATED,
      message: 'Organization updated successfully'
    };
  }
}
