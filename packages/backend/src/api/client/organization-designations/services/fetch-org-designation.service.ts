import { injectable } from 'inversify';
import { OrganizationMember } from '@/db/schema';
import { useDrizzle } from '@/db';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import type { ApiPaginationParams } from '@/common/utils/pagination';
import { eq } from 'drizzle-orm';

@injectable()
@Dependency()
export class FetchOrganizationDesignationService {
  async get(organization_id: number, _?: ApiPaginationParams) {
    const db = useDrizzle();
    const designations = await db.query.OrganizationDesignation.findMany({
      where: eq(OrganizationMember.organization_id, organization_id),
      limit: _?.limit,
      offset: _?.offset
    });

    return {
      data: designations,
      message: 'Organizations fetched successfully',
      status: HttpStatus.OK
    };
  }
}
