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
export class GetUsersService {
  async get(pagination?: ApiPaginationParams) {
    const existingUsers = await db
      .select({
        id: User.id,
        email: User.email,
        createdAt: User.created_at,
        updatedAt: User.updated_at,
        first_name: User.first_name,
        last_name: User.last_name,
        username: User.username,
        gender: User.gender,
        is_active: User.is_active
      })
      .from(User)
      .limit(pagination!.limit)
      .offset(pagination!.offset)
      .orderBy(desc(User.created_at));

    return createHttpSuccessResponse(
      existingUsers,
      HttpStatus.OK,
      'Users retrieved successfully'
    );
  }
}
