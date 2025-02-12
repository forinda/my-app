import { BasePostController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import { createHttpResponse } from '@/common/utils/responder';
import { Config } from '@/common/config';

@injectable()
@Dependency()
@ApiController()
export class UserLogoutController extends BasePostController {
  @inject(Config) private conf: Config;

  @ApiControllerMethod()
  async post({ res }: ApiRequestContext) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { maxAge: _, ...other } = this.conf.cookieOpts;

    res.clearCookie(this.conf.conf.SESSION_COOKIE_NAME, other);

    return createHttpResponse(res, {
      status: HttpStatus.OK,
      message: 'Logged out'
    });
  }
}
