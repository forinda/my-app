import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import type { NewDepartmentPayload } from '../schema/schema';
import { newDepartmentSchema } from '../schema/schema';
import { DepartmentCreationService } from '../services/create-department.service';

@injectable()
@Dependency()
@Controller()
export class NewDepartmentController extends BasePostController {
  @inject(DepartmentCreationService)
  private createDeptService: DepartmentCreationService;
  @ApiControllerMethod({
    bodySchema: newDepartmentSchema,
    transformParams: {},
    auth: true
  })
  async post({ res, body }: ApiRequestContext<NewDepartmentPayload>) {
    const feedback = await this.createDeptService.create({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
