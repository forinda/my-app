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
  createRoleRequestSchema,
  type CreateRoleRequestBody
} from '../schema/create-role-request.schema';
import { CreateRoleService } from '../services/create-role.service';
import { LoginRequired } from '@/common/decorators/login-required.decorator';

@injectable()
@Dependency()
@ApiController()
export class CreateRoleController extends BasePostController {
  @inject(CreateRoleService) private createUserService: CreateRoleService;
  @ApiControllerMethod({
    bodySchema: createRoleRequestSchema
  })
  @LoginRequired('role:create')
  async post({ res, body }: ApiRequestContext<CreateRoleRequestBody>) {
    const feedback = await this.createUserService.create({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
