import { injectable } from 'inversify';
import { OrgWorkspace } from '@/db/schema';
import { useDrizzle } from '@/db';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import type { ApiPaginationParams } from '@/common/utils/pagination';
import { asc, eq } from 'drizzle-orm';

@injectable()
@Dependency()
export class FetchWorkspaceService {
  async get(organization_id: number, _?: ApiPaginationParams) {
    const db = useDrizzle();

    const depts = await db.query.OrgWorkspace.findMany({
      where: eq(OrgWorkspace.organization_id, organization_id),
      with: {},
      limit: _?.limit,
      offset: _?.offset,
      orderBy: [asc(OrgWorkspace.created_at)]
    });

    return {
      data: depts,
      message: 'Workspaces fetched successfully',
      status: HttpStatus.OK
    };
  }
}
