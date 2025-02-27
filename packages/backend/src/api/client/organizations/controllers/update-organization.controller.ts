import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import type { UpdateOrganizationInputType } from '../schema/schema';
import { updateOrganizationSchema } from '../schema/schema';
import { userAudit } from '@/common/utils/user-request-audit';
import { UpdateOrganizationService } from '../services/update-organization.service';
import { createHttpResponse } from '@/common/utils/responder';

@injectable()
@Dependency()
@Controller()
export class UpdateOrganizationController extends BasePostController {
  @inject(UpdateOrganizationService)
  private service: UpdateOrganizationService;
  @ApiControllerMethod({
    bodySchema: updateOrganizationSchema,
    audit: userAudit('update'),
    auth: true
  })
  async post({
    res,
    body,
    current_organization_id
  }: ApiRequestContext<UpdateOrganizationInputType>) {
    const feedback = await this.service.update({
      data: { ...body!, organization_id: current_organization_id! }
    });

    return createHttpResponse(res, {
      ...feedback,
      statusCode: feedback.status
    });
  }
}
