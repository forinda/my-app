import { inject, injectable } from 'inversify';
import { Organization, OrganizationMember } from '@/db/schema';
import { useDrizzle } from '@/db';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import { UUID } from '@/common/utils/uuid';
import { eq } from 'drizzle-orm';
import type { FilterOrganizationmembersType } from '../schema';
import type { ApiPaginationParams } from '@/common/utils/pagination';

@injectable()
@Dependency()
export class FetchOrganizationMembersService {
  @inject(UUID) private uuid: UUID;
  async get(
    query: FilterOrganizationmembersType,
    _pagination: ApiPaginationParams
  ) {
    this.uuid.validateUUID(query.current_organization_id!, {
      throwError: true
    });
    const db = useDrizzle();
    const organization = await db.query.Organization.findFirst({
      where: eq(Organization.uuid, query.current_organization_id!)
    });
    const organizationmembers = await db.query.OrganizationMember.findMany({
      where: eq(OrganizationMember.organization_id, organization!.id!),
      with: {
        user: {
          columns: {
            first_name: true,
            last_name: true,
            gender: true,
            email: true,
            is_admin: true,
            username: true,
            id: true
          }
        },
        organization: {
          columns: {
            name: true,
            description: true,
            id: true,
            uuid: true
          }
        },
        department: {
          columns: {
            name: true,
            description: true,
            id: true
          }
        },
        role: {
          columns: {
            name: true,
            description: true,
            id: true
          }
        }
      },
      limit: _pagination.limit,
      offset: _pagination.offset
    });

    return {
      data: organizationmembers,
      message: 'Organizations fetched successfully',
      status: HttpStatus.OK
    };
  }
}
