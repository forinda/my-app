import { injectable } from 'inversify';
import { User } from '@/db/schema';
import db from '@/db';
import { createHttpSuccessResponse } from '@/common/utils/http-response';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import type { ApiPaginationParams } from '@/common/utils/pagination';
import { desc } from 'drizzle-orm';

@injectable()
@Dependency()
export class GetRolesService {
  async get(pagination?: ApiPaginationParams) {
    const userRolesData = await db.query.AuthRole.findMany({
      limit: pagination?.limit,
      offset: pagination?.offset,
      orderBy: desc(User.created_at),
      with: {
        role_permissions: {
          with: {
            permission: {
              columns: {
                name: true,
                id: true
              }
            }
          }
        }
      }
    });

    return createHttpSuccessResponse(
      userRolesData,
      HttpStatus.OK,
      'Roles retrieved successfully'
    );
  }
}
