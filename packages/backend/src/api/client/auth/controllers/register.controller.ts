import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import { createHttpResponse } from '@/common/utils/responder';
import { RegisterUserService } from '../services/register.service';
import type { RegisterUserInput } from 'shared';
import { registerUserSchema } from 'shared';

@injectable()
@Dependency()
@Controller()
export class RegisterUserController extends BasePostController {
  @inject(RegisterUserService) private service: RegisterUserService;

  @ApiControllerMethod({
    bodySchema: registerUserSchema,
    injectIpInBody: true
  })
  async post({ res, body }: ApiRequestContext<RegisterUserInput>) {
    const feed = await this.service.create({ data: body! });

    return createHttpResponse(res, { ...feed, statusCode: feed.status });
  }
}
