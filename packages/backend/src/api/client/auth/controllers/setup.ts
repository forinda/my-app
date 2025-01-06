import { BaseGetController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import type { RefreshTokenRequestBody } from '../schema/login-request.schema';
import { SetupAuthService } from '../services/setup.service';

@injectable()
@Dependency()
@ApiController()
export class SetupAuthController extends BaseGetController {
  @inject(SetupAuthService) private service: SetupAuthService;

  @ApiControllerMethod({})
  // @LoginRequired()
  async get({ res }: ApiRequestContext<RefreshTokenRequestBody>) {
    const feedback = await this.service.setup();

    return res.status(HttpStatus.OK).json(feedback);
  }
}
