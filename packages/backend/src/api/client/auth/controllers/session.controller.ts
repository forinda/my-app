import { BaseGetController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { injectable } from 'inversify';

import { createHttpResponse } from '@/common/utils/responder';
import type { LoginUserInput } from '../schema/schema';

@injectable()
@Dependency()
@Controller()
export class GetUserSessionController extends BaseGetController {
  @ApiControllerMethod({ auth: true })
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
