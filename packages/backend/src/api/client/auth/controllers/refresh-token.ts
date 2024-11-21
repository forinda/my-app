import { BasePostController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import type { RefreshTokenRequestBody } from '../schema/login-request.schema';
import { refreshTokenRequestSchema } from '../schema/login-request.schema';
import { RefreshTokenService } from '../services/refresh-token.service';

@injectable()
@Dependency()
@ApiController()
export class RefreshTokenController extends BasePostController {
  @inject(RefreshTokenService) private service: RefreshTokenService;

  @ApiControllerMethod({
    bodySchema: refreshTokenRequestSchema,
    injectIpInBody: true
  })
  // @LoginRequired()
  async post({ res, body }: ApiRequestContext<RefreshTokenRequestBody>) {
    const feedback = await this.service.refresh({ data: body! });

    return res.status(HttpStatus.OK).json(feedback);
  }
}
