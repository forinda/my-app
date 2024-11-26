import { BaseGetController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import { GetRolesService } from '../services/get-roles.service';
import { LoginRequired } from '@/common/decorators/login-required.decorator';

@injectable()
@Dependency()
@ApiController()
export class GetAllRolesController extends BaseGetController {
  @inject(GetRolesService) private getUsersService: GetRolesService;

  @ApiControllerMethod({
    paginate: true
  })
  @LoginRequired('role:list')
  async get({ res, pagination, user }: ApiRequestContext) {
    console.log({ user });

    const users = await this.getUsersService.get(pagination);

    return res.status(HttpStatus.OK).json(users);
  }
}
