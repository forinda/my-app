import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import { CreateOrganizationService } from '../services/create-organization.service';
import type { CreateOrganizationInputType } from '../schema/schema';
import { createOrganizationSchema } from '../schema/schema';
import { userAudit } from '@/common/utils/user-request-audit';
import { createHttpResponse } from '@/common/utils/responder';

@injectable()
@Dependency()
@Controller()
export class CreateOrganizationController extends BasePostController {
  @inject(CreateOrganizationService)
  private service: CreateOrganizationService;
  @ApiControllerMethod({
    bodySchema: createOrganizationSchema,
    audit: userAudit('create'),
    auth: true
  })
  async post({ res, body }: ApiRequestContext<CreateOrganizationInputType>) {
    const feedback = await this.service.create({ data: body! });

    return createHttpResponse(res, {
      ...feedback,
      statusCode: feedback.status
    });
  }
}
