import { BaseGetController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { injectable } from 'inversify';

import { createHttpResponse } from '@/common/utils/responder';
import { LoginRequired } from '@/common/decorators/login-required.decorator';
import type { LoginUserInput } from '../schema/schema';

@injectable()
@Dependency()
@ApiController()
export class GetUserSessionController extends BaseGetController {
  @ApiControllerMethod()
  @LoginRequired()
  async get({ user, res }: ApiRequestContext<LoginUserInput>) {
    if (!user) {
      return createHttpResponse(res, {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token',
        access: false
      });
    }

    return createHttpResponse(res, {
      statusCode: HttpStatus.OK,
      data: user,
      message: 'Token is valid',
      access: true
    });
  }
}
