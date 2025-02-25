import { injectable } from 'inversify';
import { OrganizationInvite } from '@/db/schema';
import { useDrizzle } from '@/db';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import { desc, eq } from 'drizzle-orm';
import type { FetchUserOrganizationInvitesType } from '../schema';
import type { ApiPaginationParams } from '@/common/utils/pagination';

@injectable()
@Dependency()
export class FetchOrganizationMemberInvitesService {
  async get(
    query: FetchUserOrganizationInvitesType,
    _pagination: ApiPaginationParams
  ) {
    const db = useDrizzle();
    const invites = await db.query.OrganizationInvite.findMany({
      where: eq(OrganizationInvite.user_id, query.user_id!),
      with: {
        organization: {
          columns: {
            id: true,
            name: true
          }
        }
      },
      offset: _pagination.offset,
      limit: _pagination.limit,
      orderBy: desc(OrganizationInvite.created_at)
    });

    return {
      data: invites,
      message: 'Organization invites fetched successfully',
      status: HttpStatus.OK
    };
  }
}
