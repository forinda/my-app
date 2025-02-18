import { BasePutController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import type { UpdateDepartmentTitleRequest } from '../schema/schema';
import { updateDepartmentTitleSchema } from '../schema/schema';
import { UpdateDepartmentService } from '../services/update-department.service';
import { userAudit } from '@/common/utils/user-request-audit';

@injectable()
@Dependency()
@Controller()
export class UpdateDepartmentTitleController extends BasePutController {
  @inject(UpdateDepartmentService)
  private service: UpdateDepartmentService;
  @ApiControllerMethod({
    bodySchema: updateDepartmentTitleSchema,
    auth: true,
    bodyBindOrgId: true,
    pathParamTransform: {
      title_id: 'id'
    },
    audit: userAudit('update')
  })
  async put({ res, body }: ApiRequestContext<UpdateDepartmentTitleRequest>) {
    const feedback = await this.service.update({ data: body! });

    return res.status(HttpStatus.OK).json(feedback);
  }
}
