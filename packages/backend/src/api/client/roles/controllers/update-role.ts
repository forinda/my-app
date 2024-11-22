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
  updateRoleRequestSchema,
  type CreateRoleRequestBody
} from '../schema/create-role-request.schema';
import { LoginRequired } from '@/common/decorators/login-required.decorator';
import { UpdateRoleService } from '../services/update-role.service';

@injectable()
@Dependency()
@ApiController()
export class UpdateRoleController extends BasePostController {
  @inject(UpdateRoleService) private createUserService: UpdateRoleService;
  @ApiControllerMethod({
    bodySchema: updateRoleRequestSchema
  })
  @LoginRequired('role:create')
  async post({ res, body }: ApiRequestContext<CreateRoleRequestBody>) {
    const feedback = await this.createUserService.create({ data: body! });

    return res.status(HttpStatus.OK).json(feedback);
  }
}
