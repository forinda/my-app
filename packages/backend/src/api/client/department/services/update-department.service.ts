import { injectable } from 'inversify';
import type { UpdateDepartmentPayload } from '../schema/schema';

import { eq } from 'drizzle-orm';

import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import {
  TransactionalService,
  type TransactionContext
} from '@/common/decorators/service-transaction';
import { ApiError } from '@/common/errors/base';
import type { InsertOrganizationInterface } from '@/db/schema';
import { Department, Organization, OrganizationMember } from '@/db/schema';

@injectable()
@Dependency()
export class UpdateDepartmentService {
  @TransactionalService()
  async update({
    data: { id: dept_id, ...data },
    transaction
  }: TransactionContext<UpdateDepartmentPayload>) {
    const exisiting = await transaction!.query.Department.findFirst({
      where: eq(Department.id, dept_id)
    });

    if (!exisiting) {
      throw new ApiError('Department does not exist', HttpStatus.CONFLICT, {});
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
