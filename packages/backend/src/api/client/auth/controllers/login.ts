import { BasePostController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import { LoginUserService } from '../services/login.service';

import { createHttpResponse } from '@/common/utils/responder';
import type { LoginUserInput } from '../schema/schema';
import { loginUserSchema } from '../schema/schema';

@injectable()
@Dependency()
@ApiController()
export class LoginUserController extends BasePostController {
  @inject(LoginUserService) private service: LoginUserService;

  @ApiControllerMethod({
    bodySchema: loginUserSchema,
    injectIpInBody: true
  })
  async post({ res, body }: ApiRequestContext<LoginUserInput>) {
    const { expiry, otherCookieOptions, ...rest } = await this.service.create(
      body!
    );

    res.cookie('session', 'signedSession', {
      ...otherCookieOptions,
      sameSite: otherCookieOptions!.sameSite || 'lax',
      expires: expiry
    });

    return createHttpResponse(res, { status: HttpStatus.OK, ...rest });
  }
}
