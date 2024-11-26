import { BasePostController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import {
  loginUserRequestSchema,
  type LoginUserRequestBody
} from '../schema/login-request.schema';
import { LoginUserService } from '../services/login.service';

@injectable()
@Dependency()
@ApiController()
export class CreateUserController extends BasePostController {
  @inject(LoginUserService) private service: LoginUserService;

  @ApiControllerMethod({
    bodySchema: loginUserRequestSchema,
    injectIpInBody: true
  })
  async post({ res, body }: ApiRequestContext<LoginUserRequestBody>) {
    const feedback = await this.service.create({ data: body! });

    return res.status(HttpStatus.OK).json(feedback);
  }
}
