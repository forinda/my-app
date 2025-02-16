import { injectable } from 'inversify';
import type { UpdateOrganizationDesignationInputType } from '../schema/schema';

import { and, eq, ne } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import { OrganizationDesignation } from '@/db/schema';

@injectable()
@Dependency()
export class UpdateOrganizationService {
  @TransactionalService()
  async update({
    data,
    transaction
  }: TransactionContext<UpdateOrganizationDesignationInputType>) {
    const existing = await transaction?.query.OrganizationDesignation.findFirst(
      {
        where: eq(OrganizationDesignation.id, data.designation_id)
      }
    );

    if (!existing) {
      throw new ApiError(
        'Organization designation does not exist',
        HttpStatus.BAD_REQUEST,
        {}
      );
    }

    const otherDesignations = await transaction
      ?.select({
        id: OrganizationDesignation.id,
        name: OrganizationDesignation.name,
        organization_id: OrganizationDesignation.organization_id
      })
      .from(OrganizationDesignation)
      .where(
        and(
          eq(OrganizationDesignation.name, data.name),
          ne(OrganizationDesignation.id, data.designation_id),
          eq(OrganizationDesignation.organization_id, data.organization_id)
        )
      )
      .execute();

    if ((otherDesignations ?? []).length > 0) {
      throw new ApiError(
        'Organization designation with this name already exists',
        HttpStatus.BAD_REQUEST,
        {}
      );
    }

    await transaction
      ?.update(OrganizationDesignation)
      .set({
        name: data.name,
        updated_by: data.updated_by
      })
      .where(eq(OrganizationDesignation.id, data.designation_id))
      .execute();

    return {
      data: {},
      status: HttpStatus.OK,
      message: 'Organization designation updated successfully'
    };
  }
}
