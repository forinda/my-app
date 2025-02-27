import { BasePutController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import type { UpdateProjectPayload } from '../schema/schema';
import { updateProjectSchema } from '../schema/schema';
import { UpdateProjectService } from '../services/update.service';
import { userAudit } from '@/common/utils/user-request-audit';
import { createHttpResponse } from '@/common/utils/responder';

@injectable()
@Dependency()
@Controller()
export class UpdateProjectController extends BasePutController {
  @inject(UpdateProjectService)
  private service: UpdateProjectService;
  @ApiControllerMethod({
    audit: userAudit('update'),
    auth: true,
    bodyBindOrgId: true,
    bodySchema: updateProjectSchema,
    pathParamTransform: {
      id: 'workspace_id'
    }
  })
  async put({ res, body }: ApiRequestContext<UpdateProjectPayload>) {
    const feedback = await this.service.update({ data: body! });

    return createHttpResponse(res, {
      ...feedback,
      statusCode: feedback.status
    });
  }
}
