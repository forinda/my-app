import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import type { UpdateDepartmentPayload } from '../schema/schema';
import { updateDepartmentSchema } from '../schema/schema';
import { UpdateDepartmentService } from '../services/update-department.service';

@injectable()
@Dependency()
@Controller()
export class CreateOrganizationController extends BasePostController {
  @inject(UpdateDepartmentService)
  private createUserService: UpdateDepartmentService;
  @ApiControllerMethod({
    bodySchema: updateDepartmentSchema,
    auth: true
  })
  async post({ res, body }: ApiRequestContext<UpdateDepartmentPayload>) {
    const feedback = await this.createUserService.update({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
