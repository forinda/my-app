import { injectable } from 'inversify';
import { OrgProject } from '@/db/schema';
import { useDrizzle } from '@/db';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import type { ApiPaginationParams } from '@/common/utils/pagination';
import { asc, eq } from 'drizzle-orm';

@injectable()
@Dependency()
export class FetchProjectsService {
  async get(organization_id: number, _?: ApiPaginationParams) {
    const db = useDrizzle();

    const depts = await db.query.OrgProject.findMany({
      where: eq(OrgProject.organization_id, organization_id),
      with: {
        members: {}
      },
      limit: _?.limit,
      offset: _?.offset,
      orderBy: [asc(OrgProject.created_at)]
    });

    return {
      data: depts,
      message: 'Projects fetched successfully',
      status: HttpStatus.OK
    };
  }
}
