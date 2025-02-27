import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import type { DepartmentUserRoleCreationRequest } from '../schema/schema';
import { newDepartmentUserRoleSchema } from '../schema/schema';
import { AddNewDepartmentUserRoleService } from '../services/add-department-role.service';
import { userAudit } from '@/common/utils/user-request-audit';

@injectable()
@Dependency()
@Controller()
export class AddDepartmentRoleController extends BasePostController {
  @inject(AddNewDepartmentUserRoleService)
  private service: AddNewDepartmentUserRoleService;
  @ApiControllerMethod({
    bodySchema: newDepartmentUserRoleSchema,
    auth: true,
    bodyBindOrgId: true,
    audit: userAudit('create')
  })
  async post({
    res,
    body
  }: ApiRequestContext<DepartmentUserRoleCreationRequest>) {
    const feedback = await this.service.create({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
