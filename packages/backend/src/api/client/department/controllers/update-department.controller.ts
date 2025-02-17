import { BasePutController } from '@/common/bases/controller';
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
import { userAudit } from '@/common/utils/user-request-audit';

@injectable()
@Dependency()
@Controller()
export class UpdateDepartmentController extends BasePutController {
  @inject(UpdateDepartmentService)
  private service: UpdateDepartmentService;
  @ApiControllerMethod({
    audit: userAudit('update'),
    auth: true,
    bodyBindOrgId: true,
    bodySchema: updateDepartmentSchema,
    pathParamTransform: {
      id: 'department_id'
    }
  })
  async put({ res, body }: ApiRequestContext<UpdateDepartmentPayload>) {
    const feedback = await this.service.update({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
