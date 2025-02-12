import { inject, injectable } from 'inversify';
import { Organization, OrganizationMember } from '@/db/schema';
import { useDrizzle } from '@/db';
import { HttpStatus } from '@/common/http';
import { Dependency } from '@/common/di';
import { UUID } from '@/common/utils/uuid';
import { and, eq } from 'drizzle-orm';

@injectable()
@Dependency()
export class GetOrganizationMembersService {
  @inject(UUID) private uuid: UUID;
  async get(user_id: number, organizationId: string) {
    this.uuid.validateUUID(organizationId!, { throwError: true });
    const db = useDrizzle();
    // const pagination = paginateQuery(getQuery(event));
    const organization = await db.query.Organization.findFirst({
      where: eq(Organization.uuid, organizationId!)
    });
    const organizationmembers = await db.query.OrganizationMember.findMany({
      where: and(
        eq(OrganizationMember.organization_id, organization!.id!),
        eq(OrganizationMember.user_id, user_id)
      ),
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
      }
    });

    return {
      data: organizationmembers,
      message: 'Organizations fetched successfully',
      status: HttpStatus.OK
    };
  }
}
