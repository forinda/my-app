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
import { userAudit } from '@/common/utils/user-request-audit';

@injectable()
@Dependency()
@Controller()
export class NewDepartmentController extends BasePostController {
  @inject(DepartmentCreationService)
  private service: DepartmentCreationService;
  @ApiControllerMethod({
    bodySchema: newDepartmentSchema,
    pathParamTransform: {},
    auth: true,
    audit: userAudit('create'),
    bodyBindOrgId: true
  })
  async post({ res, body }: ApiRequestContext<NewDepartmentPayload>) {
    const feedback = await this.service.create({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
