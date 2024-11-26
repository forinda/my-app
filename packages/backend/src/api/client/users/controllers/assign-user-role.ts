import { BasePostController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import type { AssignOrRemoveUserRoleRequestBody } from '../schema/create-user-request.schema';
import { asssignOrRemoveUserRoleRequestSchema } from '../schema/create-user-request.schema';
import { LoginRequired } from '@/common/decorators/login-required.decorator';
import { UpdateUserRoleService } from '../services/assign-user-role.service';

@injectable()
@Dependency()
@ApiController()
export class UpdateUserRoleController extends BasePostController {
  @inject(UpdateUserRoleService) private service: UpdateUserRoleService;
  @ApiControllerMethod({
    bodySchema: asssignOrRemoveUserRoleRequestSchema
  })
  @LoginRequired()
  async post({
    res,
    body
  }: ApiRequestContext<AssignOrRemoveUserRoleRequestBody>) {
    const feedback = await this.service.update({ data: body! });

    return res.status(feedback.statusCode).json(feedback);
  }
}
