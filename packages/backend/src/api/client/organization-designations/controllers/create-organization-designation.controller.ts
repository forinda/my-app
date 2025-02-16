import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import { CreateOrganizationDesignationService } from '../services/create-org-designation.service';
import type { CreateOrganizationDesignationInputType } from '../schema/schema';
import { createOrgDesignationSchema } from '../schema/schema';
import { userAudit } from '@/common/utils/user-request-audit';

@injectable()
@Dependency()
@Controller()
export class CreateOrganizationDesignationController extends BasePostController {
  @inject(CreateOrganizationDesignationService)
  private service: CreateOrganizationDesignationService;
  @ApiControllerMethod({
    bodySchema: createOrgDesignationSchema,
    audit: userAudit('create'),
    auth: true,
    bodyBindOrgId: true
  })
  async post({
    res,
    body
  }: ApiRequestContext<CreateOrganizationDesignationInputType>) {
    const feedback = await this.service.create({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
