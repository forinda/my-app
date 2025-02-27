import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import type { RemoveUsersFromProjectPayload } from '../schema/schema';
import { removeUsersFromProjectSchema } from '../schema/schema';
import { userAudit } from '@/common/utils/user-request-audit';
import { RemoveUserFromProjectService } from '../services/remove-users.service';
import { createHttpResponse } from '@/common/utils/responder';

@injectable()
@Dependency()
@Controller()
export class RemoveUserFromProjectController extends BasePostController {
  @inject(RemoveUserFromProjectService)
  private service: RemoveUserFromProjectService;
  @ApiControllerMethod({
    bodySchema: removeUsersFromProjectSchema,
    pathParamTransform: {
      id: 'workspace_id'
    },
    auth: true,
    audit: userAudit('update'),
    bodyBindOrgId: true
  })
  async post({ res, body }: ApiRequestContext<RemoveUsersFromProjectPayload>) {
    const feedback = await this.service.create({ data: body! });

    return createHttpResponse(res, {
      ...feedback,
      statusCode: feedback.status
    });
  }
}
