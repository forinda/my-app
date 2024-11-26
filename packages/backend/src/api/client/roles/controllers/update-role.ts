import { BasePutController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import type { UpdateRoleRequestBody } from '../schema/create-role-request.schema';
import { updateRoleRequestSchema } from '../schema/create-role-request.schema';
import { LoginRequired } from '@/common/decorators/login-required.decorator';
import { UpdateRoleService } from '../services/update-role.service';

@injectable()
@Dependency()
@ApiController()
export class UpdateRoleController extends BasePutController {
  @inject(UpdateRoleService) private service: UpdateRoleService;
  @ApiControllerMethod({
    bodySchema: updateRoleRequestSchema,
    transformParams: {
      id: 'role_id'
    }
  })
  @LoginRequired('role:update')
  async put({ res, body }: ApiRequestContext<UpdateRoleRequestBody>) {
    console.log({ body });

    const feedback = await this.service.update({ data: body! });

    return res.status(HttpStatus.OK).json(feedback);
  }
}
