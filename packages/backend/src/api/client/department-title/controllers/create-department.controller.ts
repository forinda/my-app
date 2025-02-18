import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import type { DepartmentTitleCreationRequest } from '../schema/schema';
import { newDepartmentTitleSchema } from '../schema/schema';
import { CreateNewDepartmentTitleService } from '../services/create-department-title.service';
import { userAudit } from '@/common/utils/user-request-audit';

@injectable()
@Dependency()
@Controller()
export class CreateDepartmentTitleController extends BasePostController {
  @inject(CreateNewDepartmentTitleService)
  private service: CreateNewDepartmentTitleService;
  @ApiControllerMethod({
    bodySchema: newDepartmentTitleSchema,
    auth: true,
    bodyBindOrgId: true,
    audit: userAudit('create')
  })
  async post({ res, body }: ApiRequestContext<DepartmentTitleCreationRequest>) {
    const feedback = await this.service.create({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
