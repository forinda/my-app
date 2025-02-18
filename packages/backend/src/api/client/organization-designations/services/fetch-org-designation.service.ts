import { injectable } from 'inversify';
import { OrganizationDesignation } from '@/db/schema';
import { useDrizzle } from '@/db';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import type { ApiPaginationParams } from '@/common/utils/pagination';
import { asc, eq } from 'drizzle-orm';

@injectable()
@Dependency()
export class FetchOrganizationDesignationService {
  async get(organization_id: number, _?: ApiPaginationParams) {
    const db = useDrizzle();
    const designations = await db.query.OrganizationDesignation.findMany({
      where: eq(OrganizationDesignation.organization_id, organization_id),
      limit: _?.limit,
      offset: _?.offset,
      orderBy: [asc(OrganizationDesignation.created_at)]
    });

    return {
      data: designations,
      message: 'Organizations fetched successfully',
      status: HttpStatus.OK
    };
  }
}
