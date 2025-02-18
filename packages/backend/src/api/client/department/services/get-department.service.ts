import { injectable } from 'inversify';
import { Department } from '@/db/schema';
import { useDrizzle } from '@/db';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import type { ApiPaginationParams } from '@/common/utils/pagination';
import { asc, eq } from 'drizzle-orm';

@injectable()
@Dependency()
export class FetchDepartmentService {
  async get(organization_id: number, _?: ApiPaginationParams) {
    const db = useDrizzle();

    const depts = await db.query.Department.findMany({
      where: eq(Department.organization_id, organization_id),
      limit: _?.limit,
      offset: _?.offset,
      orderBy: [asc(Department.created_at)]
    });

    return {
      data: depts,
      message: 'Departments fetched successfully',
      status: HttpStatus.OK
    };
  }
}
