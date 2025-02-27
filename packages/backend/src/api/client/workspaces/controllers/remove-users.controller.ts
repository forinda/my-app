import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import type { RemoveUsersFromWorkspacePayload } from '../schema/schema';
import { removeUsersFromWorkspaceSchema } from '../schema/schema';
import { userAudit } from '@/common/utils/user-request-audit';
import { RemoveUserFromWorkspaceService } from '../services/remove-users.service';
import { createHttpResponse } from '@/common/utils/responder';

@injectable()
@Dependency()
@Controller()
export class RemoveUserFromWorkspaceController extends BasePostController {
  @inject(RemoveUserFromWorkspaceService)
  private service: RemoveUserFromWorkspaceService;
  @ApiControllerMethod({
    bodySchema: removeUsersFromWorkspaceSchema,
    pathParamTransform: {
      id: 'workspace_id'
    },
    auth: true,
    audit: userAudit('update'),
    bodyBindOrgId: true
  })
  async post({
    res,
    body
  }: ApiRequestContext<RemoveUsersFromWorkspacePayload>) {
    const feedback = await this.service.create({ data: body! });

    return createHttpResponse(res, {
      ...feedback,
      statusCode: feedback.status
    });
  }
}
