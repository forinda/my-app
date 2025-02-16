import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import { createHttpResponse } from '@/common/utils/responder';
import { RemoveOrganizationMemberService } from '../services/remove-organization-member.service';
import type { AddMemberToOrRemoveFromOrganizationType } from '../schema';
import { addMemberToOrRemoveFromOrgSchema } from '../schema';

@injectable()
@Dependency()
@Controller()
export class RemoveOrganizationMembersController extends BasePostController {
  @inject(RemoveOrganizationMemberService)
  private service: RemoveOrganizationMemberService;

  @ApiControllerMethod({
    auth: true,
    bodySchema: addMemberToOrRemoveFromOrgSchema
  })
  async post({
    res,
    body: data,
    current_organization_id
  }: ApiRequestContext<AddMemberToOrRemoveFromOrganizationType>) {
    const feed = await this.service.remove({
      data: { ...data!, organization_id: current_organization_id! }
    });

    return createHttpResponse(res, { ...feed, statusCode: feed.status });
  }
}
