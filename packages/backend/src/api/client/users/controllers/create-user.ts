import { BasePostController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import {
  createUserRequestSchema,
  type CreateUserRequestBody
} from '../schema/create-user-request.schema';
import { CreateUserService } from '../services/create-user.service';

@injectable()
@Dependency()
@ApiController()
export class CreateUserController extends BasePostController {
  @inject(CreateUserService) private createUserService: CreateUserService;
  @ApiControllerMethod({
    bodySchema: createUserRequestSchema
  })
  async post({ res, body }: ApiRequestContext<CreateUserRequestBody>) {
    const feedback = await this.createUserService.create(body!);

    return res.status(feedback.statusCode).json(feedback);
  }
}
