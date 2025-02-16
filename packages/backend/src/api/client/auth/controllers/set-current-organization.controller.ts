import { Dependency } from '@/common/di';
import { inject, injectable } from 'inversify';
import { SetCurrentOrganizationSessionIdService } from '../services/set-current-organization.service';
import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { createHttpResponse } from '@/common/utils/responder';
import type { ValidateSwitchOrganizationInput } from '../schema/schema';
import { validateSwitchOrganizationSchema } from '../schema/schema';

@injectable()
@Dependency()
@Controller()
export class SetCurrentOrganizationSessionIdController extends BasePostController {
  @inject(SetCurrentOrganizationSessionIdService)
  private service: SetCurrentOrganizationSessionIdService;

  @ApiControllerMethod({
    auth: ['users:create', 'role:create'],
    bodySchema: validateSwitchOrganizationSchema
  })
  async post({
    user,
    body,
    res
  }: ApiRequestContext<ValidateSwitchOrganizationInput>) {
    const feedback = await this.service.set({
      data: {
        user_id: user!.uuid,
        ...body!
      }
    });

    return createHttpResponse(res, {
      ...feedback,
      statusCode: feedback.status
    });
  }
}
