import { injectable } from 'inversify';
import { DepartmentTitle } from '@/db/schema';
import { useDrizzle } from '@/db';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import type { ApiPaginationParams } from '@/common/utils/pagination';
import { eq } from 'drizzle-orm';

@injectable()
@Dependency()
export class FetchDepartmentService {
  async get(organization_id: number, _?: ApiPaginationParams) {
    const db = useDrizzle();
    const titles = await db.query.DepartmentTitle.findMany({
      where: eq(DepartmentTitle.organization_id, organization_id),
      limit: _?.limit,
      offset: _?.offset
    });

    return {
      data: titles,
      message: 'Department titles fetched successfully',
      status: HttpStatus.OK
    };
  }
}
